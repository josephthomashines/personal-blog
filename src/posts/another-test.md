title: Another Test
date: 2020/12/17
description: Another simple blog post

I find writing markdown to be a true joy, especially when I understand and can
tweak the underlying parser. Markdown2 [^1] has been a real joy to work with so
far, especially when combined with Jinja2 [^2].

Here's some python code:

```python
def parse_md(fn):
    with open(os.path.join(POSTS, fn), 'r') as fp:
        pmd = markdown(
            fp.read(),
            extras=[
                'metadata', 'footnotes', 'code-friendly', 'target-blank-links',
                'fenced-code-blocks'],
            footnote_return_symbol="Back")
        return {
            'content': pmd,
            'title': pmd.metadata['title'],
            'slug': pmd.metadata['date'] + '/' + \
                pmd.metadata['title'].lower().replace(" ", "-") + \
                ".html",
            'date': pmd.metadata['date'],
            'description': pmd.metadata['description'],
        }
```

**Wow**, now that is some cool code.


[^1]: [Markdown2](https://github.com/trentm/python-markdown2)
[^2]: [Jinja2](https://jinja2docs.readthedocs.io/en/stable/)
