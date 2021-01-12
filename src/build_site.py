#!/usr/bin/env python
import argparse
from bs4 import BeautifulSoup
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
rss_template = env.get_template('rss.tmpl')
base_template = env.get_template('base.tmpl')

POSTS = './posts/'
TEMPLATES = './templates/'
PUBLIC = './public/'
BLOG = '../dist/blog/'
DIST = '../dist/'
DEV = False

DATE_FMT = '%Y/%m/%d'

def estimate_read_time(content):
    '''
    Using an estimated words per minute, estimate reading time
    '''
    wpm = 200
    words = len(content.split(' '))
    return '{} minute read'.format(max(1,words // wpm))

def parse_md(fn):
    with open(os.path.join(POSTS, fn), 'r') as fp:
        pmd = markdown(
            fp.read(),
            extras=[
                'metadata', 'footnotes', 'code-friendly', 'target-blank-links',
                'fenced-code-blocks'],
            footnote_return_symbol='goto')

        pub_date = datetime\
            .strptime(pmd.metadata['date'], DATE_FMT)\
            .strftime('%a, %d %b %Y 00:00:00')

        soup = BeautifulSoup(pmd, features='html5lib')
        preview = soup.get_text().replace('\n', ' ')[:256] + "..."

        return {
            'content': pmd,
            'preview': preview,
            'title': pmd.metadata['title'],
            'slug': pmd.metadata['date'] + '/' + \
                pmd.metadata['title'].lower().replace(' ', '-') + \
                '.html',
            'date': pmd.metadata['date'],
            'pub_date': pub_date,
            'description': pmd.metadata['description'],
            'read_time': estimate_read_time(pmd),
        }

def populate_page(fn):
    '''
    Load, render, and write page to ../dist
    '''
    with open(os.path.join(DIST, fn), 'w') as fp:
        tmpl = env.get_template(fn)
        fp.write(tmpl.render(dev=DEV))
        logger.info('Populated {}'.format(fn))

def prepare_dir():
    '''
    Cleanup and scaffold out target ../dist directory
    '''
    if os.path.isdir(DIST):
        shutil.rmtree(DIST)
        logger.info('Removed {}'.format(DIST))
    shutil.copytree(PUBLIC, DIST)
    os.makedirs(BLOG)
    logger.info('Initialized {}'.format(DIST))

def build_pages():
    '''
    Builds .html pages using templates
    '''
    fns = glob.glob(os.path.join(TEMPLATES, '*.html'))
    for fn in fns:
        populate_page(fn.split('/')[-1])

def build_blog():
    '''
    Read all .md files in ./posts, parse, create .html pages
    in ./blog, and create index page blog.html
    '''

    # Get markdown and render to html for all posts
    mdfs = list(os.walk(POSTS))[0][2]
    posts = [parse_md(mdf) for mdf in mdfs]

    # Sort posts by date
    sposts = sorted(posts,
                    key=lambda x: datetime.strptime(x['date'], DATE_FMT),
                    reverse=True)

    # Create blog index page
    with open(os.path.join(DIST, 'blog.html'), 'w') as fp:
        fp.write(blog_template.render(posts=sposts, dev=DEV))

    # Create RSS feed
    with open(os.path.join(DIST, 'feed.xml'), 'w') as fp:
        fp.write(rss_template.render(posts=sposts, dev=DEV))
    logger.info('Created feed.xml')

    # Create each post page
    for post in sposts:
        full = os.path.join(BLOG, post['slug'])
        os.makedirs('/'.join(full.split('/')[:-1]), exist_ok=True)
        with open(full, 'w') as fp:
            fp.write(post_template.render(post, dev=DEV))
            logger.info('Created post \'{}\''.format(post['title']))

def main():
    prepare_dir()
    build_pages()
    build_blog()

if __name__ == '__main__':
    def str2bool(v):
        if isinstance(v, bool):
           return v
        if v.lower() in ('yes', 'true', 't', 'y', '1'):
            return True
        elif v.lower() in ('no', 'false', 'f', 'n', '0'):
            return False
        else:
            raise argparse.ArgumentTypeError('Boolean value expected.')
    parser = argparse.ArgumentParser(description='Configure site build')
    parser.add_argument("--dev", type=str2bool, nargs='?',
                        const=True, default=False,
                        help="Activate dev.")
    args = parser.parse_args()
    DEV = args.dev
    main()

