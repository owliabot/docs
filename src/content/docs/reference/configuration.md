---
title: Configuration Reference
description: Complete reference for config.yaml options.
---

OwliaBot is configured via `config.yaml` in the project root.

## Full Example

```yaml
# AI Providers (required)
providers:
  - id: claude
    model: claude-sonnet-4-5
    apiKey: "sk-ant-..."
    priority: 1
  - id: openai
    model: gpt-4o
    apiKey: "sk-..."
    priority: 2

# Telegram (optional)
telegram:
  token: "123456:ABC..."
  allowList:
    - "883499266"

# Discord (optional)
discord:
  token: "MTIz..."
  allowList:
    - "123456789"

# Workspace path
workspace: ./workspace

# Skills
skills:
  enabled: true
  directory: ./workspace/skills

# Notifications
notifications:
  channel: "telegram:883499266"

# Heartbeat (scheduled tasks)
heartbeat:
  enabled: false
  cron: "0 * * * *"
```

## Providers

Configure one or more AI providers. OwliaBot uses failover if the primary is unavailable.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `model` | string | Model name (e.g., claude-sonnet-4-5) |
| `apiKey` | string | API key |
| `priority` | number | Lower = higher priority |

## Telegram

| Field | Type | Description |
|-------|------|-------------|
| `token` | string | Bot token from @BotFather |
| `allowList` | string[] | Allowed user IDs |

## Discord

| Field | Type | Description |
|-------|------|-------------|
| `token` | string | Bot token from Discord Developer Portal |
| `allowList` | string[] | Allowed user IDs |

## Workspace

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `workspace` | string | `./workspace` | Path to workspace directory |

## Skills

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `skills.enabled` | boolean | `true` | Enable/disable skills system |
| `skills.directory` | string | `{workspace}/skills` | Skills directory path |

## Heartbeat

Scheduled task execution.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `heartbeat.enabled` | boolean | `false` | Enable heartbeat |
| `heartbeat.cron` | string | `0 * * * *` | Cron expression (hourly default) |

## Environment Variables

Some settings can be overridden via environment:

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Claude API key |
| `OPENAI_API_KEY` | OpenAI API key |
| `ALCHEMY_API_KEY` | For crypto-balance skill |
