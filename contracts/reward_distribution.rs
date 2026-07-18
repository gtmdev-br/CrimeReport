use soroban_sdk::{contractimpl, contracttype, Address, Env, Symbol};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    RewardPool,
    TotalDistributed,
}

#[derive(Clone)]
#[contracttype]
pub struct RewardInfo {
    pub reporter: Address,
    pub amount: i128,
    pub report_id: Symbol,
    pub timestamp: i64,
}

#[contract]
pub struct RewardDistribution;

#[contractimpl]
impl RewardDistribution {
    pub fn initialize(env: Env) {
        env.storage().set(&DataKey::RewardPool, &0i128);
        env.storage().set(&DataKey::TotalDistributed, &0i128);
    }

    pub fn fund_pool(env: Env, amount: i128) {
        let mut pool: i128 = env.storage().get(&DataKey::RewardPool).unwrap_or(0);
        pool += amount;
        env.storage().set(&DataKey::RewardPool, &pool);
    }

    pub fn distribute_reward(
        env: Env,
        reporter: Address,
        amount: i128,
        report_id: Symbol,
    ) -> RewardInfo {
        let mut pool: i128 = env.storage().get(&DataKey::RewardPool).unwrap_or(0);
        assert!(pool >= amount, "Insufficient reward pool");

        pool -= amount;
        env.storage().set(&DataKey::RewardPool, &pool);

        let mut total: i64 = env.storage().get(&DataKey::TotalDistributed).unwrap_or(0);
        total += amount as i64;
        env.storage().set(&DataKey::TotalDistributed, &total);

        RewardInfo {
            reporter,
            amount,
            report_id,
            timestamp: env.ledger().timestamp(),
        }
    }

    pub fn get_pool_balance(env: Env) -> i128 {
        env.storage().get(&DataKey::RewardPool).unwrap_or(0)
    }
}
