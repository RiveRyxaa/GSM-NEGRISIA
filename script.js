// ================================================================
//  Négrisia — Luxury Beauty Brand GSM Website
//  All vanilla ES6+ · No external libraries
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ============= LOADING SCREEN =============
  const loadingScreen = document.querySelector('.loading-screen');

  if (loadingScreen) {
    // Begin fade-out after 2.2 s
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
    }, 2200);

    // Fully hide after the 0.5 s fade transition completes
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      document.body.style.overflow = 'visible';
    }, 2700);
  }

  // ============= CUSTOM CURSOR =============
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    const cursorDot     = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.classList.add('cursor-dot');
    cursorOutline.classList.add('cursor-outline');

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Track target position for the outline's smooth follow
    let outlineX = 0;
    let outlineY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
      // Dot follows instantly
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top  = `${e.clientY}px`;

      // Store target for the outline
      outlineX = e.clientX;
      outlineY = e.clientY;
    });

    // Smooth-follow loop for the outline
    const animateOutline = () => {
      const ease = 0.15;
      currentX += (outlineX - currentX) * ease;
      currentY += (outlineY - currentY) * ease;

      cursorOutline.style.left = `${currentX}px`;
      cursorOutline.style.top  = `${currentY}px`;

      requestAnimationFrame(animateOutline);
    };
    animateOutline();
  }

  // ============= SCROLL PROGRESS BAR =============
  const scrollProgress = document.querySelector('.scroll-progress');

  const updateScrollProgress = () => {
    if (!scrollProgress) return;
    const scrollTop    = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const percentage   = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    scrollProgress.style.width = `${percentage}%`;
  };

  // ============= NAVBAR SCROLL EFFECT =============
  const navbar = document.querySelector('.navbar');

  const handleNavbarScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // ============= ACTIVE NAV HIGHLIGHT =============
  const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections    = [];

  navLinksAll.forEach((link) => {
    const id = link.getAttribute('href')?.slice(1);
    const section = id ? document.getElementById(id) : null;
    if (section) sections.push({ id, el: section, link });
  });

  const highlightActiveNav = () => {
    const scrollPos = window.scrollY + (navbar?.offsetHeight || 80) + 10;

    let currentSection = null;
    for (const sec of sections) {
      if (sec.el.offsetTop <= scrollPos) {
        currentSection = sec;
      }
    }

    navLinksAll.forEach((l) => l.classList.remove('active'));
    currentSection?.link.classList.add('active');
  };

  // ============= PARALLAX SUBTLE EFFECT =============
  const heroBrandName = document.querySelector('.hero-brand-name');

  const handleParallax = () => {
    if (!heroBrandName) return;
    if (window.scrollY < window.innerHeight) {
      heroBrandName.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  };

  // Unified scroll handler
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    handleNavbarScroll();
    highlightActiveNav();
    handleParallax();
  }, { passive: true });

  // Fire once on load
  updateScrollProgress();
  handleNavbarScroll();
  highlightActiveNav();

  // ============= MOBILE HAMBURGER MENU =============
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks?.classList.toggle('active');
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks?.classList.remove('active');
    });
  });

  // ============= SMOOTH SCROLL FOR NAV LINKS =============
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const navbarHeight = navbar?.offsetHeight || 0;
      const targetPos    = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });

  // ============= SCROLL REVEAL ANIMATIONS =============
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Apply stagger delay if specified
          const delay = entry.target.dataset.delay;
          if (delay) {
            entry.target.style.transitionDelay = `${delay}s`;
          }
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
    revealObserver.observe(el);
  });

  // ============= FLOATING PETALS (Hero Section) =============
  const heroBottom = document.querySelector('.hero-bottom');

  if (heroBottom) {
    const petalCount = 18; // 15-20 range

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      petal.classList.add('petal');

      const size = Math.random() * 17 + 8; // 8 – 25 px
      petal.style.width             = `${size}px`;
      petal.style.height            = `${size}px`;
      petal.style.left              = `${Math.random() * 100}%`;
      petal.style.animationDuration = `${Math.random() * 12 + 8}s`;  // 8 – 20 s
      petal.style.animationDelay    = `${Math.random() * 10}s`;       // 0 – 10 s
      petal.style.opacity           = (Math.random() * 0.2 + 0.1).toFixed(2); // 0.1 – 0.3

      heroBottom.appendChild(petal);
    }
  }

  // ============= COLOR PALETTE COPY TO CLIPBOARD =============
  const copiedToast = document.querySelector('.copied-toast');

  document.querySelectorAll('.color-swatch').forEach((swatch) => {
    swatch.addEventListener('click', () => {
      const hex = swatch.dataset.hex;
      if (!hex) return;

      navigator.clipboard.writeText(hex).then(() => {
        if (!copiedToast) return;
        copiedToast.textContent = `Copied! ${hex}`;
        copiedToast.classList.add('show');

        setTimeout(() => {
          copiedToast.classList.remove('show');
        }, 1500);
      }).catch((err) => {
        console.warn('Clipboard write failed:', err);
      });
    });
  });

  // ============= IMPLEMENTATION FILTER TABS =============
  const filterTabs = document.querySelectorAll('.filter-tab');
  const implItems  = document.querySelectorAll('.impl-item');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Toggle active tab
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      implItems.forEach((item, index) => {
        // Stagger animation delay
        item.style.transitionDelay = `${index * 0.05}s`;

        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ============= LIGHTBOX =============
  const lightbox    = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = document.querySelector('.lightbox-close');

  const openLightbox = (src) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.impl-item-image img').forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.src));
  });

  lightbox?.addEventListener('click', (e) => {
    // Close only when clicking the backdrop, not the image itself
    if (e.target === lightbox || e.target === lightboxClose) {
      closeLightbox();
    }
  });

  lightboxClose?.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ============= TYPEWRITER EFFECT FOR BRAND DESCRIPTION =============
  const typewriterEl = document.querySelector('.typewriter-text');
  let typewriterDone = false;

  if (typewriterEl) {
    const fullText = typewriterEl.dataset.text || typewriterEl.textContent;
    // Store original text in data attribute if not already set
    if (!typewriterEl.dataset.text) {
      typewriterEl.dataset.text = fullText;
    }

    const typewriterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !typewriterDone) {
            typewriterDone = true;
            typewriterEl.innerHTML = '';

            // Add blinking cursor element
            const cursor = document.createElement('span');
            cursor.classList.add('typewriter-cursor');
            cursor.textContent = '|';

            let charIndex = 0;

            const typeInterval = setInterval(() => {
              if (charIndex < fullText.length) {
                // Insert character before the cursor
                typewriterEl.insertBefore(
                  document.createTextNode(fullText[charIndex]),
                  cursor
                );
                charIndex++;
              } else {
                clearInterval(typeInterval);
              }
            }, 30);

            typewriterEl.appendChild(cursor);
            typewriterObserver.unobserve(typewriterEl);
          }
        });
      },
      { threshold: 0.15 }
    );

    typewriterObserver.observe(typewriterEl);
  }

  // ============= MISI ITEMS STAGGER =============
  const misiItems = document.querySelectorAll('.misi-item');

  if (misiItems.length) {
    const misiObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find this item's index among siblings for stagger
            const index = [...misiItems].indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.15}s`;
            entry.target.classList.add('active');
            misiObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    misiItems.forEach((item) => misiObserver.observe(item));
  }

  // ============= LOGO STAGES STAGGER =============
  const logoStages = document.querySelectorAll('.logo-stage');

  if (logoStages.length) {
    const logoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = [...logoStages].indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.2}s`;
            entry.target.classList.add('active');
            logoObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    logoStages.forEach((stage) => logoObserver.observe(stage));
  }

  // ============= TYPOGRAPHY LETTER ANIMATION =============
  const typeAnimateEls = document.querySelectorAll('.type-animate');

  if (typeAnimateEls.length) {
    const typeAnimObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el   = entry.target;
            const text = el.textContent;
            el.innerHTML = '';
            el.style.fontFamily = "'Playfair Display', serif";

            [...text].forEach((char, i) => {
              const span = document.createElement('span');
              span.textContent    = char === ' ' ? '\u00A0' : char; // preserve spaces
              span.style.opacity  = '0';
              span.style.display  = 'inline-block';
              span.style.transition = `opacity 0.4s ease ${i * 0.05}s`;
              el.appendChild(span);

              // Trigger reflow then animate
              requestAnimationFrame(() => {
                span.style.opacity = '1';
              });
            });

            typeAnimObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    typeAnimateEls.forEach((el) => typeAnimObserver.observe(el));
  }

}); // end DOMContentLoaded
