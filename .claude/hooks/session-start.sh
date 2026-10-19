#!/bin/bash
# Installs the seomator CLI used by the seo-audit skill (.claude/skills/seo-audit).
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if ! command -v seomator >/dev/null 2>&1; then
  npm install -g @seomator/seo-audit
fi

seomator --version
