use dep::std;
use under_fi::core::{Asset, UserBalance, ProtocolState};
use under_fi::core::deposit::deposit;
use under_fi::core::withdraw::withdraw;
use under_fi::core::balance::update_balance;
use under_fi::core::emergency::toggle_pause;
use under_fi::core::yield_mod::calculate_yield;

// Global state storage
struct GlobalState {
    protocol: ProtocolState,
    assets: [Asset; 10], // Array to store supported assets
    user_balances: [UserBalance; 1000], // Array to store user balances
    asset_count: Field,
    balance_count: Field,
}

// Initialize global state
fn init_state() -> GlobalState {
    GlobalState {
        protocol: ProtocolState {
            paused: 0,
            admin: 1, // Set initial admin
            fee_rate: 30, // 0.3% fee
        },
        assets: [Asset { 
            asset_id: 0, 
            balance: 0, 
            yield_rate: 0 
        }; 10],
        user_balances: [UserBalance {
            user: 0,
            asset: 0,
            amount: 0,
            last_update: 0
        }; 1000],
        asset_count: 0,
        balance_count: 0,
    }
}

// Main contract entry point
fn main(
    user: Field, 
    asset: Field, 
    amount: Field, 
    action: Field,
    current_time: Field
) -> pub GlobalState {
    let state = init_state();
    
    if action == 0 {
        // Deposit
        let new_balance = deposit(user, asset, amount, state.protocol, current_time);
        
        let mut new_state = state;
        new_state.user_balances[state.balance_count] = new_balance;
        new_state.balance_count += 1;
        
        new_state
    } else if action == 1 {
        // Withdraw
        // For simplicity, just return the state
        // In a real implementation, you would find the user balance and update it
        state
    } else if action == 2 {
        // Toggle pause
        let mut new_state = state;
        new_state.protocol = toggle_pause(user, state.protocol);
        new_state
    } else {
        // Default action: return unchanged state
        state
    }
}

#[test]
fn test_deposit() {
    // Initialize with action = 0 (deposit)
    let user_id = 123;
    let asset_id = 1;
    let amount = 1000;
    let action = 0;
    let current_time = 1000;
    
    // Call main function with deposit action
    let state = main(user_id, asset_id, amount, action, current_time);
    
    // Verify deposit was processed
    assert(state.balance_count == 1);
    assert(state.user_balances[0].user == user_id);
    assert(state.user_balances[0].asset == asset_id);
    assert(state.user_balances[0].amount == 997); // 1000 - 0.3% fee
}

#[test]
fn test_toggle_pause() {
    // Call main with admin user and toggle pause action
    let admin = 1;
    let action = 2;
    
    // Toggle pause
    let state = main(admin, 0, 0, action, 0);
    
    // Verify protocol is now paused
    assert(state.protocol.paused == 1);
} 