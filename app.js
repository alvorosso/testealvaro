const grid = document.getElementById("grid");
const dlg = document.getElementById("dlg");
const form = document.getElementById("form");
const editBtn = document.getElementById("edit");

let sites = loadSites();
let editing = false;

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

function link(text, href, cls) {
  const a = el("a", "btn " + (cls || ""), text);
  a.href = href;
  return a;
}

function render() {
  grid.replaceChildren();
  if (!sites.length) grid.appendChild(el("p", "empty", "Nenhum ambiente ainda. Toque em + Novo."));

  for (const s of sites) {
    const card = el("div", "card");
    card.append(el("div", "icon", s.icon || "🔗"), el("div", "name", s.name));
    let host = s.url;
    try { host = new URL(s.url).host; } catch (e) {}
    card.append(el("div", "host", host));

    const id = encodeURIComponent(s.id);
    card.append(link("Abrir", `viewer.html?s=${id}`));
    if (s.rotate) card.append(link("Abrir deitado", `viewer.html?s=${id}&land=1`, "alt"));

    if (editing) {
      const del = el("button", "btn danger", "Remover");
      del.onclick = () => {
        if (!confirm(`Remover "${s.name}"?`)) return;
        sites = sites.filter(x => x.id !== s.id);
        saveSites(sites);
        render();
      };
      card.append(del);
    }
    grid.appendChild(card);
  }
}

document.getElementById("add").onclick = () => { form.reset(); dlg.showModal(); };
document.getElementById("cancel").onclick = () => dlg.close();

editBtn.onclick = () => {
  editing = !editing;
  editBtn.textContent = editing ? "Concluir" : "Editar";
  render();
};

form.onsubmit = e => {
  e.preventDefault();
  const f = new FormData(form);
  const url = normalizeUrl(f.get("url"));
  if (!url) { alert("Endereço inválido."); return; }
  sites.push({
    id: "s" + Date.now(),
    name: f.get("name").trim(),
    icon: f.get("icon").trim() || "🔗",
    url,
    rotate: f.get("rotate") === "on",
  });
  saveSites(sites);
  dlg.close();
  render();
};

// Backup: copia a lista como texto / restaura a partir de texto
document.getElementById("backup").onclick = async () => {
  const txt = JSON.stringify(sites);
  try { await navigator.clipboard.writeText(txt); alert("Backup copiado. Cole em um lugar seguro."); }
  catch (e) { prompt("Copie o backup:", txt); }
};
document.getElementById("restore").onclick = () => {
  const txt = prompt("Cole o backup aqui:");
  if (!txt) return;
  try {
    const list = JSON.parse(txt);
    if (!Array.isArray(list)) throw 0;
    sites = list.filter(x => x && x.id && x.name && x.url);
    saveSites(sites);
    render();
  } catch (e) { alert("Backup inválido."); }
};

render();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
