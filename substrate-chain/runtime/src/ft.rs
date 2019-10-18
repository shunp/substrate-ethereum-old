use support::{decl_storage, decl_module, decl_event, dispatch::Result, ensure, StorageMap, StorageValue};
use parity_codec::{Decode, Encode};
use rstd::prelude::Vec;
use system::{self, ensure_signed};
use runtime_primitives::traits::{Zero};

#[derive(Encode, Decode, Default, Clone, PartialEq)]
#[cfg_attr(feature = "std", derive(Debug))]
pub struct FT {
    pub id: TokenId,
    pub decimal: u16,
    pub symbol: Vec<u8>,
}

pub trait Trait: balances::Trait + system::Trait {
    type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
}

type TokenBalance = u64;
type TokenId = u32;

decl_event! (
    pub enum Event<T>
    where
        AccountId = <T as system::Trait>::AccountId,
        {
            Transfer(AccountId, AccountId, TokenBalance),
        }
);

decl_storage! {
    trait Store for Module<T: Trait> as Ft {
        Balance get(balance_of): map T::AccountId => TokenBalance;
        TotalSupply get(total_supply): TokenBalance;
        Allowance get(allowance_of): map (T::AccountId, T::AccountId) => TokenBalance;
    }
}

decl_module! {
    pub struct Module<T: Trait> for enum Call where origin: T::Origin {
        fn deposit_event<T>() = default;

        fn transfer_from(origin, from: T::AccountId, to: T::AccountId, #[compact] value: TokenBalance) -> Result {
            let sender = ensure_signed(origin)?;
            Ok(())
        }
    }
}

impl<T: Trait> Module<T> {
    pub fn _mint(to: T::AccountId, amount: TokenBalance) -> Result {
        ensure!(!amount.is_zero(), "amount should be non-zero");
        let old_balance = <Balance<T>>::get(to.clone());
        let next_balance = old_balance
            .checked_add(amount)
            .ok_or("overflow adding to balance")?;
        let next_total = Self::total_supply()
            .checked_add(amount)
            .ok_or("overflow adding to total supply")?;
        
        <Balance<T>>::insert(to.clone(), next_balance);
        <TotalSupply<T>>::put(next_total);

        Ok(())
    }

    fn make_transfer(from: T::AccountId, to: T::AccountId, amount: TokenBalance) -> Result {
        let from_balance = <Balance<T>>::get(&from);
        // TODO
        Self::deposit_event(RawEvent::Transfer(from, to, amount));
        Ok(())
    }
}