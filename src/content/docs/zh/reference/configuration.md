---
title: 配置参考
description: config.yaml 选项的完整参考。
---

OwliaBot 通过项目根目录下的 `config.yaml` 进行配置。

## 完整示例

```yaml
# AI Providers（必填）
providers:
  - id: claude
    model: claude-sonnet-4-5
    apiKey: "sk-ant-..."
    priority: 1
  - id: openai
    model: gpt-4o
    apiKey: "sk-..."
    priority: 2

# Telegram（可选）
telegram:
  token: "123456:ABC..."
  allowList:
    - "883499266"

# Discord（可选）
discord:
  token: "MTIz..."
  allowList:
    - "123456789"

# Workspace 路径
workspace: ./workspace

# Skills
skills:
  enabled: true
  directory: ./workspace/skills

# 通知
notifications:
  channel: "telegram:883499266"

# Heartbeat（定时任务）
heartbeat:
  enabled: false
  cron: "0 * * * *"
```

## Providers

配置一个或多个 AI 提供商。当主提供商不可用时，OwliaBot 会自动故障转移。

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 唯一标识 |
| `model` | string | 模型名（例如 claude-sonnet-4-5） |
| `apiKey` | string | API key |
| `priority` | number | 数值越小优先级越高 |

## Telegram

| 字段 | 类型 | 说明 |
|------|------|------|
| `token` | string | 来自 @BotFather 的 Bot token |
| `allowList` | string[] | 允许访问的用户 ID |

## Discord

| 字段 | 类型 | 说明 |
|------|------|------|
| `token` | string | 来自 Discord Developer Portal 的 Bot token |
| `allowList` | string[] | 允许访问的用户 ID |

## Workspace

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `workspace` | string | `./workspace` | workspace 目录路径 |

## Skills

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `skills.enabled` | boolean | `true` | 启用 / 禁用 skills 系统 |
| `skills.directory` | string | `{workspace}/skills` | skills 目录路径 |

## Heartbeat

定时任务执行。

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `heartbeat.enabled` | boolean | `false` | 是否启用 heartbeat |
| `heartbeat.cron` | string | `0 * * * *` | Cron 表达式（默认每小时） |

## 环境变量

部分设置可以通过环境变量覆盖：

| 变量 | 用途 |
|------|------|
| `ANTHROPIC_API_KEY` | Claude API key |
| `OPENAI_API_KEY` | OpenAI API key |
| `ALCHEMY_API_KEY` | crypto-balance skill 使用 |
