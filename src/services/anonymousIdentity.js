import crypto from 'crypto';

export class AnonymousIdentity {
  constructor() {
    this.sessionId = this.generateSessionId();
  }

  generateSessionId() {
    return crypto.randomBytes(16).toString('hex');
  }

  generateAnonymousId() {
    const hash = crypto.createHash('sha256');
    hash.update(this.sessionId + Date.now().toString());
    return hash.digest('hex').substring(0, 16);
  }

  createReport(reportData) {
    return {
      ...reportData,
      anonymousId: this.generateAnonymousId(),
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      verified: false
    };
  }

  verifyReport(report) {
    return {
      ...report,
      verified: true,
      verifiedAt: new Date().toISOString()
    };
  }
}

export default new AnonymousIdentity();
