// Dummy timetable for availability (for today only)
const availabilitySchedules = {
  "john": ["09:00", "11:00", "14:00"],
  "sara": ["10:00", "13:00", "16:00"],
  "amit": ["09:30", "12:30", "15:00"]
};

function checkAvailability() {
  const name = document.getElementById("availabilityName1").value.toLowerCase().trim();
  const time = document.getElementById("checkTime").value;
  const result = document.getElementById("availabilityResult");

  if (!availabilitySchedules[name]) {
    result.textContent = "Faculty not found.";
    result.style.color = "red";
    return;
  }

  const isAvailable = availabilitySchedules[name].includes(time);

  result.textContent = isAvailable
    ? `✅ ${capitalize(name)} is available at ${time}.`
    : `❌ ${capitalize(name)} is NOT available at ${time}.`;
  result.style.color = isAvailable ? "green" : "red";
}

function showAvailableTimes() {
  const name = document.getElementById("availabilityName2").value.toLowerCase().trim();
  const list = document.getElementById("availableTimesList");

  list.innerHTML = "";

  if (!availabilitySchedules[name]) {
    list.innerHTML = "<li style='color:red;'>Faculty not found.</li>";
    return;
  }

  availabilitySchedules[name].forEach(time => {
    const li = document.createElement("li");
    li.textContent = `${capitalize(name)} is available at ${time}`;
    list.appendChild(li);
  });
}

function showTodaysSchedule() {
  const name = document.getElementById("availabilityName3").value.toLowerCase().trim();
  const list = document.getElementById("todaysScheduleList");
  list.innerHTML = "";

  if (!name) {
    list.innerHTML = "<li style='color:red;'>Please enter a faculty name.</li>";
    return;
  }

  if (!availabilitySchedules[name]) {
    list.innerHTML = "<li style='color:red;'>Faculty not found.</li>";
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${capitalize(name)}: ${availabilitySchedules[name].join(', ')}`;
  li.style.backgroundColor = "#e6f2ff";
  li.style.padding = "10px";
  li.style.marginBottom = "8px";
  li.style.borderRadius = "8px";
  list.appendChild(li);
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
