# CrimeReport Developer Setup Guide

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git for version control
- Stellar CLI (for Soroban smart contracts)
- Docker (optional, for local database)

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/stellar-crime-report/CrimeReport.git
cd CrimeReport

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Start development server
npm run dev
```

## Project Structure

```
CrimeReport/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript types
├── contracts/              # Soroban smart contracts
├── public/                 # Static assets
├── tests/                  # Test files
└── docs/                   # Documentation
```

## Configuration

### Environment Variables

```env
# Stellar Configuration
STELLAR_NETWORK=stellar-testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org

# Database (if using)
DATABASE_URL=postgresql://user:pass@localhost:5432/crime_report

# API Keys
MAPBOX_TOKEN=your_mapbox_token
```

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "CrimeReport"
```

## Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Additional Resources

- [Stellar Documentation](https://developers.stellar.org)
- [Soroban Documentation](https://soroban.stellar.org)

## Troubleshooting

### Common Issues

**Issue: Port 3000 already in use**
```bash
lsof -i :3000
kill -9 <PID>
```

**Issue: Stellar CLI not found**
```bash
curl -sS https://dist.stellar.org/stellar-cli/install.sh | bash
```
