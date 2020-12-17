title: Moving to a lightweight static site
date: 2020/12/17
description: A lightweight custom static site generator using python, Jinja2, and Markdown2

After one too many conversions about the state of the web, arguing against giant
bundles and slow sites, I have decided to make this site fully static with no
external JavaScript libraries. Previous
iterations of the site have both been static and server-side rendered. The
static versions were built using
[Vue](https://vuejs.org/),
[React](https://reactjs.org/), and then
[Gatsby](https://www.gatsbyjs.com/). I did not find that I was happy with any of
these solutions, which is evident from the various redesigns and renovations as
well as my far-from-stellar activity here. My complaints boiled down to two core
issues: overkill and ease of use.

For a simple site like this, any framework like Vue and React is overkill.
While I did use this site as a way to experiment with each framework and learn,
I was not happy with the end result: a needlessly complex, large, and relatively
slow website. The source for the site was spread over a small collection of
components, using a proper build system to generate the final output. Making
changes required changes in code, which was not conducive to writing. The
resulting bundle was more than a few megabytes, which is unacceptable.
**Frameworks are for web applications, not websites.** This is a realization
that I had all too recently, but I feel it is important to say. Especially in
today's climate where we spend so much time chasing and learning new tools, just
for the sake of their novelty. A tool should be selected for its value to the
particular context, not for its current popularity. Every choice has its
potential costs and benefits, and it pays to weigh them ahead of time.

For a period of time, this site was built using Gatsby. This static site
generator is incredibly powerful, and I have used it before for making
documentation sites. This application was perfect for Gatsby, as it is a
powerful and extensible tool that allows for complex things to be easily
managed through a plugin system. Content can be provided in nearly endless ways,
with most opting to using local markdown. This worked great for a while, until I
tried to build the site after a while away. My terminal filled with red, and the
next few hours of my time amounted to smashing my head on the keyboard. Node
dependency issues, breaking changes between versions, and a bunch of other
problems came together to make me reevaluate. Why do I need all of these
dependency's? Why do I need this build system? Why do I need to bring in a
plugin to do X?

So now, here we are, on what what may be considered v4 or v5 of my personal
website. This time, I have opted to bring in some of what I loved about Gatsby,
but to do it by myself, and try to include no external JavaScript on the client.
The solution I have now is using python3, inspired by
[this post on dev.to](https://dev.to/nqcm/making-a-static-site-generator-with-python-part-1-3kn3).
Using the Jinja2[^jinja] module for templating and Markdown2[^markdown2] for markdown parsing, it is
remarkably simple to roll your own static site generator. Jinja key contribution
is that it allows the site to be decoupled. This allows separation of both
structure and content, but also allows for repeated HTML to be easily shared.
For example, the header component of this page is part of the base template,
which every other page extends. I can change the header in this base file,
rebuild, and the change is reflected everywhere. Jinja also enables using
templates for similar pages, like a blog post. The structure is the same, all
that is swapped out is the content.

Markdown2 parses markdown files into HTML, and provides great plugins[^extras] to enable
additional features. Personally, I have selected the `footnotes`, `metadata`,
`code-friendly`, `target-blank-links`, and `fenced-code-blocks` extras. The metadata
extra allows for metadata to be provided at the start of a markdown file like:

```
title: Moving to a lightweight static site
date: 2020/12/17
description: A lightweight custom static site generator using python, Jinja2, and Markdown2

*Content starts here*
```

This is the metadata for this post, all of which can be changed at will.
`target-blank-links` makes all links open in a new tab, something that I have had
to do by hand before. `fenced-code-blocks` provides build-time syntax highlighting
using Pygment to parse and generate the necessary tags, which I then target with
a stylesheet on the client, like so:

```c
int main(int argc, char* argv[])
{
  printf("Hello, world!\n");
  return 0;
}
```

This setup gives me control over everything and does
not introduce unnecessary dependencies like a node project would. All of this is
controlled by a single python script that copies to source files, builds the
templates, and parses the markdown. A simple nginx docker image is used to wrap
all of this up and serve it.

All in all, I am excited about this new setup. Since I am able to write in
markdown again, there is much less friction when trying to start which I hope
will allow me to write more. Since things are much simpler, I do not have to
worry about external factors nearly as much as before. The final site is just
HTML and CSS, with room for some of my own JavaScript if necessary.
Going forward, I want to setup some additional features like estimated reading
time and hot-reloading for development. I am not committing to anything just
yet, but I am interested in the idea of writing here on a consistent basis.

If you read all the way here, stop using React for simple websites and enjoy
the holidays.


[^jinja]: [Jinja](https://jinja2docs.readthedocs.io/en/stable/) is what powers the templating system in [Flask](https://flask.palletsprojects.com/en/1.1.x/), but is a pleasure to use on its own.
[^markdown2]: [Markdown2](https://github.com/trentm/python-markdown2) is a great module that is extensible through plugins and provides a lot of control to the user as to what they want to support and do with their content.
[^extras]: Markdown2 refers to plugins as [extras](https://github.com/trentm/python-markdown2/wiki/Extras), which are provided when calling the parser, often without needing to do anything else.

