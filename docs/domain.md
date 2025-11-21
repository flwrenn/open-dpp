# Digital Product Passport (DPP) - Domain Specification

## Overview

The Digital Product Passport (DPP) is a digital identity card attached to a physical product throughout its entire lifecycle. It provides verifiable traceability and authenticity for products, tracking origin, composition, ownership, and maintenance history.

This specification defines the **Minimum Viable Product (MVP)** scope for an open-source DPP implementation.

---

## 1. What is a Passport?

### 1.1 Core Concept

A **Digital Product Passport** is:

- A unique, non-fungible token (NFT) representing a physical product
- An immutable record of product identity and ownership on the blockchain
- A link to comprehensive product metadata stored off-chain
- A verifiable proof of authenticity and provenance

### 1.2 MVP Passport Data Structure

#### On-Chain Data (Stored in Smart Contract)

```solidity
struct Passport {
    uint256 tokenId;           // Unique NFT identifier
    string productId;          // Manufacturer's product serial number
    address currentOwner;      // Current owner's wallet address
    address manufacturer;      // Original manufacturer's address
    uint256 createdAt;         // Timestamp of passport creation
    string metadataURI;        // IPFS URI to detailed metadata
    bytes32 metadataHash;      // Hash of metadata for integrity verification
}
```

**Key Fields:**

- `tokenId`: Unique identifier for the NFT (auto-incremented)
- `productId`: Human-readable product identifier (e.g., serial number, SKU)
- `currentOwner`: Ethereum address of the current product owner
- `manufacturer`: Ethereum address of the entity that created the passport
- `createdAt`: Unix timestamp when the passport was minted
- `metadataURI`: IPFS hash or URL pointing to detailed product information
- `metadataHash`: SHA-256 hash of metadata content for tamper detection

#### Off-Chain Metadata (Stored on IPFS/Database)

```json
{
  "name": "Product Name",
  "description": "Detailed product description",
  "image": "ipfs://QmHash.../image.jpg",
  "attributes": {
    "category": "Electronics | Luxury | Textile | etc.",
    "brand": "Brand Name",
    "model": "Model Number",
    "manufacturingDate": "2025-01-15",
    "materials": ["Material 1", "Material 2"],
    "weight": "500g",
    "color": "Black",
    "dimensions": "10x10x5 cm"
  },
  "manufacturer": {
    "name": "Company Name",
    "location": "Country",
    "certification": "ISO 9001"
  },
  "sustainability": {
    "carbonFootprint": "5kg CO2e",
    "recyclable": true,
    "certifications": ["Fair Trade", "Organic"]
  },
  "documents": [
    {
      "type": "manual",
      "url": "ipfs://QmHash.../manual.pdf"
    },
    {
      "type": "certificate",
      "url": "ipfs://QmHash.../cert.pdf"
    }
  ],
  "history": [
    {
      "eventType": "created",
      "timestamp": "2025-01-15T10:00:00Z",
      "actor": "0x123...",
      "description": "Passport created by manufacturer"
    }
  ]
}
```

**Key Metadata Sections:**

- **Basic Info**: Name, description, images
- **Attributes**: Product-specific characteristics (extensible)
- **Manufacturer**: Origin and certification information
- **Sustainability**: Environmental impact data
- **Documents**: Manuals, certificates, warranty documents
- **History**: Timeline of events (creation, transfers, repairs)

### 1.3 Passport Lifecycle States

```
┌─────────────┐
│   MINTED    │  Initial state: created by manufacturer
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   ACTIVE    │  Normal state: can be transferred, updated
└──────┬──────┘
       │
       ├──► TRANSFERRED (event, stays ACTIVE)
       │
       └──► REPAIRED (event, stays ACTIVE)
```

**Note**: For MVP, we keep the lifecycle simple. A passport is either:

- **Minted**: Just created
- **Active**: In circulation (can be transferred, serviced, viewed)

Future versions may include states like `RECALLED`, `DESTROYED`, or `RECYCLED`.

---

## 2. Actors, Roles & Permissions

### 2.1 Actor Definitions

#### Manufacturer

**Description**: The entity that produces the product and creates its digital passport.

**Capabilities**:

- Create new product passports (mint NFTs)
- Set initial product metadata
- Assign the first owner (often themselves or a distributor)

**Authentication**: Ethereum address registered as authorized manufacturer in the smart contract (role-based access control).

**Business Logic**:

- Each manufacturer has a unique Ethereum address
- Only registered manufacturers can mint new passports
- Manufacturer address is permanently recorded in the passport

---

#### Owner

**Description**: The current holder of the product and its associated NFT.

**Capabilities**:

- View full passport details
- Transfer ownership to another address (sell/gift the product)
- Request repairs/services
- View complete ownership history

**Authentication**: The Ethereum address that owns the NFT token.

**Business Logic**:

- Ownership is determined by NFT ownership (ERC-721 standard)
- Only the current owner can initiate a transfer
- Ownership transfers are recorded as blockchain events

---

#### Repairer

**Description**: An authorized service provider who can perform maintenance and repairs on products.

**Capabilities**:

- Add repair/maintenance events to passport history
- Upload service reports and documentation
- Update product condition status

**Authentication**: Ethereum address registered as authorized repairer (whitelist or certification system).

**Business Logic**:

- Repairers must be pre-authorized (whitelist in smart contract or backend)
- Repair events include timestamp, repairer ID, description, and documentation
- Repair history is append-only (no deletion or modification)

---

#### Public / Consumer

**Description**: Any person or entity that wants to verify product authenticity or view public information.

**Capabilities**:

- View public passport information (product details, ownership history, repair records)
- Verify authenticity by checking blockchain record
- Scan QR codes to access passport

**Authentication**: No authentication required (read-only public access).

**Business Logic**:

- All passport data is publicly readable
- No blockchain transaction needed (free reads)
- Privacy-sensitive owner data (name, contact) is NOT stored on-chain

---

### 2.2 Permission Matrix

| Action              | Manufacturer | Owner | Repairer | Public |
| ------------------- | ------------ | ----- | -------- | ------ |
| Create Passport     | ✅           | ❌    | ❌       | ❌     |
| View Passport       | ✅           | ✅    | ✅       | ✅     |
| Transfer Ownership  | ❌           | ✅    | ❌       | ❌     |
| Add Repair Event    | ❌           | ❌    | ✅       | ❌     |
| Verify Authenticity | ✅           | ✅    | ✅       | ✅     |

---

## 3. MVP User Stories

### 3.1 Core User Stories (Must-Have for MVP)

#### US-01: Create Product Passport

**As a** Manufacturer
**I want to** create a digital passport for a newly produced item
**So that** the product has a verifiable digital identity from the start

**Acceptance Criteria**:

- Manufacturer can submit product details (ID, name, description, image)
- System mints an ERC-721 NFT on the blockchain
- Product metadata is stored on IPFS with hash recorded on-chain
- Passport creation event is logged with timestamp
- Unique product ID cannot be duplicated

**Technical Flow**:

1. Manufacturer fills form with product details
2. Backend uploads metadata to IPFS, receives hash
3. Backend calls smart contract `mintPassport(productId, metadataURI, metadataHash)`
4. Smart contract mints NFT, assigns to manufacturer
5. Event `PassportCreated` is emitted
6. Frontend displays new passport with NFT ID

---

#### US-02: View Product Passport

**As a** Public user
**I want to** view a product's digital passport by scanning its QR code or entering its ID
**So that** I can verify its authenticity and learn about its history

**Acceptance Criteria**:

- User can access passport via product ID, QR code, or NFT token ID
- System displays product details, current owner, creation date
- System shows complete ownership transfer history
- System shows repair/maintenance history
- Product images and documents are accessible
- Blockchain verification status is visible

**Technical Flow**:

1. User scans QR code or enters product ID
2. Frontend queries backend API: `GET /api/passports/{id}`
3. Backend reads smart contract for on-chain data
4. Backend fetches metadata from IPFS
5. Frontend displays comprehensive passport view

---

#### US-03: Transfer Ownership

**As a** Product owner
**I want to** transfer ownership of the product to another person
**So that** the new owner is officially recorded and can prove ownership

**Acceptance Criteria**:

- Owner can initiate transfer by providing new owner's address
- System validates that requester is current owner
- NFT is transferred on the blockchain
- Transfer event is recorded with timestamp
- New owner can immediately access passport
- Transfer history is visible to all

**Technical Flow**:

1. Owner initiates transfer via frontend (enters new owner address)
2. Frontend calls backend: `POST /api/passports/{id}/transfer`
3. Backend validates current owner
4. Backend calls smart contract: `transferFrom(currentOwner, newOwner, tokenId)`
5. Smart contract updates owner, emits `Transfer` event
6. Backend adds transfer event to metadata history
7. Frontend confirms successful transfer

---

#### US-04: Add Repair Event

**As an** Authorized repairer
**I want to** record a repair or maintenance service performed on a product
**So that** the product's service history is complete and transparent

**Acceptance Criteria**:

- Repairer can submit repair details (date, type, description, parts replaced)
- System validates repairer authorization
- Repair event is added to product history (immutable)
- Event includes timestamp and repairer identification
- Repair documentation (photos, invoices) can be attached
- Updated history is immediately visible on passport

**Technical Flow**:

1. Repairer accesses product passport
2. Repairer submits repair form with details
3. Backend validates repairer authorization (whitelist check)
4. Backend uploads repair documentation to IPFS (if any)
5. Backend updates metadata history with new event
6. Backend optionally emits blockchain event: `RepairRecorded(tokenId, repairerAddress, timestamp)`
7. Frontend displays updated history

---

#### US-05: Verify Product Authenticity

**As a** Consumer or potential buyer
**I want to** verify that a product is authentic and not counterfeit
**So that** I can trust the product's claimed origin and history

**Acceptance Criteria**:

- User can check if a product ID exists in the system
- System confirms whether NFT exists on blockchain
- System displays manufacturer information and creation date
- System shows complete chain of custody (all transfers)
- User can independently verify data on blockchain explorer (Etherscan)
- Counterfeit products without NFT cannot be verified

**Technical Flow**:

1. User enters product ID or scans QR code
2. Frontend queries: `GET /api/passports/{id}/verify`
3. Backend checks if NFT exists for product ID
4. Backend verifies metadata hash matches IPFS content
5. Frontend displays verification result:
   - ✅ Authentic: NFT found, data verified
   - ❌ Unverified: No NFT found
6. Frontend provides link to blockchain explorer for independent verification

---

### 3.2 Secondary User Stories (Nice-to-Have, Post-MVP)

#### US-06: Batch Create Passports

**As a** Manufacturer
**I want to** create multiple passports at once from a CSV file
**So that** I can efficiently onboard entire production batches

**Deferred Reason**: MVP focuses on individual product creation; batch operations can be added later for scalability.

---

#### US-07: Revoke/Recall Product

**As a** Manufacturer
**I want to** mark a product as recalled or defective
**So that** owners and public are warned about safety issues

**Deferred Reason**: Requires additional state management and notification system; not critical for initial proof-of-concept.

---

#### US-08: Product Lifecycle End (Recycling)

**As an** Owner or recycling facility
**I want to** mark a product as recycled or destroyed
**So that** the passport reflects the complete lifecycle including end-of-life

**Deferred Reason**: End-of-life management requires integration with recycling systems; valuable but not core to basic traceability.

---

#### US-09: Private Owner Information

**As an** Owner
**I want to** associate my contact information with the passport privately
**So that** I can be contacted without exposing my data publicly

**Deferred Reason**: Privacy features require encryption and access control beyond MVP scope; MVP keeps all data public or pseudonymous.

---

#### US-10: Multi-Signature Transfers

**As a** High-value product owner
**I want to** require multiple parties to approve an ownership transfer
**So that** expensive items have additional security

**Deferred Reason**: Multi-sig logic adds complexity; single-signature transfers are sufficient for MVP.

---

## 4. Out of Scope for MVP

The following are explicitly **NOT** included in the MVP to maintain focus and achievability:

### 4.1 Features

- ❌ User account management (no email/password login; wallet addresses only)
- ❌ Payment processing for transfers (no escrow, no marketplace)
- ❌ Product recommendations or discovery features
- ❌ Social features (comments, ratings, reviews)
- ❌ Mobile native apps (web-only for MVP)
- ❌ Multi-language support (English only for MVP)
- ❌ Advanced analytics dashboard
- ❌ Integration with external IoT sensors
- ❌ Automated repair scheduling
- ❌ Insurance integration

### 4.2 Advanced Blockchain Features

- ❌ Cross-chain compatibility (Ethereum only)
- ❌ Layer 2 scaling solutions (Polygon, Arbitrum)
- ❌ Gasless transactions (meta-transactions)
- ❌ DAO governance for protocol changes
- ❌ Token economics (no native token)

### 4.3 Enterprise Features

- ❌ Multi-tenant architecture for multiple manufacturers
- ❌ White-label customization
- ❌ Advanced role hierarchies (sub-manufacturers, regional managers)
- ❌ API rate limiting and usage tiers
- ❌ SLA guarantees

---

## 5. Domain Constraints & Business Rules

### 5.1 Uniqueness Rules

- **R1**: Each `productId` must be unique across all passports
- **R2**: Each NFT `tokenId` is unique (enforced by ERC-721 standard)
- **R3**: A product can have only one active passport (no duplicates)

### 5.2 Immutability Rules

- **R4**: Once created, a passport's `manufacturer` and `createdAt` cannot be changed
- **R5**: Product metadata can be updated, but all versions are preserved (append-only history)
- **R6**: Ownership transfers are irreversible (no "undo" once confirmed on blockchain)
- **R7**: Repair events cannot be deleted or modified once added

### 5.3 Authorization Rules

- **R8**: Only registered manufacturers can mint new passports (whitelist enforced in smart contract)
- **R9**: Only the current NFT owner can transfer ownership
- **R10**: Only authorized repairers can add repair events (whitelist enforced in backend)
- **R11**: All users (including anonymous) can read passport data

### 5.4 Data Integrity Rules

- **R12**: Metadata hash stored on-chain must match the hash of the content on IPFS
- **R13**: Timestamps must be in ISO 8601 format (UTC)
- **R14**: Ethereum addresses must be valid and checksummed
- **R15**: Product IDs must be alphanumeric, 3-50 characters

### 5.5 Operational Rules

- **R16**: Passport viewing requires no gas fees (read-only blockchain queries)
- **R17**: Write operations (mint, transfer, repair) require gas fees paid by the initiator
- **R18**: Metadata stored on IPFS must be pinned to prevent loss
- **R19**: Smart contract upgrades are out of scope for MVP (immutable contract)

---

## 6. Domain Events

Key events emitted by the system for auditability and integration:

| Event Name        | Trigger               | Data                                        | Purpose                       |
| ----------------- | --------------------- | ------------------------------------------- | ----------------------------- |
| `PassportCreated` | Passport minted       | tokenId, productId, manufacturer, timestamp | Log creation in blockchain    |
| `Transfer`        | Ownership transferred | from, to, tokenId                           | Standard ERC-721 event        |
| `RepairRecorded`  | Repair added          | tokenId, repairer, timestamp, description   | Optional on-chain audit trail |
| `MetadataUpdated` | Metadata changed      | tokenId, newMetadataURI, newHash            | Track metadata versions       |

---

## 7. Integration Points

### 7.1 External Systems (MVP)

- **Blockchain Network**: Ethereum testnet (Sepolia) for development; mainnet for production
- **Decentralized Storage**: IPFS for metadata and documents
- **Wallet Integration**: MetaMask for user authentication and transaction signing

### 7.2 Future Integrations (Post-MVP)

- Blockchain explorers (Etherscan) for verification links
- QR code generation libraries
- PDF generation for printable certificates
- Email notifications for transfers
- Supply chain management systems (ERP integration)

---

## 8. Success Criteria for MVP

The MVP is considered successful when:

1. ✅ A manufacturer can create a passport for a product in under 2 minutes
2. ✅ Any user can view a passport by scanning a QR code or entering an ID
3. ✅ Ownership can be transferred, and the change is reflected immediately
4. ✅ A repairer can add a maintenance event visible in the history
5. ✅ Product authenticity can be independently verified on the blockchain
6. ✅ The system handles at least 100 passports without performance degradation
7. ✅ Smart contracts are deployed on a public testnet and accessible 24/7
8. ✅ Code is open-source on GitHub with clear documentation
9. ✅ A live demo is deployable with a single command (Docker Compose)

---

## 9. Technical Boundaries

### 9.1 Blockchain

- **Network**: Ethereum-compatible (EVM)
- **Standard**: ERC-721 (Non-Fungible Token)
- **Language**: Solidity ^0.8.0
- **Framework**: Hardhat for development and testing

### 9.2 Backend

- **Framework**: NestJS (TypeScript/Node.js)
- **Web3 Library**: ethers.js for blockchain interaction
- **API Style**: RESTful JSON APIs

### 9.3 Frontend

- **Framework**: Next.js (TypeScript)
- **Web3 Integration**: ethers.js + MetaMask
- **Styling**: Tailwind

### 9.4 Storage

- **On-Chain**: Minimal data (IDs, addresses, hashes, timestamps)
- **Off-Chain**: IPFS for metadata, images, documents
- **Optional DB**: PostgreSQL for indexing and faster queries (not source of truth)

---

## 10. Glossary

- **DPP**: Digital Product Passport
- **NFT**: Non-Fungible Token (unique digital asset on blockchain)
- **ERC-721**: Ethereum standard for NFTs
- **IPFS**: InterPlanetary File System (decentralized storage)
- **Smart Contract**: Self-executing code on the blockchain
- **Mint**: Create a new NFT
- **Metadata**: Descriptive information about the product
- **Gas**: Transaction fee on Ethereum network
- **Wallet**: Software (like MetaMask) that manages Ethereum addresses and private keys
- **Testnet**: Blockchain network for testing (no real money)
- **Mainnet**: Production blockchain network (real transactions)

---

## 11. References & Inspirations

- **LVMH AURA**: Luxury goods tracking on Ethereum Quorum ([source](https://www.coindesk.com/markets/2019/03/26/louis-vuitton-owner-lvmh-is-launching-a-blockchain-to-track-luxury-goods))
- **Arianee Protocol**: Open-source NFT-based product passports ([source](https://www.arianee.org/))
- **Hyperledger Fabric**: Enterprise blockchain for supply chain ([source](https://medium.com/@spydra/hyperledger-fabric-the-key-to-traceability-and-accountability-in-supply-chain-management))
- **ERC-721 Standard**: OpenZeppelin implementation ([source](https://docs.openzeppelin.com/contracts/4.x/erc721))
- **European DPP Regulations**: Upcoming EU requirements for product transparency

---

## Document Version

**Version**: 1.0
**Last Updated**: 2025-11-21
**Status**: Draft for Review
**Next Review**: After technical feasibility assessment
