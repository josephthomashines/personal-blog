from flask import Flask, render_template, send_file, g, request, jsonify, session, escape, redirect
from passlib.hash import pbkdf2_sha256
import os
import sys
import json
from db import Database
from loguru import logger

app = Flask(__name__, static_folder='public', static_url_path='')
app.secret_key = b'lkj98t&%$3rhfksdfjs11239rif'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = Database()
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/course/<path:path>')
def base_static(path):
    return send_file(os.path.join(app.root_path, '..', '..', 'course', path))

######################################
# API

@app.route('/api/saveproject', methods=['POST'])
def api_saveproject():
    if 'user' in session:
        uid = session['user']['uid']
        pid = request.json['pid']
        data = json.dumps(request.json['data'])

        response = get_db().update_project(uid, pid, data)
        return jsonify(response)

    return jsonify('Error: User not authenticated')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        typed_password = request.form['password']
        if email and typed_password:
            user = get_db().get_user(email)
            if user == None:
                encrypted_password = pbkdf2_sha256.hash(typed_password, rounds=200000, salt_size=16)
                get_db().signup(email, encrypted_password)
                return redirect('/login')
            else:
                message = "An account already exists with that email address."
                return render_template('signup.html', message=message)
    return render_template('signup.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    message = None
    if request.method == 'POST':
        email = request.form['email']
        typed_password = request.form['password']
        if email and typed_password:
            user = get_db().get_user(email)
            if user:
                if pbkdf2_sha256.verify(typed_password, user['encrypted_password']):
                    # Remove all info besides uid
                    user['name'] = user['email'].split("@")[0]
                    del user['email']
                    del user['encrypted_password']

                    session['user'] = user
                    return redirect('/dashboard')
                else:
                    message = "Incorrect password, please try again"
            else:
                message = "Unknown user, please try again"
        elif email and not typed_password:
            message = "Missing password, please try again"
        elif not email and typed_password:
            message = "Missing email, please try again"
    return render_template('login.html', message=message)

@app.route('/createnew', methods=['GET', 'POST'])
def createnew():
    message = None
    if request.method == 'POST':
        if 'user' in session:
            user = session['user']
            uid = user['uid']
            name = request.form['name']
            description = request.form['description']
            data = '{}'

            project = get_db().insert_project(name,description,data,uid)

            if project is not None:
                return redirect('/project/' + project['pid'])
        else:
            message = "User not logged in"
            return render_template('createnew.html', message=message)
    return render_template('createnew.html', message=message)

@app.route('/report/<pid>', methods=['GET'])
def report(pid):
    message = "Cannot access that project"
    if 'user' in session:
        user = session['user']
        uid = user['uid']
        project = get_db().get_project(pid,uid)

        if project is not None:
            return render_template('report.html', project=project)
    session['message'] = message
    return redirect('/dashboard')

@app.route('/project/<pid>', methods=['GET'])
def project(pid):
    message = "Cannot access that project"
    if 'user' in session:
        user = session['user']
        uid = user['uid']
        project = get_db().get_project(pid,uid)

        if project is not None:
            return render_template('project.html', project=project)
    session['message'] = message
    return redirect('/dashboard')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/dashboard')
def dashboard():
    message = ""
    if 'user' in session:
        user = session['user']
        if 'message' in session:
            message = session['message']
            del session['message']

        projects = get_db().get_user_projects(user['uid'])
        return render_template(
            "dashboard.html",
            projects=projects,
            message=message,
            name=user['name']
        )
    return redirect("/logout")

@app.route('/<name>')
def generic(name):
    if 'user' in session:
        return render_template(name + '.html')
    else:
        return redirect('/login')

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "dev":
        app.run(host='127.0.0.1', port=8118, debug=True)
    else:
        app.run(host='0.0.0.0', port=8118, debug=False)
