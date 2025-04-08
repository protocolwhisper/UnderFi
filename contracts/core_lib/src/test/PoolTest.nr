use dep::std::println;
use dep::std::test::{ test_suite, assert, assert_eq };
use dep::aztec::protocol_types::{address::AztecAddress};

use crate::core::Pool::{
    constructor, 
    deposit, 
    borrow, 
    get_pool_name, 
    get_pool_asset, 
    get_total_deposits, 
    get_total_borrows, 
    get_user_deposit, 
    get_user_borrow
};
use crate::token_contract::IERC20;

// Mock token and oracle for testing
mod mock {
    use dep::std::context::{ self_address, caller_address };
    
    global TOKEN_BALANCES: Field[Field]; // user => balance
    global TOTAL_SUPPLY: Field;
    
    pub fn setup_token(initial_supply: Field) {
        TOTAL_SUPPLY = initial_supply;
        TOKEN_BALANCES[self_address().to_field()] = initial_supply;
    }
    
    pub fn transfer_from(token: Field, from: Field, to: Field, amount: Field) -> bool {
        // For test purposes, just update balances
        TOKEN_BALANCES[from] -= amount;
        TOKEN_BALANCES[to] += amount;
        true
    }
    
    pub fn transfer(token: Field, from: Field, to: Field, amount: Field) -> bool {
        // For test purposes, just update balances
        TOKEN_BALANCES[from] -= amount;
        TOKEN_BALANCES[to] += amount;
        true
    }
    
    pub fn mint_test_tokens(user: Field, amount: Field) {
        TOKEN_BALANCES[user] += amount;
        TOTAL_SUPPLY += amount;
    }
    
    pub fn get_balance(user: Field) -> Field {
        TOKEN_BALANCES[user]
    }
    
    pub fn total_supply(token: Field) -> Field {
        TOTAL_SUPPLY
    }
}

// Mock the IERC20 calls that our Pool contract uses
impl IERC20 {
    pub fn transfer_from(token: Field, from: Field, to: Field, amount: Field) -> bool {
        mock::transfer_from(token, from, to, amount)
    }
    
    pub fn transfer(token: Field, from: Field, to: Field, amount: Field) -> bool {
        mock::transfer(token, from, to, amount)
    }
    
    pub fn total_supply(token: Field) -> Field {
        mock::total_supply(token)
    }
}

// Setup test context by mocking caller address
fn setup_test_context(user: Field) {
    // In a real test, we would mock the caller_address
    // For now, we'll just pretend the user is the caller
    // This would require actual Aztec runtime support
}

#[test]
fn test_pool_creation() {
    // Test data
    let name = 1234; // Example name as Field
    let asset = 5678; // Example asset address as Field
    let oracle = 9012; // Example oracle address as Field
    let admin = 3456; // Example admin address as Field
    
    // Initialize pool
    constructor(name, asset, oracle, admin);
    
    // Verify pool initialization
    assert_eq(get_pool_name(), name);
    assert_eq(get_pool_asset(), asset);
    assert_eq(get_total_deposits(), 0);
    assert_eq(get_total_borrows(), 0);
    
    println("Pool creation test passed!");
}

#[test]
fn test_deposit() {
    // Test data
    let name = 1234; // Example name as Field
    let asset = 5678; // Example asset address as Field
    let oracle = 9012; // Example oracle address as Field
    let admin = 3456; // Example admin address as Field
    let user = 7890; // Example user address as Field
    let deposit_amount = 1000; // Amount to deposit
    
    // Setup
    constructor(name, asset, oracle, admin);
    mock::setup_token(10000); // Setup token with initial supply
    mock::mint_test_tokens(user, 5000); // Give user some tokens
    
    // Set test context to simulate user call
    setup_test_context(user);
    
    // User performs deposit
    deposit(deposit_amount);
    
    // Verify deposit
    assert_eq(get_total_deposits(), deposit_amount);
    assert_eq(get_user_deposit(user), deposit_amount);
    
    println("Deposit test passed!");
}

#[test]
fn test_borrow() {
    // Test data
    let name = 1234; // Example name as Field
    let asset = 5678; // Example asset address as Field
    let oracle = 9012; // Example oracle address as Field
    let admin = 3456; // Example admin address as Field
    let user = 7890; // Example user address as Field
    let deposit_amount = 1000; // Amount to deposit
    let borrow_amount = 400; // Amount to borrow (40% of deposit)
    
    // Setup
    constructor(name, asset, oracle, admin);
    mock::setup_token(10000); // Setup token with initial supply
    mock::mint_test_tokens(user, 5000); // Give user some tokens
    
    // Set test context to simulate user call
    setup_test_context(user);
    
    // User performs deposit (need collateral to borrow)
    deposit(deposit_amount);
    
    // User performs borrow
    borrow(borrow_amount);
    
    // Verify borrow
    assert_eq(get_total_borrows(), borrow_amount);
    assert_eq(get_user_borrow(user), borrow_amount);
    
    println("Borrow test passed!");
}

#[test]
fn test_deposit_and_borrow_flow() {
    // Test data
    let name = 1234; // Example name as Field
    let asset = 5678; // Example asset address as Field
    let oracle = 9012; // Example oracle address as Field
    let admin = 3456; // Example admin address as Field
    let depositor = 7890; // Depositor address as Field
    let borrower = 5432; // Borrower address as Field
    let deposit_amount = 2000; // Amount to deposit
    let borrow_amount = 800; // Amount to borrow (40% of deposits)
    
    // Setup
    constructor(name, asset, oracle, admin);
    mock::setup_token(10000); // Setup token with initial supply
    mock::mint_test_tokens(depositor, 5000); // Give depositor some tokens
    mock::mint_test_tokens(borrower, 3000); // Give borrower some tokens
    
    // Depositor adds liquidity
    setup_test_context(depositor);
    deposit(deposit_amount);
    
    // Borrower deposits collateral and borrows
    setup_test_context(borrower);
    deposit(deposit_amount / 2); // Deposit half the amount
    borrow(borrow_amount);
    
    // Verify final state
    assert_eq(get_total_deposits(), deposit_amount + deposit_amount / 2);
    assert_eq(get_total_borrows(), borrow_amount);
    assert_eq(get_user_deposit(depositor), deposit_amount);
    assert_eq(get_user_deposit(borrower), deposit_amount / 2);
    assert_eq(get_user_borrow(borrower), borrow_amount);
    
    println("Complete flow test passed!");
} 