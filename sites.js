// Ambientes padrão (aparecem na primeira vez que o app abre).
// Depois disso, a lista fica salva no celular e é editada pelo botão "+ Novo" do app.
const DEFAULT_SITES = [
  { id: "term", name: "Terminal", icon: "💻", url: "https://term.alvorosso.com.br", rotate: false },
  { id: "web",  name: "Web",      icon: "🌐", url: "https://web.alvorosso.com.br",  rotate: true },
];

function loadSites() {
  try {
    const s = JSON.parse(localStorage.getItem("sites"));
    if (Array.isArray(s)) return s;
  } catch (e) {}
  return DEFAULT_SITES.map(x => ({ ...x }));
}

function saveSites(list) {
  try { localStorage.setItem("sites", JSON.stringify(list)); } catch (e) {}
}

// Aceita "meusite.com" e completa com https://
function normalizeUrl(u) {
  u = u.trim();
  if (!u) return "";
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  try { return new URL(u).href.replace(/\/$/, ""); } catch (e) { return ""; }
}
