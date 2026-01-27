---
title: OwliaBot vs Clawdbot
description: OwliaBot 与 Clawdbot 的功能对比
---

OwliaBot 借鉴了 [Clawdbot](https://github.com/clawdbot/clawdbot) 的架构理念，但针对 Crypto 场景重新设计，专注于最小依赖和安全优先。

## 定位对比

| 方面 | Clawdbot | OwliaBot |
|------|----------|----------|
| 理念 | 功能完整的"发行版" | 精简的"内核" |
| 目标用户 | 通用 AI agent 用户 | Crypto / 安全优先用户 |
| 设计目标 | 功能完整性 | 最小攻击面 |
| 依赖数量 | 50+ | < 20（目标 < 30）|

## 功能对比矩阵

### 消息渠道

| 渠道 | Clawdbot | OwliaBot |
|------|----------|----------|
| Telegram DM | ✅ 完整 | ✅ 基础 |
| Telegram 群组 | ✅ | ❌ |
| Discord DM | ✅ 完整 | ✅ 基础 |
| Discord 服务器 | ✅ | ❌ |
| WhatsApp | ✅ Baileys | ❌ |
| iMessage | ✅ macOS | ❌ |
| Signal | ✅ E2E | ❌ |
| Slack | ✅ Bot API | ❌ |
| Mattermost | ✅ 插件 | ❌ |
| WebChat | ✅ 本地 UI | ❌ |
| 流式输出 | ✅ Draft 模式 | ❌ |

### Gateway / 控制平面

| 功能 | Clawdbot | OwliaBot |
|------|----------|----------|
| WebSocket 服务器 | ✅ 完整协议 | ❌ |
| 多客户端支持 | ✅ CLI/App/Web/Nodes | ❌ |
| 健康检查 | ✅ | ❌ |
| Canvas 文件服务器 | ✅ | ❌ |
| 远程访问 | ✅ Tailscale/SSH | ❌ |

### Agent 运行时

| 功能 | Clawdbot | OwliaBot |
|------|----------|----------|
| LLM 集成 | ✅ Pi RPC | ✅ pi-ai 直接调用 |
| Agentic loop | ✅ | ✅（最多 5 轮）|
| Tool calling | ✅ | ✅ |
| 流式输出 | ✅ Chunks | ❌ |
| Model failover | ✅ 多 provider | ✅ |
| 多 agent 路由 | ✅ | ❌ |

### Session 管理

| 功能 | Clawdbot | OwliaBot |
|------|----------|----------|
| Per-user sessions | ✅ | ✅ |
| JSONL 持久化 | ✅ | ✅ |
| 滑动窗口 | ✅ | ✅ |
| 自动压缩 | ✅ | ❌ |
| Session 剪枝 | ✅ | ❌ |

### Memory 系统

| 功能 | Clawdbot | OwliaBot |
|------|----------|----------|
| memory_search 工具 | ✅ 语义搜索 | ✅ 关键词 |
| memory_get 工具 | ✅ | ✅ |
| Embedding API | ✅ 向量存储 | ❌ |
| 自动索引 | ✅ | ❌ |

### Cron / 定时任务

| 功能 | Clawdbot | OwliaBot |
|------|----------|----------|
| Heartbeat | ✅ | ✅ 基础 |
| 自定义 cron | ✅ 动态 | ❌ |
| Webhook | ✅ | ❌ |
| Gmail Pub/Sub | ✅ | ❌ |

### Skills 系统

| 功能 | Clawdbot | OwliaBot |
|------|----------|----------|
| Skill 格式 | SKILL.md | package.json + JS |
| 加载层级 | 3 级（bundled/managed/workspace）| 1 级（workspace）|
| 在线注册表 | ✅ ClawdHub | ❌ |
| 热重载 | ✅ | ✅ |
| 配置门控 | ✅ | ❌ |

### Nodes（移动端集成）

| 功能 | Clawdbot | OwliaBot |
|------|----------|----------|
| iOS/Android/macOS 配对 | ✅ | ❌ |
| Canvas 渲染（A2UI）| ✅ | ❌ |
| 相机拍照/录像 | ✅ | ❌ |
| 屏幕录制 | ✅ | ❌ |
| 位置获取 | ✅ | ❌ |
| 推送通知 | ✅ | ❌ |

### Browser 控制

| 功能 | Clawdbot | OwliaBot |
|------|----------|----------|
| Playwright | ✅ | ❌（设计排除）|
| 远程浏览器 | ✅ | ❌ |
| Chrome 扩展 | ✅ Relay | ❌ |
| 截图/自动化 | ✅ | ❌ |

### 内置工具

| 工具 | Clawdbot | OwliaBot |
|------|----------|----------|
| exec（Shell）| ✅ | ❌ |
| web_search | ✅ Brave API | ❌ |
| web_fetch | ✅ | ❌ |
| browser | ✅ Playwright | ❌ |
| tts | ✅ | ❌ |
| image 分析 | ✅ | ❌ |
| message（跨渠道）| ✅ | ❌ |
| cron 管理 | ✅ | ❌ |
| memory_search | ✅ | ✅ |
| memory_get | ✅ | ✅ |
| 文件操作 | ✅ | ✅ |

## Kernel 状态

OwliaBot 的目标是成为一个精简的 "kernel"——其他功能可以在此基础上构建。

| Kernel 功能 | 状态 |
|-------------|------|
| 消息循环 | ✅ 已实现 |
| LLM + tool calling | ✅ 已实现 |
| Agentic loop | ✅ 已实现 |
| Session 持久化 | ✅ 已实现 |
| Skills 扩展 | ✅ 已实现 |
| Workspace 加载 | ✅ 已实现 |
| WebSocket 控制平面 | ❌ **缺失** |
| 流式输出 | ❌ **缺失** |
| exec 工具 | ❌ **缺失** |
| web_fetch / web_search | ❌ **缺失** |

## 建议优先级

| 优先级 | 功能 | 原因 |
|--------|------|------|
| 1 | exec 工具 | 让 agent 能执行命令 |
| 2 | web_fetch | 简单实现，让 agent 能读网页 |
| 3 | 流式输出 | 改善用户体验 |
| 4 | WebSocket | 支持外部 UI/CLI 连接 |

## 依赖对比

| 指标 | Clawdbot | OwliaBot |
|------|----------|----------|
| 直接依赖 | 50+ | < 20 |
| Native 模块 | 有（sharp）| 无 |
| 浏览器引擎 | Playwright | 无 |
| 目标依赖数 | N/A | < 30 |
