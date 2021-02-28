title: cfx: simple native C visualization using Xlib and ffmpeg
date: 2021/01/14
description: Using Xlib and ffmpeg (libav) to easily visualize and record
using C

Since I set out to tackle this year's
[Advent of Code](https://adventofcode.com/) using C, and I like
making visualizations of some solutions, I needed a way to create visualizations
from C code. Given this requirement, and a desire to work with Xlib, I set out
to make a simple graphics header library to create these visualizations. After
spending a lot of time searching the web, I found
[gfx](https://www3.nd.edu/~rbualuan/courses/fundcomp20/gfx/), which is a great
starting point. This library provides a simple way to create a window and draw
some primitives to it.

My initial concern was the lack of cleanup code present in gfx, so this is where
I started. Delving into the amorphous and incomplete Xlib documentation was a
pain, and I found that exploring the source code was a much more efficient way
to understand the API.

All of the
[source code is on my github](https://github.com/ephjos/cut/tree/main/cfx).

---

After all of this work, I ended up making only two animations, but I am happy
with how they came out.

## Day 5

[Problem](https://adventofcode.com/2020/day/5)

<blockquote class="imgur-embed-pub" lang="en" data-id="a/KpM9SZY"  ><a href="//imgur.com/a/KpM9SZY">AOC 2020 - Day 5 Visualization</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

## Day 8

[Problem](https://adventofcode.com/2020/day/8)

<blockquote class="imgur-embed-pub" lang="en" data-id="a/HYya5kn"  ><a href="//imgur.com/a/HYya5kn">AOC 2020 - Day 8 Visualization</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

