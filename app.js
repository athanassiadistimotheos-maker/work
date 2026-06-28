const siteData = {
  nav: [
    { label: 'Startseite', href: 'index.html' },
    { label: 'Über uns', href: 'ueber-uns.html' },
    {
      label: 'Leistungen',
      href: 'leistungen.html',
      children: [
        { label: 'Transport & Expresslogistik', href: 'transport-expresslogistik.html' },
        { label: 'Personaldienstleistungen', href: 'personaldienstleistungen.html' },
        { label: 'Security Management', href: 'security-management.html' },
        { label: 'Komplettdienstleistungen', href: 'komplettdienstleistungen.html' },
      ],
    },
    { label: 'Karriere', href: 'karriere.html' },
    { label: 'Referenzen', href: 'referenzen.html' },
    { label: 'Kontakt', href: 'kontakt.html' },
  ],
  footerLinks: [
    { label: 'Impressum', href: 'impressum.html' },
    { label: 'Datenschutz', href: 'datenschutz.html' },
    { label: 'Kundenanfrage', href: 'kundenanfrage.html' },
  ],
};

function currentPage() {
  return document.body.dataset.page || 'home';
}

const servicePages = new Set([
  'leistungen.html',
  'transport-expresslogistik.html',
  'personaldienstleistungen.html',
  'security-management.html',
  'komplettdienstleistungen.html',
]);

function renderHeader() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  header.classList.add('site-header');
  header.innerHTML = `
    <div class="utility-bar">
      <div class="container utility-inner">
        <div class="utility-left">
          <span>Deutschlandweit aktiv</span>
          <span>Rhein-Main als Basis</span>
        </div>
        <div class="utility-right">
          <a href="tel:+4961838994640">+49 6183 899 46 40</a>
          <a href="mailto:info@acargroup.de">info@acargroup.de</a>
          <a class="utility-link" href="kontakt.html">Jetzt Kontakt aufnehmen</a>
        </div>
      </div>
    </div>
    <div class="main-bar">
      <div class="container">
        <div class="header-card">
          <a class="brand" href="index.html" aria-label="Acar Group Startseite">
            <span class="brand-logo" aria-hidden="true">
              <img src="logos/silver.png" alt="" />
            </span>
            <span class="brand-copy">
              <strong>Acar Group GmbH</strong>
              <span>Transport · Personal · Security · Outsourcing</span>
            </span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-nav-toggle>
            <span aria-hidden="true"></span>
          </button>
          <nav class="site-nav" id="primary-nav" data-nav>
            <ul class="nav-list">
              ${siteData.nav
                .map((item) => {
                  const active = isActive(item.href) ? 'active' : '';
                  if (!item.children) {
                    return `<li class="nav-item"><a class="nav-link ${active}" ${active ? 'aria-current="page"' : ''} href="${item.href}">${item.label}</a></li>`;
                  }

                  return `
                    <li class="nav-item has-dropdown">
                      <a class="nav-link ${active}" ${active ? 'aria-current="page"' : ''} href="${item.href}">${item.label}</a>
                      <ul class="dropdown">
                        ${item.children
                          .map(
                            (child) =>
                              `<li><a href="${child.href}" class="${isActive(child.href) ? 'active' : ''}" ${isActive(child.href) ? 'aria-current="page"' : ''}>${child.label}</a></li>`,
                          )
                          .join('')}
                      </ul>
                    </li>
                  `;
                })
                .join('')}
            </ul>
            <div class="nav-actions">
              <a class="button button-primary" href="kundenanfrage.html">Kontakt</a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  `;
}

function renderFooter() {
  const footer = document.querySelector('[data-site-footer]');
  if (!footer) return;

  footer.classList.add('site-footer');
  footer.innerHTML = `
    <div class="container">
      <div class="footer-shell">
        <div class="footer-grid">
          <div>
            <div class="brand footer-brand-wrap">
              <span class="brand-logo brand-logo-footer" aria-hidden="true">
                <img src="logos/silver.png" alt="" />
              </span>
              <p class="footer-brand">Acar Group GmbH</p>
            </div>
            <p>Weingartenstraße 19<br />63526 Erlensee<br />info@acargroup.de</p>
          </div>
          <div>
            <h3 style="font-size:1.05rem;margin-bottom:12px">Navigation</h3>
            <div class="footer-links">
              ${siteData.footerLinks.map((link) => `<a href="${link.href}">${link.label}</a>`).join('')}
            </div>
          </div>
          <div>
            <h3 style="font-size:1.05rem;margin-bottom:12px">Kontakt</h3>
            <div class="footer-links">
              <a href="kontakt.html">Kontakt</a>
              <a href="mailto:info@acargroup.de">info@acargroup.de</a>
              <a href="tel:+4961838994640">+49 6183 899 46 40</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <small>© <span data-year></span> Acar Group GmbH</small>
          <small>ANÜ-Erlaubnis · § 34a GewO · Digitale Zeiterfassung · Moderne Flotte</small>
        </div>
      </div>
  `;
}

function isActive(href) {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  if (href === 'leistungen.html') {
    return servicePages.has(path);
  }

  return path === href;
}

function setupNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const body = document.body;
  const nav = document.querySelector('[data-nav]');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement && window.innerWidth <= 860) {
        body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

function mailtoLink(form, recipient) {
  const data = new FormData(form);
  const subject = data.get('subject') || form.dataset.subject || 'Kontaktanfrage';
  const body = Array.from(data.entries())
    .map(([key, value]) => {
      const normalizedValue = value instanceof File ? value.name || 'Datei angehängt' : value;
      return `${key}: ${normalizedValue}`;
    })
    .join('\n');
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function setupForms() {
  document.querySelectorAll('form[data-mailto]').forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const recipient = form.dataset.mailto;
      const mailto = mailtoLink(form, recipient);
      window.location.href = mailto;

      if (status) {
        status.textContent = 'Formular vorbereitet. Ihr E-Mail-Programm wird geöffnet.';
      }
      form.reset();
    });
  });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  items.forEach((item) => observer.observe(item));
}

function setYear() {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
}

function upgradeContainers() {
  document.querySelectorAll('.site-shell').forEach((element) => {
    element.classList.add('container');
  });
}

renderHeader();
renderFooter();
upgradeContainers();
setupNav();
setupForms();
setupReveal();
setYear();
