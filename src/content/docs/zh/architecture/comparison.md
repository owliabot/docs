---
title: OwliaBot vs Clawdbot
description: OwliaBot 与 Clawdbot 的功能对比
---

OwliaBot 借鉴了 [Clawdbot](https://github.com/clawdbot/clawdbot) 的架构理念，但针对 Crypto 场景重新设计，专注于最小依赖和安全优先。

## 定位差异

**Clawdbot** 是一个功能完整的 AI agent 平台，支持 7+ 消息渠道、浏览器自动化、移动端节点集成，以及丰富的内置工具。它更像一个"全栈发行版"。

**OwliaBot** 刻意保持精简——面向需要安全优先、自托管 agent 的 Crypto 用户，追求最小攻击面。

## 核心模块对比

### 1. 消息渠道

**Clawdbot** 支持 7+ 渠道：
- WhatsApp (Baileys) — 完整支持
- Telegram — DM + 群组，草稿流式输出
- Discord — DM + 服务器
- iMessage — macOS 本地集成
- Signal — 端到端加密
- Slack — Bot API
- Mattermost — 插件形式
- WebChat — 本地 UI

**OwliaBot** 支持 2 个渠道：
- Telegram — 基础 DM ✅
- Discord — 基础 DM ✅

**差距**：群聊支持、流式输出、其他渠道

---

### 2. Gateway / 控制平面

**Clawdbot**：
- 完整的 WebSocket 服务器（类型化协议）
- 多客户端连接（CLI、macOS app、Web UI、Nodes）
- 健康检查、状态广播
- Canvas 文件服务器
- Tailscale/SSH 远程访问支持

**OwliaBot**：
- 仅基础 HTTP 入口
- 没有 WebSocket 控制平面
- 不支持外部客户端连接

**差距**：WebSocket API、多客户端架构、Canvas host

---

### 3. Agent 运行时

**Clawdbot**：
- Pi agent RPC 集成（完整）
- Agentic loop + tool calling
- 流式输出 + chunk 分发
- Model failover（多 provider）
- 多 agent 路由

**OwliaBot**：
- pi-ai 库直接调用 ✅
- Agentic loop ✅（最多 5 轮迭代）
- Model failover ✅
- 多 agent ❌

**状态**：核心功能基本对齐，缺流式输出和多 agent

---

### 4. Session 管理

**Clawdbot**：
- Per-channel-user session
- JSONL 持久化
- 滑动窗口 + 自动压缩
- Session 剪枝（防止过大）
- `/compact` 命令

**OwliaBot**：
- Per-channel-user session ✅
- JSONL 持久化 ✅
- 滑动窗口 ✅
- 压缩/剪枝 ❌

**差距**：Session 压缩、大 session 处理

---

### 5. Memory 系统

**Clawdbot**：
- 语义搜索（Embedding API + 向量存储）
- `memory_search` / `memory_get` 工具
- 自动索引更新

**OwliaBot**：
- 关键词匹配搜索（glob + includes）✅
- `memory_search` / `memory_get` 工具 ✅
- 语义搜索 ❌（计划后续升级）

**差距**：语义搜索（这是有意的 MVP 取舍）

---

### 6. Cron / 定时任务

**Clawdbot**：
- Heartbeat 系统
- 自定义 cron jobs（动态添加/删除）
- Webhook 触发
- Gmail Pub/Sub 集成

**OwliaBot**：
- Heartbeat ✅（基础）
- 自定义 cron ❌
- Webhook ❌

**差距**：动态 cron、webhook

---

### 7. Skills 系统

**Clawdbot**：
- SKILL.md 格式（AgentSkills 兼容）
- 三级加载（bundled → managed → workspace）
- ClawdHub 注册表（在线发布/安装）
- 环境/配置门控
- 热重载

**OwliaBot**：
- package.json + JS module 格式 ✅
- 单级加载（仅 workspace）
- 无注册表 ❌
- 热重载 ✅

**差异**：格式不兼容——OwliaBot 使用原生 JS module 而非 SKILL.md

---

### 8. Nodes（移动端集成）

**Clawdbot**：
- iOS/Android/macOS 节点配对
- Canvas 渲染（A2UI）
- Camera snap/clip
- Screen recording
- Location 获取
- 推送通知

**OwliaBot**：
- 完全没有 ❌

**差距**：整个 Nodes 子系统

---

### 9. Browser 控制

**Clawdbot**：
- Playwright 集成
- 远程浏览器控制
- Chrome extension relay
- 截图、快照、自动化操作

**OwliaBot**：
- 设计上排除 ❌（为了减少依赖）

---

### 10. 内置工具

**Clawdbot** 丰富的内置工具：
- `web_search` (Brave API)
- `web_fetch` (URL 抓取)
- `browser` (Playwright)
- `exec` (Shell 命令)
- `tts` (语音合成)
- `image` (图片分析)
- `message` (跨渠道发送)
- `cron` (任务管理)
- `nodes` (移动端控制)
- `canvas` (渲染控制)
- 等等...

**OwliaBot** 当前内置：
- `echo` (测试)
- `help` (帮助)
- `clear_session` (清空会话)
- `memory_search` / `memory_get`
- `list_files` / `edit_file`

**差距**：exec、web_search、web_fetch、tts、image 等

---

## OwliaBot 是不是 "Linux Kernel"？

**差不多是的，但还缺一些 kernel 级功能。**

OwliaBot 已实现：
- ✅ 消息接收/发送循环
- ✅ LLM 调用 + tool calling
- ✅ Agentic loop
- ✅ Session 持久化
- ✅ Skills 扩展机制
- ✅ 基础 Memory 工具
- ✅ Workspace 加载（SOUL/IDENTITY/USER）

还缺的 "kernel 级" 功能：

1. **WebSocket 控制平面** — 目前没有外部客户端能连进来控制 OwliaBot
2. **Streaming 输出** — 没有流式响应，用户要等完整回复
3. **exec 工具** — Agent 无法执行 shell 命令，能力大幅受限
4. **web_fetch / web_search** — 无法访问网络内容

补上这 4 项，OwliaBot 就真的是一个能独立运行的 "kernel"——其他功能（browser、nodes、更多渠道）都可以作为可选的 "userland" 模块。

---

## 建议的优先级

1. **exec 工具** — 最重要，让 agent 能执行命令
2. **web_fetch** — 简单实现，让 agent 能读网页
3. **Streaming** — 改善用户体验
4. **WebSocket 控制平面** — 支持外部 UI/CLI 连接

---

## 依赖对比

| 方面 | Clawdbot | OwliaBot |
|------|----------|----------|
| 直接依赖 | 50+ | < 20 |
| Native 模块 | 有 (sharp) | 无 |
| 浏览器引擎 | Playwright | 无 |
| 目标依赖数 | N/A | < 30 |
