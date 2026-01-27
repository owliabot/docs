---
title: OwliaBot vs Clawdbot
description: Feature comparison between OwliaBot and Clawdbot
---

OwliaBot borrows architectural ideas from [Clawdbot](https://github.com/clawdbot/clawdbot), but is redesigned for crypto use cases with a focus on minimal dependencies and security.

## Positioning

**Clawdbot** is a full-featured AI agent platform with 7+ messaging channels, browser automation, mobile node integration, and a rich set of built-in tools. It's more like a "full-stack distribution".

**OwliaBot** is intentionally minimal — targeting crypto users who need security-first, self-hosted agents with a small attack surface.

## Core Modules

### 1. Messaging Channels

**Clawdbot** supports 7+ channels:
- WhatsApp (Baileys) — full support
- Telegram — DM + groups, draft streaming
- Discord — DM + servers
- iMessage — macOS native
- Signal — E2E encrypted
- Slack — Bot API
- Mattermost — Plugin
- WebChat — Local UI

**OwliaBot** supports 2 channels:
- Telegram — Basic DM ✅
- Discord — Basic DM ✅

**Gap**: Group chat support, streaming output, other channels

---

### 2. Gateway / Control Plane

**Clawdbot**:
- Full WebSocket server with typed protocol
- Multi-client connections (CLI, macOS app, Web UI, Nodes)
- Health checks, status broadcasting
- Canvas file server
- Tailscale/SSH remote access

**OwliaBot**:
- Basic HTTP entry point only
- No WebSocket control plane
- No external client support

**Gap**: WebSocket API, multi-client architecture, Canvas host

---

### 3. Agent Runtime

**Clawdbot**:
- Pi agent RPC integration (full)
- Agentic loop + tool calling
- Streaming output + chunk distribution
- Model failover (multi-provider)
- Multi-agent routing

**OwliaBot**:
- pi-ai library direct calls ✅
- Agentic loop ✅ (max 5 iterations)
- Model failover ✅
- Multi-agent ❌

**Status**: Core functionality aligned, missing streaming and multi-agent

---

### 4. Session Management

**Clawdbot**:
- Per-channel-user sessions
- JSONL persistence
- Sliding window + auto compaction
- Session pruning (prevents overflow)
- `/compact` command

**OwliaBot**:
- Per-channel-user sessions ✅
- JSONL persistence ✅
- Sliding window ✅
- Compaction/pruning ❌

**Gap**: Session compaction, large session handling

---

### 5. Memory System

**Clawdbot**:
- Semantic search (Embedding API + vector store)
- `memory_search` / `memory_get` tools
- Auto index updates

**OwliaBot**:
- Keyword matching (glob + includes) ✅
- `memory_search` / `memory_get` tools ✅
- Semantic search ❌ (planned for later)

**Gap**: Semantic search (intentional MVP tradeoff)

---

### 6. Cron / Scheduled Tasks

**Clawdbot**:
- Heartbeat system
- Custom cron jobs (dynamic add/remove)
- Webhook triggers
- Gmail Pub/Sub integration

**OwliaBot**:
- Heartbeat ✅ (basic)
- Custom cron ❌
- Webhooks ❌

**Gap**: Dynamic cron, webhooks

---

### 7. Skills System

**Clawdbot**:
- SKILL.md format (AgentSkills compatible)
- Three-tier loading (bundled → managed → workspace)
- ClawdHub registry (online publish/install)
- Environment/config gating
- Hot reload

**OwliaBot**:
- package.json + JS module format ✅
- Single-tier loading (workspace only)
- No registry ❌
- Hot reload ✅

**Difference**: Incompatible formats — OwliaBot uses native JS modules instead of SKILL.md

---

### 8. Nodes (Mobile Integration)

**Clawdbot**:
- iOS/Android/macOS node pairing
- Canvas rendering (A2UI)
- Camera snap/clip
- Screen recording
- Location access
- Push notifications

**OwliaBot**:
- Not implemented ❌

**Gap**: Entire Nodes subsystem

---

### 9. Browser Control

**Clawdbot**:
- Playwright integration
- Remote browser control
- Chrome extension relay
- Screenshots, snapshots, automation

**OwliaBot**:
- Excluded by design ❌ (to reduce dependencies)

---

### 10. Built-in Tools

**Clawdbot** has rich built-in tools:
- `web_search` (Brave API)
- `web_fetch` (URL fetching)
- `browser` (Playwright)
- `exec` (Shell commands)
- `tts` (Text-to-speech)
- `image` (Image analysis)
- `message` (Cross-channel send)
- `cron` (Task management)
- `nodes` (Mobile control)
- `canvas` (Render control)
- And more...

**OwliaBot** current built-ins:
- `echo` (test)
- `help` (help)
- `clear_session` (clear history)
- `memory_search` / `memory_get`
- `list_files` / `edit_file`

**Gap**: exec, web_search, web_fetch, tts, image, etc.

---

## Is OwliaBot a "Linux Kernel"?

**Almost, but missing some kernel-level features.**

OwliaBot implements:
- ✅ Message receive/send loop
- ✅ LLM calls + tool calling
- ✅ Agentic loop
- ✅ Session persistence
- ✅ Skills extension mechanism
- ✅ Basic Memory tools
- ✅ Workspace loading (SOUL/IDENTITY/USER)

Still missing "kernel-level" features:

1. **WebSocket Control Plane** — No external clients can connect to control OwliaBot
2. **Streaming Output** — No streaming responses, users wait for complete replies
3. **exec Tool** — Agent cannot execute shell commands, severely limiting capabilities
4. **web_fetch / web_search** — Cannot access web content

With these 4 additions, OwliaBot would be a fully functional "kernel" — other features (browser, nodes, more channels) can be optional "userland" modules.

---

## Recommended Priorities

1. **exec tool** — Most important, enables agent to run commands
2. **web_fetch** — Simple to implement, lets agent read web pages
3. **Streaming** — Better user experience
4. **WebSocket control plane** — Support external UI/CLI connections

---

## Dependency Comparison

| Aspect | Clawdbot | OwliaBot |
|--------|----------|----------|
| Direct dependencies | 50+ | < 20 |
| Native modules | Yes (sharp) | No |
| Browser engine | Playwright | None |
| Target dep count | N/A | < 30 |
