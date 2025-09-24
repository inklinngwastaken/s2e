const SUPABASE_URL = "https://ffthzdqohddlgewbotwu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdGh6ZHFvaGRkbGdld2JvdHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzYxMjUsImV4cCI6MjA3NDMxMjEyNX0.KEFDQSbeTs3Sl0kwHoPMod2YfAgNCZuvHHfw0L75A8o";
const releaseDate = new Date("2025-06-05");
function updateDaysCounter() {
  const now = new Date();
  const diff = Math.floor((now - releaseDate) / (1000 * 60 * 60 * 24));
  document.getElementById("daysCounter").textContent =
    `Days since Switch 2 release: ${diff}`;
}
updateDaysCounter();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]
  ));
}

async function loadEmulators() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/emulators?select=*,features(*)`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      }
    );
    const emulators = await res.json();

    const emulatorList = document.getElementById("emulators");
    emulatorList.innerHTML = "";

    emulators.forEach(emu => {
      const div = document.createElement("div");
      div.className = "emulator";
      div.innerHTML = `
        <h3>${escapeHtml(emu.name)} <small>(${escapeHtml(emu.status)})</small></h3>
        <div class="features">
          <h4>Features:</h4>
          <ul>
            ${emu.features.map(f => `
              <li class="${f.done ? "done" : "wip"}">
                ${escapeHtml(f.name)} - ${f.done ? "✅ Done" : "⚠️ WIP"}
              </li>
            `).join("")}
          </ul>
        </div>
      `;
      emulatorList.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading emulators:", err);
  }
}

loadEmulators();
