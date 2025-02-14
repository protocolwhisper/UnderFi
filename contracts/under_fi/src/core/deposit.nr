use crate::core::{UserBalance, ProtocolState};

pub fn deposit(
    user: Field,
    asset: Field,
    amount: Field,
    state: ProtocolState,
    current_time: Field,
) -> UserBalance {
    // Check if protocol is not paused
    assert(state.paused == 0);

    // Calculate fees
    let fee_amount = (amount * state.fee_rate) / 10000;
    let net_amount = amount - fee_amount;

    UserBalance {
        user,
        asset,
        amount: net_amount,
        last_update: current_time,
    }
}

#[test]
fn test_deposit_with_timestamp() {
    let state = ProtocolState {
        paused: 0,
        admin: 1,
        fee_rate: 30,
    };

    let current_time = 1000;
    let deposit_result = deposit(1, 1, 1000, state, current_time);
    
    assert(deposit_result.amount == 997);
    assert(deposit_result.last_update == current_time);
}