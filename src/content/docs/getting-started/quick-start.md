---
title: Quick Start
description: Get OwliaBot up and running in 5 minutes.
---

## Prerequisites

- Node.js 22 or later
- A Telegram Bot token (from [@BotFather](https://t.me/botfather))
- An AI provider API key (Anthropic, OpenAI, etc.)

## Installation

```bash
# Clone the repository
git clone https://github.com/owliabot/owliabot.git
cd owliabot

# Install dependencies
npm install

# Copy example config
cp config.example.yaml config.yaml
```

## Configuration

Edit `config.yaml`:

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

## First Run

```bash
npm run dev
```

Send a message to your Telegram bot. You should get a response!

## Testing Skills

OwliaBot comes with built-in skills. Try:

```
What's the current price of bitcoin?
```

The `crypto-price` skill will fetch the price from CoinGecko.

## Next Steps

- [Architecture Overview](/architecture/overview/) — Understand how OwliaBot works
- [Creating Skills](/skills/creating-skills/) — Build your own extensions
- [Security Model](/architecture/security/) — Learn about the 3-tier key system
