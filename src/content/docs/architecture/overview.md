---
title: Architecture Overview
description: High-level architecture of OwliaBot.
---

OwliaBot is designed with security and simplicity in mind.

## Core Components

```
┌─────────────────────────────────────────────────────────────────┐
│                       OwliaBot Process                          │
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐│
│  │ Gateway       │  │ Channels      │  │ Skills                ││
│  │               │  │ - Telegram    │  │ - crypto-price        ││
│  │               │  │ - Discord     │  │ - crypto-balance      ││
│  └───────────────┘  └───────────────┘  └───────────────────────┘│
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐│
│  │ Agent Runtime │  │ Session       │  │ Signer                ││
│  │ - LLM Runner  │  │ - History     │  │ - 3-tier model        ││
│  │ - Tool Exec   │  │ - Context     │  │                       ││
│  └───────────────┘  └───────────────┘  └───────────────────────┘│
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Message Flow

1. User sends message via Telegram/Discord
2. Gateway receives and routes to Agent Runtime
3. Agent builds context (system prompt + history)
4. LLM processes and may call tools
5. Tool results fed back to LLM
6. Final response sent to user

## Design Principles

### Minimal Dependencies

Target: fewer than 30 direct dependencies. No native modules unless necessary.

### Channel Simplicity

Only Telegram + Discord supported. Fewer channels = smaller attack surface.

### Local-First

Everything runs locally. No cloud services required (except LLM API).

### Extensible Core

Core is minimal. Features added through Skills.

## Key Files

| File | Purpose |
|------|---------|
| `config.yaml` | Runtime configuration |
| `workspace/SOUL.md` | Agent personality |
| `workspace/MEMORY.md` | Long-term memory |
| `workspace/skills/` | Skill modules |

## Next Steps

- [Skills System](/architecture/skills-system/) — How extensibility works
- [Security Model](/architecture/security/) — The 3-tier key architecture
