let employees = [];
let events = [];

// Staffing ratios
const staffingRatios = {
  cocktail: 30,
  buffet: 25,
  plated: 15,
  vip: 10
};

// Shift preference fallback order
const shiftPriority = {
  morning: ["morning", "midday", "night"],
  midday: ["midday", "night", "morning"],
  night: ["night", "midday", "morning"]
};

// ADD EMPLOYEE
function addEmployee() {
  employees.push({
    name: empName.value,
    seniority: Number(empSeniority.value),
    maxHours: Number(empMaxHours.value),
    preference: empPreference.value,
    hours: 0
  });

  empName.value = "";
  empSeniority.value = "";
  empMaxHours.value = "";

  renderEmployees();
}

function renderEmployees() {
  employeeTable.innerHTML = "";
  employees
    .sort((a, b) => b.seniority - a.seniority)
    .forEach(e => {
      employeeTable.innerHTML += `
        <tr>
          <td>${e.name}</td>
          <td>${e.seniority}</td>
          <td>${e.maxHours}</td>
          <td>${e.preference}</td>
          <td>${e.hours}</td>
        </tr>`;
    });
}

// RECOMMEND STAFFING
function recommendStaff() {
  const guests = Number(eventGuests.value);
  const type = eventType.value;
  if (!guests || !type) return;

  const base = Math.ceil(guests / staffingRatios[type]);

  eventStaff.value = base;
  setupStaff.value = Math.max(1, Math.round(base * 0.4));
  cleanupStaff.value = Math.max(1, Math.round(base * 0.3));
}

// ADD EVENT
function addEvent() {
  events.push({
    name: eventName.value,
    date: eventDate.value,
    guests: Number(eventGuests.value),
    setup: Number(setupStaff.value),
    event: Number(eventStaff.value),
    cleanup: Number(cleanupStaff.value),
    bigEvent: Number(eventGuests.value) >= 300
  });

  eventName.value = "";
  eventDate.value = "";
  eventGuests.value = "";
  setupStaff.value = "";
  eventStaff.value = "";
  cleanupStaff.value = "";

  renderEvents();
}

function renderEvents() {
  eventTable.innerHTML = "";
  events.forEach(e => {
    eventTable.innerHTML += `
      <tr>
        <td>${e.name}</td>
        <td>${e.date}</td>
        <td>${e.guests}</td>
        <td>${e.setup}</td>
        <td>${e.event}</td>
        <td>${e.cleanup}</td>
      </tr>`;
  });
}

// GENERATE SCHEDULE
function generateSchedule() {
  employees.forEach(e => e.hours = 0);

  let demand = {
    morning: 0,
    midday: 0,
    night: 0
  };

  events.forEach(e => {
    demand.midday += e.setup * 2;
    demand.night += e.event * 4;
    demand.night += e.cleanup * 2;

    if (e.bigEvent) {
      demand.midday += e.setup * 2;
    }
  });

  employees
    .sort((a, b) => b.seniority - a.seniority)
    .forEach(emp => {
      let remaining = emp.maxHours;

      for (const shift of shiftPriority[emp.preference]) {
        if (remaining <= 0) break;
        if (demand[shift] <= 0) continue;

        const assign = Math.min(remaining, demand[shift]);
        emp.hours += assign;
        demand[shift] -= assign;
        remaining -= assign;
      }
    });

  renderEmployees();
  alert("Schedule generated using seniority, preferences, and event demand.");
}
