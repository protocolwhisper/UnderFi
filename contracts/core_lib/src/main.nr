mod test;
use dep::aztec::macros::aztec;

#[aztec]
pub contract Pool {
    use aztec::macros::{functions::{initializer, private}, storage::storage};
    use aztec::prelude::{AztecAddress, Map};
    use aztec::protocol_types::traits::{FromField, ToField};
    use value_note::{balance_utils, value_note::ValueNote};

    // Constants
    const BASE_RATE: Field = 1_000_000; // 1.0 in fixed point (6 decimals)
    const UTILIZATION_OPTIMAL: Field = 800_000; // 80% optimal utilization
    const SLOPE_RATE_LOW: Field = 20_000; // 2% slope rate below optimal
    const SLOPE_RATE_HIGH: Field = 100_000; // 10% slope rate above optimal
    const RESERVE_FACTOR: Field = 100_000; // 10% of interest goes to reserves

    // Structs for pool data
    struct PoolConfig {
        name: Field,
        asset: AztecAddress,
        oracle: AztecAddress,
        admin: AztecAddress,
        paused: bool
    }

    // Borrow record structure
    struct BorrowRecord {
        amount: Field,
        timestamp: Field,
        repaid: Field
    }

    #[storage]
    struct Storage<Context> {
        pool_config: PoolConfig,
        total_deposits: Field,
        total_borrows: Field,
        last_update_time: Field,
        accrued_interest_index: Field,
        user_deposits: Map<AztecAddress, Field, Context>,
        user_borrows: Map<AztecAddress, Field, Context>,
        borrow_records: Map<AztecAddress, Vec<BorrowRecord>, Context>,
        borrow_count: Map<AztecAddress, Field, Context>
    }

    #[initializer]
    #[private]
    fn initialize(
        name: Field,
        asset: AztecAddress,
        oracle: AztecAddress,
        admin: AztecAddress
    ) {
        // Initialize pool configuration
        storage.pool_config = PoolConfig {
            name: name,
            asset: asset,
            oracle: oracle,
            admin: admin,
            paused: false
        };
        
        storage.total_deposits = 0;
        storage.total_borrows = 0;
        storage.last_update_time = timestamp();
        storage.accrued_interest_index = BASE_RATE; // Start with 1.0
    }

    fn timestamp() -> Field {
        // Replace with actual timestamp implementation
        let current_time = storage.last_update_time;
        if current_time == 0 {
            1
        } else {
            current_time + 1
        }
    }

    fn only_admin() {
        let sender = context.msg_sender();
        assert(sender == storage.pool_config.admin, "Only admin can perform this action");
    }

    fn not_paused() {
        assert(!storage.pool_config.paused, "Pool is paused");
    }

    fn update_interest() {
        let current_time = timestamp();
        let time_elapsed = current_time - storage.last_update_time;
        
        if time_elapsed > 0 && storage.total_deposits > 0 {
            let interest_rate = calculate_borrow_rate();
            
            // Calculate interest: rate * time * totalBorrows
            // Assuming rate is per second and using simple interest for simplicity
            let interest_accrued = (interest_rate * time_elapsed * storage.total_borrows) / BASE_RATE / 86400; // Daily rate
            
            // Add interest to total borrows
            storage.total_borrows += interest_accrued;
            
            // Update interest index
            if storage.total_borrows > 0 {
                let reserve_amount = (interest_accrued * RESERVE_FACTOR) / BASE_RATE;
                let remaining_interest = interest_accrued - reserve_amount;
                
                // Update index based on remaining interest
                storage.accrued_interest_index += (remaining_interest * BASE_RATE) / storage.total_deposits;
            }
        }
        
        storage.last_update_time = current_time;
    }

    fn calculate_utilization_rate() -> Field {
        if storage.total_deposits == 0 {
            return 0;
        }
        
        (storage.total_borrows * BASE_RATE) / storage.total_deposits
    }

    fn calculate_borrow_rate() -> Field {
        let utilization_rate = calculate_utilization_rate();
        
        if utilization_rate <= UTILIZATION_OPTIMAL {
            // Rate grows linearly until optimal point
            return (utilization_rate * SLOPE_RATE_LOW) / UTILIZATION_OPTIMAL;
        } else {
            // Base rate + slope below optimal + steeper slope above optimal
            let base_optimal_rate = SLOPE_RATE_LOW;
            let excess_utilization = utilization_rate - UTILIZATION_OPTIMAL;
            let excess_rate = (excess_utilization * SLOPE_RATE_HIGH) / (BASE_RATE - UTILIZATION_OPTIMAL);
            
            return base_optimal_rate + excess_rate;
        }
    }

    fn calculate_supply_rate() -> Field {
        let borrow_rate = calculate_borrow_rate();
        let utilization_rate = calculate_utilization_rate();
        
        // Supply rate = borrow rate * utilization rate * (1 - reserve factor)
        (borrow_rate * utilization_rate * (BASE_RATE - RESERVE_FACTOR)) / (BASE_RATE * BASE_RATE)
    }

    // Core pool functions
    #[private]
    fn deposit(amount: Field) {
        not_paused();
        assert(amount > 0, "Amount must be greater than 0");
        
        update_interest();
        
        let user = context.msg_sender();
        let asset = storage.pool_config.asset;
        
        // Transfer tokens from user to contract
        let token_contract = asset.to_field();
        let contract_address = context.self_address();
        
        // Using the IERC20 interface
        dep::aztec::prelude::IERC20::transfer_from(asset, user, contract_address, amount);
        
        // Update state
        let user_deposits = storage.user_deposits;
        let current_deposit = user_deposits.at(user).read_or(0);
        user_deposits.at(user).write(current_deposit + amount);
        
        storage.total_deposits += amount;
    }

    #[private]
    fn withdraw(amount: Field) {
        not_paused();
        assert(amount > 0, "Amount must be greater than 0");
        
        update_interest();
        
        let user = context.msg_sender();
        let user_deposits = storage.user_deposits;
        let user_deposit = user_deposits.at(user).read_or(0);
        
        assert(user_deposit >= amount, "Insufficient balance");
        
        // Update state
        user_deposits.at(user).write(user_deposit - amount);
        storage.total_deposits -= amount;
        
        // Transfer tokens from contract to user
        let asset = storage.pool_config.asset;
        let contract_address = context.self_address();
        
        dep::aztec::prelude::IERC20::transfer(asset, contract_address, user, amount);
    }

    #[private]
    fn borrow(amount: Field) {
        not_paused();
        assert(amount > 0, "Amount must be greater than 0");
        assert(storage.total_deposits >= storage.total_borrows + amount, "Insufficient liquidity");
        
        update_interest();
        
        let user = context.msg_sender();
        let user_deposits = storage.user_deposits;
        let user_deposit = user_deposits.at(user).read_or(0);
        
        let user_borrows = storage.user_borrows;
        let user_borrow = user_borrows.at(user).read_or(0);
        
        // Ensure user has enough collateral (simple 50% LTV ratio for example)
        assert(user_deposit * 2 >= (user_borrow + amount), "Insufficient collateral");
        
        // Update state
        user_borrows.at(user).write(user_borrow + amount);
        storage.total_borrows += amount;
        
        // Create borrow record
        let current_time = timestamp();
        let borrow_record = BorrowRecord {
            amount: amount,
            timestamp: current_time,
            repaid: 0
        };
        
        // Store borrow record
        let borrow_count = storage.borrow_count.at(user).read_or(0);
        let borrow_records = storage.borrow_records.at(user).read_or(Vec::new());
        borrow_records.push(borrow_record);
        storage.borrow_records.at(user).write(borrow_records);
        storage.borrow_count.at(user).write(borrow_count + 1);
        
        // Transfer tokens from contract to user
        let asset = storage.pool_config.asset;
        let contract_address = context.self_address();
        
        dep::aztec::prelude::IERC20::transfer(asset, contract_address, user, amount);
    }

    #[private]
    fn repay(amount: Field) {
        not_paused();
        assert(amount > 0, "Amount must be greater than 0");
        
        update_interest();
        
        let user = context.msg_sender();
        let user_borrows = storage.user_borrows;
        let user_borrow = user_borrows.at(user).read_or(0);
        
        assert(user_borrow > 0, "No outstanding borrow");
        
        // Cap repayment at user's debt
        let repay_amount = min(amount, user_borrow);
        
        // Update state
        user_borrows.at(user).write(user_borrow - repay_amount);
        storage.total_borrows -= repay_amount;
        
        // Update borrow records - mark as repaid
        let borrow_count = storage.borrow_count.at(user).read_or(0);
        let mut borrow_records = storage.borrow_records.at(user).read_or(Vec::new());
        
        let mut remaining_repay = repay_amount;
        for i in 0..borrow_count {
            if i >= borrow_records.len() {
                break;
            }
            
            let mut record = borrow_records[i];
            if record.repaid < record.amount && remaining_repay > 0 {
                let to_repay = min(remaining_repay, record.amount - record.repaid);
                record.repaid += to_repay;
                borrow_records[i] = record;
                remaining_repay -= to_repay;
                
                if remaining_repay == 0 {
                    break;
                }
            }
        }
        
        storage.borrow_records.at(user).write(borrow_records);
        
        // Transfer tokens from user to contract
        let asset = storage.pool_config.asset;
        let contract_address = context.self_address();
        
        dep::aztec::prelude::IERC20::transfer_from(asset, user, contract_address, repay_amount);
    }

    // Admin functions
    #[private]
    fn set_paused(paused: bool) {
        only_admin();
        storage.pool_config.paused = paused;
    }

    #[private]
    fn set_admin(new_admin: AztecAddress) {
        only_admin();
        assert(new_admin != AztecAddress::default(), "Invalid admin address");
        storage.pool_config.admin = new_admin;
    }

    // View functions
    unconstrained fn get_pool_name() -> pub Field {
        storage.pool_config.name
    }

    unconstrained fn get_pool_asset() -> pub AztecAddress {
        storage.pool_config.asset
    }

    unconstrained fn get_pool_oracle() -> pub AztecAddress {
        storage.pool_config.oracle
    }

    unconstrained fn get_pool_admin() -> pub AztecAddress {
        storage.pool_config.admin
    }

    unconstrained fn get_total_deposits() -> pub Field {
        storage.total_deposits
    }

    unconstrained fn get_total_borrows() -> pub Field {
        storage.total_borrows
    }

    unconstrained fn get_utilization_rate() -> pub Field {
        calculate_utilization_rate()
    }

    unconstrained fn get_borrow_rate() -> pub Field {
        calculate_borrow_rate()
    }

    unconstrained fn get_supply_rate() -> pub Field {
        calculate_supply_rate()
    }

    unconstrained fn get_user_deposit(user: AztecAddress) -> pub Field {
        storage.user_deposits.at(user).read_or(0)
    }

    unconstrained fn get_user_borrow(user: AztecAddress) -> pub Field {
        storage.user_borrows.at(user).read_or(0)
    }

    unconstrained fn get_user_health(user: AztecAddress) -> pub Field {
        let user_deposit = storage.user_deposits.at(user).read_or(0);
        let user_borrow = storage.user_borrows.at(user).read_or(0);
        
        if user_borrow == 0 {
            return BASE_RATE; // 1.0, maximum health
        }
        
        // Health = deposit / (borrow * 0.5) in a simple 50% LTV model
        (user_deposit * BASE_RATE) / (user_borrow * 5 / 10)
    }
    
    unconstrained fn get_user_borrow_count(user: AztecAddress) -> pub Field {
        storage.borrow_count.at(user).read_or(0)
    }

    fn min(a: Field, b: Field) -> Field {
        if a < b { a } else { b }
    }

    // Test imports and functions
    use dep::aztec::test::helpers::test_environment::TestEnvironment;
    
    #[test]
    unconstrained fn test_pool_creation() {
        // Setup env, generate keys
        let mut env = TestEnvironment::new();
        let admin = env.create_account(1);
        
        // Test data
        let name: Field = 1234; // Example name as Field
        let asset = env.create_account(2); // Example asset address
        let oracle = env.create_account(3); // Example oracle address
        
        env.impersonate(admin);
        
        // Deploy contract and initialize
        let initializer = Pool::interface().initialize(name, asset, oracle, admin);
        let pool_contract = env.deploy_self("Pool").with_private_initializer(initializer);
        let contract_address = pool_contract.to_address();
        
        // Verify pool initialization
        assert(
            Pool::at(contract_address).get_pool_name() == name,
            "Pool name doesn't match"
        );
        assert(
            Pool::at(contract_address).get_pool_asset() == asset,
            "Pool asset doesn't match"
        );
        assert(
            Pool::at(contract_address).get_total_deposits() == 0,
            "Initial deposits should be 0"
        );
        assert(
            Pool::at(contract_address).get_total_borrows() == 0,
            "Initial borrows should be 0"
        );
    }
}


