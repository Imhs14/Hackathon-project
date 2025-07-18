document.addEventListener('DOMContentLoaded', function () {

    // Logout button functionality
    document.getElementById('logoutBtn').addEventListener('click', function () {
        window.location.href = '/login';
    });

    // Glow effect on logout button (optional but visual)
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.classList.add('glow-button');

    // Handle form submission for class schedule
    document.getElementById('scheduleForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const className = document.getElementById('className').value;
        const classTime = document.getElementById('classTime').value;

        fetch('/api/class-schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ className, classTime }),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.success ? 'Class schedule added successfully' : 'Failed to add class schedule');
                document.getElementById('scheduleForm').reset();
            });
    });

    // Fetch and display PTM Slot requests
    function loadPTMSlotRequests() {
        fetch('/api/ptm-requests')
            .then(response => response.json())
            .then(data => {
                const ptmTableBody = document.querySelector('#ptmTable tbody');
                ptmTableBody.innerHTML = ''; // Clear previous rows
                data.forEach(request => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${request.studentName}</td>
                        <td>${request.requestedTime}</td>
                        <td>${request.status}</td>
                    `;
                    ptmTableBody.appendChild(row);
                });
            });
    }
    loadPTMSlotRequests();

    // Handle form submission for news/events
    document.getElementById('newsForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const newsText = document.getElementById('newsText').value;

        fetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newsText }),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.success ? 'News submitted successfully' : 'Failed to submit news');
                document.getElementById('newsForm').reset();
            });
    });

    // Handle form submission for placement news
    document.getElementById('placementForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const placementText = document.getElementById('placementText').value;

        fetch('/api/placement-news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ placementText }),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.success ? 'Placement news submitted successfully' : 'Failed to submit placement news');
                document.getElementById('placementForm').reset();
            });
    });

    // Handle form submission for uploading PTM slots
    document.getElementById('ptmSlotForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const ptmDate = document.getElementById('ptmDate').value;
        const ptmTime = document.getElementById('ptmTime').value;

        fetch('/api/ptm-slot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ptmDate, ptmTime }),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.success ? 'PTM slot uploaded successfully' : 'Failed to upload PTM slot');
                document.getElementById('ptmSlotForm').reset();
            });
    });

    // Handle form submission for uploading student data
    document.getElementById('studentDataForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const studentID = document.getElementById('studentID').value;
        const attendance = document.getElementById('attendance').value;
        const marks = document.getElementById('marks').value;
        const behavior = document.getElementById('behavior').value;
        const activities = document.getElementById('activities').value;

        fetch('/api/student-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentID, attendance, marks, behavior, activities }),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.success ? 'Student data uploaded successfully' : 'Failed to upload student data');
                document.getElementById('studentDataForm').reset();
            });
    });

    // Handle form submission for uploading book availability
    document.getElementById('bookUploadForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const bookTitle = document.getElementById('bookTitle').value;
        const author = document.getElementById('author').value;
        const quantity = document.getElementById('quantity').value;

        fetch('/api/book-availability', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookTitle, author, quantity }),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.success ? 'Book uploaded successfully' : 'Failed to upload book availability');
                document.getElementById('bookUploadForm').reset();
            });
    });

});
