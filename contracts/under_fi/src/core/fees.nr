pub fn calculate_fees(amount: Field, fee_rate: Field) -> Field {
    // Fee rate in basis points (1/10000)
    (amount * fee_rate) / 10000
}