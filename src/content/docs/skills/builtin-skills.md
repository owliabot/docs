---
title: Built-in Skills
description: Skills that come with OwliaBot out of the box.
---

OwliaBot includes several skills to get you started.

## crypto-price

Query cryptocurrency prices from CoinGecko.

### Tool: `crypto-price:get_price`

```
What's the current price of bitcoin?
Get ETH price in EUR
```

**Parameters:**
- `coin` (required): Coin ID (e.g., bitcoin, ethereum, solana)
- `currency`: Target currency (default: usd)

**No API key required.**

### Example Response

```json
{
  "success": true,
  "data": {
    "coin": "bitcoin",
    "currency": "usd",
    "price": 98432.50,
    "timestamp": "2026-01-27T10:00:00Z"
  }
}
```

---

## crypto-balance

Query wallet balances across multiple chains.

### Tool: `crypto-balance:get_balance`

```
Check balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on ethereum
What's my wallet balance on polygon?
```

**Parameters:**
- `address` (required): Wallet address (0x...)
- `chain` (required): ethereum, polygon, arbitrum, or base

**Requires:** `ALCHEMY_API_KEY` environment variable.

### Setup

1. Get an API key from [Alchemy](https://www.alchemy.com/)
2. Set the environment variable:

```bash
export ALCHEMY_API_KEY="your-key-here"
```

### Example Response

```json
{
  "success": true,
  "data": {
    "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "chain": "ethereum",
    "balance": "1234.567890",
    "balanceWei": "1234567890000000000000",
    "symbol": "ETH"
  }
}
```

---

## Adding More Skills

Want more functionality? You can:

1. **Create your own** — See [Creating Skills](/skills/creating-skills/)
2. **Install from community** — Coming soon

### Skill Ideas

- **dex-swap** — Execute swaps on Uniswap/SushiSwap
- **nft-lookup** — Query NFT metadata and ownership
- **gas-tracker** — Monitor gas prices across chains
- **portfolio** — Track your total portfolio value
- **alerts** — Set price/balance alerts
