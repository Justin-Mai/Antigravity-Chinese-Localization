# Antigravity-Chinese-Localization

Antigravity Deep Chinese Localization Patch

[中文](README.md) | English

[![GitHub release](https://img.shields.io/github/v/release/liominsb/Antigravity-Chinese-Localization)](https://github.com/liominsb/Antigravity-Chinese-Localization/releases/latest)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)](https://github.com/liominsb/Antigravity-Chinese-Localization)
[![Package Size](https://img.shields.io/badge/ASAR%20Size-4.44%20MB%20(Official%20Standard)-success)](https://github.com/liominsb/Antigravity-Chinese-Localization)
[![Node Runtime](https://img.shields.io/badge/Node.js-%3E%3D%2014.0.0-informational)](https://nodejs.org/)

A high-performance, non-destructive Chinese localization patch designed for Google Antigravity. Fully adapted to the latest Antigravity v2.12.0+ architecture, providing deep localization across thousands of UI strings—including Planning Mode, the entire Settings panel, the Google Plugins marketplace, and Subagent Teamwork. Package filtering optimizations ensure the final `app.asar` maintains the official 4.44 MB standard size without bloating.

> [Latest Release](https://github.com/liominsb/Antigravity-Chinese-Localization/releases/latest) · [Issues & Feedback](https://github.com/liominsb/Antigravity-Chinese-Localization/issues)

---

## Core Feature Matrix

| Module | Features & Capabilities | Details |
| :--- | :--- | :--- |
| Planning Mode | Full-lifecycle deep localization | Covers Plan Mode toggle, Implementation Plan, Walkthrough, User Review Required, Open Questions, Proposed Changes, Automated Tests, Manual Verification, and action controls. |
| System Settings | 150+ configuration options covered | Translates Theme Mode (Light/Dark/System), Conversation Width (Compact/Comfortable/Wide/Full), Sleep Blocker, Run in Background, Auto-check Updates, Tool Execution Policy (Always Proceed/Request Review/Sandbox/Strict/Turbo), Storage, and Cache management. |
| Security & Sandbox | Security policies and allowlists | Localizes Terminal Sandbox, outside-sandbox confirmation prompts, non-workspace file access policy (Allow/Ask/Deny), internet access policy, command allowlist/denylist, and browser navigation allowlists. |
| Official Plugin Ecosystem | "Build With Google Plugins" integration | Comprehensive localization for plugin lifecycle operations (Install/Uninstall/Update/Enable/Disable), capability badges (Skills/Rules/MCP/Hooks), and official Google plugin descriptions (e.g. gemini-api). |
| Native Model Presentation | 100% untouched English names | Model selection dropdowns (Gemini 3.8, Claude 3.7) and reasoning statuses (Thinking / Thought process) strictly preserve original English terminology to respect developer intuition. |
| ASAR Size Optimization | 4.44 MB official standard | Fixed unpack filtering using `--unpack-dir` to isolate external Node modules, resolving the issue where repackaged asar inflated from 4.5 MB to 21.4 MB in earlier community scripts. |
| Hot Upgrade Support | Seamless patch overwrite | Upgraded the injection mechanism to `injectOrUpdate`, replacing outdated skip-on-marker checks so that existing installations can upgrade smoothly with zero friction. |
| Safe DOM Interception | Monaco & input field immunity | Real-time DOM interception with Shadow DOM traversal. Explicitly skips `INPUT`, `TEXTAREA`, contenteditable containers, and Monaco Editor lines to protect code editing and user typing. |
| Backup & Restoration | Non-destructive bi-directional toggle | Automatically backs up `app.asar.bak` before modification, allowing instantaneous restoration to official English at any time. |

---

## Quick Start Guide

### Option 1: Windows (Recommended)

#### 1. Graphical Control Center
1. Download the repository source or Release ZIP and extract it;
2. Double-click **`双击运行汉化.bat`** in the directory;
3. The browser will open the control dashboard at `http://localhost:3388`. Click "一键开始汉化" (Start Localization).

#### 2. Headless CLI Deployment (Fastest)
Open a terminal in the project directory and run:
```bash
node localize.js --now
```

---

### Option 2: Linux / Ubuntu

1. Open a terminal in the project directory and run the shell script:
   ```bash
   ./运行汉化.sh
   ```
2. The browser will open the web control dashboard. Click "一键开始汉化".  
   Alternatively, run headless:
   ```bash
   node localize.js --now
   ```

---

### Option 3: macOS

1. Open a terminal in the project directory, grant execution permissions, and run:
   ```bash
   chmod +x 运行汉化.sh
   ./运行汉化.sh
   ```
2. Click "一键开始汉化". The default target path points to `/Applications/Antigravity.app`.

> **macOS Code Signing Notice**:  
> Modifying the internal asar on macOS invalidates the bundle signature, causing Gatekeeper to warn that "the application is damaged and can't be opened". Clear quarantine attributes via:  
> ```bash
> xattr -cr /Applications/Antigravity.app
> ```

---

## Command Line Arguments

`localize.js` supports direct headless arguments for automated workflows:

```bash
# Execute localization immediately and exit (no web server)
node localize.js --now

# Restore to official English using app.asar.bak
node localize.js --restore

# Extract app.asar to the extracted/ directory only
node localize.js --extract-only

# Repack from extracted/ directory to app.asar only
node localize.js --pack-only
```

---

## Technical Architecture

```text
[ Antigravity Startup ]
        │
        ├─► [ Native Layer: dist/loadingOverlay.js ] ──► Localized Loading Overlay
        ├─► [ Native Layer: dist/menu.js & tray.js ] ──► Localized Menu & Tray
        │
        └─► [ Web Container: dist/preload.js ]
                    │
                    ▼
        [ DOM_TRANSLATOR_INJECTION Engine ]
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
 [ MutationObserver Hook ]  [ Shadow DOM Traversal ]
        │                       │
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────────────────┐
        ▼                                   ▼
 [ Skipped Nodes (Immunity) ]          [ Translation & Regex Match ]
 • Monaco Editor lines                • Planning Mode / Implementation Plan
 • input / textarea / editable        • System Settings & Sandbox Policies
 • User typing streams untouched      • Official Plugin Ecosystem
                                      • Model names & Thinking in English
```

### 1. Package Size Optimization
Official Antigravity places heavy external native modules (such as `chrome-devtools-mcp`) in `resources/app.asar.unpacked/node_modules/`. Previous community scripts omitted unpack filtering, causing unpackaged modules (17 MB) to be recompressed back into `app.asar`, blowing the file up to 21.4 MB.  
This project specifies `--unpack-dir "**/chrome-devtools-mcp/**"` during repackaging to maintain modular decoupling, restoring `app.asar` to the official standard size of **4.44 MB**.

### 2. Hot Upgrade Mechanism
The legacy `appendOnce` utility aborted injection if it encountered existing markers in `dist/preload.js`. This caused users with older patches to miss newly added dictionary keys when upgrading.  
We refactored this into `injectOrUpdate`: when an older injection marker is detected, the engine truncates the stale block and hot-swaps it with the latest complete dictionary and regex rules.

---

## Frequently Asked Questions (FAQ)

### Q1: App fails to launch or reports file missing after localization?
Ensure that Antigravity was completely closed before applying the patch. The background Go language server process (`language_server.exe`) may hold file locks.  
Solution: Terminate any running `Antigravity.exe` instances via Task Manager, then rerun `node localize.js --now`.

### Q2: Localization disappears after an official app update?
Silent background updates overwrite `app.asar`. Simply run the localization command again:
```bash
node localize.js --now
```
The script automatically backs up the new official asar and injects the updated patch.

### Q3: How do I completely revert back to official English?
Click "恢复英文原版" (Restore Official English) in the dashboard, or run:
```bash
node localize.js --restore
```
The application will be cleanly restored from `app.asar.bak`.

---

## Contributors & Open Source Collaboration

| Contributor | Role & Contributions |
| :--- | :--- |
| [liominsb](https://github.com/liominsb) | Original project creator; built the initial Electron asar injection and web dashboard architecture |
| [LAN-TINA-WS](https://github.com/LAN-TINA-WS) | v2.12.0+ deep localization rewrite, 4.44 MB slim-down fix, hot-upgrade engine, Settings/Plugins dictionary expansion, and standalone maintenance |

- **Contributing**: Pull requests and issue reports on missing phrases are warmly welcomed.
