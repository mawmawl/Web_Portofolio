/* ==========================================================================
   MAULANA MALIK IBRAHIM — FRAMER COMPONENT INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Mouse Spotlight Tracking Effect (rAF-throttled)
  const spotlight = document.getElementById('spotlightOverlay');
  let spotlightQueued = false;
  window.addEventListener('mousemove', (e) => {
    if (spotlight && !spotlightQueued) {
      spotlightQueued = true;
      requestAnimationFrame(() => {
        spotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
        spotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
        spotlightQueued = false;
      });
    }
  }, { passive: true });

  // 1.5 Live Typing Role Switcher in Stage 1
  const roleEl = document.getElementById('heroRoleDynamic');
  if (roleEl) {
    const roles = ['Software Engineering', 'Full-Stack Development', 'UI/UX Interface Design', 'Web Architecture'];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    const typeRole = () => {
      const currentRole = roles[roleIdx];
      
      if (isDeleting) {
        roleEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
      } else {
        roleEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === currentRole.length) {
        speed = 2000; // Pause at full word
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeRole, speed);
    };

    setTimeout(typeRole, 800);
  }

  // 2.2 Apple Vision 3D Multi-Device Stage Hero Scroll Animation
  const heroSection = document.getElementById('hero');
  const appleEditorialView = document.getElementById('appleEditorialView');
  const appleDeviceStage = document.getElementById('appleDeviceStage');
  const deviceLeft = document.getElementById('stageDeviceLeft');
  const deviceCenter = document.getElementById('stageDeviceCenter');
  const deviceRight = document.getElementById('stageDeviceRight');

  if (heroSection && appleEditorialView && appleDeviceStage) {
    let heroScrollQueued = false;
    // Tinggi track hero DI-CACHE: window.innerHeight berubah saat toolbar browser
    // collapse/expand di tengah scroll (mobile) -> progress melompat -> device
    // tiba-tiba mengecil. Recompute hanya saat resize/rotate, bukan tiap frame.
    let heroHeightRef = heroSection.offsetHeight - window.innerHeight;
    const refreshHeroHeight = () => {
      heroHeightRef = heroSection.offsetHeight - window.innerHeight;
    };
    window.addEventListener('resize', refreshHeroHeight, { passive: true });
    window.addEventListener('orientationchange', refreshHeroHeight, { passive: true });
    const onHeroScroll = () => {
      if (heroScrollQueued) return;
      heroScrollQueued = true;
      requestAnimationFrame(() => {
        heroScrollQueued = false;
      const rect = heroSection.getBoundingClientRect();
      const heroHeight = heroHeightRef;

      if (heroHeight > 0) {
        let progress = -rect.top / heroHeight;
        progress = Math.max(0, Math.min(1, progress));

        // Stage 1: Editorial Zoom Out & Fade (0% -> 45% scroll)
        if (progress <= 0.5) {
          const p1 = progress / 0.5;
          const editorialScale = 1 - (p1 * 0.2);
          const editorialTranslateZ = p1 * -300;
          const editorialOpacity = Math.max(0, 1 - (p1 * 1.8));

          appleEditorialView.style.transform = `scale(${editorialScale}) translateZ(${editorialTranslateZ}px)`;
          appleEditorialView.style.opacity = editorialOpacity;
          appleEditorialView.style.pointerEvents = editorialOpacity <= 0 ? 'none' : 'auto';
        } else {
          appleEditorialView.style.opacity = '0';
          appleEditorialView.style.pointerEvents = 'none';
        }

        // Stage 2: 3D Multi-Device Stage Arrival & Parallax Separation (15% -> 100% scroll)
        if (progress >= 0.15) {
          const p2 = (progress - 0.15) / 0.85;
          const clampedP2 = Math.min(1, Math.max(0, p2));

          const stageOpacity = Math.min(1, clampedP2 * 2.2);
          appleDeviceStage.style.opacity = stageOpacity;
          appleDeviceStage.style.pointerEvents = stageOpacity > 0.5 ? 'auto' : 'none';

          // 3D Multi-Device Spatial Separation (Fly in from depth and settle into multi-angle stage)
          const isMobile = window.innerWidth <= 768;

          if (isMobile) {
            // Mobile: Proportional spread & depth so all 3 devices fit on screen
            const mobileSpread = Math.min(110, Math.max(85, window.innerWidth * 0.27));
            const centerScale = 0.85 + (clampedP2 * 0.2);
            const centerTranslateZ = -100 + (clampedP2 * 140);
            const centerRotateX = (1 - clampedP2) * 15;
            if (deviceCenter) {
              deviceCenter.style.transform = `translate3d(0, 0, ${centerTranslateZ}px) rotateX(${centerRotateX}deg) scale(${centerScale})`;
            }

            const leftTranslateX = -mobileSpread * clampedP2;
            const leftTranslateZ = -180 + (clampedP2 * 90);
            const leftRotateY = 22 * clampedP2;
            const leftRotateZ = -4 * clampedP2;
            if (deviceLeft) {
              deviceLeft.style.transform = `translate3d(${leftTranslateX}px, 0, ${leftTranslateZ}px) rotateY(${leftRotateY}deg) rotateZ(${leftRotateZ}deg)`;
            }

            const rightTranslateX = mobileSpread * clampedP2;
            const rightTranslateZ = -180 + (clampedP2 * 90);
            const rightRotateY = -22 * clampedP2;
            const rightRotateZ = 4 * clampedP2;
            if (deviceRight) {
              deviceRight.style.transform = `translate3d(${rightTranslateX}px, 0, ${rightTranslateZ}px) rotateY(${rightRotateY}deg) rotateZ(${rightRotateZ}deg)`;
            }
          } else {
            // Desktop: Full desktop spread & depth
            const centerScale = 0.8 + (clampedP2 * 0.25);
            const centerTranslateZ = -200 + (clampedP2 * 250);
            const centerRotateX = (1 - clampedP2) * 20;
            if (deviceCenter) {
              deviceCenter.style.transform = `translate3d(0, 0, ${centerTranslateZ}px) rotateX(${centerRotateX}deg) scale(${centerScale})`;
            }

            const leftTranslateX = -450 * clampedP2;
            const leftTranslateZ = -300 + (clampedP2 * 150);
            const leftRotateY = 22 * clampedP2;
            const leftRotateZ = -4 * clampedP2;
            if (deviceLeft) {
              deviceLeft.style.transform = `translate3d(${leftTranslateX}px, 0, ${leftTranslateZ}px) rotateY(${leftRotateY}deg) rotateZ(${leftRotateZ}deg)`;
            }

            const rightTranslateX = 450 * clampedP2;
            const rightTranslateZ = -300 + (clampedP2 * 150);
            const rightRotateY = -22 * clampedP2;
            const rightRotateZ = 4 * clampedP2;
            if (deviceRight) {
              deviceRight.style.transform = `translate3d(${rightTranslateX}px, 0, ${rightTranslateZ}px) rotateY(${rightRotateY}deg) rotateZ(${rightRotateZ}deg)`;
            }
          }
        } else {
          appleDeviceStage.style.opacity = '0';
          appleDeviceStage.style.pointerEvents = 'none';
        }
      }
      });
    };
    window.addEventListener('scroll', onHeroScroll, { passive: true });
  }

  // 2.5 Scroll Fade & Scale Reveal Observer for Scattered Photo Showcase
  const fadeItems = document.querySelectorAll('.fade-scroll-item');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  fadeItems.forEach(item => scrollObserver.observe(item));

  // 3. Scroll Text Opacity Letters Animation (Text_Opacity_Letters.tsx Component)
  // Perf: class-toggle + hanya huruf yang berubah state + skip saat off-screen.
  // Versi lama menulis style opacity+color ke ~170 span tiap frame = repaint besar di mobile.
  const textHeading = document.getElementById('textOpacityHeading');
  if (textHeading) {
    const rawText = textHeading.textContent.trim();
    textHeading.innerHTML = '';

    const letters = rawText.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char;
      textHeading.appendChild(span);
      return span;
    });

    let prevLitCount = -1;
    let textScrollQueued = false;
    const updateTextOpacity = () => {
      textScrollQueued = false;
      const rect = textHeading.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Heading jauh di luar viewport -> tidak ada yang berubah, skip
      if (rect.top > windowHeight + 200 || rect.bottom < -200) return;

      // Calculate scroll progress through the element
      let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      progress = Math.max(0, Math.min(1, progress));

      const activeCount = Math.floor(progress * letters.length * 1.3);
      if (activeCount === prevLitCount) return;

      // Tulis hanya huruf yang statusnya berubah sejak frame lalu
      if (activeCount > prevLitCount) {
        for (let i = Math.max(0, prevLitCount); i < activeCount; i++) letters[i].classList.add('lit');
      } else {
        for (let i = activeCount; i < letters.length; i++) letters[i].classList.remove('lit');
      }
      prevLitCount = activeCount;
    };

    window.addEventListener('scroll', () => {
      if (!textScrollQueued) {
        textScrollQueued = true;
        requestAnimationFrame(updateTextOpacity);
      }
    }, { passive: true });
    updateTextOpacity();
  }

  // 3.5 Dynamic Stacking Cards Animation with Enhanced Internal Parallax (Option 1 + 3)
  const expCards = document.querySelectorAll('.experience-showcase-card');
  if (expCards.length > 0) {
    let stackingQueued = false;
    const handleStackingScroll = () => {
      if (stackingQueued) return;
      stackingQueued = true;
      requestAnimationFrame(() => {
        stackingQueued = false;
      const windowHeight = window.innerHeight;

      expCards.forEach((card, i) => {
        const nextCard = expCards[i + 1];
        const cardRect = card.getBoundingClientRect();
        const targetTop = 100 + (i * 30);
        
        // Stacking calculation against next card
        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const nextTargetTop = 100 + ((i + 1) * 30);
          
          if (nextRect.top < windowHeight && nextRect.top > nextTargetTop) {
            const overlapProgress = 1 - ((nextRect.top - nextTargetTop) / (windowHeight - nextTargetTop));
            const clampedProgress = Math.max(0, Math.min(1, overlapProgress));
            
            const scale = 1 - (clampedProgress * 0.06);
            const brightness = 1 - (clampedProgress * 0.4);

            card.style.transform = `scale(${scale})`;
            card.style.filter = `brightness(${brightness})`;
          } else if (nextRect.top <= nextTargetTop) {
            card.style.transform = `scale(0.94)`;
            card.style.filter = `brightness(0.6)`;
          } else {
            card.style.transform = `scale(1)`;
            card.style.filter = `brightness(1)`;
          }
        }

        // Internal Mockup Parallax Layering Effect
        const mockup = card.querySelector('.phone-mockup-wrapper') || card.querySelector('.browser-mockup-wrapper');
        if (mockup) {
          const cardCenterOffset = (cardRect.top - targetTop) / windowHeight;
          const clampedOffset = Math.max(-0.5, Math.min(1, cardCenterOffset));

          const translateY = clampedOffset * 35; // Mockup moves with a smooth floating rate
          const scale = 1 + (Math.max(0, 1 - Math.abs(clampedOffset)) * 0.04);
          const baseRotate = mockup.classList.contains('browser-mockup-wrapper') ? 2 : -3;

          mockup.style.transform = `translateY(${translateY}px) rotate(${baseRotate}deg) scale(${scale})`;
        }
      });
      });
    };

    window.addEventListener('scroll', handleStackingScroll, { passive: true });
    handleStackingScroll();
  }

  // 4. Navbar Minimalized Pill & Hover Expand Handler (Matching User Screenshot)
  const navbar = document.getElementById('framerNavbar');
  const navLinks = document.querySelectorAll('.framer-menu-link');
  const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      if (navbar) {
        navbar.classList.add('scrolled');
        navbar.classList.add('is-minimized');
      }
    } else {
      if (navbar) {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('is-minimized');
        navbar.classList.remove('is-hover-expanded');
      }
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Hover 3-dots / navbar to expand menu back smoothly when minimalized
  if (navbar) {
    navbar.addEventListener('mouseenter', () => {
      if (navbar.classList.contains('is-minimized')) {
        navbar.classList.add('is-hover-expanded');
      }
    });

    navbar.addEventListener('mouseleave', () => {
      navbar.classList.remove('is-hover-expanded');
    });

    // Touch/tap support on mobile for 3-dots indicator and minimized pill
    navbar.addEventListener('click', (e) => {
      if (navbar.classList.contains('is-minimized')) {
        const link = e.target.closest('.framer-menu-link');
        if (link) {
          navbar.classList.remove('is-hover-expanded');
          return;
        }
        navbar.classList.toggle('is-hover-expanded');
      }
    });
  }

  // Tap outside to close expanded menu on mobile
  document.addEventListener('click', (e) => {
    if (navbar && navbar.classList.contains('is-hover-expanded') && !navbar.contains(e.target)) {
      navbar.classList.remove('is-hover-expanded');
    }
  });

  // Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is tapped (better UX)
    navMenu.querySelectorAll('.framer-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }



  // 6. Project Details Modal Handler
  const projectCards = document.querySelectorAll('.framer-project-card');
  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const projectMap = {
    "1": {
      title: "CyberVision Analytics Dashboard",
      category: "Web Application",
      year: "2025",
      desc: "Platform pemantauan keamanan cyber terintegrasi dengan visualisasi real-time dan analisis kecerdasan data. Menggunakan arsitektur microservices untuk mengolah jutaan log data per detik.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "WebSockets"]
    },
    "2": {
      title: "NeuraMind AI Code Copilot",
      category: "AI / Machine Learning",
      year: "2024",
      desc: "Asisten pemrogram cerdas berbasis Large Language Model (LLM) untuk membantu pengembang menulis kode bersih, auto-completion, dan deteksi bug otomatis.",
      tags: ["Next.js", "Python", "OpenAI API", "FastAPI", "Docker"]
    },
    "3": {
      title: "Aetheria Design System",
      category: "UI/UX Design System",
      year: "2024",
      desc: "Sistem komponen antarmuka modular berarsitektur dark glassmorphic untuk aplikasi SaaS skala besar. Dilengkapi panduan gaya lengkap dan komponen Figma yang dapat diuji.",
      tags: ["Figma", "Design System", "Tokens", "Accessibility"]
    },
    "4": {
      title: "Zenith Financial Management",
      category: "Web Application",
      year: "2024",
      desc: "Aplikasi pelacak keuangan pribadi cerdas dengan grafik analisis interaktif, kalkulasi pengeluaran otomatis, dan laporan bulanan terstruktur.",
      tags: ["React", "Chart.js", "PostgreSQL", "Express.js"]
    }
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project-id');
      const data = projectMap[id];
      if (!data || !projectModal || !modalBody) return;

      modalBody.innerHTML = `
        <span style="font-family: 'Poppins', sans-serif; font-size: 0.8rem; color: #38bdf8; font-weight: 500;">${data.category} • ${data.year}</span>
        <h2 style="font-family: 'Instrument Serif', serif; font-size: 2.4rem; margin: 0.5rem 0 1rem 0;">${data.title}</h2>
        <p style="color: #a0a0a0; line-height: 1.65; margin-bottom: 1.5rem;">${data.desc}</p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
          ${data.tags.map(t => `<span style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 0.35rem 0.8rem; border-radius: 100px; font-size: 0.8rem; color: #fff;">${t}</span>`).join('')}
        </div>
        <div style="display: flex; gap: 1rem;">
          <button class="framer-btn framer-btn-primary" onclick="alert('Demo Live Proyek');">Live Preview</button>
          <button class="framer-btn framer-btn-secondary" onclick="alert('Repositori GitHub');">GitHub Code</button>
        </div>
      `;
      projectModal.classList.add('open');
    });
  });

  // 6.5 Riwayat Pendidikan Inline Accordion Expand Handler (Slides Downward)
  const toggleEducationBtn = document.getElementById('toggleEducationBtn');
  const expandedEduWrapper = document.getElementById('expandedEduWrapper');
  const educationBlock = document.getElementById('educationBlock');
  const stackedCvCards = document.getElementById('stackedCvCards');
  const eduBtnText = document.getElementById('eduBtnText');

  const toggleEducation = () => {
    if (!expandedEduWrapper) return;
    const isOpen = expandedEduWrapper.classList.contains('is-open');

    if (isOpen) {
      expandedEduWrapper.classList.remove('is-open');
      if (educationBlock) educationBlock.classList.remove('is-expanded');
      if (toggleEducationBtn) {
        toggleEducationBtn.classList.remove('is-active');
        toggleEducationBtn.setAttribute('aria-expanded', 'false');
      }
      if (eduBtnText) eduBtnText.textContent = 'See all';
    } else {
      expandedEduWrapper.classList.add('is-open');
      if (educationBlock) educationBlock.classList.add('is-expanded');
      if (toggleEducationBtn) {
        toggleEducationBtn.classList.add('is-active');
        toggleEducationBtn.setAttribute('aria-expanded', 'true');
      }
      if (eduBtnText) eduBtnText.textContent = 'Show less';
    }
  };

  if (toggleEducationBtn) {
    toggleEducationBtn.addEventListener('click', toggleEducation);
  }

  if (stackedCvCards) {
    stackedCvCards.addEventListener('click', toggleEducation);
  }

  if (modalClose && projectModal) {
    modalClose.addEventListener('click', () => projectModal.classList.remove('open'));
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) projectModal.classList.remove('open');
    });
  }

  // 7. Form Submit Handler
  const framerForm = document.getElementById('framerForm');
  if (framerForm) {
    framerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('formSubmitBtn');
      if (submitBtn) submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        showToast('🎉 Pesan Anda telah terkirim ke Maulana Malik Ibrahim!');
        framerForm.reset();
        if (submitBtn) {
          submitBtn.innerHTML = `<span>Kirim Pesan</span><i data-lucide="send"></i>`;
          if (window.lucide) lucide.createIcons();
        }
      }, 1000);
    });
  }

  // 8. Scroll Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Toast Helper
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i data-lucide="check-circle" style="color: #4ade80;"></i> <span>${message}</span>`;
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // 9. Social Follower Badge Config & Counter Helper
  const SOCIAL_CONFIG = {
    linkedin: '2,453',
    instagram: '1,450'
  };

  function updateSocialFollowerCounts(config) {
    const linkedinBadges = document.querySelectorAll('.linkedin-badge .social-badge-number');
    const instagramBadges = document.querySelectorAll('.instagram-badge .social-badge-number');

    if (config.linkedin) {
      linkedinBadges.forEach(el => el.textContent = config.linkedin);
    }
    if (config.instagram) {
      instagramBadges.forEach(el => el.textContent = config.instagram);
    }
  }

  // 10. Collaborate Contact Pills Interactivity
  const emailPill = document.querySelector('.pill-email');
  if (emailPill) {
    emailPill.addEventListener('click', (e) => {
      navigator.clipboard.writeText('mawlanamalik.lana@gmail.com');
      showToast('Email mawlanamalik.lana@gmail.com disalin ke clipboard!');
    });
  }

  const locationPill = document.querySelector('.pill-location');
  if (locationPill) {
    locationPill.addEventListener('click', () => {
      showToast('📍 Berbasis di Purbalingga, Jawa Tengah, Indonesia');
    });
  }

});


