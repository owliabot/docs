---
title: 创建 Skills
description: 手把手教你构建自己的 OwliaBot skill。
---

本指南将带你从零开始创建一个自定义 skill。

## 前置条件

- 已安装并运行 OwliaBot
- 具备基础 JavaScript 知识
- 一个可集成的 API（可选）

## 第一步：创建 Skill 目录

```bash
cd workspace/skills
mkdir my-weather-skill
cd my-weather-skill
```

## 第二步：编写 package.json

```json
{
  "name": "my-weather-skill",
  "version": "0.1.0",
  "description": "Get weather information",
  "main": "index.js",
  "owliabot": {
    "tools": [
      {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "parameters": {
          "type": "object",
          "properties": {
            "city": {
              "type": "string",
              "description": "City name (e.g., Tokyo, London)"
            }
          },
          "required": ["city"]
        },
        "security": {
          "level": "read"
        }
      }
    ]
  }
}
```

## 第三步：实现工具

```javascript
// index.js
export const tools = {
  get_weather: async ({ city }, context) => {
    try {
      // 使用 wttr.in - 免费且无需 API key
      const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
      const res = await context.fetch(url);
      
      if (!res.ok) {
        return { success: false, error: `Failed to fetch weather: ${res.status}` };
      }
      
      const data = await res.json();
      const current = data.current_condition[0];
      
      return {
        success: true,
        data: {
          city: data.nearest_area[0].areaName[0].value,
          temperature: `${current.temp_C}°C`,
          condition: current.weatherDesc[0].value,
          humidity: `${current.humidity}%`,
          wind: `${current.windspeedKmph} km/h`
        }
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
};
```

## 第四步：测试

重启 OwliaBot（或使用 `/reload-skills`），然后输入：

```
东京现在天气怎么样？
```

## 使用环境变量

如果你的 skill 需要 API key：

```json
{
  "owliabot": {
    "requires": {
      "env": ["WEATHER_API_KEY"]
    },
    "tools": [...]
  }
}
```

```javascript
export const tools = {
  get_weather: async ({ city }, context) => {
    const apiKey = context.env.WEATHER_API_KEY;
    if (!apiKey) {
      return { success: false, error: "WEATHER_API_KEY not configured" };
    }
    // 使用 apiKey...
  }
};
```

## 最佳实践

### 1. 始终处理错误

```javascript
try {
  const res = await context.fetch(url);
  if (!res.ok) {
    return { success: false, error: `HTTP ${res.status}` };
  }
  // ...
} catch (err) {
  return { success: false, error: err.message };
}
```

### 2. 校验输入

```javascript
if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
  return { success: false, error: "Invalid Ethereum address format" };
}
```

### 3. 描述要具体

好的工具描述能帮助 AI 更准确地使用你的工具：

```json
{
  "name": "get_balance",
  "description": "获取钱包的原生代币余额（ETH/MATIC）。返回人类可读格式的余额。",
  "parameters": {
    "properties": {
      "address": {
        "description": "以 0x 开头的钱包地址"
      },
      "chain": {
        "description": "区块链：ethereum、polygon、arbitrum 或 base"
      }
    }
  }
}
```

### 4. 选择合适的安全等级

| 等级 | 适用场景 |
|------|----------|
| `read` | 获取数据、查询 |
| `write` | 修改本地文件 |
| `sign` | 链上交易 |

## 调试

查看控制台中的 skill 加载日志：

```
INFO [owliabot:skills] Loaded skill: my-weather-skill
INFO [owliabot:skills] Registered 1 tools from skill: my-weather-skill
```

如果 skill 加载失败，你会看到：

```
ERROR [owliabot:skills] Failed to load skill my-weather-skill: ...
```
