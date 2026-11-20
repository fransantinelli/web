/* =====================================================================
   CODE FILE: reads content.js and builds the page. You normally do not need to edit this file.
   ===================================================================== */
(function () {
  var S = window.SITE;
  if (!S) {
    document.body.innerHTML = '<p style="padding:2rem;font-family:sans-serif">content.js could not be loaded. Check that the file is next to index.html and has no typos.</p>';
    return;
  }

  /* ---------- small helpers ---------- */
  function external(url) { return /^https?:\/\//.test(url) ? ' target="_blank" rel="noopener"' : ''; }
  function link(l, cls) {
    return '<a' + (cls ? ' class="' + cls + '"' : '') + ' href="' + l.url + '"' + external(l.url) + '>' + l.label + '</a>';
  }
  function rows(items) {
    return (items || []).map(function (r) {
      return '<div class="row"><div class="when">' + r.when + '</div><div>' + r.text + '</div></div>';
    }).join('');
  }
  function visible(d) { return d && d.show !== false; }
  function withFallback(img, make) {
    var done = false;
    function bad() { if (done) return; done = true; img.replaceWith(make()); }
    img.addEventListener('error', bad);
    if (img.complete && img.naturalWidth === 0) bad();
  }

  /* ---------- page information ---------- */
  var meta = S.meta || {};
  if (meta.title) document.title = meta.title;
  function setMeta(selector, value) { var el = document.querySelector(selector); if (el && value) el.setAttribute('content', value); }
  setMeta('meta[name="description"]', meta.description);
  setMeta('meta[property="og:title"]', meta.title);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[property="og:url"]', meta.url);

  var ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Person',
    name: S.name, jobTitle: S.role,
    affiliation: { '@type': 'CollegeOrUniversity', name: (S.university || {}).name },
    email: S.contact && S.contact.email ? 'mailto:' + S.contact.email : undefined,
    url: meta.url, sameAs: meta.sameAs
  });
  document.head.appendChild(ld);

  /* ---------- hero ---------- */
  var U = S.university || {};
  var hero = document.getElementById('top');
  hero.innerHTML =
    '<div class="wrap"><div>' +
      '<a class="affil" href="' + (U.url || '#') + '"' + external(U.url || '') + ' aria-label="' + (U.name || '') + '">' +
        '<img src="' + (U.logo || '') + '" alt="' + (U.name || '') + '">' +
        '<span class="affil-text">' + (U.caption || '') + '</span>' +
      '</a>' +
      '<h1>' + S.name + '</h1>' +
      '<div class="role">' + S.role + '</div>' +
      '<p class="lead">' + (S.intro || '') + '</p>' +
      '<div class="links">' + (S.heroButtons || []).map(function (b) { return link(b, 'btn' + (b.primary ? ' primary' : '')); }).join('') + '</div>' +
    '</div>' +
    '<img class="photo" src="' + (S.photo || '') + '" alt="Photo of ' + S.name + '"></div>';

  withFallback(hero.querySelector('.affil img'), function () {
    var s = document.createElement('span'); s.className = 'logo-fallback'; s.textContent = U.shortName || ''; return s;
  });
  withFallback(hero.querySelector('img.photo'), function () {
    var d = document.createElement('div'); d.className = 'photo'; d.textContent = S.initials || ''; return d;
  });

  /* ---------- sections ---------- */
  var builders = {
    about: function (d) {
      var h = '<h2>' + d.title + '</h2>';
      (d.paragraphs || []).forEach(function (p) { h += '<p>' + p + '</p>'; });
      if (d.advisors && d.advisors.length) {
        h += '<p><strong>' + (d.advisorsLabel || 'Advisors') + ':</strong> ' +
          d.advisors.map(function (a) { return a.url ? link({ url: a.url, label: a.name }) : a.name; }).join(', ') +
          (d.advisorsSuffix ? ' ' + d.advisorsSuffix : '') + '</p>';
      }
      if (d.fields && d.fields.length) {
        h += '<p class="mini-title">' + (d.fieldsLabel || 'Research fields') + '</p><div class="tag-row">' +
          d.fields.map(function (f) { return '<span class="tag">' + f + '</span>'; }).join('') + '</div>';
      }
      if (d.education && d.education.length) {
        h += '<p class="mini-title">' + (d.educationLabel || 'Education') + '</p>' + rows(d.education);
      }
      return h;
    },
    research: function (d) {
      var h = '<h2>' + d.title + '</h2>';
      (d.groups || []).forEach(function (g) {
        if (!g.papers || !g.papers.length) return;
        h += '<div class="subhead">' + g.heading + '</div>';
        g.papers.forEach(function (p) {
          h += '<div class="paper"><h3>' + p.title + (p.badge ? ' <span class="badge">' + p.badge + '</span>' : '') + '</h3>';
          if (p.meta) h += '<div class="meta">' + p.meta + '</div>';
          if (p.links && p.links.length) h += '<div class="actions">' + p.links.map(function (l) { return link(l); }).join('') + '</div>';
          if (p.abstract) h += '<details><summary>Abstract</summary><p>' + p.abstract + '</p></details>';
          h += '</div>';
        });
      });
      return h;
    },
    teaching: function (d) { return '<h2>' + d.title + '</h2>' + rows(d.items); },
    talks: function (d) {
      var h = '<h2>' + d.title + '</h2>';
      (d.groups || []).forEach(function (g) {
        if (!g.items || !g.items.length) return;
        h += '<div class="subhead">' + g.heading + '</div>' + rows(g.items);
      });
      return h;
    },
    cv: function (d) {
      return '<h2>' + d.title + '</h2><p class="flush">' + (d.text || '') +
        (d.updated ? ' Last updated ' + d.updated + '.' : '') + '</p>' +
        '<a class="btn primary" href="' + d.file + '">' + (d.button || 'Download CV') + '</a>';
    },
    contact: function (d) {
      var h = '<h2>' + d.title + '</h2><p class="flush">';
      if (d.email) h += '<strong>Email:</strong> <a href="mailto:' + d.email + '">' + d.email + '</a>';
      if (d.office) h += '<br><strong>Office:</strong> ' + d.office;
      h += '</p>';
      if (d.links && d.links.length) h += '<div class="links">' + d.links.map(function (l) { return link(l, 'btn'); }).join('') + '</div>';
      return h;
    }
  };

  var order = ['about', 'research', 'teaching', 'talks', 'cv', 'contact'];
  var main = document.getElementById('main');
  var menu = document.getElementById('menu');
  menu.innerHTML = '<li><a href="#top">' + (S.homeLabel || 'Home') + '</a></li>';

  order.forEach(function (key) {
    var d = S[key];
    if (!visible(d)) return;
    var sec = document.createElement('section');
    sec.id = key;
    sec.innerHTML = '<div class="wrap">' + builders[key](d) + '</div>';
    main.appendChild(sec);
    var li = document.createElement('li');
    li.innerHTML = '<a href="#' + key + '">' + (d.menu || d.title) + '</a>';
    menu.appendChild(li);
  });

  document.getElementById('brand').textContent = S.name;
  document.getElementById('footer-text').innerHTML = '© ' + new Date().getFullYear() + ' ' + (S.footer || S.name);

  /* ---------- smooth, "sticky" underline in the menu ----------
     It stays under the link of the section you are reading, then stretches toward the next link
     as you scroll toward the next section (right end leads, left end follows). */
  (function () {
    var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
    var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    var ind = document.createElement('span');
    ind.className = 'ind';
    menu.appendChild(ind);
    var OFFSET = 140;                          /* how far below the top a section counts as "reached" */

    function ease(x, from, to) { var t = Math.min(1, Math.max(0, (x - from) / (to - from))); return t * t * (3 - 2 * t); }

    function update() {
      var n = links.length;
      var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var pos = Math.min(Math.max(window.scrollY, 0), maxScroll);

      /* scroll position at which each section is reached */
      var a = targets.map(function (el, i) { return i === 0 ? 0 : el.getBoundingClientRect().top + window.scrollY - OFFSET; });
      /* sections near the page bottom can never reach the top: spread them evenly over the last stretch */
      var k = 0;
      for (var i = 0; i < n; i++) { if (a[i] < maxScroll - 1) k = i; }
      for (var j = k + 1; j < n; j++) { a[j] = a[k] + (maxScroll - a[k]) * (j - k) / (n - k); }

      /* which two links are we between, and how far (0 to 1)? */
      var cur = 0;
      for (var m = 0; m < n; m++) { if (a[m] <= pos) cur = m; }
      var nxt = Math.min(cur + 1, n - 1);
      var p = nxt === cur ? 0 : Math.min(1, Math.max(0, (pos - a[cur]) / (a[nxt] - a[cur])));

      var l1 = links[cur].offsetLeft + 10, w1 = links[cur].offsetWidth - 20;
      var l2 = links[nxt].offsetLeft + 10, w2 = links[nxt].offsetWidth - 20;
      var eRight = ease(p, 0.35, 0.85);        /* right end starts moving earlier... */
      var eLeft  = ease(p, 0.55, 1.00);        /* ...left end stays stuck longer */
      var left  = l1 + (l2 - l1) * eLeft;
      var right = (l1 + w1) + ((l2 + w2) - (l1 + w1)) * eRight;
      var width = right - left;
      ind.style.transform = 'translateX(' + left + 'px)';
      ind.style.width = width + 'px';

      var active = p > 0.7 ? nxt : cur;
      links.forEach(function (el, idx) { el.classList.toggle('active', idx === active); });

      /* keep the underline visible when the menu scrolls sideways on phones */
      if (menu.scrollWidth > menu.clientWidth) { menu.scrollLeft = left + width / 2 - menu.clientWidth / 2; }
    }

    var ticking = false;
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { update(); ticking = false; }); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  })();
})();
