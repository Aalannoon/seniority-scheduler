let employees = [];
let events =;

// Grab elements once
const empName = document.getElementById("empName");
const empSeniority = document.getElementById("empSeniority");
const empMaxHours = document.getElementById("empMaxHours");
const employeeTable = document.getElementById("employeeTable");

const eventName = document.getElementById("eventName");
const eventDate = document.getElementById("eventDate");
const eventStart = document.getElementById("eventStart");
const eventEnd = document.getElementById("eventEnd");
const eventStaff = document.getElementById("eventStaff");
const eventTable = document.getElementById("eventTable");

function addEmployee() {
  if (!empName.value || !empSeniority.value || !empMaxHours.value) return;

  employees.push({
    name: empName.value,
    seniority: Number(empSeniority.value),
    maxHours: Number(empMaxHours.value),
    hours: 0
  });

  empName.value = empSeniority.value = empMaxHours.value = "";
  renderEmployees();
}

function renderEmployees() {
  employeeTable.innerHTML = "";
  employees
    .sort((a, b) => b.seniority - a.seniority)
    .forEach(e => {
      employeeTable.innerHTML += `
        <tr>
          <td data-label="Name">${e.name}</td>
          <td data-label="Seniority">${e.seniority}</td>
          <td data-label="Max Hours">${e.maxHours}</td>
          <td data-label="Assigned">${e.hours}</td>
        </tr>
      `;
    });
}

function addEvent() {
  if (!eventName.value || !eventDate.value || !eventStart.value || !eventEnd.value || !eventStaff.value) return;

  events.push({
    name: eventName.value,
    date: eventDate.value,
    start: eventStart.value,
    end: eventEnd.value,
    staff: Number(eventStaff.value)
  });

  eventName.value = eventDate.value = eventStart.value = eventEnd.value = eventStaff.value = "";
  renderEvents();
}

function renderEvents() {
  eventTable.innerHTML = "";
  events.forEach(e => {
    eventTable.innerHTML += `
      <tr>
        <td data-label="Event">${e.name}</td>
        <td data-label="Date">${e.date}</td>
        <td data-label="Time">${e.start} – ${e.end}</td>
        <td data-label="Servers">${e.staff}</td>
      </tr>
    `;
  });
}

function generateSchedule() {
  alert("Next step: seniority-first auto scheduling 🚀");
}
