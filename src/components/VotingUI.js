import React, { useState } from 'react';

const VotingUI = ({ reportId, onVote }) => {
  const [votes, setVotes] = useState({
    confirm: 0,
    deny: 0,
    suspicious: 0
  });
  const [userVote, setUserVote] = useState(null);

  const handleVote = async (type) => {
    if (userVote) return;
    try {
      await onVote(reportId, type);
      setVotes(prev => ({ ...prev, [type]: prev[type] + 1 }));
      setUserVote(type);
    } catch (error) {
      console.error('Vote failed:', error);
    }
  };

  const getVotePercentage = (type) => {
    const total = votes.confirm + votes.deny + votes.suspicious;
    if (total === 0) return 0;
    return Math.round((votes[type] / total) * 100);
  };

  return (
    <div className="voting-ui">
      <h4>Community Verification</h4>
      <p>Is this report accurate?</p>
      <div className="vote-buttons">
        <button className={`vote-btn confirm ${userVote === 'confirm' ? 'active' : ''}`}
          onClick={() => handleVote('confirm')} disabled={!!userVote}>
          Confirm ({votes.confirm})
        </button>
        <button className={`vote-btn deny ${userVote === 'deny' ? 'active' : ''}`}
          onClick={() => handleVote('deny')} disabled={!!userVote}>
          Deny ({votes.deny})
        </button>
        <button className={`vote-btn suspicious ${userVote === 'suspicious' ? 'active' : ''}`}
          onClick={() => handleVote('suspicious')} disabled={!!userVote}>
          Suspicious ({votes.suspicious})
        </button>
      </div>
      <div className="vote-results">
        <div className="result-bar">
          <div className="confirm-bar" style={{ width: `${getVotePercentage('confirm')}%` }} />
          <div className="deny-bar" style={{ width: `${getVotePercentage('deny')}%` }} />
          <div className="suspicious-bar" style={{ width: `${getVotePercentage('suspicious')}%` }} />
        </div>
      </div>
    </div>
  );
};

export default VotingUI;
