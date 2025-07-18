const roleRadios = document.querySelectorAll('input[name="role"]');
const form = document.getElementById("loginForm");

function updateFields() {
  const role = document.querySelector('input[name="role"]:checked').value;
  document.querySelectorAll('.student-field').forEach(el => el.style.display = role === 'student' ? 'block' : 'none');
  document.querySelectorAll('.faculty-field').forEach(el => el.style.display = role === 'faculty' ? 'block' : 'none');
  document.querySelectorAll('.parent-field').forEach(el => el.style.display = role === 'parent' ? 'block' : 'none');
}

// Run on role change
roleRadios.forEach(radio => {
  radio.addEventListener('change', updateFields);
});

// Run on page load
updateFields();

// Validate required fields
form.addEventListener("submit", function (e) {
  const role = document.querySelector('input[name="role"]:checked').value;
  let fieldIds = [];

  if (role === 'student') {
    fieldIds = ['student-name', 'student-id', 'student-branch', 'student-year', 'student-course'];
  } else if (role === 'faculty') {
    fieldIds = ['faculty-name', 'faculty-id'];
  } else if (role === 'parent') {
    fieldIds = ['parent-student-name', 'parent-student-id', 'parent-id'];
  }

  let isValid = true;

  // Clear hidden inputs before submit
  document.querySelectorAll('.student-field, .faculty-field, .parent-field').forEach(el => {
    if (el.style.display === 'none') {
      const input = el.querySelector('input');
      if (input) input.value = '';  // clear hidden field value
    }
  });

  // Validate visible inputs
  fieldIds.forEach(id => {
    const input = document.getElementById(id);
    if (!input || !input.value.trim()) {
      if (input) input.style.border = "2px solid red";
      isValid = false;
    } else {
      input.style.border = "";
    }
  });

  if (!isValid) {
    e.preventDefault();  // Prevent form submission only if validation fails
    alert("Please fill all required fields!");
  }
});
