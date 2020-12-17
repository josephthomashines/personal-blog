#!/usr/bin/env python
from datetime import datetime
import glob
from loguru import logger
from jinja2 import Environment, PackageLoader
from markdown2 import markdown
import os
import shutil

env = Environment(loader=PackageLoader('build_site', 'templates'))
post_template = env.get_template('post.tmpl')
blog_template = env.get_template('blog.tmpl')
base_template = env.get_template('base.tmpl')

POSTS = './posts/'
TEMPLATES = './templates/'
PUBLIC = './public/'
BLOG = '../dist/blog/'
DIST = '../dist/'

DATE_FMT = '%Y/%m/%d'

def parse_md(fn):
    with open(os.path.join(POSTS, fn), 'r') as fp:
        pmd = markdown(
            fp.read(),
            extras=[
                'metadata', 'footnotes', 'code-friendly', 'target-blank-links',
                'fenced-code-blocks'],
            footnote_return_symbol="goto")
        return {
            'content': pmd,
            'title': pmd.metadata['title'],
            'slug': pmd.metadata['date'] + '/' + \
                pmd.metadata['title'].lower().replace(" ", "-") + \
                ".html",
            'date': pmd.metadata['date'],
            'description': pmd.metadata['description'],
        }

def populate_page(fn):
    """
    Load, render, and write page to ../dist
    """
    with open(os.path.join(DIST, fn), 'w') as fp:
        tmpl = env.get_template(fn)
        fp.write(tmpl.render())
        logger.info("Populated {}".format(fn))

def prepare_dir():
    """
    Cleanup and scaffold out target ../dist directory
    """
    if os.path.isdir(DIST):
        shutil.rmtree(DIST)
        logger.info("Removed {}".format(DIST))
    shutil.copytree(PUBLIC, DIST)
    os.makedirs(BLOG)
    logger.info("Initialized {}".format(DIST))

def build_pages():
    """
    Builds .html pages using templates
    """
    fns = glob.glob(os.path.join(TEMPLATES, "*.html"))
    for fn in fns:
        populate_page(fn.split('/')[-1])

def build_blog():
    """
    Read all .md files in ./posts, parse, create .html pages
    in ./blog, and create index page blog.html
    """
    mdfs = list(os.walk(POSTS))[0][2]
    posts = [parse_md(mdf) for mdf in mdfs]
    sposts = sorted(posts,
                    key=lambda x: datetime.strptime(x['date'], DATE_FMT),
                    reverse=True)
    with open(os.path.join(DIST, "blog.html"), 'w') as fp:
        fp.write(blog_template.render(posts=sposts))
    for post in sposts:
        full = os.path.join(BLOG, post['slug'])
        os.makedirs('/'.join(full.split('/')[:-1]), exist_ok=True)
        with open(full, 'w') as fp:
            fp.write(post_template.render(post))
            logger.info("Created post '{}'".format(post['title']))

def main():
    prepare_dir()
    build_pages()
    build_blog()

if __name__ == "__main__":
    main()

