# dsh-kiligz-base

`@kiligzzz/dsh-kiligz-base` 是一个 DeepSeek Harness Profile bundle，把定时任务、外观、会话归档、SKILL 管理、MCP 管理、自动续传、Vision Router 和 Better Sidebar 统一为一次安装。

包本身提供统一 Client 壳层和控件视觉；七项能力仍以同一 Cordis group 下的独立 feature row 运行，因此保留各自的 Host 生命周期、设置 namespace、持久化数据、工具和路由。

## 安装

```sh
dsh plugin --profile desktop add github:kiligzzz/dsh-kiligz-base
```

安装时应替换七个旧 bundle，而不是与旧 bundle 同时启用。

## 侧栏顺序

```text
定时任务
SKILL 管理
MCP 管理
已归档会话
设置
```

统一层只使用 DSH 语义化 token，并统一按钮、搜索框、列表、开关和复选框的视觉。

## 已知限制与后续工作

首版固定整合当前上游版本；后续升级会按 feature 单独评估，并写入 `vendor/manifest.json`。
