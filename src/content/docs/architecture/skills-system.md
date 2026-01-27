---
title: Skills System
description: How OwliaBot's extensibility system works.
---

The Skills system allows you to extend OwliaBot's capabilities without modifying core code.

## Overview

Skills are JavaScript modules that define tools the AI agent can use. Each skill is a directory containing:

```
workspace/skills/
└── crypto-price/
    ├── package.json    # Metadata + tool definitions
    └── index.js        # Implementation
```

## Creating a Skill

### 1. Create the directory structure

```bash
mkdir -p workspace/skills/my-skill
cd workspace/skills/my-skill
```

### 2. Define package.json

```json
{
  "name": "my-skill",
  "version": "0.1.0",
  "description": "My custom skill",
  "main": "index.js",
  "owliabot": {
    "requires": {
      "env": ["MY_API_KEY"]
    },
    "tools": [
      {
        "name": "my_tool",
        "description": "Does something useful",
        "parameters": {
          "type": "object",
          "properties": {
            "input": {
              "type": "string",
              "description": "Input value"
            }
          },
          "required": ["input"]
        },
        "security": {
          "level": "read"
        }
      }
    ]
  }
}
```

### 3. Implement index.js

```javascript
export const tools = {
  my_tool: async ({ input }, context) => {
    // Access environment variables
    const apiKey = context.env.MY_API_KEY;
    
    // Make network requests
    const res = await context.fetch('https://api.example.com');
    const data = await res.json();
    
    return {
      success: true,
      data: { result: data }
    };
  }
};
```

## Context API

Every tool receives a `context` object with these capabilities:

| Property | Description |
|----------|-------------|
| `context.env` | Environment variables (only those declared in `requires.env`) |
| `context.fetch` | Native fetch for network requests |
| `context.meta` | Call metadata (skillName, toolName, userId, etc.) |

## Tool Naming

Skill tools are automatically namespaced: `skill-name:tool-name`

```
echo                         # built-in (no prefix)
memory_search                # built-in
crypto-price:get_price       # skill tool
crypto-balance:get_balance   # skill tool
```

## Security Levels

| Level | Description | Confirmation |
|-------|-------------|--------------|
| `read` | Read-only queries | None |
| `write` | Modify local state | Inline button |
| `sign` | Blockchain transactions | Transaction page |

## Error Handling

Skills have automatic timeout (default 30s) and error handling:

```javascript
// Simple return (auto-wrapped)
return { balance: "1.5" };
// → { success: true, data: { balance: "1.5" } }

// Explicit format
return { success: true, data: { balance: "1.5" } };
return { success: false, error: "API rate limited" };
```

## Hot Reload

Reload skills without restarting:

```
/reload-skills
```

:::note
Frequent reloads may increase memory usage. Restart the process for production updates.
:::

## Next Steps

- [Built-in Skills](/skills/builtin-skills/) — Available out of the box
- [Creating Skills](/skills/creating-skills/) — Step-by-step tutorial
