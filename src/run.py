from flask import \
    Flask,\
    render_template,\
    redirect
import json
from datetime import datetime

PORT = 8080
BLOGI = "./public/blog/index.json"
BLOGF = "./public/blog/{}.html"
DATEF = "%m/%d/%Y"

app = Flask(__name__, static_folder='public', static_url_path='')


@app.route('/')
def index():
    return render_template('index.html')


class BlogPost:
    def __init__(self, datestr, name):
        self.datestr = datestr
        self.name = name
        self.date = str_to_date(datestr)


def render_blogpost(blog: BlogPost, body: str):
    return render_template(
        "post.html",
        date=blog.datestr,
        name=blog.name,
        body=body,
    )


def str_to_date(s):
    return datetime.strptime(s, DATEF)


@app.route('/blog/')
def posts():
    blogs = []
    with open(BLOGI) as index_raw:
        index = json.load(index_raw)
        for name in index.keys():
            date = index.get(name).get("date")
            blogs.append(BlogPost(date, name))

    blogs = sorted(blogs, key=lambda x: x.date, reverse=True)
    return render_template("blog.html", posts=blogs)


@app.route('/blog/<name>')
def post(name):
    try:
        with open(BLOGI) as index_raw:
            index = json.load(index_raw)
            if name in index:
                date = index.get(name).get("date")
                with open(BLOGF.format(name)) as html_raw:
                    body = html_raw.read()
                    return render_blogpost(
                        BlogPost(date, name),
                        body,
                    )
    except Exception:
        pass
    return redirect("/blog")


@app.route('/<name>')
def generic(name):
    return render_template(name + '.html')


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=PORT, debug=True)
