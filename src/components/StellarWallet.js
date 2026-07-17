import React, { useState, useEffect } from 'react';
import { Horizon } from '@stellar/stellar-sdk';

const StellarWallet = ({ publicKey }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const server = new Horizon.Server('https://horizon-testnet.stellar.org');
        const account = await server.loadAccount(publicKey);
        
        const xlmBalance = account.balances.find(
          (b) => b.asset_type === 'native'
        );
        
        setBalance(xlmBalance ? xlmBalance.balance : '0');
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey]);

  if (loading) {
    return <div className="wallet-loading">Loading balance...</div>;
  }

  if (error) {
    return <div className="wallet-error">Error: {error}</div>;
  }

  return (
    <div className="stellar-wallet">
      <h3>Stellar Wallet</h3>
      <div className="wallet-balance">
        <span className="balance-label">XLM Balance:</span>
        <span className="balance-value">{balance} XLM</span>
      </div>
      <div className="wallet-address">
        <span className="address-label">Address:</span>
        <span className="address-value">{publicKey}</span>
      </div>
    </div>
  );
};

export default StellarWallet;
