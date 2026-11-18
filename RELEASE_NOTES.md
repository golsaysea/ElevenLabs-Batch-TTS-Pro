# Release v8.0.2

## 新增与优化功能 (What's New)

- **⚡ 修复「模型列表加载失败：signal is aborted without reason」与网络/代理慢超时提示**：
  - 将 `/v1/models` 请求超时放宽至 45 秒；网络较慢或代理波动触发超时时，自动无缝沿用本地内置模型列表（`Eleven v4` / `Multilingual v2` / `Eleven v3` 等）并显示中文提示，不再中断或弹出英文 `signal is aborted without reason` 报错。
  - 优化 `fetchWithTimeout` 对超时错误的中文可读性诊断。
- **🚀 秒跳 0 积分耗尽账号（拒绝在无积分账号上反复重试拖慢速度）**：
  - 自动解析 ElevenLabs `quota_exceeded` 返回的真实剩余积分（`You have X credits remaining`），在长到短排序批量任务中立即锁定真实剩余上限并 0 毫秒跳过死号。
  - 修复 `onQuota` 回调将已扫描出的 0 积分覆盖回 `null` 的问题；优先调度已知有充足额度的账号。
- **🏷️ 免费版 0 积分极速改名合并音色 & 跨号自有音色兜底**：
  - 「🔁 同步音色」新增 **🏷️ 免费版极速改名合并（0 积分 / 秒级完成）**，直接将各免费账号现有自定义音色统一改名合并，不消耗积分、默认不删除现有音色。
  - 标准版（`v6.9.1`）同步支持多 Key 额度不足或音色不匹配时自动顺延切换到下一个可用 API Key。
