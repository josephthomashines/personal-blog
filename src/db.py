import os
import re
import uuid
import sqlite3

SQLITE_PATH = os.path.join(os.path.dirname(__file__), 'msol.db')

def rand_uuid():
    return str(uuid.uuid4())

class Database:
    def __init__(self):
        self.conn = sqlite3.connect(SQLITE_PATH)
        self.init_db()

    def select(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        return c.fetchall()

    def execute(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        self.conn.commit()

    def close(self):
        self.conn.close()

    def init_db(self):
        queries = [
            """
            CREATE TABLE IF NOT EXISTS users (
                uid TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                encrypted_password TEXT NOT NULL
            )
            """,
            """
            CREATE TABLE IF NOT EXISTS projects (
                pid TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT,
                data TEXT NOT NULL,
                uid TEXT,
                FOREIGN KEY (uid) REFERENCES users(uid)
            )
            """,
        ]

        for query in queries:
            self.execute(query)

    def count_users_by_uid(self, uid):
        count = self.select("SELECT COUNT(*) FROM users WHERE uid=?",[uid])[0][0]
        return count

    def count_projects_by_pid(self, pid):
        count = self.select("SELECT COUNT(*) FROM projects WHERE pid=?",[pid])[0][0]
        return count

    def signup(self, email, encrypted_password):
        # Ensure unique uid
        uid = rand_uuid()
        while self.count_users_by_uid(uid) != 0:
            uid = rand_uuid()

        self.execute('INSERT INTO users (uid, email, encrypted_password) VALUES(?, ?, ?)',
                     [uid,email, encrypted_password])

    def insert_project(self, name, description, data, uid):
        # Ensure unique pid
        ipid = rand_uuid()
        while self.count_projects_by_pid(ipid) != 0:
            ipid = rand_uuid()

        self.execute('INSERT INTO projects (pid, name, description, data, uid) VALUES(?, ?, ?, ?, ?)',
                     [ipid, name,description,data,uid])

        rowid = self.select('SELECT last_insert_rowid()')[0][0]
        pid = self.select('SELECT * FROM projects WHERE rowid=?',[rowid])[0][0]
        return self.get_project(pid,uid)

    def update_project(self,uid,pid,data):
        self.execute('UPDATE projects SET data=? WHERE pid=? and uid=?',[data,pid,uid])
        return ""

    def get_project(self, pid, uid):
        data = self.select('SELECT * FROM projects WHERE pid=? and uid=?',[pid,uid])

        if data:
            data = data[0]
            return {
                'pid': data[0],
                'name': data[1],
                'description': data[2],
                'data': data[3],
            }
        else:
            return None

    def get_user(self, email):
        data = self.select('SELECT * FROM users WHERE email=?', [email])
        if data:
            d = data[0]
            return {
                'uid': d[0],
                'email': d[1],
                'encrypted_password': d[2],
            }
        else:
            return None

    def get_user_projects(self, uid):
        data = self.select('SELECT * FROM projects p WHERE p.uid=?', [uid])
        if data:
            return [{
                'pid': d[0],
                'name': d[1],
                'description': d[2],
                'data': d[3],
            } for d in data]

        else:
            return []

if __name__ == "__main__":
    db = Database()
