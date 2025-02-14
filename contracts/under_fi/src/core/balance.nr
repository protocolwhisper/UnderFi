use crate::core::UserBalance;

pub fn update_balance(
    old_balance: UserBalance,
    amount: Field,
    is_deposit: Field, // 1 for deposit, 0 for withdrawal
) -> UserBalance {
    let new_amount = if is_deposit == 1 {
        old_balance.amount + amount
    } else {
        old_balance.amount - amount
    };

    UserBalance {
        user: old_balance.user,
        asset: old_balance.asset,
        amount: new_amount,
        last_update: old_balance.last_update,
    }
}