/* ============================================
   PHD NO EXTERIOR — JavaScript Principal
   ============================================ */

// -------------------------------------------------------
// Header scroll effect
// -------------------------------------------------------
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// -------------------------------------------------------
// Mobile menu toggle
// -------------------------------------------------------
const navToggle  = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger → X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });
}

// -------------------------------------------------------
// Scroll reveal (Intersection Observer)
// -------------------------------------------------------
const revealEls = document.querySelectorAll('[data-reveal]');

if (revealEls.length > 0 && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));
}

// -------------------------------------------------------
// FAQ Accordion
// -------------------------------------------------------
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-item__question');
  if (!question) return;

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all others
    faqItems.forEach(other => {
      if (other !== item) other.classList.remove('open');
    });

    // Toggle current
    item.classList.toggle('open', !isOpen);
  });
});

// -------------------------------------------------------
// Smooth scroll for anchor links
// -------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// -------------------------------------------------------
// Contact form handler
// -------------------------------------------------------
function handleFormSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = form.querySelector('button[type="submit"]');

  // Simple validation
  const nome      = form.querySelector('#nome');
  const email     = form.querySelector('#email');
  const interesse = form.querySelector('#interesse');
  const objetivo  = form.querySelector('#objetivo');

  if (!nome.value.trim() || !email.value.trim() || !interesse.value || !objetivo.value) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  // Simulate loading state
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simulate API call (replace with actual integration)
  setTimeout(() => {
    if (form && success) {
      form.style.display    = 'none';
      success.style.display = 'block';
    }
  }, 1200);
}

// -------------------------------------------------------
// Video placeholder click handler
// -------------------------------------------------------
function loadVideo(el, channelUrl) {
  // Open YouTube channel in new tab
  window.open(channelUrl, '_blank', 'noopener,noreferrer');
}

// -------------------------------------------------------
// Active nav link highlight based on current page
// -------------------------------------------------------
(function setActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__links a, .nav__mobile-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop();

    if (linkFile === currentPath ||
        (currentPath === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();

// -------------------------------------------------------
// Responsive: handle grid layout for service cards on mobile
// -------------------------------------------------------
function handleServiceGridLayout() {
  const lastRow = document.querySelector('.services-grid--last-row');
  if (!lastRow) return;

  if (window.innerWidth <= 768) {
    lastRow.style.maxWidth = '100%';
    lastRow.style.gridTemplateColumns = '1fr';
  } else {
    lastRow.style.maxWidth = '780px';
    lastRow.style.gridTemplateColumns = 'repeat(2, 1fr)';
  }
}

window.addEventListener('resize', handleServiceGridLayout, { passive: true });
handleServiceGridLayout();

// Parallax removido — hero usa background-image fixo

// -------------------------------------------------------
// Numbers counter animation
// -------------------------------------------------------
function animateCounter(el, target, suffix = '', duration = 1500) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = start + suffix;
    }
  }, 16);
}

// Observe hero stats
const heroStats = document.querySelectorAll('.hero__stat-number');
if (heroStats.length > 0 && 'IntersectionObserver' in window) {
  const counterData = [
    { target: 500, suffix: '+' },
    { target: 3,   suffix: '' },
    { target: 100, suffix: '%' },
    { target: 10,  suffix: '+' },
  ];

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroStats.forEach((stat, i) => {
          const data = counterData[i];
          if (data) animateCounter(stat, data.target, data.suffix);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  if (heroStats[0]) statsObserver.observe(heroStats[0].closest('.hero__stats') || heroStats[0]);
}

// =======================================================
// LÓGICA DO BLOG (SLIDER, FILTROS, BUSCA)
// =======================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. SLIDER DE DESTAQUES ---
  const sliderContainer = document.querySelector('.featured-slider');
  const slides = document.querySelectorAll('.featured-slide');
  const btnPrev = document.querySelector('.slider-btn.prev');
  const btnNext = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (sliderContainer && slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // Criar dots
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add('active');
          dots[index].classList.add('active');
        } else {
          slide.classList.remove('active');
          dots[index].classList.remove('active');
        }
      });
    };

    const goToSlide = (index) => {
      currentSlide = index;
      updateSlider();
      resetInterval();
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    };

    if (btnNext) btnNext.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if (btnPrev) btnPrev.addEventListener('click', () => { prevSlide(); resetInterval(); });

    const startInterval = () => { autoSlideInterval = setInterval(nextSlide, 6000); };
    const resetInterval = () => { clearInterval(autoSlideInterval); startInterval(); };
    startInterval();
  }

  // --- 2. FILTROS E BUSCA DE ARTIGOS ---
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('#blogGrid .blog-card');
  const resultsInfo = document.getElementById('resultsInfo');
  const visibleCountSpan = document.getElementById('visibleCount');
  const noResults = document.getElementById('noResults');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  let currentFilter = 'all';
  let searchTerm = '';
  // Limitar número de artigos visíveis para o "Carregar Mais"
  let articlesLimit = 6; 

  if (blogCards.length > 0) {
    const filterArticles = () => {
      let visibleCount = 0;
      searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

      blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.getAttribute('data-category') || '';
        
        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = title.includes(searchTerm);

        // A checagem de "hidden" será baseada no limite atual
        if (matchesFilter && matchesSearch) {
          if (visibleCount < articlesLimit) {
            card.classList.remove('hide');
          } else {
            card.classList.add('hide'); 
            // Eles dão match, mas passam do limite = são ocultos ("escondidos pelo paginador")
          }
          visibleCount++;
        } else {
          card.classList.add('hide');
        }
      });

      // Atualizar contadores
      const showingNow = Math.min(visibleCount, articlesLimit);
      
      if (resultsInfo && visibleCountSpan) {
        resultsInfo.style.display = 'block';
        visibleCountSpan.textContent = showingNow;
      }

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }

      if (loadMoreBtn) {
        if (articlesLimit >= visibleCount) {
          loadMoreBtn.parentElement.style.display = 'none';
        } else {
          loadMoreBtn.parentElement.style.display = 'block';
        }
      }
    };

    // Eventos de filtro
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        articlesLimit = 6; // reseta limit
        filterArticles();
      });
    });

    // Evento de busca
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        articlesLimit = 6; // reseta limit
        filterArticles();
      });
    }

    // Carregar Mais
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        articlesLimit += 6; // Aumenta limite
        filterArticles();
      });
    }

    // Inicialização
    filterArticles();
  }

});

// ==========================================
// ARTIGO INTERNO: INTERATIVIDADE E PROGRESS BAR
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Reading Progress Bar (Indicador de leitura)
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      progressBar.style.width = scrollPercentRounded + '%';
    });
  }
});

// Função mock para os botões de compartilhamento
function shareArticle() {
  alert('Link copiado para a área de transferência! (Simulação da integração nativa)');
}
