const API_URL = "https://9369fcad76d7.ngrok-free.app"; 

async function loadEmulators() {
  try {
    const res = await fetch(`${API_URL}/emulators`);
    if (!res.ok) throw new Error("API not reachable");
    const emulators = await res.json();
    renderEmulators(emulators);
  } catch (err) {
    console.warn("API unavailable, using fallback.json →", err.message);
    try {
      const res = await fetch("fallback.json");
      const emulators = await res.json();
      renderEmulators(emulators);
    } catch (fallbackErr) {
      console.error("Fallback also failed →", fallbackErr.message);
      document.getElementById("emulatorList").innerHTML =
        "<p style='color:red;'>No emulator data available.</p>";
    }
  }
}

function renderEmulators(emulators) {
  const list = document.getElementById("emulatorList");
  list.innerHTML = "";

  emulators.forEach(emulator => {
    const div = document.createElement("div");
    div.className = "emulator";

    div.innerHTML = `
      <h3>${emulator.name}</h3>
      <ul>
        ${emulator.features
          .map(
            f =>
              `<li>${f.name} — ${f.done ? "✅ Done" : "🚧 WIP"}</li>`
          )
          .join("")}
      </ul>
    `;

    list.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", loadEmulators);
