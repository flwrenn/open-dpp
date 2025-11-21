# Digital Product Passport (DPP) - Technology Stack Specification

## Executive Summary

This document formalizes the technology stack for the Digital Product Passport (DPP) MVP. All choices prioritize **stability**, **industry alignment**, **open-source principles**, and **demonstrable value** for production readiness.

**Core Decision**: **EVM-compatible blockchain + ERC-721 standard**

This aligns with industry leaders (LVMH AURA, Arianee Protocol) and ensures:

- ✅ Broad ecosystem compatibility
- ✅ Proven security (OpenZeppelin implementations)
- ✅ Public verifiability and transparency
- ✅ Lower barrier to adoption

---

## 1. Blockchain Layer

### 1.1 Blockchain Platform

**Choice**: **Ethereum Virtual Machine (EVM) Compatible Chains**

**Rationale**:

- **Industry Standard**: Leading DPP implementations (Arianee, LVMH AURA) use EVM-based solutions
- **Interoperability**: EVM compatibility enables deployment across multiple chains (Ethereum, Polygon, Arbitrum, etc.)
- **Ecosystem Maturity**: Largest developer community, extensive tooling, and battle-tested security practices
- **Public Verifiability**: Anyone can independently verify product authenticity on blockchain explorers

**Alternatives Considered**:

| Alternative            | Pros                                                      | Cons                                                                                 | Decision                                                            |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **Hyperledger Fabric** | Private/permissioned, enterprise-focused, high throughput | Requires infrastructure management, limited public verifiability, less interoperable | ❌ Deferred (not suitable for open-source, publicly verifiable MVP) |
| **Solana**             | High speed, low fees                                      | Smaller DPP ecosystem, different programming model (Rust)                            | ❌ Not aligned with industry DPP standards                          |
| **Polkadot**           | Cross-chain capabilities                                  | Complexity overhead for MVP                                                          | ❌ Over-engineered for current scope                                |

---

### 1.2 Deployment Networks

#### Development Phase

**Primary Testnet**: **Sepolia**

**Rationale**:

- ✅ **Current Standard (2025)**: Recommended by Ethereum Foundation for application testing
- ✅ **Active Support**: Goerli testnet was deprecated in Q1 2024; Sepolia is the maintained alternative
- ✅ **Stability**: Permissioned validator set provides predictable network behavior
- ✅ **Efficiency**: Faster sync times, smaller storage requirements than deprecated testnets
- ✅ **Test ETH Availability**: Uncapped supply prevents artificial scarcity issues

**Backup Testnet**: **Holesky** (for protocol-level testing if needed)

#### Production Phase

**Primary Mainnet**: **Ethereum Mainnet**

**Rationale**:

- Highest security and decentralization
- Maximum public trust and verifiability
- Industry alignment (Arianee deployed on Ethereum)

**Future Scaling Options** (Post-MVP):

- **Polygon PoS**: Lower fees, EVM-compatible Layer 2
- **Arbitrum/Optimism**: Ethereum Layer 2 rollups for reduced gas costs
- **Base**: Coinbase-backed L2 with growing ecosystem

---

## 2. Smart Contract Layer

### 2.1 Token Standard

**Choice**: **ERC-721 (Non-Fungible Token)**

**Rationale**:

1. **Unique Product Identity**: Each physical product requires a unique, non-divisible digital representation
2. **Industry Proven**:
   - Arianee Protocol (1M+ DPP NFTs minted) built on ERC-721
   - LVMH AURA uses NFT-based product passports
3. **Ecosystem Compatibility**:
   - Supported by all major wallets (MetaMask, Coinbase Wallet, etc.)
   - Indexed by NFT marketplaces and explorers
   - Compatible with existing infrastructure
4. **Security**: Extensively audited implementations available (OpenZeppelin)
5. **Metadata Flexibility**: ERC-721 metadata standard supports extensible JSON schemas

**ERC-1155 Comparison**:

| Feature                         | ERC-721          | ERC-1155                  | DPP Requirement            |
| ------------------------------- | ---------------- | ------------------------- | -------------------------- |
| **Unique Product IDs**          | ✅ Native        | ⚠️ Requires configuration | ✅ Critical                |
| **Gas Efficiency (Batch Mint)** | ❌ Separate txs  | ✅ Single tx              | ⚠️ Nice-to-have (post-MVP) |
| **Ecosystem Support**           | ✅ Universal     | ⚠️ Growing                | ✅ Critical                |
| **DPP Industry Adoption**       | ✅ Arianee, AURA | ❌ Limited                | ✅ Important               |

**Decision**: ERC-721 for MVP. ERC-1155 may be considered post-MVP for batch manufacturing scenarios.

---

### 2.2 Smart Contract Language

**Choice**: **Solidity ^0.8.0**

**Rationale**:

- ✅ Official Ethereum smart contract language
- ✅ Version 0.8.0+ includes built-in overflow/underflow protection
- ✅ Extensive documentation and community support
- ✅ Compatible with industry-standard security tools (Slither, MythX)

**Version Strategy**:

- Use `^0.8.20` for development (current stable as of 2025)
- Pin exact version in production deployments for security

---

### 2.3 Contract Development Framework

**Choice**: **Hardhat**

**Rationale**:

- ✅ Industry-standard Ethereum development environment
- ✅ Built-in local blockchain (Hardhat Network)
- ✅ Comprehensive testing framework (Mocha/Chai integration)
- ✅ Plugin ecosystem (gas reporting, contract verification, etc.)
- ✅ TypeScript support (aligns with backend stack)

**Truffle Comparison**:

| Feature                | Hardhat     | Truffle               | Decision   |
| ---------------------- | ----------- | --------------------- | ---------- |
| **TypeScript Support** | ✅ Native   | ⚠️ Requires config    | ✅ Hardhat |
| **Local Network**      | ✅ Built-in | ✅ Ganache (separate) | ✅ Hardhat |
| **Plugin Ecosystem**   | ✅ Active   | ⚠️ Declining          | ✅ Hardhat |
| **Community Momentum** | ✅ Growing  | ⚠️ Stable/declining   | ✅ Hardhat |

---

### 2.4 Contract Libraries

**Choice**: **OpenZeppelin Contracts**

**Rationale**:

- ✅ Industry-standard secure implementations
- ✅ Extensively audited (millions in bug bounties)
- ✅ Modular and composable (inherit `ERC721`, `Ownable`, `AccessControl`)
- ✅ Actively maintained and updated

**Key Components**:

- `@openzeppelin/contracts/token/ERC721/ERC721.sol` - Base NFT implementation
- `@openzeppelin/contracts/access/AccessControl.sol` - Role-based permissions (manufacturer, repairer)
- `@openzeppelin/contracts/security/Pausable.sol` - Emergency pause functionality

---

## 3. Backend Layer

### 3.1 Backend Framework

**Choice**: **NestJS (Node.js + TypeScript)**

**Rationale**:

- ✅ Enterprise-grade architecture (modular, scalable, testable)
- ✅ TypeScript-native (type safety across entire stack)
- ✅ Built-in dependency injection and decorators
- ✅ Excellent for building RESTful APIs
- ✅ Strong Web3 integration ecosystem

**Express.js Comparison**:

| Aspect             | NestJS              | Express.js        | Decision                             |
| ------------------ | ------------------- | ----------------- | ------------------------------------ |
| **Structure**      | ✅ Opinionated MVC  | ❌ Minimal        | ✅ NestJS (better for team projects) |
| **TypeScript**     | ✅ Native           | ⚠️ Requires setup | ✅ NestJS                            |
| **Scalability**    | ✅ Built-in modules | ❌ Manual         | ✅ NestJS                            |
| **Learning Curve** | ⚠️ Steeper          | ✅ Easier         | ✅ NestJS (worth investment)         |

---

### 3.2 Web3 Library

**Choice**: **ethers.js v6**

**Rationale**:

- ✅ Modern, actively maintained (v6 released 2023)
- ✅ Smaller bundle size than Web3.js
- ✅ Better TypeScript support
- ✅ Human-readable ABIs and error handling
- ✅ Comprehensive documentation

**Web3.js Comparison**:

| Feature             | ethers.js             | Web3.js       | Decision     |
| ------------------- | --------------------- | ------------- | ------------ |
| **Bundle Size**     | ✅ 88KB               | ❌ 500KB+     | ✅ ethers.js |
| **TypeScript**      | ✅ Excellent          | ⚠️ Improving  | ✅ ethers.js |
| **Documentation**   | ✅ Comprehensive      | ⚠️ Fragmented | ✅ ethers.js |
| **Modern Features** | ✅ Async/await native | ⚠️ Mixed      | ✅ ethers.js |

---

### 3.3 API Design

**Choice**: **RESTful JSON API**

**Endpoints Structure**:

```
POST   /api/passports              # Create new passport (manufacturer only)
GET    /api/passports/:id          # Retrieve passport details (public)
POST   /api/passports/:id/transfer # Transfer ownership (owner only)
POST   /api/passports/:id/events   # Add repair/maintenance event (repairer only)
GET    /api/passports/:id/verify   # Verify authenticity (public)
GET    /api/passports/:id/history  # Get ownership/event history (public)
```

**Authentication Strategy**:

- Wallet-based authentication (verify Ethereum address signatures)
- No email/password for MVP (decentralized identity)
- Role verification via on-chain checks (manufacturer whitelist, NFT ownership)

**GraphQL Consideration**: Deferred to post-MVP (REST sufficient for MVP scope)

---

## 4. Frontend Layer

### 4.1 Frontend Framework

**Choice**: **Next.js 14+ (React)**

**Rationale**:

- ✅ React-based (industry standard for web3 apps)
- ✅ Server-Side Rendering (SSR) for SEO and performance
- ✅ File-based routing (simplified structure)
- ✅ Built-in API routes (can proxy backend calls)
- ✅ Excellent TypeScript support
- ✅ Vercel deployment integration

**Create React App Comparison**:

| Feature              | Next.js       | CRA                      | Decision   |
| -------------------- | ------------- | ------------------------ | ---------- |
| **SSR/SSG**          | ✅ Built-in   | ❌ Requires setup        | ✅ Next.js |
| **Routing**          | ✅ File-based | ⚠️ Requires React Router | ✅ Next.js |
| **Performance**      | ✅ Optimized  | ⚠️ Manual                | ✅ Next.js |
| **Production Ready** | ✅ Yes        | ⚠️ Ejection needed       | ✅ Next.js |

---

### 4.2 Styling Solution

**Choice**: **Tailwind CSS v3+**

**Rationale**:

- ✅ Utility-first approach (rapid prototyping)
- ✅ Highly customizable design system
- ✅ Excellent developer experience with IntelliSense
- ✅ Small production bundle (purges unused styles)
- ✅ Active community and plugin ecosystem

**Alternative Considerations**:

| Solution         | Pros                   | Cons                       | Decision              |
| ---------------- | ---------------------- | -------------------------- | --------------------- |
| **Tailwind CSS** | Fast, flexible, modern | Learning curve             | ✅ Chosen             |
| **Material-UI**  | Pre-built components   | Larger bundle, opinionated | ❌ Too heavy for MVP  |
| **Chakra UI**    | Accessibility-first    | Less customization         | ⚠️ Alternative option |
| **Vanilla CSS**  | Full control           | Slower development         | ❌ Not efficient      |

---

### 4.3 Web3 Integration

**Choice**: **ethers.js + wagmi (optional)**

**Wallet Connection**:

- **MetaMask** (primary) - most widely used Ethereum wallet
- **WalletConnect** (secondary) - mobile wallet support
- **Coinbase Wallet** (tertiary) - emerging standard

**Libraries**:

- `ethers.js` - Core blockchain interactions (read contract data, send transactions)
- `wagmi` (optional post-MVP) - React hooks for Ethereum (simplifies wallet connection, contract calls)

---

## 5. Storage & Data Layer

### 5.1 On-Chain vs Off-Chain Data

**Strategy**: **Hybrid Approach**

**On-Chain (Blockchain)**:

```solidity
struct Passport {
    uint256 tokenId;           // Unique NFT ID
    string productId;          // Serial number
    address currentOwner;      // Owner wallet
    address manufacturer;      // Creator wallet
    uint256 createdAt;         // Timestamp
    string metadataURI;        // IPFS hash
    bytes32 metadataHash;      // Integrity verification
}
```

**Off-Chain (IPFS/Database)**:

- Product images
- Detailed descriptions
- Manufacturer documents (certificates, manuals)
- Repair/maintenance history
- Sustainability metrics

**Rationale**:

- ⛽ **Gas Efficiency**: Storing large data on-chain is prohibitively expensive
- 🔒 **Integrity**: On-chain hash ensures off-chain data hasn't been tampered
- ♾️ **Flexibility**: Can update metadata off-chain without new blockchain transactions

---

### 5.2 Decentralized Storage

**Choice**: **IPFS (InterPlanetary File System)**

**Rationale**:

- ✅ Content-addressed (hash-based retrieval ensures immutability)
- ✅ Decentralized (no single point of failure)
- ✅ Industry standard for NFT metadata storage
- ✅ Compatible with NFT marketplaces (OpenSea, Rarible, etc.)

**Pinning Service** (to ensure availability):

- **Pinata** (recommended) - reliable, developer-friendly, generous free tier
- **Infura IPFS** - integrated with Ethereum infrastructure
- **Web3.Storage** - Protocol Labs-backed, free service

**Centralized Alternative (Hybrid)**:

- AWS S3 / Google Cloud Storage for redundancy
- Dual-publish: IPFS (primary) + Cloud (backup)

---

### 5.3 Indexing & Query Database

**Choice**: **PostgreSQL (Optional for MVP)**

**Purpose**:

- Fast queries (search passports by product ID, manufacturer, etc.)
- Aggregate analytics (total passports, transfer counts, etc.)
- Event history indexing (listen to blockchain events, store in DB)

**Rationale**:

- ✅ Reliable, mature, open-source
- ✅ Excellent JSON support (JSONB columns for flexible metadata)
- ✅ Can be added incrementally (not critical for MVP launch)

**Alternative**: No database initially - query blockchain directly for MVP (acceptable latency)

**Event Indexing Tools** (Post-MVP):

- **The Graph** - Decentralized indexing protocol (GraphQL APIs)
- **Moralis** - Managed blockchain indexing service

---

## 6. Development & Infrastructure

### 6.1 Containerization

**Choice**: **Docker + Docker Compose**

**Rationale**:

- ✅ Reproducible environments (dev/staging/prod parity)
- ✅ Simplified deployment (single `docker-compose up` command)
- ✅ Isolated services (frontend, backend, database, IPFS node)

**Container Structure**:

```
docker-compose.yml
├── contracts/       # Hardhat local node
├── backend/         # NestJS API server
├── frontend/        # Next.js app
├── postgres/        # PostgreSQL database (optional)
└── ipfs/            # IPFS node (or use remote service)
```

---

### 6.2 Version Control & Collaboration

**Choice**: **Git + GitHub**

**Branching Strategy**: **GitHub Flow** (simplified Git Flow)

- `main` - production-ready code
- `develop` - integration branch
- Feature branches: `feature/passport-creation`, `fix/transfer-bug`, etc.

**CI/CD**: **GitHub Actions**

**Pipelines**:

1. **Smart Contracts**:
   - Compile contracts
   - Run unit tests (`npx hardhat test`)
   - Gas usage reports
   - Security linting (Slither)

2. **Backend**:
   - Lint TypeScript
   - Run unit tests (Jest)
   - Run integration tests

3. **Frontend**:
   - Lint TypeScript/React
   - Build Next.js app
   - Run E2E tests (Playwright/Cypress - post-MVP)

---

### 6.3 Security & Auditing Tools

**Smart Contract Security**:

| Tool                      | Purpose                                  | Phase           |
| ------------------------- | ---------------------------------------- | --------------- |
| **Slither**               | Static analysis (detect vulnerabilities) | Development     |
| **MythX**                 | Security scanning                        | Pre-deployment  |
| **Hardhat Coverage**      | Test coverage reports                    | Development     |
| **OpenZeppelin Defender** | Automated monitoring                     | Post-deployment |

**Backend/Frontend Security**:

- **Dependabot** - Automated dependency updates
- **npm audit** - Vulnerability scanning
- **ESLint Security Plugin** - Code security linting

---

## 7. Third-Party Services

### 7.1 Blockchain Infrastructure

**Choice**: **Infura or Alchemy**

**Purpose**: Ethereum node access (no need to run own node)

**Comparison**:

| Feature             | Infura          | Alchemy                          | Decision                   |
| ------------------- | --------------- | -------------------------------- | -------------------------- |
| **Reliability**     | ✅ High         | ✅ High                          | ✅ Either                  |
| **Free Tier**       | ✅ 100k req/day | ✅ 300M units/month              | ✅ Alchemy (more generous) |
| **Developer Tools** | ⚠️ Basic        | ✅ Advanced (Composer, Explorer) | ✅ Alchemy                 |
| **Web3 Reputation** | ✅ Established  | ✅ Growing                       | ✅ Alchemy (slight edge)   |

**Recommendation**: **Alchemy** for development, consider multi-provider redundancy for production.

---

### 7.2 QR Code Generation

**Choice**: **qrcode (npm package)**

**Purpose**: Generate QR codes for physical product labels (encode passport URL)

**Alternative**: `react-qr-code` for frontend-rendered QR codes

---

## 8. Testing Strategy

### 8.1 Smart Contract Testing

**Framework**: **Hardhat + Chai + ethers.js**

**Test Types**:

1. **Unit Tests**: Test individual contract functions
2. **Integration Tests**: Test contract interactions
3. **Gas Usage Tests**: Ensure efficiency
4. **Security Tests**: Test access control, edge cases

**Coverage Target**: >90% for smart contracts (critical code)

---

### 8.2 Backend Testing

**Framework**: **Jest (NestJS default)**

**Test Types**:

1. **Unit Tests**: Service/controller logic
2. **Integration Tests**: API endpoints (with mocked blockchain)
3. **E2E Tests**: Full flow (contract + backend)

**Coverage Target**: >80%

---

### 8.3 Frontend Testing

**Framework**: **Jest + React Testing Library** (MVP)

**Post-MVP**: Playwright or Cypress for E2E tests

**Test Types**:

1. **Component Tests**: UI rendering
2. **Integration Tests**: User interactions
3. **E2E Tests**: Full user flows (create passport, transfer, etc.)

---

## 9. Deployment Strategy

### 9.1 Development Environment

**Setup**:

1. Local Hardhat network (ephemeral blockchain)
2. NestJS backend on `localhost:3000`
3. Next.js frontend on `localhost:3001`
4. Local IPFS node or Pinata dev account

---

### 9.2 Staging Environment

**Setup**:

1. Sepolia testnet (contracts deployed, verified on Etherscan)
2. Backend on Render/Railway (free tier)
3. Frontend on Vercel (free tier)
4. Pinata IPFS pinning service

---

### 9.3 Production Environment

**Setup**:

1. Ethereum Mainnet (or Polygon for lower fees)
2. Backend on AWS/Google Cloud (scalable infrastructure)
3. Frontend on Vercel Pro (CDN, edge functions)
4. Multi-region IPFS pinning (Pinata + backup)
5. PostgreSQL on managed service (AWS RDS, Supabase)

---

## 10. Technology Decision Matrix

### Summary Table

| Component                 | Technology       | Alternative Considered | Rationale                                |
| ------------------------- | ---------------- | ---------------------- | ---------------------------------------- |
| **Blockchain**            | Ethereum (EVM)   | Hyperledger Fabric     | Public verifiability, industry alignment |
| **Testnet**               | Sepolia          | Goerli (deprecated)    | Current standard, stability              |
| **Token Standard**        | ERC-721          | ERC-1155               | Unique products, ecosystem support       |
| **Smart Contract Lang**   | Solidity ^0.8.20 | Vyper                  | Industry standard, tooling               |
| **Contract Framework**    | Hardhat          | Truffle                | Modern, TypeScript support               |
| **Contract Library**      | OpenZeppelin     | Custom                 | Security, audits                         |
| **Backend Framework**     | NestJS           | Express.js             | Enterprise-grade, TypeScript             |
| **Web3 Library**          | ethers.js v6     | Web3.js                | Modern, lightweight                      |
| **Frontend Framework**    | Next.js 14+      | Create React App       | SSR, routing, production-ready           |
| **Styling**               | Tailwind CSS     | Material-UI            | Flexibility, performance                 |
| **Decentralized Storage** | IPFS (Pinata)    | Arweave                | Standard, cost-effective                 |
| **Database**              | PostgreSQL       | MongoDB                | Reliability, JSON support                |
| **Containerization**      | Docker           | N/A                    | Reproducibility                          |
| **CI/CD**                 | GitHub Actions   | GitLab CI              | Integration with GitHub                  |
| **Node Provider**         | Alchemy          | Infura                 | Developer tools, free tier               |

---

## 11. Out of Scope (Post-MVP)

The following technologies are **NOT** included in MVP but may be considered in future iterations:

### 11.1 Layer 2 Scaling

- ❌ Polygon PoS deployment (wait for mainnet traffic analysis)
- ❌ Arbitrum/Optimism rollups (complexity not justified yet)
- ❌ zkSync/Starknet (emerging tech, higher risk)

---

### 11.2 Advanced Blockchain Features

- ❌ Gasless transactions (meta-transactions) - adds complexity
- ❌ Multi-chain bridge contracts - scope creep
- ❌ DAO governance for protocol upgrades - premature
- ❌ Native token economics - not required for DPP

---

### 11.3 Enterprise Integrations

- ❌ ERP system integration (SAP, Oracle) - niche use case
- ❌ Supply chain APIs (multiple providers) - varies by industry
- ❌ IoT sensor integration - hardware dependency

---

### 11.4 Advanced Infrastructure

- ❌ Kubernetes orchestration - Docker Compose sufficient for MVP
- ❌ Microservices architecture - monolith adequate for scale
- ❌ GraphQL API - REST simpler, sufficient

---

## 12. Industry Alignment & References

### 12.1 Comparable Implementations

| Project               | Blockchain              | Standard    | Similarity to Our Stack           |
| --------------------- | ----------------------- | ----------- | --------------------------------- |
| **Arianee Protocol**  | Ethereum (multi-EVM)    | ERC-721     | ✅ Identical approach             |
| **LVMH AURA**         | Quorum (Ethereum-based) | NFT-based   | ✅ Similar (permissioned variant) |
| **VeChain ToolChain** | VeChain                 | Proprietary | ❌ Different blockchain           |
| **IBM Food Trust**    | Hyperledger Fabric      | N/A         | ❌ Private/permissioned           |

**Conclusion**: Our stack aligns with **Arianee**, the most widely adopted open-source DPP protocol.

---

### 12.2 Regulatory Alignment

**EU Digital Product Passport Regulation** (expected 2027):

- ✅ Requires interoperability → EVM/ERC-721 ensures compatibility
- ✅ Requires transparency → Public blockchain fulfills requirement
- ✅ Requires data integrity → On-chain hashes + IPFS provides verification
- ✅ Requires lifecycle tracking → Event history model supports this

**GDPR Compliance**:

- ⚠️ Right to be forgotten conflicts with blockchain immutability
- ✅ Mitigation: Store personal data off-chain (encrypted), only hashes on-chain

---

## 13. Risk Assessment

### 13.1 Technical Risks

| Risk                            | Impact | Mitigation                                                |
| ------------------------------- | ------ | --------------------------------------------------------- |
| **Smart contract bug**          | High   | Use OpenZeppelin, extensive testing, audit before mainnet |
| **Gas fees spike**              | Medium | Start on testnet, consider L2 post-MVP                    |
| **IPFS data unavailability**    | Medium | Use reliable pinning service, backup to cloud             |
| **Ethereum network congestion** | Low    | Accept slower confirmation times, educate users           |

---

### 13.2 Adoption Risks

| Risk                          | Impact | Mitigation                                         |
| ----------------------------- | ------ | -------------------------------------------------- |
| **Wallet friction**           | Medium | Provide clear onboarding, support multiple wallets |
| **Blockchain learning curve** | Medium | Abstract complexity in UI, provide documentation   |
| **Cost perception**           | Low    | Highlight testnet (free), show gas estimates       |

---

## 14. Success Metrics

The technology stack is considered successful if it enables:

1. ✅ **Passport creation** in under 1 minute (including IPFS upload)
2. ✅ **Ownership transfer** confirmed within 2 minutes (Sepolia block time)
3. ✅ **Passport lookup** loads in under 3 seconds (including IPFS fetch)
4. ✅ **Zero critical vulnerabilities** in smart contracts (audit/security scan)
5. ✅ **90%+ uptime** for backend API and IPFS pinning
6. ✅ **Supports 100+ passports** without performance degradation
7. ✅ **Deployable with single command** (`docker-compose up`)

---

## 15. Next Steps

### Immediate (Pre-Development)

- [ ] Set up development environment (Hardhat, NestJS, Next.js)
- [ ] Initialize GitHub repository with folder structure
- [ ] Configure CI/CD pipelines (GitHub Actions)
- [ ] Obtain API keys (Alchemy, Pinata)
- [ ] Deploy "Hello World" contract to Sepolia (verify toolchain)

### Phase 1 (Smart Contracts)

- [ ] Implement ERC-721 passport contract with OpenZeppelin
- [ ] Write comprehensive unit tests (>90% coverage)
- [ ] Deploy to Sepolia testnet
- [ ] Verify contract on Etherscan

### Phase 2 (Backend)

- [ ] Set up NestJS project with ethers.js
- [ ] Implement API endpoints (create, read, transfer, events)
- [ ] Integrate IPFS (Pinata) for metadata storage
- [ ] Add wallet signature verification

### Phase 3 (Frontend)

- [ ] Set up Next.js with Tailwind CSS
- [ ] Implement wallet connection (MetaMask)
- [ ] Build passport creation/viewing UI
- [ ] Add transfer and event logging features

### Phase 4 (Integration & Testing)

- [ ] End-to-end testing of full stack
- [ ] Security review and fixes
- [ ] Documentation finalization
- [ ] Demo deployment

---

## 16. Conclusion

This technology stack represents a **modern, secure, and industry-aligned** foundation for the Digital Product Passport MVP. By choosing EVM + ERC-721, we align with:

- ✅ **Industry leaders** (Arianee, LVMH AURA)
- ✅ **Open-source principles** (public blockchain, audited libraries)
- ✅ **Production readiness** (battle-tested technologies)
- ✅ **Future scalability** (L2 options, multi-chain potential)

All decisions prioritize **simplicity without sacrificing quality**, ensuring the MVP can be delivered efficiently while maintaining professional standards suitable for portfolio demonstration and real-world applicability.

---

## 17. References

1. **Arianee Protocol**: [https://www.arianee.org/protocol](https://www.arianee.org/protocol)
2. **LVMH AURA Blockchain**: [https://www.coindesk.com/markets/2019/03/26/louis-vuitton-owner-lvmh-is-launching-a-blockchain-to-track-luxury-goods](https://www.coindesk.com/markets/2019/03/26/louis-vuitton-owner-lvmh-is-launching-a-blockchain-to-track-luxury-goods)
3. **ERC-721 Standard**: [https://eips.ethereum.org/EIPS/eip-721](https://eips.ethereum.org/EIPS/eip-721)
4. **OpenZeppelin Contracts**: [https://docs.openzeppelin.com/contracts/](https://docs.openzeppelin.com/contracts/)
5. **Ethereum Sepolia Testnet**: [https://ethereum.org/en/developers/docs/networks/#sepolia](https://ethereum.org/en/developers/docs/networks/#sepolia)
6. **Hardhat Documentation**: [https://hardhat.org/docs](https://hardhat.org/docs)
7. **ethers.js Documentation**: [https://docs.ethers.org/v6/](https://docs.ethers.org/v6/)
8. **IPFS Documentation**: [https://docs.ipfs.tech/](https://docs.ipfs.tech/)
9. **EU Digital Product Passport Observatory**: [https://blockchain-observatory.ec.europa.eu/](https://blockchain-observatory.ec.europa.eu/)
10. **NestJS Documentation**: [https://docs.nestjs.com/](https://docs.nestjs.com/)

---
