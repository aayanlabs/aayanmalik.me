/* ============================================
   AAYAN MALIK — PORTFOLIO SCRIPTS
   Three.js Neural Network + GSAP Animations
   ============================================ */

(function () {
  'use strict';

  // ========== LOADING SCREEN ==========
  const loader = document.getElementById('loader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      initHeroAnimations();
    }, 2800);
  });

  // ========== CUSTOM CURSOR ==========
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorTrail = document.getElementById('cursor-trail');
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
  });

  // Smooth trail follow
  function animateCursor() {
    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effect
  const interactiveEls = document.querySelectorAll('a, button, .skill-tag, .project-card, .contact-card, .glass-card');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursorGlow.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorGlow.classList.remove('hover'));
  });

  // ========== NAVBAR ==========
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Scroll detection
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;

    // Active link highlight
    updateActiveNav();
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll('.section, #hero');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileNav.classList.remove('open');
    });
  });

  // ========== THREE.JS NEURAL NETWORK ==========
  const canvas = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  // Particles (neurons)
  const PARTICLE_COUNT = 200;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = [];
  const spread = 80;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    velocities.push({
      x: (Math.random() - 0.5) * 0.02,
      y: (Math.random() - 0.5) * 0.02,
      z: (Math.random() - 0.5) * 0.02,
    });
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x4f8fff,
    size: 0.6,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // Connection lines
  const lineColor = new THREE.Color(0x4f8fff);
  const MAX_CONNECTIONS = 600;
  const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
  const lineColors = new Float32Array(MAX_CONNECTIONS * 6);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
  });

  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);

  // Mouse interaction for parallax
  let targetRotX = 0, targetRotY = 0;

  document.addEventListener('mousemove', (e) => {
    targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.3;
    targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.3;
  });

  // Animation
  function animateThree() {
    requestAnimationFrame(animateThree);

    // Move particles
    const pos = particleGeometry.attributes.position.array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] += velocities[i].x;
      pos[i * 3 + 1] += velocities[i].y;
      pos[i * 3 + 2] += velocities[i].z;

      // Boundary wrap
      for (let j = 0; j < 3; j++) {
        if (pos[i * 3 + j] > spread / 2) pos[i * 3 + j] = -spread / 2;
        if (pos[i * 3 + j] < -spread / 2) pos[i * 3 + j] = spread / 2;
      }
    }
    particleGeometry.attributes.position.needsUpdate = true;

    // Update connections
    let lineIndex = 0;
    const connectionDistance = 12;

    for (let i = 0; i < PARTICLE_COUNT && lineIndex < MAX_CONNECTIONS; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < MAX_CONNECTIONS; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          const alpha = 1 - dist / connectionDistance;
          const lp = lineGeometry.attributes.position.array;
          const lc = lineGeometry.attributes.color.array;

          lp[lineIndex * 6] = pos[i * 3];
          lp[lineIndex * 6 + 1] = pos[i * 3 + 1];
          lp[lineIndex * 6 + 2] = pos[i * 3 + 2];
          lp[lineIndex * 6 + 3] = pos[j * 3];
          lp[lineIndex * 6 + 4] = pos[j * 3 + 1];
          lp[lineIndex * 6 + 5] = pos[j * 3 + 2];

          lc[lineIndex * 6] = lineColor.r * alpha;
          lc[lineIndex * 6 + 1] = lineColor.g * alpha;
          lc[lineIndex * 6 + 2] = lineColor.b * alpha;
          lc[lineIndex * 6 + 3] = lineColor.r * alpha;
          lc[lineIndex * 6 + 4] = lineColor.g * alpha;
          lc[lineIndex * 6 + 5] = lineColor.b * alpha;

          lineIndex++;
        }
      }
    }

    // Clear unused lines
    for (let i = lineIndex; i < MAX_CONNECTIONS; i++) {
      const lp = lineGeometry.attributes.position.array;
      lp[i * 6] = 0; lp[i * 6 + 1] = 0; lp[i * 6 + 2] = 0;
      lp[i * 6 + 3] = 0; lp[i * 6 + 4] = 0; lp[i * 6 + 5] = 0;
    }

    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    // Smooth camera rotation
    particles.rotation.x += (targetRotX - particles.rotation.x) * 0.02;
    particles.rotation.y += (targetRotY - particles.rotation.y) * 0.02;
    lines.rotation.x = particles.rotation.x;
    lines.rotation.y = particles.rotation.y;

    // Slow auto-rotation
    particles.rotation.y += 0.0008;
    lines.rotation.y += 0.0008;

    renderer.render(scene, camera);
  }

  animateThree();

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ========== HERO ANIMATIONS (GSAP) ==========
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.hero-greeting', { opacity: 1, y: 0, duration: 0.8 })
      .to('.hero-line', { opacity: 1, y: 0, duration: 1 }, '-=0.4')
      .to('.hero-role', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to('.scroll-indicator', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
  }

  // ========== SCROLL REVEAL ==========
  gsap.registerPlugin(ScrollTrigger);

  // Reveal Up animations
  const revealElements = document.querySelectorAll('.reveal-up');
  revealElements.forEach((el, i) => {
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) * 0.1 : 0;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        setTimeout(() => {
          el.classList.add('visible');
        }, delay * 1000);
      },
    });
  });

  // Language bars animation
  const langFills = document.querySelectorAll('.lang-fill');
  langFills.forEach(fill => {
    ScrollTrigger.create({
      trigger: fill,
      start: 'top 90%',
      onEnter: () => {
        const width = fill.dataset.width;
        fill.style.width = width + '%';
      },
    });
  });

  // ========== PARALLAX DEPTH LAYERS ==========
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.getElementById('hero');
    if (hero) {
      hero.style.transform = `translateY(${scrollY * 0.3}px)`;
      hero.style.opacity = Math.max(1 - scrollY / 700, 0);
    }

    // Canvas parallax
    canvas.style.transform = `translateY(${scrollY * 0.15}px)`;
  });

  // ========== SKILL TAG HOVER GLOW ==========
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('mousemove', (e) => {
      const rect = tag.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tag.style.setProperty('--glow-x', x + 'px');
      tag.style.setProperty('--glow-y', y + 'px');
    });
  });

  // ========== PROJECT CARD TILT ==========
  const projectCards = document.querySelectorAll('.project-card-inner');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * 8;
      const tiltY = (x - 0.5) * -8;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ========== FLOATING ANIMATION ON ABOUT ICONS ==========
  const aboutIcons = document.querySelectorAll('.about-icon');
  aboutIcons.forEach((icon, i) => {
    gsap.to(icon, {
      y: -8,
      duration: 2 + i * 0.3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  });

  // ========== SMOOTH SCROLL FOR NAV LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // ========== SECTION SEPARATOR GLOW LINES ==========
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(79,143,255,0.2), transparent);
    `;
    section.style.position = 'relative';
    section.prepend(glow);
  });

  // ========== TYPED EFFECT FOR VISION QUOTE ==========
  // Subtle pulsating glow on vision dots
  const visionDots = document.querySelectorAll('.vision-dot');
  visionDots.forEach((dot, i) => {
    gsap.to(dot, {
      boxShadow: dot.style.boxShadow ? dot.style.boxShadow : '0 0 20px rgba(79, 143, 255, 0.6)',
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.3,
    });
  });

})();
