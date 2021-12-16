import sqlite3 as sl

con = sl.connect('./db/my-test.db')

sql = 'INSERT INTO USER (id, name, age) values(?, ?, ?)'
data = [
    (1, 'Alice', 21),
    (2, 'Bob', 22),
    (3, 'Chris', 23)
]

with con:
    con.execute("""
        CREATE TABLE USER (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER
        );
    """)
    con.executemany(sql, data)
    data = con.execute("SELECT * FROM USER WHERE age <= 22")
    for row in data:
        print(row)
