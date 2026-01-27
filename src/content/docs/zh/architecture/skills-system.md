---
title: Skills 系统
description: OwliaBot 的可扩展性系统如何工作。
---

Skills 系统让你在不修改核心代码的前提下扩展 OwliaBot 的能力。

## 概览

Skill 是定义 AI 代理可用工具的 JavaScript 模块。每个 skill 是一个目录，包含：

```
workspace/skills/
└── crypto-price/
    ├── package.json    # 元数据 + 工具定义
    └── index.js        # 实现
```

## 创建一个 Skill

### 1. 创建目录结构

```bash
mkdir -p workspace/skills/my-skill
cd workspace/skills/my-skill
```

### 2. 定义 package.json

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

### 3. 实现 index.js

```javascript
export const tools = {
  my_tool: async ({ input }, context) => {
    // 访问环境变量
    const apiKey = context.env.MY_API_KEY;
    
    // 发起网络请求
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

每个工具都会收到一个 `context` 对象，具备以下能力：

| 属性 | 说明 |
|------|------|
| `context.env` | 环境变量（仅包含在 `requires.env` 中声明的项） |
| `context.fetch` | 用于网络请求的原生 fetch |
| `context.meta` | 调用元数据（skillName、toolName、userId 等） |

## 工具命名

Skill 工具会自动命名空间化：`skill-name:tool-name`

```
echo                         # 内置（无前缀）
memory_search                # 内置
crypto-price:get_price       # skill 工具
crypto-balance:get_balance   # skill 工具
```

## 安全等级

| 等级 | 说明 | 确认方式 |
|------|------|----------|
| `read` | 只读查询 | 无 |
| `write` | 修改本地状态 | 内联按钮 |
| `sign` | 链上交易 | 交易确认页 |

## 错误处理

Skill 具备自动超时（默认 30s）和错误处理：

```javascript
// 简单返回（会自动包装）
return { balance: "1.5" };
// → { success: true, data: { balance: "1.5" } }

// 显式格式
return { success: true, data: { balance: "1.5" } };
return { success: false, error: "API rate limited" };
```

## 热重载

无需重启即可重载 skills：

```
/reload-skills
```

:::note
频繁重载可能增加内存占用。生产更新建议重启进程。
:::

## 下一步

- [内置 Skills](/zh/skills/builtin-skills/) — 开箱即用的能力
- [创建 Skills](/zh/skills/creating-skills/) — 分步教程
