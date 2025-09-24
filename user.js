// 🔹 Replace these with your Supabase values
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_KEY = "YOUR-ANON-KEY";

// Days counter (Switch 2 release date example: Sept 12, 2025)
const releaseDate = new Date("2025-09-12");
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
