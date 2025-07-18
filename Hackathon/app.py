from flask import Flask, render_template, request, redirect, url_for, jsonify, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Needed for session management

# -------------------- Initialize Database --------------------

def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    # Users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            role TEXT,
            name TEXT,
            extra_info TEXT
        )
    ''')

    # Meeting request table
    c.execute('''
        CREATE TABLE IF NOT EXISTS meet_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT,
            faculty_name TEXT,
            reason TEXT,
            date TEXT,
            time TEXT
        )
    ''')

    conn.commit()
    conn.close()

init_db()

# -------------------- Routes --------------------

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    role = request.form.get('role')
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    if role == 'student':
        name = request.form.get('student-name')
        student_id = request.form.get('student-id')
        branch = request.form.get('student-branch')
        year = request.form.get('student-year')
        course = request.form.get('student-course')
        extra = f"ID: {student_id}, Branch: {branch}, Year: {year}, Course: {course}"
        c.execute('INSERT INTO users (role, name, extra_info) VALUES (?, ?, ?)', (role, name, extra))
        conn.commit()
        conn.close()
        session['user_role'] = role
        session['user_name'] = name
        return redirect(url_for('student'))

    elif role == 'faculty':
        name = request.form.get('faculty-name')
        faculty_id = request.form.get('faculty-id')
        extra = f"Faculty ID: {faculty_id}"
        c.execute('INSERT INTO users (role, name, extra_info) VALUES (?, ?, ?)', (role, name, extra))
        conn.commit()
        conn.close()
        session['user_role'] = role
        session['user_name'] = name
        return redirect(url_for('faculty'))

    elif role == 'parent':
        parent_id = request.form.get('parent-id')
        student_name = request.form.get('parent-student-name')
        student_id = request.form.get('parent-student-id')
        extra = f"Student: {student_name} ({student_id})"
        c.execute('INSERT INTO users (role, name, extra_info) VALUES (?, ?, ?)', (role, parent_id, extra))
        conn.commit()
        conn.close()
        session['user_role'] = role
        session['user_name'] = parent_id
        return redirect(url_for('parent'))

    conn.close()
    return "Unknown role"

# ✅ FIXED logout route (supports POST from JS or GET from browser)
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    if request.method == 'POST':
        return '', 204  # No content for fetch
    return redirect('/')

@app.route('/student')
def student():
    return render_template('student.html')

@app.route('/faculty')
def faculty():
    return render_template('faculty.html')

@app.route('/availability')
def availability():
    return render_template('availability.html')

@app.route('/parent')
def parent():
    return render_template('parent.html')

@app.route('/meet-request')
def meet_request():
    return render_template('meet.html')

@app.route('/send-request', methods=['POST'])
def send_request():
    student_name = request.form.get('student-name')
    faculty_name = request.form.get('faculty-name')
    reason = request.form.get('reason')
    date = request.form.get('date')
    time = request.form.get('time')

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO meet_requests (student_name, faculty_name, reason, date, time)
        VALUES (?, ?, ?, ?, ?)
    ''', (student_name, faculty_name, reason, date, time))
    conn.commit()
    conn.close()

    return render_template('request_success.html')

@app.route('/books')
def books():
    return render_template('books.html', searched=False)

@app.route('/check-book', methods=['POST'])
def check_book():
    book_name = request.form.get('book-name')

    book_list = [
        {"title": "Introduction to AI", "author": "John McCarthy", "status": "Available"},
        {"title": "Python Programming", "author": "Guido van Rossum", "status": "Issued"},
        {"title": "Database Systems", "author": "C.J. Date", "status": "Available"},
        {"title": "Operating Systems", "author": "Abraham Silberschatz", "status": "Issued"},
        {"title": "Computer Networks", "author": "Andrew S. Tanenbaum", "status": "Available"},
    ]

    found_book = None
    for book in book_list:
        if book_name.lower() in book['title'].lower() or book_name.lower() in book['author'].lower():
            found_book = book
            break

    return render_template('books.html', book=found_book, searched=True)

@app.route('/notifications')
def notifications():
    return render_template('notifications.html')

@app.route('/attendance')
def attendance():
    return render_template('attendance.html')

@app.route('/events')
def events():
    return render_template('events.html')

# -------------------- Faculty Dashboard API --------------------

@app.route('/api/ptm-requests')
def get_ptm_requests():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT student_name, date || " " || time, reason FROM meet_requests')
    rows = c.fetchall()
    conn.close()

    ptm_data = [{"studentName": r[0], "requestedTime": r[1], "status": r[2]} for r in rows]
    return jsonify(ptm_data)

@app.route('/api/class-schedule', methods=['POST'])
def add_class_schedule():
    data = request.get_json()
    class_name = data.get('className')
    class_time = data.get('classTime')

    print(f"[Class Schedule] Class: {class_name} at {class_time}")
    return jsonify({"message": "Class schedule added successfully"})

@app.route('/api/news', methods=['POST'])
def submit_news():
    data = request.get_json()
    news_text = data.get('newsText')

    print(f"[News Submitted] {news_text}")
    return jsonify({"message": "News submitted successfully"})

# -------------------- Run App --------------------

if __name__ == '__main__':
    app.run(debug=True) 