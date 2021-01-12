#!/bin/bash
#

filewatch() {
  while inotifywait --exclude .swp -e modify -r . &> /dev/null; do clear; $@; done;
}

(cd src && . ./venv/bin/activate && filewatch python build_site.py) &
(browser-sync start --server dist --watch src/**/*) &

wait

