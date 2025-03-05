use crate::core::{UserBalance, ProtocolState};

pub fn withdraw(
    user: Field,
    asset: Field,
    amount: Field,
    balance: UserBalance,
    state: ProtocolState,
) {
    // Check if protocol is not paused
    assert(state.paused == 0);
    
    // Verify user owns the balance
    assert(balance.user == user);
    assert(balance.asset == asset);
    
    // Check sufficient balance
    let balance_int = balance.amount as u64;
    let amount_int = amount as u64;
    assert(balance_int >= amount_int);
}

#[test]
fn test_withdraw_success() {
    let state = ProtocolState {
        paused: 0,
        admin: 1,
        fee_rate: 30,
    };

    let balance = UserBalance {
        user: 1,
        asset: 1,
        amount: 1000,
        last_update: 100,
    };

    withdraw(1, 1, 500, balance, state);
}