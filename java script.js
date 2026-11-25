// ---- Doctor database (mock) ----
const doctors = [
  { name: "Dr. Arjun Mehta", specialty: "Cardiologist", problems: ["heart", "chest", "bp"], time: "10:00 AM" },
  { name: "Dr. Priya Sharma", specialty: "Dermatologist", problems: ["skin", "acne", "rash"], time: "11:30 AM" },
  { name: "Dr. Ravi Kumar", specialty: "Orthopedic", problems: ["bone", "joint", "fracture"], time: "2:00 PM" },
  { name: "Dr. Sneha Patel", specialty: "Ophthalmologist", problems: ["eye", "vision"], time: "9:00 AM" },
  { name: "Dr. Vikram Rao", specialty: "Neurologist", problems: ["brain", "headache", "nerve"], time: "4:00 PM" },
  { name: "Dr. Anjali Nair", specialty: "General Physician", problems: ["fever", "cold", "general"], time: "8:00 AM" }
];

let tokenCounter = 100;

function searchDoctor() {
  const query = document.getElementById("problemInput").value.toLowerCase().trim();
  const results = document.getElementById("doctorResults");
  results.innerHTML = "";

  if (!query) { results.innerHTML = "<p>Please enter a health problem.</p>"; return; }

  const matches = doctors.filter(d =>
    d.problems.some(p => p.includes(query)) ||
    d.specialty.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    results.innerHTML = "<p>No doctor found for that problem. Try: heart, skin, bone, eye, brain, fever.</p>";
    return;
  }

  matches.forEach(doc => {
    results.innerHTML += `
      <div class="doctor-card">
        <strong>${doc.name}</strong> — ${doc.specialty}<br>
        Available at: ${doc.time}<br>
        <button onclick="confirmAppointment('${doc.name}', '${doc.time}')">Confirm Appointment</button>
      </div>`;
  });
}

function confirmAppointment(name, time) {
  tokenCounter++;
  document.getElementById("tokenBox").classList.remove("hidden");
  document.getElementById("tDoctor").textContent = name;
  document.getElementById("tToken").textContent = "T-" + tokenCounter;
  document.getElementById("tTime").textContent = time;
}

// ---- Blood donation ----
function submitBlood() {
  const group = document.getElementById("bloodGroup").value;
  const qty = document.getElementById("bloodQty").value;
  const msg = document.getElementById("bloodMsg");

  if (!group || !qty || qty < 100) {
    msg.classList.remove("hidden");
    msg.style.background = "#fee2e2";
    msg.textContent = "⚠️ Please select a blood group and enter quantity (min 100 ml).";
    return;
  }
  msg.classList.remove("hidden");
  msg.style.background = "#d1fae5";
  msg.textContent = `✅ Thank you! ${qty} ml of ${group} blood donation registered. You'll save up to 3 lives.`;
}

// ---- Organ donation ----
function submitOrgan() {
  const name = document.getElementById("donorName").value.trim();
  const organs = [...document.querySelectorAll(".organ-grid input:checked")].map(i => i.value);
  const msg = document.getElementById("organMsg");

  if (!name || organs.length === 0) {
    msg.classList.remove("hidden");
    msg.style.background = "#fee2e2";
    msg.textContent = "⚠️ Enter your name and select at least one organ.";
    return;
  }
  msg.classList.remove("hidden");
  msg.style.background = "#d1fae5";
  msg.textContent = `✅ Thank you, ${name}! You pledged to donate: ${organs.join(", ")}.`;
}