title: posix wait and simple development scripts
date: 2021/01/13
description: The posix wait command and using it to build simple, pluggable, and
powerful development scripts.

I spend almost all of my time at the shell.
Whenever possible, I prefer to use (neo)vim and some simple scripts to get
things done. Often, a makefile will suffice. However, some situations call for
bash scripting. In this case, I wanted to create a development script for this
site.

This site is built using python and deployed using Docker. Waiting for a Docker
build each time I make a change to a post is painstaking and makes the writing
process have more friction and take more time. As such, I created the following
script:

```bash
#!/bin/bash

filewatch() {
  while inotifywait --exclude .swp -e modify -r . &> /dev/null; do
    clear;
    $@;
  done;
}

(cd src && . ./venv/bin/activate && \
  python build_site.py --dev && filewatch python build_site.py --dev) &
(browser-sync start --server dist --watch src/**/*) &
```

The filewatch function uses inotifywait to run the provided command every time
a file is updated in the working directory and all directories contained
within. The last two lines spawn two subshells that watch files in the repo. The
first watches the site `src/` files and rebuilds the site when there is a
change. The second runs browser-sync which launches a webserver that serves the
built static files and reloads when changes are made. This works, but has one
major issue, it is a pain to stop. This can be accomplished by manually killing
the processes, which is tedious. It would be nice if a single interrupt would
kill the main script, as well as the child processes. This can be accomplished
by changing the above script to the following:

```bash
#!/bin/bash

filewatch() {
  while inotifywait --exclude .swp -e modify -r . &> /dev/null; do
    clear;
    $@;
  done;
}

(cd src && . ./venv/bin/activate && \
  python build_site.py --dev && filewatch python build_site.py --dev) &
(browser-sync start --server dist --watch src/**/*) &

wait # just add this line!
```

`wait` is often a shell built-in, and will simply wait for all of the processes
that are children of the current process to finish. When interrupted, it
effectively kills the main script and all of the children. This allows for a
bash script to spawn an arbitrary amount of sub shells and allow them to be
killed with one interrupt. In situations where multiple asynchronous process
need to be kicked off and killed, this fits the bill perfectly.

