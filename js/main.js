(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mobile dropdown (Solutions menu) toggle — desktop uses hover/focus via CSS.
  document.querySelectorAll('.dropdown-toggle').forEach(function (btn) {
    var menu = btn.nextElementSibling;
    btn.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // FAQ accordions
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!expanded));
      if (answer) {
        if (expanded) {
          answer.setAttribute('hidden', '');
        } else {
          answer.removeAttribute('hidden');
        }
      }
    });
  });

  // Simple client-side pricing estimator (pricing.html)
  var calcForm = document.getElementById('costCalculator');
  if (calcForm) {
    var ranges = {
      consultation: [5000, 25000],
      customisation: [50000, 250000],
      custom: [150000, 500000],
      support: [0, 0]
    };
    calcForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var tier = calcForm.elements['tier'].value;
      var resultEl = document.getElementById('calcResultValue');
      var resultNote = document.getElementById('calcResultNote');
      if (!resultEl) return;
      if (tier === 'support') {
        resultEl.textContent = '15–25% of solution value, annually';
        resultNote.textContent = 'Ongoing integration & support is priced against your deployed solution value, not as a standalone figure.';
        return;
      }
      var range = ranges[tier];
      var fmt = function (n) { return '£' + n.toLocaleString('en-GB'); };
      resultEl.textContent = fmt(range[0]) + ' – ' + fmt(range[1]);
      resultNote.textContent = 'Indicative range only. Final pricing depends on scope, sector and integration complexity — confirmed during your consultation.';
    });
  }

  var yearEls = document.querySelectorAll('#year');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Contact page: prefill sector/tier from ?sector= / ?tier= query params
  var sectorField = document.getElementById('sector');
  var tierField = document.getElementById('tierInterest');
  if (sectorField || tierField) {
    var params = new URLSearchParams(window.location.search);
    var sectorMap = {
      agriculture: 'Agriculture & Food Production',
      infrastructure: 'Infrastructure & Maintenance',
      logistics: 'Logistics & Warehousing',
      service: 'Service Industry'
    };
    var sectorParam = params.get('sector');
    if (sectorField && sectorParam && sectorMap[sectorParam]) {
      sectorField.value = sectorMap[sectorParam];
    }
    var tierParam = params.get('tier');
    if (tierField && tierParam) {
      var tierMap = {
        '1': 'Tier 1 — Consultation & Assessment',
        '2': 'Tier 2 — Solution Customisation',
        '3': 'Tier 3 — Custom Development',
        '4': 'Tier 4 — Integration & Support'
      };
      if (tierMap[tierParam]) tierField.value = tierMap[tierParam];
    }
  }

  // Contact form: no backend wired up yet — acknowledge locally instead of failing silently.
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var confirmation = document.getElementById('formConfirmation');
      contactForm.hidden = true;
      if (confirmation) {
        confirmation.hidden = false;
        confirmation.focus();
      }
    });
  }
})();
