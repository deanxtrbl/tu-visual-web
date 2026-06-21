import './style.css';

document.addEventListener('DOMContentLoaded', () => {

  // ── HERO ROTATION ──
  const heroTexts = [
    { title: 'Tu corte.<br><em>Tu</em><br>identidad.' },
    { title: 'Your style.<br><em>Your</em><br>identity.' },
    { title: 'あなたの美.<br>あなたの<br>個性.' }
  ];
  let currentLangIndex = 0;

  function updateHero() {
    const title = document.getElementById('hero-title');
    if (!title) return;
    title.style.opacity = '0';
    setTimeout(() => {
      title.innerHTML = heroTexts[currentLangIndex].title;
      title.style.opacity = '1';
    }, 250);
  }

  function startHeroRotation() {
    updateHero();
    setInterval(() => {
      currentLangIndex = (currentLangIndex + 1) % heroTexts.length;
      updateHero();
    }, 3500);
  }

  // ── CALENDLY SERVICE SWITCHER ──
  function buildCalendlyUrl(baseUrl) {
    const params = new URLSearchParams({
      hide_event_type_details: '1',
      hide_gdpr_banner: '1',
      background_color: 'f7f5f0',
      text_color: '0c0c0b',
      primary_color: '0c0c0b'
    });
    return `${baseUrl}?${params.toString()}`;
  }

  function loadCalendly(url) {
    const wrap = document.getElementById('calendlyWrap');
    if (!wrap) return;

    wrap.classList.add('loading');

    wrap.innerHTML = `
      <div
        class="calendly-inline-widget"
        id="calendlyWidget"
        data-url="${buildCalendlyUrl(url)}"
        style="min-width:280px; height:780px;"
      ></div>
    `;

    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: buildCalendlyUrl(url),
        parentElement: document.getElementById('calendlyWidget'),
      });
      wrap.classList.remove('loading');
    } else {
      const checkInterval = setInterval(() => {
        if (window.Calendly) {
          clearInterval(checkInterval);
          wrap.classList.remove('loading');
        }
      }, 200);
    }
  }

  function setupServiceTabs() {
    const tabs = document.querySelectorAll('.service-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const url = tab.dataset.url;
        loadCalendly(url);
      });
    });
  }

  startHeroRotation();
  setupServiceTabs();
});