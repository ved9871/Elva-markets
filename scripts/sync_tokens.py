# -*- coding: utf-8 -*-
"""Sync the canonical design tokens (assets/tokens.css) into the static
deploy roots that cannot reach above their own directory (the landing and
app dev servers, and the published artifacts).

Usage:
  python scripts/sync_tokens.py           # copy canonical -> landing/, app/
  python scripts/sync_tokens.py --check   # exit 1 if any copy has drifted
"""
import io
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CANONICAL = os.path.join(ROOT, "assets", "tokens.css")
COPIES = [
    os.path.join(ROOT, "landing", "tokens.css"),
    os.path.join(ROOT, "app", "tokens.css"),
]


def read(path):
    with io.open(path, encoding="utf-8") as f:
        return f.read()


def main():
    check = "--check" in sys.argv
    src = read(CANONICAL)
    drift = []
    for dst in COPIES:
        if check:
            if not os.path.exists(dst) or read(dst) != src:
                drift.append(dst)
        else:
            with io.open(dst, "w", encoding="utf-8", newline="\n") as f:
                f.write(src)
            print("synced", os.path.relpath(dst, ROOT))
    if check:
        if drift:
            for d in drift:
                print("DRIFT:", os.path.relpath(d, ROOT))
            sys.exit(1)
        print("tokens in sync")


if __name__ == "__main__":
    main()
