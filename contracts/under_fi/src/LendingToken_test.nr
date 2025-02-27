mod token_test {
    use crate::token::LendingToken;
    use dep::std::test;

    #[test]
    fn test_initialize() {
        let owner = 0x123;
        let initial_supply = 1000000;

        LendingToken::initialize(owner, initial_supply);

        assert(LendingToken::total_supply() == initial_supply);
        assert(LendingToken::balance_of(owner) == initial_supply);
    }

    #[test]
    fn test_token_info() {
        assert(LendingToken::name() == 0);
        assert(LendingToken::symbol() == 0);
        assert(LendingToken::decimals() == 18);
    }

    #[test]
    fn test_transfer() {
        let owner = 0x123;
        let user = 0x456;
        let initial_supply = 1000000;

        LendingToken::initialize(owner, initial_supply);

        let amount = 50000;
        let success = LendingToken::transfer(owner, user, amount);

        assert(success);
        assert(LendingToken::balance_of(owner) == initial_supply - amount);
        assert(LendingToken::balance_of(user) == amount);
    }

    #[test]
    fn test_approve_and_transfer_from() {
        let owner = 0x123;
        let spender = 0x456;
        let recipient = 0x789;
        let initial_supply = 1000000;

        LendingToken::initialize(owner, initial_supply);

        let amount = 50000;
        let success_approve = LendingToken::approve(owner, spender, amount);

        assert(success_approve);
        assert(LendingToken::allowance(owner, spender) == amount);

        let transfer_amount = 30000;
        let success_transfer =
            LendingToken::transfer_from(spender, owner, recipient, transfer_amount);

        assert(success_transfer);
        assert(LendingToken::balance_of(owner) == initial_supply - transfer_amount);
        assert(LendingToken::balance_of(recipient) == transfer_amount);
        assert(LendingToken::allowance(owner, spender) == amount - transfer_amount);
    }

    #[test]
    fn test_mint() {
        let owner = 0x123;
        let user = 0x456;
        let initial_supply = 1000000;

        LendingToken::initialize(owner, initial_supply);

        let mint_amount = 50000;
        let success = LendingToken::mint_by_owner(owner, user, mint_amount);

        assert(success);
        assert(LendingToken::total_supply() == initial_supply + mint_amount);
        assert(LendingToken::balance_of(user) == mint_amount);
    }

    #[test]
    fn test_burn() {
        let owner = 0x123;
        let initial_supply = 1000000;

        LendingToken::initialize(owner, initial_supply);

        let burn_amount = 50000;
        let success = LendingToken::burn(owner, burn_amount);

        assert(success);
        assert(LendingToken::total_supply() == initial_supply - burn_amount);
        assert(LendingToken::balance_of(owner) == initial_supply - burn_amount);
    }

    #[test]
    fn test_lending_functions() {
        let owner = 0x123;
        let borrower = 0x456;
        let initial_supply = 1000000;

        LendingToken::initialize(owner, initial_supply);

        let loan_amount = 50000;
        let success_loan = LendingToken::issue_loan(owner, borrower, loan_amount);

        assert(success_loan);
        assert(LendingToken::total_supply() == initial_supply + loan_amount);
        assert(LendingToken::balance_of(borrower) == loan_amount);

        let repay_amount = 30000;
        let success_repay = LendingToken::repay_loan(borrower, repay_amount);

        assert(success_repay);
        assert(LendingToken::total_supply() == initial_supply + loan_amount - repay_amount);
        assert(LendingToken::balance_of(borrower) == loan_amount - repay_amount);
    }
}
