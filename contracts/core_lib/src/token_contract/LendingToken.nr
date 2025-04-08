mod LendingToken {
    use dep::std::hash::pedersen;
    use dep::std::option::Option;

    struct TokenInfo {
        name: Field,
        symbol: Field,
        decimals: u8,
        total_supply: u64,
    }

    // Contract storage
    global TOKEN_INFO: TokenInfo = TokenInfo { name: 0, symbol: 0, decimals: 18, total_supply: 0 };

    global balances: [u64; 1024] = [0; 1024];
    global allowances: [u64; 1024] = [0; 1024];
    global owner: Field = 0; // Owner address

    fn only_owner(caller: Field) {
        assert(caller == owner, "Only owner can call this function");
    }

    fn initialize(initial_owner: Field, initial_supply: u64) {
        owner = initial_owner;

        if initial_supply > 0 {
            mint(initial_owner, initial_supply);
        }
    }

    pub fn name() -> Field {
        TOKEN_INFO.name
    }

    pub fn symbol() -> Field {
        TOKEN_INFO.symbol
    }

    pub fn decimals() -> u8 {
        TOKEN_INFO.decimals
    }

    pub fn total_supply() -> u64 {
        TOKEN_INFO.total_supply
    }

    fn hash_address(address: Field) -> u64 {
        // Use Pedersen hash for secure mapping
        let hash_result = pedersen::hash([address]);
        // Converting the hash to an index within our array bounds
        hash_result % 1024
    }

    fn hash_addresses(owner: Field, spender: Field) -> u64 {
        // Combine the addresses and hash them
        let combined = pedersen::hash([owner, spender]);
        // Converting the hash to an index within our array bounds just as I did above
        combined % 1024
    }

    pub fn balance_of(account: Field) -> u64 {
        let account_index = hash_address(account);
        balances[account_index]
    }

    pub fn allowance(owner: Field, spender: Field) -> u64 {
        let index = hash_addresses(owner, spender);
        allowances[index]
    }

    pub fn transfer(caller: Field, recipient: Field, amount: u64) -> bool {
        assert(caller != 0, "Transfer from zero address");
        assert(recipient != 0, "Transfer to zero address");

        let caller_balance = balance_of(caller);
        assert(caller_balance >= amount, "Transfer amount exceeds balance");

        let caller_index = hash_address(caller);
        balances[caller_index] = caller_balance - amount;

        let recipient_index = hash_address(recipient);
        balances[recipient_index] = balance_of(recipient) + amount;

        true
    }

    pub fn approve(caller: Field, spender: Field, amount: u64) -> bool {
        assert(caller != 0, "Approve from zero address");
        assert(spender != 0, "Approve to zero address");

        let index = hash_addresses(caller, spender);
        allowances[index] = amount;

        true
    }

    pub fn transfer_from(caller: Field, sender: Field, recipient: Field, amount: u64) -> bool {
        assert(sender != 0, "Transfer from zero address");
        assert(recipient != 0, "Transfer to zero address");

        let current_allowance = allowance(sender, caller);
        assert(current_allowance >= amount, "Transfer amount exceeds allowance");

        let sender_balance = balance_of(sender);
        assert(sender_balance >= amount, "Transfer amount exceeds balance");

        let sender_index = hash_address(sender);
        balances[sender_index] = sender_balance - amount;

        let recipient_index = hash_address(recipient);
        balances[recipient_index] = balance_of(recipient) + amount;

        let allowance_index = hash_addresses(sender, caller);
        allowances[allowance_index] = current_allowance - amount;

        true
    }

    pub fn mint(to: Field, amount: u64) -> bool {
        assert(to != 0, "Mint to zero address");

        TOKEN_INFO.total_supply += amount;

        let to_index = hash_address(to);
        balances[to_index] += amount;

        true
    }

    pub fn mint_by_owner(caller: Field, to: Field, amount: u64) -> bool {
        only_owner(caller);
        mint(to, amount)
    }

    pub fn burn(caller: Field, amount: u64) -> bool {
        assert(caller != 0, "Burn from zero address");

        let caller_balance = balance_of(caller);
        assert(caller_balance >= amount, "Burn amount exceeds balance");

        let caller_index = hash_address(caller);
        balances[caller_index] = caller_balance - amount;
        TOKEN_INFO.total_supply -= amount;

        true
    }

    pub fn issue_loan(caller: Field, borrower: Field, amount: u64) -> bool {
        only_owner(caller);
        mint(borrower, amount)
    }

    pub fn repay_loan(borrower: Field, amount: u64) -> bool {
        burn(borrower, amount)
    }
}
