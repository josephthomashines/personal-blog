title: speeding up bash loading
date: 2021/03/22
description: Making bash load fast and replacing nvm with fnm

After months of changing my dotfiles and adding all kinds of new features and
support, my bash loading time had slowed down substantially. I was consistently
opening a new shell and typing before my prompt was printed, which was irritating
to say the least. I stumbled on Daniel Parker's post on
[Faster Bash Startup](https://danpker.com/posts/faster-bash-startup/), which
was a great starting point to fix this issue.
The two key takeaways from this post are using the tool
[hyperfine](https://github.com/sharkdp/hyperfine) and carefully avoiding
unnecessary computation.

## Hyperfine

Having briefly tried to benchmark/profile bash scripts and configs in the past
(and hating every second of it), this tool immediately drew my attention.
Hyperfine is a CLI benchmarking tool that can be used for any command, but is
particularly useful for improving shell configs. To benchmark the loading time
of your shell it can be used like:

```bash
hyperfine 'bash -i'
```

It will run the provided command multiple times and report statistical information
about mean, min, and max loading times.
It can also multiple arguments and will compare the benchmarks. In this case of
shell configs, `.bashrc` can be copied to another file and edited, then compared
as such

```bash
hyperfine 'bash --rcfile .bashrc -i' 'bash --rcfile other -i'
```

This allows you to make changes to `other` and then directly compare how those
changes impact the runtime compared to your base config. After running hyperfine
on my configs I got a reported startup time of `500ms`, which could use improvement.

## Clever Changes

In his post, Daniel Parker lays out two changes that helped his loading times
improve. First, he removed as much dynamic logic from his `.bashrc` as possible.
This is possible due to most programs using and setting environment variables,
not requiring a call to the CLI to get a lot of information. In general,
this applies to all looping and subshell operations in a configuration file.
For use on the CLI, the overhead of these calls may not be too noticeable, but
when piled up in a configuration file they become painfully obvious. In my case,
this meant moving my script to automatically load all of my keys into
[keychain](https://wiki.archlinux.org/index.php/SSH_keys#Keychain) to my
`.profile`. This script is then called only once on startup which keeps subsequent
shells loading quickly.

The second problem area identified are bash completion files, as these functions
can be very complex and perform some of their own IO. I simply removed all of
the completion files that I don't use and got another substantial improvement.
I had gotten my time down to `250ms`, which was a great improvement but still not
a great overall time. After running some comparison benchmarks, I identified that
`nvm` was the issue

## NVM

The [Node Version Manager](https://github.com/nvm-sh/nvm) is a tool used to
control multiple local installations of nodejs and switch between them. I use
this for several projects so I cannot just remove it. NVM must be sourced when
each shell is started in order to point to the correct `node` install. This
can be an incredibly slow operation. An
[often cited fix](https://www.ioannispoulakas.com/2020/02/22/how-to-speed-up-shell-load-while-using-nvm/)
is to use the `--no-use` argument to avoid a lot of this logic on load. However,
this does not properly load the correct node version, requiring the user to
remember to run `nvm use` before doing anything with `node`. This is a pain,
can only lead to issues, and completely neglects the purpose of having these
tools and configuration options in the first place.
After some searching, I found [fnm](https://github.com/Schniz/fnm), which is an
`nvm` alternative focused on speed and simplicity. Since I do not use any
complicated workflows with `nvm`, this tool offered everything I needed. I
installed it, setup my config, and tested it. Even with additional logic
to automatically install `fnm` in my `.bashrc`, it was still substantially
faster. Here's that code:

```bash
# FNM
FNM_DIR="$HOME/.config/fnm"
mkdir -p "$FNM_DIR"
addpath "$FNM_DIR"

# This can be dangerous
command -v fnm &> /dev/null || \
  (curl -fsSL https://fnm.vercel.app/install | \
    bash -s -- --install-dir "$FNM_DIR" --skip-shell)
eval "`fnm env`"
```

## Results

After moving the call to `keychain`, removing unneeded completion, and replacing
`nvm` with `fnm` my benchmark is now:

```bash
Benchmark #1: bash -i
  Time (mean ± σ):      33.5 ms ±  12.2 ms    [User: 10.4 ms, System: 3.4 ms]
  Range (min … max):    15.3 ms …  51.3 ms    61 runs
```

This is an order of magnitude improvement, and was a worthwhile way to spend
a chunk of a Monday morning. My terminals feel much snappier and I am unable to
input anything before my prompt is displayed. I removed unneeded features (completion)
and slimmed down my configs a little bit. Given how often I open a terminal,
this actually may be a worthwhile time savings:

![relevant xkcd optimization table](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)
