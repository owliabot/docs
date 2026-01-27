---
title: 架构总览
description: OwliaBot 的高层架构。
---

OwliaBot 的设计以安全与简洁为核心。

## 核心组件

```
┌─────────────────────────────────────────────────────────────────┐
│                       OwliaBot 进程                             │
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐│
│  │ Gateway       │  │ Channels      │  │ Skills                ││
│  │               │  │ - Telegram    │  │ - crypto-price        ││
│  │               │  │ - Discord     │  │ - crypto-balance      ││
│  └───────────────┘  └───────────────┘  └───────────────────────┘│
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐│
│  │ Agent Runtime │  │ Session       │  │ Signer                ││
│  │ - LLM Runner  │  │ - History     │  │ - 三层模型            ││
│  │ - Tool Exec   │  │ - Context     │  │                       ││
│  └───────────────┘  └───────────────┘  └───────────────────────┘│
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## 消息流

1. 用户通过 Telegram/Discord 发送消息
2. Gateway 接收并路由到 Agent Runtime
3. Agent 构建上下文（系统提示词 + 历史记录）
4. LLM 处理请求，并可能调用工具
5. 工具结果回传给 LLM
6. 最终回复发送给用户

## 设计原则

### 依赖极简

目标：直接依赖少于 30 个。除非必要，不使用原生模块。

### 通道简化

只支持 Telegram + Discord。通道越少，攻击面越小。

### 本地优先

一切本地运行。不需要云服务（LLM API 除外）。

### 核心可扩展

核心保持极简。功能通过 Skills 添加。

## 关键文件

| 文件 | 作用 |
|------|------|
| `config.yaml` | 运行时配置 |
| `workspace/SOUL.md` | 代理人格 |
| `workspace/MEMORY.md` | 长期记忆 |
| `workspace/skills/` | Skill 模块 |

## 下一步

- [Skills 系统](/zh/architecture/skills-system/) — 可扩展性如何实现
- [安全模型](/zh/architecture/security/) — 三层密钥架构
