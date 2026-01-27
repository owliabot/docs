---
title: Creating Skills
description: Step-by-step guide to building your own OwliaBot skill.
---

This guide walks you through creating a custom skill from scratch.

## Prerequisites

- OwliaBot installed and running
- Basic JavaScript knowledge
- An API to integrate (optional)

## Step 1: Create the Skill Directory

```bash
cd workspace/skills
mkdir my-weather-skill
cd my-weather-skill
```

## Step 2: Write package.json

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

## Step 3: Implement the Tool

```javascript
// index.js
export const tools = {
  get_weather: async ({ city }, context) => {
    try {
      // Using wttr.in - free, no API key required
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

## Step 4: Test It

Restart OwliaBot (or use `/reload-skills`), then:

```
What's the weather in Tokyo?
```

## Using Environment Variables

If your skill needs API keys:

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
    // Use apiKey...
  }
};
```

## Best Practices

### 1. Always Handle Errors

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

### 2. Validate Inputs

```javascript
if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
  return { success: false, error: "Invalid Ethereum address format" };
}
```

### 3. Be Descriptive

Good tool descriptions help the AI use your tool correctly:

```json
{
  "name": "get_balance",
  "description": "Get native token balance (ETH/MATIC) for a wallet. Returns balance in human-readable format.",
  "parameters": {
    "properties": {
      "address": {
        "description": "Wallet address starting with 0x"
      },
      "chain": {
        "description": "Blockchain: ethereum, polygon, arbitrum, or base"
      }
    }
  }
}
```

### 4. Set Appropriate Security Level

| Level | When to use |
|-------|-------------|
| `read` | Fetching data, queries |
| `write` | Modifying local files |
| `sign` | Blockchain transactions |

## Debugging

Check the console for skill loading logs:

```
INFO [owliabot:skills] Loaded skill: my-weather-skill
INFO [owliabot:skills] Registered 1 tools from skill: my-weather-skill
```

If your skill fails to load, you'll see:

```
ERROR [owliabot:skills] Failed to load skill my-weather-skill: ...
```
