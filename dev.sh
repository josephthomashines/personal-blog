#!/bin/bash
#

filewatch() {
  while inotifywait --exclude .swp -e modify -r . &> /dev/null; do
    clear;
    $@;
  done;
}

(cd src && . ./venv/bin/activate && \
  python build_site.py --dev && filewatch python build_site.py --dev) &
(browser-sync start \
  --server --serveStatic dist \
  --watch src/** src/**/** src/**/**/** \
  --port 5001 \
  --no-notify --no-ui --no-open) &

wait

