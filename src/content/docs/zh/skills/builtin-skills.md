---
title: 内置 Skills
description: OwliaBot 开箱即用的技能。
---

OwliaBot 内置了若干技能，帮助你快速上手。

## crypto-price

从 CoinGecko 查询加密货币价格。

### 工具：`crypto-price:get_price`

```
比特币现在价格是多少？
用 EUR 查询 ETH 价格
```

**参数：**
- `coin`（必填）：币种 ID（例如 bitcoin、ethereum、solana）
- `currency`：目标货币（默认：usd）

**无需 API key。**

### 示例响应

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

跨多条链查询钱包余额。

### 工具：`crypto-balance:get_balance`

```
在 ethereum 上查询 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 的余额
我的钱包在 polygon 上有多少余额？
```

**参数：**
- `address`（必填）：钱包地址（0x...）
- `chain`（必填）：ethereum、polygon、arbitrum 或 base

**需要：**环境变量 `ALCHEMY_API_KEY`。

### 配置方式

1. 从 [Alchemy](https://www.alchemy.com/) 获取 API key
2. 设置环境变量：

```bash
export ALCHEMY_API_KEY="your-key-here"
```

### 示例响应

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

## 添加更多 Skills

想要更多功能？你可以：

1. **自己创建** — 参考[创建 Skills](/zh/skills/creating-skills/)
2. **从社区安装** — 即将推出

### Skill 灵感

- **dex-swap** — 在 Uniswap/SushiSwap 上执行兑换
- **nft-lookup** — 查询 NFT 元数据与持有情况
- **gas-tracker** — 监控多链 gas 价格
- **portfolio** — 跟踪你的总资产价值
- **alerts** — 设置价格 / 余额提醒
