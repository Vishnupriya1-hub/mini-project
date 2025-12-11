// Modern Premium UI JS
(() => {
  const body = document.body;
  const sidebar = document.getElementById('sidebar');
  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
  const themeToggle = document.getElementById('theme-toggle');
  const suggestions = document.getElementById('suggestions');
  const searchInput = document.getElementById('search-input');
  const searchForm = document.getElementById('search-form');
  const grid = document.getElementById('videoGrid');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalSub = document.getElementById('modal-sub');
  const modalThumb = document.getElementById('modal-thumb');
  const modalDesc = document.getElementById('modal-desc');

  // 1) Sidebar toggle (small screens)
  btnToggleSidebar.addEventListener('click', () => {
    if (sidebar.style.display === 'block') {
      sidebar.style.display = '';
    } else {
      sidebar.style.display = 'block';
    }
  });

  // 2) Theme toggle with localStorage
  const THEME_KEY = 'premiumtube-theme';
  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      body.classList.remove('dark');
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem(THEME_KEY, theme);
  }
  // initial theme
  applyTheme(localStorage.getItem(THEME_KEY) || 'light');

  themeToggle.addEventListener('click', () => {
    applyTheme(body.classList.contains('dark') ? 'light' : 'dark');
  });

  // 3) Search suggestions (simple demo data)
  const SAMPLE = ['CSS Grid tutorial', 'Flexbox tricks', 'Responsive design', 'Modern UI inspiration', 'Animate on scroll'];
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) { suggestions.classList.remove('active'); return; }
    const matches = SAMPLE.filter(s => s.toLowerCase().includes(q)).slice(0,5);
    suggestions.innerHTML = matches.map(m => `<div class="item" role="option">${m}</div>`).join('');
    suggestions.classList.add('active');
  });
  suggestions.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (!item) return;
    searchInput.value = item.textContent;
    suggestions.classList.remove('active');
    searchForm.dispatchEvent(new Event('submit'));
  });


  searchInput.addEventListener('blur', () => setTimeout(()=> suggestions.classList.remove('active'), 220));

  
  searchForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const q = searchInput.value.trim();
    if (!q) return;
    
    const cards = Array.from(grid.querySelectorAll('.card'));
    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const ch = card.dataset.channel.toLowerCase();
      card.style.display = (title.includes(q.toLowerCase()) || ch.includes(q.toLowerCase())) ? '' : 'none';
    });
  });

  
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    openModalFromCard(card);
  });

  
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const card = e.target.closest('.card');
      if (!card) return;
      openModalFromCard(card);
    }
  });

  function openModalFromCard(card) {
    modalTitle.textContent = card.dataset.title || 'Video';
    modalSub.textContent = `${card.dataset.channel} • ${card.dataset.views || '0'} views • ${card.dataset.age || 'some time'}`;
    modalThumb.src = card.dataset.thumb || '';
    modalDesc.textContent = card.dataset.desc || '';
    modal.setAttribute('aria-hidden', 'false');
    
    modalClose.focus();
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalThumb.src = '';
  }

  
  Array.from(grid.querySelectorAll('.card')).forEach(card => {
    card.setAttribute('aria-label', `${card.dataset.title} by ${card.dataset.channel}`);
    card.setAttribute('title', card.dataset.title);
  });

  
  grid.addEventListener('click', (e) => {
    const more = e.target.closest('.more');
    if (more) {
      e.stopPropagation();
      alert('More options — not implemented in demo.');
    }
  });

})();
