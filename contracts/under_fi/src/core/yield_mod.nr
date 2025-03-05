pub fn calculate_yield(
    balance: Field,
    yield_rate: Field,
    time_elapsed: Field,
) -> Field {
    // Calculate yield: balance * rate * time / (10000 * 365)
    let yield_amount = (balance * yield_rate * time_elapsed) / (10000 * 365);
    yield_amount
}

#[test]
fn test_yield_calculation() {
    let balance = 1000;
    let yield_rate = 500; // 5% in basis points
    let time_elapsed = 365;
    
    let yield_amount = calculate_yield(balance, yield_rate, time_elapsed);
    assert(yield_amount == 50); // 5% of 1000 = 50
}