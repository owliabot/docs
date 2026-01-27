---
title: Security Model
description: OwliaBot's 3-tier key security architecture.
---

OwliaBot uses a **3-tier key security model** to balance automation with safety.

## The Problem

Crypto automation is risky:
- Bots with private keys can drain wallets
- "Rug pulls" happen when bots go rogue
- Users want automation but fear losing funds

## The Solution: 3 Tiers

### Tier 1: User-Confirmed (Companion App)

For **any transaction that matters**.

```
Bot → [Push Request] → App → [User Confirms] → Sign → Broadcast
```

- Private key **never leaves** the mobile app
- Biometric/PIN confirmation required
- User sees full transaction details
- Maximum security

### Tier 2: Session Key (Local, Disposable)

For **small automated operations**.

- Generated locally by the bot
- Amount-limited (e.g., max $10 per tx)
- Rotated periodically
- Lost = limited damage

Use cases: Gas payments, small claims, tip transactions.

### Tier 3: Smart Contract Wallet

For **large automated operations** that need programmatic control.

```
┌─────────────────────────────────────────┐
│ Smart Contract Wallet (ERC-4337)        │
│                                         │
│  Session Key Permissions:               │
│  - Whitelist contracts only             │
│  - Daily/per-tx limits                  │
│  - Specific tokens only                 │
│  - Time-limited                         │
│                                         │
│  Owner Key:                             │
│  - Revoke session keys anytime          │
│  - Withdraw all funds                   │
│  - Modify permission rules              │
└─────────────────────────────────────────┘
```

Use cases: DeFi strategies, recurring swaps, yield optimization.

## Security Principles

### 1. Private Key Isolation

The main private key **never enters the bot process**. Period.

### 2. Minimum Privilege

Session keys have only the permissions needed for their task.

### 3. Revocability

Users can revoke any session key instantly.

### 4. Auditability

All operations are logged and traceable.

### 5. Amount Limits

Automated operations have configurable caps.

## Comparison

| Approach | Risk | Automation |
|----------|------|------------|
| Give bot your private key | 🔴 Total loss possible | ✅ Full |
| Tier 1 only | 🟢 User confirms all | ❌ Manual |
| Tier 2 (Session Key) | 🟡 Limited to cap | ✅ Small ops |
| Tier 3 (Smart Wallet) | 🟢 Granular control | ✅ Large ops |

## Implementation Status

| Tier | Status |
|------|--------|
| Tier 1 (Companion App) | 🚧 Planned |
| Tier 2 (Session Key) | 🚧 Planned |
| Tier 3 (Smart Wallet) | 🚧 Planned |

:::note
The security model is designed but not yet implemented. Current version focuses on non-signing operations.
:::
