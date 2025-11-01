// Basic on-page enhancements: TOC active state and smooth anchor navigation
(function() {
  const nav = document.querySelector('.top-nav');
  const links = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  function onScroll() {
    const y = window.scrollY + 120; // account for sticky header
    let activeIndex = -1;
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      const top = rect.top + window.scrollY;
      if (y >= top) activeIndex = i; else break;
    }
    links.forEach((a, i) => {
      if (i === activeIndex) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  function onClick(e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  }

  if (nav) {
    nav.addEventListener('click', onClick);
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
  }
})();
