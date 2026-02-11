---
title: Agent Security
description: OwliaBot's agent security improvements over OpenClaw
---

# OwliaBot Agent Security Differential vs OpenClaw

## **I. Private Key & On-Chain Security**

### **1. Private Keys / Signing Capabilities Fully Isolated from the Agent Process (Supported)**

**In one sentence:**

OwliaBot never touches private keys — even if compromised, it cannot sign transactions directly.

**Details:**

OwliaBot explicitly moves all on-chain signing and private key custody out of the agent process. These responsibilities are delegated to an independent wallet daemon called **Clawlet**, which runs under a separate system account that OwliaBot cannot directly access. The agent side only holds restricted Auth Tokens and RPC call capabilities.

This means that even in the event of prompt injection, tool misuse, or even RCE on the agent process, an attacker would find it extremely difficult to complete the full attack chain of "read private key → transfer assets / abuse signing."

**In comparison:**
Generic agents (such as OpenClaw), when sharing the host filesystem, environment variables, or clipboard with the runtime environment, face higher risk — if private keys exist in any of these locations, injection attacks can more easily escalate to asset-level compromise.

---

### **2. Treating "sign" as a First-Class High-Risk Capability (Supported — Tier Security Classification & Threshold Detection)**

**In one sentence:**

A dedicated 'sign' resource type is defined, with calls treated as "dangerous operations" by default, governed by targeted security policies (transaction behavior statistics) — far more suitable for crypto than generic 'read/write' controls.

**Details:**

OwliaBot introduces a 'sign' resource type at the design level with dedicated governance workflows.

Resources are classified into read / write / sign types, with a further Tier classification (none / 3 / 2 / 1). The policy engine evaluates 'sign' resource calls against **amount thresholds, cumulative limits, and call frequency**, deciding whether to escalate to stricter confirmation flows.

This design closely matches real-world crypto risk: **the same tool carries different risk levels depending on the amount or frequency**. OwliaBot turns this distinction into a system-level capability rather than relying on prompts or manual judgment.

**In comparison:**

Generic agents do not implement domain-specific permission controls for crypto scenarios.

---

### **3. WriteGate: Allowlist for write / sign Resource Calls, with Companion App Authorization (Allowlist Supported; Companion App Authorization Pending)**

**In one sentence:**

OwliaBot checks whether the caller (channel/service) is on the allowlist for 'write/sign' resource calls, and if Tier 1 risk controls are triggered, it pushes an authorization request to the Companion App.

**Details:**

WriteGate is a critical checkpoint in OwliaBot. Before any non-read-only resource is invoked, two conditions must be met simultaneously:

1. The call source (channel such as Telegram, service such as a trading bot) is on the allowlist;
2. The call satisfies Tier 1/2/3 risk control requirements.

If the allowlist is empty, **write / sign capabilities are effectively disabled at the system level by default**.

If a resource call triggers Tier 1 risk controls (e.g., cumulative transfer amount reaches the threshold), OwliaBot pushes a secondary confirmation to the user's Companion App for authorization.

The core principle: **no matter how trusted the agent is, it should never have the ability to autonomously dispose of assets**. Even if the policy engine determines the risk is acceptable, final execution authority remains with the human user.

**In comparison:**

OpenClaw does not distinguish between 'read/write/sign' resource call allowlists. It focuses more on gateway-level permissions (message routing), i.e., whether messages from a given source are processed, without considering **the invasiveness of the message itself**. As long as a channel/user is on the allowlist, read/write operations are not distinguished — risk control depends on user security awareness and weak prompt-based protections.

---

## **II. Prompt Injection Defenses**

### **4. Tool-Level Rate Limiting (Supported)**

**In one sentence:**

OwliaBot prevents attackers from exploiting injection to cause greater damage through **repeated low-risk resource calls**.

**Details:**

OwliaBot introduces fine-grained rate limiting and quota mechanisms at the resource call layer — including maximum calls per hour/day, minimum call intervals, etc.

Unlike cooldowns applied only at the auth profile or provider level, these limits act directly **before tool execution** and cannot be bypassed.

The goal is to limit blast radius in worst-case scenarios — preventing an injected agent from rapidly repeating low-risk tool calls to circumvent high-risk operation checks.

**In comparison:**

OpenClaw, in pursuit of maximizing agent capabilities, does not implement such limits. Its focus remains on the Gateway layer — i.e., message reception (DDoS/spam prevention).

---

### **5. Fail-Closed Auditing: No Log, No Execution (Supported)**

**In one sentence:**
OwliaBot requires audit logging before execution — operations leave a record.

**Details:**

In OwliaBot, auditing is a precondition for resource calls, not merely a log. Before any sensitive resource call, an audit log entry must be successfully written; if the logging system is unavailable, the operation is blocked outright.

This fail-closed design prevents the worst-case scenario of "assets transferred out with no record whatsoever," and provides a reliable foundation for post-incident accountability and risk review.

From a security engineering perspective, this treats **observability as part of the security boundary**, not an optional feature.

**In comparison:**

Generic agents like OpenClaw do not have such strict security and compliance requirements, and do not need formal auditing. Basic logging is sufficient for general-purpose agents.

---

### **6. Filesystem Least Privilege (Supported)**

**In one sentence:**

The agent can only see files in explicitly designated directories — not the entire system.

**Details:**

OwliaBot enforces strict least-privilege principles on file read capabilities:

Only explicitly declared roots (such as workspace) are accessible. Absolute paths, path traversal, and symlink escapes are rejected, and common sensitive files and directories (.env, secrets.yaml, auth.yaml, etc.) are proactively hidden.

Additionally, read size and file type limits are enforced — binary files are rejected to reduce data exfiltration and DoS risk.

OwliaBot tightens the file access surface **even without container isolation**, though Docker-based isolation is the recommended deployment method.

**In comparison:**

OpenClaw explicitly states that the workspace itself is not a hard sandbox and relies more on Docker sandbox and policy configuration. However, its recommended deployment is not Docker-based, since its selling point is comprehensive capabilities without boundaries — and Docker would limit those boundaries.

---

### **7. Narrower exec Attack Surface (Supported)**

**In one sentence:**

Only allowlisted commands can run.

**Details:**

OwliaBot's exec tool deliberately avoids shell semantics, using a command + params format instead. Command basenames are enforced and must be on the allowlist.

The execution directory must be under the workspace's realpath. Only allowlisted environment variables are passed through — any variable names that "look like secrets" are automatically stripped. Output size and execution time also have hard limits.

This design significantly reduces command injection and environment variable leakage risks.

**In comparison:**

OpenClaw provides a more general, more powerful shell exec capability, designed to maximize the capability boundary.

---

### **8. Blocking Sensitive Data Exfiltration (Supported)**

**In one sentence:**

OwliaBot scans data exposed through the Gateway and web resource calls to prevent sensitive information leakage and audit evasion (e.g., scanning POST request bodies for sensitive data).

**Details:**

OwliaBot performs high-confidence pattern scanning on non-GET/HEAD request bodies in gateway messages and web.fetch calls. If a match is found, the request is blocked immediately.

This is one of the most common exfiltration paths in prompt injection attacks: tricking the model into POSTing tokens and keys to an attacker's server.

By introducing "DLP-style hard blocking" at the network egress layer, OwliaBot effectively cuts off the last step of injection attacks — rather than relying solely on log sanitization or post-hoc discovery.

**In comparison:**

OpenClaw does not have Data Leakage Monitoring capabilities. Risk control depends on user security awareness and weak prompt-based protections.

---

## **III. Remote Access & Permission Boundaries**

### **9. Improved Device Token / Service Token System (Token Leak Damage Control) (Supported)**

**In one sentence:**

Issue least-privilege tokens with support for rotation and revocation.

**Details:**

At the Gateway layer, OwliaBot strictly separates admin tokens from device tokens and service tokens, introducing explicit scopes (such as read / write / sign / system / mcp) for device and service tokens.

These scopes perform hard rejection before entering the Tier policy, ensuring that even if a device or service token is leaked, the potential impact is limited to the minimum possible scope.

**In comparison:**

OpenClaw tends toward a single control-plane token with relatively coarse permission governance, relying more on downstream tool policies.

---

## **IV. Supply Chain Security**

### **10. Skills are Markdown, Not Code (Supported)**

**In one sentence:** Skills are limited to Markdown documents — they invoke only known allowlisted resources and never introduce new unknown code.

**Details:**

OwliaBot's Skills system is fundamentally Markdown documents, providing only metadata and prompts. They are never executed as code, and no unknown code is introduced through Skills.

This significantly reduces the supply chain risk of "installing a skill introduces RCE" and makes skills much easier to audit manually.

**In comparison:**

OpenClaw allows installation of all Skills without any restrictions.

---

The core of OwliaBot's security design is **targeted restriction of the agent's ability to invoke resources**:

Private keys are stored in isolation; 'write/sign' resource calls are treated as dangerous by default; file access is isolated; data is not freely sent externally; Companion App authorization is required.

Generic agents, in pursuit of a larger capability boundary, minimize capability constraints.

This is the fundamental difference between the two.
