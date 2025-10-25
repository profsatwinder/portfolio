function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

(function setupActivitySliders() {
  const sliders = document.querySelectorAll('.activity-card .activity-slider');
  if (!sliders.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  sliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (slides.length <= 1) return; // nothing to do

    const intervalMs = parseInt(slider.dataset.interval, 10) || 3500;
    const autoplay = slider.dataset.autoplay !== 'false' && !prefersReduced;

    // Build dots if not provided
    let dotsWrap = slider.querySelector('.dots');
    if (!dotsWrap) {
      dotsWrap = document.createElement('div');
      dotsWrap.className = 'dots';
      slider.appendChild(dotsWrap);
    }
    dotsWrap.innerHTML = '';
    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.className = 'dot' + (i === 0 ? ' is-active' : '');
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to image ' + (i + 1));
      b.addEventListener('click', () => goTo(i, true));
      dotsWrap.appendChild(b);
      return b;
    });

    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');

    let idx = 0;
    let timer = null;

    function setActive(i) {
      slides.forEach((el, j) => el.classList.toggle('is-active', j === i));
      dots.forEach((d, j) => d.classList.toggle('is-active', j === i));
    }

    function goTo(n, userInitiated = false) {
      idx = (n + slides.length) % slides.length;
      setActive(idx);
      if (userInitiated) restart(); // keep autoplay cadence after manual nav
    }

    function next() { goTo(idx + 1); }
    function prev() { goTo(idx - 1); }

    function start() {
      if (!autoplay || timer) return;
      timer = setInterval(next, intervalMs);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }
    function restart() { stop(); start(); }

    // Wire buttons
    if (prevBtn) prevBtn.addEventListener('click', () => prev());
    if (nextBtn) nextBtn.addEventListener('click', () => next());

    // Pause on hover/focus
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);

    // Pause when off-screen
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => (e.isIntersecting ? start() : stop()));
      }, { threshold: 0.2 });
      io.observe(slider);
    }

    // Pause when tab hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });

    // Keyboard arrows when slider is focused
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    });

    // Kick off
    setActive(0);
    start();
  });
})();


// Citation badges for publications

(async function scholarLikeCitedBy() {
  const root = document.getElementById('cited-by-widget');
  if (!root) return;

  // Helper that accepts 'div' or '<div>'
  const $ = (tag) => document.createElement(String(tag).replace(/[<>]/g, '').trim());

  const AUTHOR_ID = root.dataset.openalexAuthor?.trim();
  const SINCE = parseInt(root.dataset.since || '2020', 10);
  const GS_ID = root.dataset.scholarId || '';
  if (!AUTHOR_ID) { root.textContent = 'Missing OpenAlex author id.'; return; }

  // Fetch author overview
  const authorUrl = `https://api.openalex.org/authors/${AUTHOR_ID}`;
  const authorRes = await fetch(authorUrl);
  if (!authorRes.ok) { root.textContent = 'Failed to load citation data.'; return; }
  const author = await authorRes.json();

  const counts = (author.counts_by_year || []).slice().sort((a,b)=>a.year-b.year);
  const years = counts.map(d => d.year);
  const citesByYear = counts.map(d => d.cited_by_count);

  const citationsAll = author.cited_by_count ?? null;
  const hAll = (author.summary_stats && author.summary_stats.h_index) ?? author.h_index ?? null;
  const citationsSince = counts.filter(d => d.year >= SINCE)
                               .reduce((s,d)=> s + (d.cited_by_count||0), 0);

  // i10-index via OpenAlex (>=10 citations)
  async function fetchI10(fromYear) {
    const base = `https://api.openalex.org/works?per_page=1&filter=author.id:${AUTHOR_ID},cited_by_count:>9`;
    const url = fromYear ? `${base},from_publication_date:${fromYear}-01-01` : base;
    const r = await fetch(url);
    if (!r.ok) return null;
    const j = await r.json();
    return j?.meta?.count ?? null;
  }
  const [i10All, i10Since] = await Promise.all([fetchI10(), fetchI10(SINCE)]);

  // Build DOM
  root.className = 'cited-widget';

  const header = $('div');
  header.className = 'cited-header';
  header.innerHTML = `
    <span>Cited by</span>
    <a href="${GS_ID ? `https://scholar.google.com/citations?user=${GS_ID}` : `https://openalex.org/${AUTHOR_ID}`}"
       target="_blank" rel="noopener">VIEW ALL</a>`;
  root.appendChild(header);

  const table = $('table');
  table.className = 'cited-table';
  table.innerHTML = `
    <thead>
      <tr><th class="metric"></th><th>All</th><th>Since ${SINCE}</th></tr>
    </thead>
    <tbody>
      <tr><td class="metric">Citations</td><td>${citationsAll ?? '–'}</td><td>${citationsSince ?? '–'}</td></tr>
      <tr><td class="metric">h-index</td><td>${hAll ?? '–'}</td><td>${hAll ?? '–'}</td></tr>
      <tr><td class="metric">i10-index</td><td>${i10All ?? '–'}</td><td>${i10Since ?? '–'}</td></tr>
    </tbody>`;
  root.appendChild(table);

  const chartWrap = $('div');
  chartWrap.className = 'cited-chart-wrap';
  const canvas = $('canvas');
  canvas.height = 140;
  chartWrap.appendChild(canvas);
  root.appendChild(chartWrap);

  // Chart: last 8 years
  const MAX_YEARS = 8;
  const yearsS = years.slice(-MAX_YEARS);
  const citesS = citesByYear.slice(-MAX_YEARS);

  if (window.Chart) {
    new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: yearsS,
        datasets: [{ label: 'Citations', data: citesS, backgroundColor: '#9e9e9e' }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { grid: { display: false } }, y: { beginAtZero: true, ticks: { precision: 0 } } },
        plugins: { legend: { display: false }, tooltip: { intersect: false, mode: 'index' } }
      }
    });
  }

  const note = $('div');
  note.className = 'cited-note';
  note.textContent = 'Note: uses OpenAlex data (closest public source to Google Scholar).';
  root.appendChild(note);
})();
