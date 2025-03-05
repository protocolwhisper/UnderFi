use crate::core::ProtocolState;

pub fn toggle_pause(caller: Field, state: ProtocolState) -> ProtocolState {
    // Only admin can pause/unpause
    assert(caller == state.admin);
    
    ProtocolState {
        paused: 1 - state.paused, // Toggle between 0 and 1
        admin: state.admin,
        fee_rate: state.fee_rate,
    }
}