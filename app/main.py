from flask import \
    Flask,\
    render_template,\
    redirect
from datetime import datetime
import os

app = Flask(__name__, static_url_path='')

BLOG_DIR = "./static/blog/"
BLOGF = BLOG_DIR+"{}.html"
DATEF = "%m/%d/%Y %H:%M:%S"


class BlogPost:
    def __init__(self, date, name):
        self.date = date
        self.name = name
        self.datestr = datetime.strftime(date, DATEF)


def render_blogpost(blog: BlogPost, body: str):
    return render_template(
        "post.html",
        date=blog.datestr,
        name=blog.name,
        body=body,
    )


def get_post_mtime(file):
    epoch_time = os.stat(BLOG_DIR+file).st_mtime
    mtime = datetime.fromtimestamp(epoch_time)
    return mtime


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/jarbs.sh')
def jarbs():
    return redirect(
        "https://raw.githubusercontent.com/ephjos/JARBS/master/jarbs.sh"
    )


@app.route('/blog/')
def posts():
    blogs = []

    for file in os.listdir(BLOG_DIR):
        name = file.split(".html")[0]
        mtime = get_post_mtime(file)

        blogs.append(BlogPost(mtime, name))

    blogs = sorted(blogs, key=lambda x: x.date, reverse=True)
    return render_template("blog.html", posts=blogs)


@app.route('/blog/<name>')
def post(name):
    try:
        path = BLOGF.format(name)
        with open(path) as html_raw:
            body = html_raw.read()
            file = path.split("/")[-1]
            mtime = get_post_mtime(file)
            name = file.split(".html")[0]
            return render_blogpost(
                BlogPost(mtime, name),
                body,
            )
    except Exception:
        return redirect("/blog")


if __name__ == "__main__":
    app.run(port=8080, debug=True)
