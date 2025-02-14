pub struct Asset {
    pub asset_id: Field,
    pub balance: Field,
    pub yield_rate: Field,
}

pub struct UserBalance {
    pub user: Field,
    pub asset: Field,
    pub amount: Field,
    pub last_update: Field,
}

pub struct ProtocolState {
    pub paused: Field, // 0 = active, 1 = paused
    pub admin: Field,
    pub fee_rate: Field,
}