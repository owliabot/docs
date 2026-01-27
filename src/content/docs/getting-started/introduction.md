---
title: Introduction
description: What is OwliaBot and why you might want to use it.
---

OwliaBot is a **self-hosted, crypto-native AI agent** designed for cryptocurrency users who value security and control.

## Why OwliaBot?

### 🔐 Security First

Private keys **never enter the bot process**. OwliaBot uses a 3-tier security model:

| Tier | Type | Use Case |
|------|------|----------|
| 1 | Companion App | User-confirmed transactions |
| 2 | Session Key | Small automated ops (gas, claims) |
| 3 | Smart Contract Wallet | Large automated ops with granular permissions |

### 🏠 Self-Hosted

Run entirely on your own machine or server. No cloud dependencies, no third-party access to your data.

### 🔌 Extensible

Add functionality through **Skills** — JavaScript modules that extend the agent's capabilities. Create your own or install from the community.

### 📱 Familiar Interfaces

Chat with your agent through **Telegram** or **Discord**. No new apps to learn.

## How It Works

```
You (Telegram/Discord)
        │
        ▼
┌──────────────────────┐
│     OwliaBot         │
│                      │
│  ┌────────────────┐  │
│  │ Skills         │  │ ← Extensible
│  │ - crypto-price │  │
│  │ - dex-swap     │  │
│  └────────────────┘  │
│                      │
│  ┌────────────────┐  │
│  │ Signer         │  │ ← Secure
│  │ (3-tier model) │  │
│  └────────────────┘  │
└──────────────────────┘
```

## Next Steps

Ready to get started? Head to the [Quick Start](/getting-started/quick-start/) guide.
