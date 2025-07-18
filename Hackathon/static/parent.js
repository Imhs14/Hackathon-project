function getStudentData() {
    const marksSection = document.getElementById("marks-section");
    const attendanceSection = document.getElementById("attendance-section");

    // Fake marks data
    const marks = {
        Math: 92,
        Physics: 85,
        Chemistry: 88,
        English: 90,
        Computer: 95
    };

    // Fake attendance data
    const attendance = {
        'Math': '92%',
        'Physics': '88%',
        'Chemistry': '90%',
        'English': '95%',
        'Computer': '96%'
    };

    // Populate marks
    let marksHTML = "<ul>";
    for (let subject in marks) {
        marksHTML += `<li><strong>${subject}:</strong> ${marks[subject]}</li>`;
    }
    marksHTML += "</ul>";
    marksSection.innerHTML += marksHTML;

    // Populate attendance
    let attendanceHTML = "<ul>";
    for (let subject in attendance) {
        attendanceHTML += `<li><strong>${subject}:</strong> ${attendance[subject]}</li>`;
    }
    attendanceHTML += "</ul>";
    attendanceSection.innerHTML += attendanceHTML;
}
