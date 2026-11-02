(() => {
  /* ===== Réglages ===== */
  const CONTACT_EMAIL = 'zstudiocrochet@gmail.com'; // ← l’adresse qui reçoit les lettres (affichée aussi sur le site)
  const FORMSUBMIT_ID = '';   // ← facultatif : le code que FormSubmit donne après l’activation, pour cacher l’adresse dans le code
  const INSTAGRAM_USER = 'z_studio_crochet';

  const { CATS, CREATIONS, media, catLabel, esc } = ZSC;
  ZSC.mountDefs();
  const $ = (s) => document.querySelector(s);
  const byId = (id) => CREATIONS.find((c) => c.id === id);
  const smooth = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  const heartSvg = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>';

  document.querySelectorAll('[data-illus]').forEach((el) => {
    const c = byId(el.dataset.illus);
    el.style.background = c.bg;
    el.innerHTML = media(c);
  });

  /* Menu mobile */
  const menuBtn = $('.menu-btn'), mnav = $('#mnav');
  menuBtn.addEventListener('click', () => {
    const open = mnav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  mnav.addEventListener('click', (e) => { if (e.target.closest('a')) { mnav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });

  /* Ruban défilant */
  const dot = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#F7D2DA" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';
  const words = ['doudous', 'accessoires', 'déco douce', 'vêtements', 'sur commande', 'fait main'];
  const run = words.map((w) => `<span>${w}${dot}</span>`).join('');
  $('#marquee').innerHTML = run + run + run + run;

  /* Coups de cœur (gardés dans ce navigateur) */
  let favs = [];
  try { favs = JSON.parse(localStorage.getItem('zsc-favs') || '[]').filter((id) => byId(id)); } catch (e) { favs = []; }
  const saveFavs = () => { try { localStorage.setItem('zsc-favs', JSON.stringify(favs)); } catch (e) { /* stockage indisponible */ } };
  const isFav = (id) => favs.includes(id);
  function toggleFav(id) {
    favs = isFav(id) ? favs.filter((x) => x !== id) : [...favs, id];
    saveFavs(); syncFavs();
  }
  function syncFavs() {
    $('#fav-count').textContent = favs.length;
    document.querySelectorAll('.heart[data-id]').forEach((b) => {
      const on = isFav(b.dataset.id), c = byId(b.dataset.id);
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', (on ? 'Retirer ' : 'Ajouter ') + c.name + (on ? ' des coups de cœur' : ' aux coups de cœur'));
    });
    $('#fav-list').innerHTML = favs.map((id) => {
      const c = byId(id);
      return `<li><span class="th" style="background:${c.bg}">${media(c)}</span><span class="nm">${esc(c.name)}</span><button type="button" data-remove="${c.id}" aria-label="Retirer ${esc(c.name)}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></li>`;
    }).join('');
    $('#fav-empty').hidden = favs.length > 0;
    $('#fav-ask').hidden = favs.length === 0;
    if (modalItem) $('#m-fav').textContent = isFav(modalItem.id) ? 'Retirer des coups de cœur' : 'Ajouter aux coups de cœur';
  }

  /* Collections */
  const collBg = { doudous: '#F7D2DA', accessoires: '#FCE8EC', maison: '#F1DFD0', vetements: '#FDF1EA' };
  $('#strip').innerHTML = CATS.map((k) => {
    const items = CREATIONS.filter((c) => c.cat === k.id), first = items[0];
    return `<a class="coll" href="#mur" data-cat="${k.id}">
      <span class="ph" style="background:${collBg[k.id]}">${media(first)}</span>
      <span class="body"><span><h3>${k.label}</h3><small>${items.length} création${items.length > 1 ? 's' : ''}</small></span>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
    </a>`;
  }).join('');
  $('#strip').addEventListener('click', (e) => { const a = e.target.closest('[data-cat]'); if (a) setFilter(a.dataset.cat); });
  const stripBy = (d) => { const s = $('#strip'), w = s.querySelector('.coll').getBoundingClientRect().width + 20; s.scrollBy({ left: d * w, behavior: smooth }); };
  $('#strip-prev').addEventListener('click', () => stripBy(-1));
  $('#strip-next').addEventListener('click', () => stripBy(1));

  /* Le mur */
  let filter = 'all';
  const rot = [-3, 2, -1.5, 3, -2.5, 1.5];
  const tapes = ['rgba(247, 210, 218, .92)', 'rgba(227, 195, 168, .8)', 'rgba(194, 19, 79, .28)', 'rgba(241, 223, 208, .95)'];
  $('#stickers').innerHTML = [{ id: 'all', label: 'Tout voir' }, ...CATS].map((k) => `<button type="button" class="stk" data-f="${k.id}" aria-pressed="${k.id === 'all'}">${k.label}</button>`).join('');
  $('#stickers').addEventListener('click', (e) => { const b = e.target.closest('.stk'); if (b) setFilter(b.dataset.f, true); });
  function setFilter(id, stay) {
    filter = id;
    document.querySelectorAll('.stk').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === id)));
    renderWall();
    if (!stay) setTimeout(() => $('#mur').scrollIntoView({ behavior: smooth }), 0);
  }
  function renderWall() {
    const list = filter === 'all' ? CREATIONS : CREATIONS.filter((c) => c.cat === filter);
    $('#polas').innerHTML = list.map((c, i) => `
      <li style="--r:${rot[i % rot.length]}deg">
        <span class="tape" style="--tape:${tapes[i % tapes.length]};--tr:${i % 2 ? 3 : -4}deg"></span>
        <button type="button" class="pola-photo" data-open="${c.id}" aria-label="Voir ${esc(c.name)} de plus près" style="background:${c.bg}">${media(c)}${c.isNew ? '<span class="new-tag">nouveau !</span>' : ''}</button>
        <div class="pola-cap"><span><span class="t">${esc(c.name)}</span><small>${catLabel(c.cat)}</small></span>
        <button type="button" class="heart" data-id="${c.id}" aria-pressed="false">${heartSvg}</button></div>
      </li>`).join('');
    syncFavs();
  }
  $('#polas').addEventListener('click', (e) => {
    const h = e.target.closest('.heart');
    if (h) { toggleFav(h.dataset.id); return; }
    const p = e.target.closest('[data-open]');
    if (p) openModal(p.dataset.open, p);
  });

  /* Fenêtre détail */
  const modal = $('#modal');
  let modalItem = null, modalOpener = null;
  function openModal(id, from) {
    const c = byId(id);
    modalItem = c; modalOpener = from;
    $('#m-media').style.background = c.bg;
    $('#m-media').innerHTML = media(c);
    $('#m-cap').textContent = c.name;
    $('#m-cat').textContent = catLabel(c.cat).toLowerCase();
    $('#m-name').textContent = c.name;
    $('#m-desc').textContent = c.desc;
    $('#m-mat').textContent = c.matiere;
    syncFavs();
    modal.showModal();
  }
  $('#m-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', () => { if (modalOpener) modalOpener.focus({ preventScroll: true }); });
  $('#m-fav').addEventListener('click', () => toggleFav(modalItem.id));
  $('#m-order').addEventListener('click', () => {
    modalOpener = null; modal.close();
    prefill('commander une création', `J’aimerais commander « ${modalItem.name} ». Mes couleurs préférées : `);
  });

  /* Tiroir des coups de cœur */
  const drawer = $('#drawer');
  $('#fav-open').addEventListener('click', () => drawer.showModal());
  $('#dr-close').addEventListener('click', () => drawer.close());
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) { drawer.close(); return; }
    const r = e.target.closest('[data-remove]');
    if (r) toggleFav(r.dataset.remove);
  });
  $('#fav-ask').addEventListener('click', () => {
    drawer.close();
    prefill('commander une création', 'J’ai eu un coup de cœur pour :\n' + favs.map((id) => '• ' + byId(id).name).join('\n') + '\n\nMes couleurs préférées : ');
  });

  /* Lettre */
  const form = $('#letter-form'), done = $('#l-done'), sent = $('#l-sent'), status = $('#l-status');
  let summary = '';
  let sender = { name: '', email: '', type: '' };

  // Sur téléphone, ig.me ouvre directement la conversation dans l’appli Instagram.
  // Sur ordinateur, ce lien ne marche pas : on ouvre le profil (bouton « Envoyer un message »).
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  $('#send-insta').href = isMobile ? `https://ig.me/m/${INSTAGRAM_USER}` : `https://www.instagram.com/${INSTAGRAM_USER}/`;
  $('#mail-sub').textContent = 'Directement dans ma boîte';
  if (CONTACT_EMAIL) $('#email-text').innerHTML = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;

  function showForm() { done.hidden = true; sent.hidden = true; form.hidden = false; }
  function prefill(type, text) {
    $('#l-type').value = type;
    $('#l-msg').value = text;
    showForm();
    $('#contact').scrollIntoView({ behavior: smooth });
    setTimeout(() => { const m = $('#l-msg'); m.focus({ preventScroll: true }); m.setSelectionRange(m.value.length, m.value.length); }, 450);
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#l-name'), email = $('#l-email'), msg = $('#l-msg'), errs = [];
    [name, email, msg].forEach((f) => f.removeAttribute('aria-invalid'));
    if (!name.value.trim()) { errs.push('ton prénom'); name.setAttribute('aria-invalid', 'true'); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { errs.push('une adresse e-mail valide'); email.setAttribute('aria-invalid', 'true'); }
    if (!msg.value.trim()) { errs.push('ton idée'); msg.setAttribute('aria-invalid', 'true'); }
    if (errs.length) { $('#l-error').textContent = 'Il manque ' + errs.join(', ') + ' sur ta lettre.'; return; }
    $('#l-error').textContent = '';
    sender = { name: name.value.trim(), email: email.value.trim(), type: $('#l-type').value };
    summary = `Coucou z_studio_crochet !\n\nJe m’appelle ${sender.name} et j’ai envie de ${sender.type}.\n\n${msg.value.trim()}\n\nMon e-mail : ${sender.email}`;
    $('#l-summary').textContent = summary;
    status.textContent = '';
    $('#mail-fallback').hidden = true;
    form.hidden = true; done.hidden = false;
    $('#send-insta').focus();
  });
  $('#l-edit').addEventListener('click', () => { showForm(); $('#l-msg').focus(); });

  /* Choix 1 : Instagram. On copie la lettre, puis le lien ouvre la conversation */
  $('#send-insta').addEventListener('click', () => {
    const tip = isMobile
      ? 'Ta lettre est copiée ! Dans la conversation Instagram qui s’ouvre, appuie longuement puis « Coller », et envoie.'
      : 'Ta lettre est copiée ! Sur Instagram, clique sur « Envoyer un message », colle ta lettre (Ctrl + V) et envoie.';
    navigator.clipboard.writeText(summary)
      .then(() => { status.textContent = tip; })
      .catch(() => { status.textContent = 'Copie ta lettre ci-dessus, puis colle-la dans la conversation Instagram.'; });
  });

  /* Choix 2 : e-mail. La lettre part directement vers CONTACT_EMAIL grâce à FormSubmit (formsubmit.co).
     Si l’envoi échoue, on propose d’ouvrir la messagerie du visiteur avec la lettre déjà écrite. */
  const mailtoLink = () => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Une lettre de ' + sender.name + ' pour z_studio_crochet')}&body=${encodeURIComponent(summary)}`;
  function showSent() {
    done.hidden = true; sent.hidden = false;
    $('#sent-email').textContent = sender.email;
    $('#sent-title').focus();
  }
  $('#send-mail').addEventListener('click', async () => {
    if ($('#l-bot').checked) { showSent(); return; } // un robot : on ne l’envoie pas
    const btn = $('#send-mail');
    btn.disabled = true; btn.setAttribute('aria-busy', 'true');
    $('#mail-fallback').hidden = true;
    status.textContent = 'Envoi de ta lettre…';
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_ID || CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Nouvelle lettre de ${sender.name} : ${sender.type}`,
          _replyto: sender.email,   // « Répondre » dans Gmail répond directement au visiteur
          _template: 'table',
          _captcha: 'false',
          name: sender.name,
          email: sender.email,
          demande: sender.type,
          message: summary
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== 'true') {
        const err = new Error(data.message || 'Envoi refusé');
        err.activation = /activ/i.test(data.message || '');
        throw err;
      }
      status.textContent = '';
      showSent();
    } catch (err) {
      status.textContent = err.activation
        ? `Le formulaire doit d’abord être activé : un e-mail d’activation a été envoyé à ${CONTACT_EMAIL}.`
        : 'Oups, ta lettre n’est pas partie. Réessaie dans un instant, ou envoie-la avec ta messagerie.';
      $('#mail-fallback').href = mailtoLink();
      $('#mail-fallback').hidden = false;
    } finally {
      btn.disabled = false; btn.removeAttribute('aria-busy');
    }
  });
  $('#l-new').addEventListener('click', () => { form.reset(); showForm(); $('#l-name').focus(); });

  $('#year').textContent = new Date().getFullYear();
  renderWall();
})();
