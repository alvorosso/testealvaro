const grid = document.getElementById("grid");

for (const s of SITES) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="icon">${s.icon}</div>
    <div class="name">${s.name}</div>
    <div class="host">${new URL(s.url).host}</div>
    <a class="btn" href="viewer.html?s=${s.id}">Abrir</a>
    ${s.rotate ? `<a class="btn alt" href="viewer.html?s=${s.id}&land=1">Abrir deitado</a>` : ""}
  `;
  grid.appendChild(card);
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
