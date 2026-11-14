# Continuar na VPS: resumo da conversa

Gerado em 2026-11-14. Repositório: https://github.com/alvorosso/testealvaro (branch `app-atalhos`).

## Objetivo

App Android (PWA) com ícones de atalho para os ambientes:

| Atalho | Endereço | Observação |
|---|---|---|
| 💻 Terminal | https://term.alvorosso.com.br | |
| 🌐 Web | https://web.alvorosso.com.br | tem "Abrir deitado" |
| 📁 Arquivos | https://files.alvorosso.com.br | FileBrowser Quantum (`gtstef/filebrowser:2.0.1-stable`, Docker) |

Novos atalhos são adicionados pelo próprio app (botão **+ Novo**), sem editar código.

## Estado atual

- Branch `app-atalhos` enviada ao GitHub. **Nenhum pull request criado.**
- Testado só em Chromium headless com perfil de celular. **Não testado em Android real.**
- Arquivos: `index.html`, `viewer.html`, `app.js`, `sites.js`, `style.css`, `sw.js`, `manifest.webmanifest`, `icons/`.
- A lista de atalhos fica no `localStorage` do celular (há "Copiar backup" e "Restaurar").
- `sites.js` define só a lista padrão da primeira abertura.

## Comandos usados (para repetir na VPS)

Clonar a branch:

```bash
git clone --branch app-atalhos https://github.com/alvorosso/testealvaro
cd testealvaro
```

Testar localmente:

```bash
python3 -m http.server 8080
# abrir http://localhost:8080/index.html
```

Os ícones foram gerados com Pillow (`icons/icon-192.png` e `icons/icon-512.png`).

Commits feitos (todos na branch `app-atalhos`):
1. Adiciona app PWA com atalhos para Terminal e Web
2. Permite adicionar, remover e fazer backup dos atalhos pelo app
3. Adiciona atalho Arquivos

## Pendente / não feito

1. **Publicar o app em HTTPS** para instalar no Android. Opção simples: GitHub Pages (Settings → Pages → branch `app-atalhos` ou `main`, pasta `/`).
2. **Login único com Cloudflare Access** (NÃO foi feito; não consegui acessar o Chrome nem o painel da Cloudflare nesta sessão):
   - Cloudflare → Zero Trust → Settings → Authentication: escolher método (código por email, Google ou GitHub).
   - Access → Applications → Add → Self-hosted: adicionar `term`, `web` e `files` de alvorosso.com.br, com duração de sessão de 7 a 30 dias.
   - Política *Allow* somente para o seu email/conta.
   - DNS dos três com proxy ligado (nuvem laranja).
   - Fechar o acesso direto à VPS: usar Cloudflare Tunnel ou liberar no firewall só os IPs da Cloudflare. Não expor a porta 22 sem necessidade.
3. **Ajustar o app para o Access.** Hoje os sites abrem dentro de um iframe (`viewer.html`). A tela de login da Cloudflare não abre em iframe e os cookies podem ser bloqueados. Solução proposta: fazer "Abrir" abrir o site direto, e repensar "Abrir deitado" (que depende do iframe).
4. Conferir na documentação do FileBrowser Quantum: WebDAV/SFTP, app móvel e login externo (OIDC). Não verifiquei.
5. Decidir se cria o pull request para a `main`.

## Outros assuntos da conversa

- Remote Control: na VPS, rodar o Claude Code e `claude remote-control`, para abrir a sessão em claude.ai/code. Use `tmux` para manter ativo.
- Dota 2 no Linux Mint (quarta-feira): rodar o Claude Code no Mint e reunir mensagem de erro, GPU/driver, Steam nativo ou Flatpak, opções de lançamento. Logs em `~/.steam/steam/logs/`.
- Email de emergência: Proton/Tuta/Fastmail como reserva, domínio próprio, Signal e WhatsApp, contatos exportados, códigos de recuperação impressos.
- A sessão na nuvem não alcança a VPS. O host `files.alvorosso.com.br` está bloqueado na rede dela, e a liberação foi recusada.
