# 🕷️ Spider - Gleam Browser Automation

<p align="center">
  <img src="assets/wip-banner.svg" alt="Work in Progress" width="100%" />
</p>

## Packages

- [Core](./spider_core/README.md) - Shared code between packages.
- [Browser Extension](./spider_extension/README.md) - Executes the actions sent to the server in the browser.
- [Server](./spider_server/README.md) - Manages the browser instance & provides an API to receive actions to perform in the browser.
- [Admin Panel](./spider_admin/README.md) - Web UI to manage & control multiple spider servers & browsers.
- [Bot Detection Tests](./spider_bot_detection/README.md) - Test various bot detectors to avoid captchas and account bans.
- [Large Action Model](./spider_lam/README.md) - Give LLMs controller over the browser for self-healing workflows.

## How it works

```mermaid
graph TD
    Admin[Admin Panel]
    LAM[Large Action Model]
    Server[Server]
    Extension[Browser Extension]
    Browser[Browser Instance]

    %% Relationships
    Admin -- "Manages" --> Server
    Admin -- "Monitors" --> Extension
    LAM -- "Sends high-level actions" --> Server
    Server -- "Sends actions" --> Extension
    Extension -- "Controls" --> Browser
    Server -- "Manages" --> Browser```

## Future Work

Ideas and actionable tasks are collected and organised here: https://github.com/daniellionel01/spider/issues

Contributions are welcomed!
