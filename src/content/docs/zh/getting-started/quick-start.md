---
title: 快速开始
description: 在 5 分钟内让 OwliaBot 跑起来。
---

## 前置条件

- Node.js 22 或更高版本
- 一个 Telegram Bot token（来自 [@BotFather](https://t.me/botfather)）
- 一个 AI 提供商的 API Key（Anthropic、OpenAI 等）

## 安装

```bash
# 克隆仓库
git clone https://github.com/owliabot/owliabot.git
cd owliabot

# 安装依赖
npm install

# 复制示例配置
cp config.example.yaml config.yaml
```

## 配置

编辑 `config.yaml`：

```yaml
providers:
  - id: claude
    model: claude-sonnet-4-5
    apiKey: "your-anthropic-api-key"

telegram:
  token: "your-telegram-bot-token"
  allowList:
    - "your-telegram-user-id"

workspace: ./workspace
```

## 首次运行

```bash
npm run dev
```

给你的 Telegram 机器人发送一条消息。你应该能收到回复！

## 测试 Skills

OwliaBot 自带一些内置技能。试试：

```
比特币现在的价格是多少？
```

`crypto-price` 技能会从 CoinGecko 获取价格。

## 下一步

- [架构总览](/zh/architecture/overview/) — 理解 OwliaBot 如何工作
- [创建 Skills](/zh/skills/creating-skills/) — 构建你自己的扩展
- [安全模型](/zh/architecture/security/) — 了解三层密钥系统
