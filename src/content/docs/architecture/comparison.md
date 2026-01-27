---
title: OwliaBot vs Clawdbot
description: Feature comparison between OwliaBot and Clawdbot
---

OwliaBot borrows architectural ideas from [Clawdbot](https://github.com/clawdbot/clawdbot), but is redesigned for crypto use cases with a focus on minimal dependencies and security.

## Positioning

| Aspect | Clawdbot | OwliaBot |
|--------|----------|----------|
| Philosophy | Full-featured "distribution" | Minimal "kernel" |
| Target users | General AI agent users | Crypto / security-focused |
| Design goal | Feature completeness | Small attack surface |
| Dependency count | 50+ | < 20 (target < 30) |

## Feature Matrix

### Messaging Channels

| Channel | Clawdbot | OwliaBot |
|---------|----------|----------|
| Telegram DM | ✅ Full | ✅ Basic |
| Telegram Groups | ✅ | ❌ |
| Discord DM | ✅ Full | ✅ Basic |
| Discord Servers | ✅ | ❌ |
| WhatsApp | ✅ Baileys | ❌ |
| iMessage | ✅ macOS | ❌ |
| Signal | ✅ E2E | ❌ |
| Slack | ✅ Bot API | ❌ |
| Mattermost | ✅ Plugin | ❌ |
| WebChat | ✅ Local UI | ❌ |
| Streaming output | ✅ Draft mode | ❌ |

### Gateway / Control Plane

| Feature | Clawdbot | OwliaBot |
|---------|----------|----------|
| WebSocket server | ✅ Full protocol | ❌ |
| Multi-client support | ✅ CLI/App/Web/Nodes | ❌ |
| Health checks | ✅ | ❌ |
| Canvas file server | ✅ | ❌ |
| Remote access | ✅ Tailscale/SSH | ❌ |

### Agent Runtime

| Feature | Clawdbot | OwliaBot |
|---------|----------|----------|
| LLM integration | ✅ Pi RPC | ✅ pi-ai direct |
| Agentic loop | ✅ | ✅ (max 5 iter) |
| Tool calling | ✅ | ✅ |
| Streaming output | ✅ Chunks | ❌ |
| Model failover | ✅ Multi-provider | ✅ |
| Multi-agent routing | ✅ | ❌ |

### Session Management

| Feature | Clawdbot | OwliaBot |
|---------|----------|----------|
| Per-user sessions | ✅ | ✅ |
| JSONL persistence | ✅ | ✅ |
| Sliding window | ✅ | ✅ |
| Auto compaction | ✅ | ❌ |
| Session pruning | ✅ | ❌ |

### Memory System

| Feature | Clawdbot | OwliaBot |
|---------|----------|----------|
| memory_search tool | ✅ Semantic | ✅ Keyword |
| memory_get tool | ✅ | ✅ |
| Embedding API | ✅ Vector store | ❌ |
| Auto indexing | ✅ | ❌ |

### Cron / Scheduled Tasks

| Feature | Clawdbot | OwliaBot |
|---------|----------|----------|
| Heartbeat | ✅ | ✅ Basic |
| Custom cron jobs | ✅ Dynamic | ❌ |
| Webhooks | ✅ | ❌ |
| Gmail Pub/Sub | ✅ | ❌ |

### Skills System

| Feature | Clawdbot | OwliaBot |
|---------|----------|----------|
| Skill format | SKILL.md | package.json + JS |
| Loading tiers | 3 (bundled/managed/workspace) | 1 (workspace) |
| Online registry | ✅ ClawdHub | ❌ |
| Hot reload | ✅ | ✅ |
| Config gating | ✅ | ❌ |

### Nodes (Mobile Integration)

| Feature | Clawdbot | OwliaBot |
|---------|----------|----------|
| iOS/Android/macOS pairing | ✅ | ❌ |
| Canvas rendering (A2UI) | ✅ | ❌ |
| Camera snap/clip | ✅ | ❌ |
| Screen recording | ✅ | ❌ |
| Location access | ✅ | ❌ |
| Push notifications | ✅ | ❌ |

### Browser Control

| Feature | Clawdbot | OwliaBot |
|---------|----------|----------|
| Playwright | ✅ | ❌ (by design) |
| Remote browser | ✅ | ❌ |
| Chrome extension | ✅ Relay | ❌ |
| Screenshots/automation | ✅ | ❌ |

### Built-in Tools

| Tool | Clawdbot | OwliaBot |
|------|----------|----------|
| exec (shell) | ✅ | ❌ |
| web_search | ✅ Brave API | ❌ |
| web_fetch | ✅ | ❌ |
| browser | ✅ Playwright | ❌ |
| tts | ✅ | ❌ |
| image analysis | ✅ | ❌ |
| message (cross-channel) | ✅ | ❌ |
| cron management | ✅ | ❌ |
| memory_search | ✅ | ✅ |
| memory_get | ✅ | ✅ |
| file operations | ✅ | ✅ |

## Kernel Status

OwliaBot aims to be a minimal "kernel" — the core runtime that other features build upon.

| Kernel Feature | Status |
|----------------|--------|
| Message loop | ✅ Implemented |
| LLM + tool calling | ✅ Implemented |
| Agentic loop | ✅ Implemented |
| Session persistence | ✅ Implemented |
| Skills extension | ✅ Implemented |
| Workspace loading | ✅ Implemented |
| WebSocket control plane | ❌ **Missing** |
| Streaming output | ❌ **Missing** |
| exec tool | ❌ **Missing** |
| web_fetch / web_search | ❌ **Missing** |

## Recommended Priorities

| Priority | Feature | Reason |
|----------|---------|--------|
| 1 | exec tool | Enables agent to run commands |
| 2 | web_fetch | Simple; lets agent read web pages |
| 3 | Streaming | Better UX |
| 4 | WebSocket | External UI/CLI support |

## Dependency Comparison

| Metric | Clawdbot | OwliaBot |
|--------|----------|----------|
| Direct dependencies | 50+ | < 20 |
| Native modules | Yes (sharp) | No |
| Browser engine | Playwright | None |
| Target dep count | N/A | < 30 |
