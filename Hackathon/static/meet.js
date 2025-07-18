document.getElementById('meetForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const faculty = document.getElementById('facultyName').value.trim();
    const date = document.getElementById('meetDate').value;
    const time = document.getElementById('meetTime').value;
    const purpose = document.getElementById('purpose').value.trim();
  
    if (!faculty || !date || !time || !purpose) {
      alert("❗ Please fill in all fields.");
      return;
    }
  
    alert(`✅ Meeting request sent to ${faculty} on ${date} at ${time}.\nPurpose: ${purpose}`);
    this.reset();
  });
  