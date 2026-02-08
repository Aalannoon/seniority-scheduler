let employees = [];
let events = [];

function addEmployee() {
  const name = empName.value;
  const seniority = Number(empSeniority.value);
  const maxHours = Number(empMaxHours.value);

  if (!name || !seniority || !maxHours) return;

  employees.push({
    name,
    seniority,
    maxHours,
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
          <td data-label="Max">${e.maxHours}</td>
          <td data-label="Assigned">${e.hours}</td>
        </tr>
      `;
    });
}

function addEvent() {
  const event = {
    name: eventName.value,
    date: eventDate.value,
    start: eventStart.value,
    end: eventEnd.value,
    staff: Number(eventStaff.value)
  };

  if (!event.name || !event.date || !event.start || !event.end || !event.staff) return;

  events.push(event);
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
  alert("Scheduling engine comes next 🚧");
}
