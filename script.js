/* =====================================================
   PRIYANSHU KUMAR CHOUDHARY — PORTFOLIO SCRIPT v3
   Universe background · Solar system · Parallax
   Dark/Light mode · n8n network · AI Rose 🌹
   Music toggle · Explosions · Mobile optimized
===================================================== */

'use strict';

// ══════════════════════════════════════════════════════
// GLOBALS
// ══════════════════════════════════════════════════════
const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent) ||
                 window.innerWidth < 768;

// ══════════════════════════════════════════════════════
// 1. LOADING SCREEN
// ══════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  const loader     = document.getElementById('loader');
  const loaderBar  = document.getElementById('loaderBar');
  const loaderText = document.getElementById('loaderText');
  const loaderPct  = document.getElementById('loaderPercent');

  const messages = [
    'INITIALIZING UNIVERSE...',
    'LOADING STAR MAP...',
    'ALIGNING PLANETS...',
    'READY FOR LAUNCH 🚀'
  ];
  let progress = 0, msgIdx = 0;

  const lCanvas = document.getElementById('loaderCanvas');
  const lCtx    = lCanvas.getContext('2d');
  lCanvas.width  = window.innerWidth;
  lCanvas.height = window.innerHeight;

  const lStars = Array.from({ length: isMobile ? 120 : 220 }, () => ({
    x: Math.random() * lCanvas.width,
    y: Math.random() * lCanvas.height,
    r: Math.random() * 1.5 + 0.3,
    a: Math.random(),
    speed: Math.random() * 0.5 + 0.15
  }));

  let loaderRaf;
  function drawLoaderStars() {
    lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
    lStars.forEach(s => {
      s.a += (Math.random() - 0.5) * 0.025;
      s.a = Math.max(0.1, Math.min(1, s.a));
      lCtx.globalAlpha = s.a;
      lCtx.fillStyle = '#ffffff';
      lCtx.beginPath();
      lCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      lCtx.fill();
    });
    lCtx.globalAlpha = 1;
    if (!loader.classList.contains('fade-out')) {
      loaderRaf = requestAnimationFrame(drawLoaderStars);
    }
  }
  drawLoaderStars();

  const interval = setInterval(() => {
    progress += Math.random() * 16 + 4;
    if (progress > 100) progress = 100;
    loaderBar.style.width = progress + '%';
    loaderPct.textContent = Math.floor(progress) + '%';

    if (progress > 28 && msgIdx === 0) { loaderText.textContent = messages[1]; msgIdx = 1; }
    if (progress > 62 && msgIdx === 1) { loaderText.textContent = messages[2]; msgIdx = 2; }
    if (progress >= 100 && msgIdx === 2) {
      loaderText.textContent = messages[3];
      msgIdx = 3;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('fade-out');
        cancelAnimationFrame(loaderRaf);
        setTimeout(() => {
          loader.style.display = 'none';
          initApp();
        }, 800);
      }, 500);
    }
  }, 110);
});

// ══════════════════════════════════════════════════════
// 2. INIT APP
// ══════════════════════════════════════════════════════
function initApp() {
  initSpaceBackground();
  initN8nNetwork();
  initExplosionCanvas();
  initCursor();
  initNavbar();
  initTyping();
  initConnectors();
  initReveal();
  initSkillBars();
  initBackToTop();
  initMobileMenu();
  initThemeToggle();
  initMusic();
  initRose();
}

// ══════════════════════════════════════════════════════
// 3. UNIVERSE BACKGROUND — PARALLAX + SOLAR SYSTEM
// ══════════════════════════════════════════════════════
function initSpaceBackground() {
  const canvas = document.getElementById('spaceCanvas');
  const ctx    = canvas.getContext('2d');

  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  let mouseX = W / 2, mouseY = H / 2;
  let targetX = W / 2, targetY = H / 2;

  // 3 depth layers of stars
  const layerDefs = isMobile
    ? [
        { count: 80,  r: 0.5, parallax: 0.006, opacity: 0.35 },
        { count: 50,  r: 1.0, parallax: 0.014, opacity: 0.55 },
        { count: 25,  r: 1.5, parallax: 0.028, opacity: 0.80 },
      ]
    : [
        { count: 140, r: 0.5, parallax: 0.006, opacity: 0.35 },
        { count: 90,  r: 1.0, parallax: 0.014, opacity: 0.55 },
        { count: 45,  r: 1.6, parallax: 0.030, opacity: 0.85 },
      ];

  const stars = [];
  layerDefs.forEach(l => {
    for (let i = 0; i < l.count; i++) {
      stars.push({
        ox: Math.random() * W,
        oy: Math.random() * H,
        r:  l.r + Math.random() * 0.5,
        parallax: l.parallax,
        opacity:  l.opacity * (0.7 + Math.random() * 0.3),
        twinkle:  Math.random() * Math.PI * 2
      });
    }
  });

  // Solar system
  const SUN = { x: W * 0.5, y: H * 0.5, r: isMobile ? 18 : 26, angle: 0 };

  const orbitPlanets = [
    { orbitR: isMobile ? 60 : 90,   r: isMobile ? 6 : 8,   speed: 0.012,  color: '#00d4ff', glow: 'rgba(0,212,255,0.6)',   angle: 0 },
    { orbitR: isMobile ? 100 : 150, r: isMobile ? 8 : 11,  speed: 0.007,  color: '#a78bfa', glow: 'rgba(167,139,250,0.5)', angle: 2.1, hasRing: true },
    { orbitR: isMobile ? 145 : 220, r: isMobile ? 5 : 7,   speed: 0.004,  color: '#f472b6', glow: 'rgba(244,114,182,0.5)', angle: 4.5 },
    { orbitR: isMobile ? 185 : 290, r: isMobile ? 9 : 13,  speed: 0.0025, color: '#fb923c', glow: 'rgba(251,146,60,0.5)',  angle: 1.0, hasRing: true },
  ];

  const nebulae = [
    { ox: W * 0.15, oy: H * 0.35, r: W * 0.18, color: 'rgba(124,58,237,0.045)' },
    { ox: W * 0.85, oy: H * 0.55, r: W * 0.22, color: 'rgba(0,212,255,0.035)' },
    { ox: W * 0.50, oy: H * 0.80, r: W * 0.16, color: 'rgba(79,70,229,0.04)' },
  ];

  // Device orientation bonus
  let orientX = 0, orientY = 0;
  if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', e => {
      orientX = (e.gamma || 0) / 30;
      orientY = (e.beta  || 0) / 30;
    }, { passive: true });
  }

  if (!isMobile) {
    document.addEventListener('mousemove', e => {
      targetX = e.clientX;
      targetY = e.clientY;
    }, { passive: true });
  } else {
    document.addEventListener('touchmove', e => {
      if (e.touches.length > 0) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
      }
    }, { passive: true });
  }

  let time = 0;
  const isLight = () => document.documentElement.dataset.theme === 'light';

  function draw() {
    requestAnimationFrame(draw);

    const lerpFactor = isMobile ? 0.04 : 0.06;
    mouseX += (targetX - mouseX) * lerpFactor;
    mouseY += (targetY - mouseY) * lerpFactor;

    const offX = (mouseX - W / 2) + orientX * W * 0.05;
    const offY = (mouseY - H / 2) + orientY * H * 0.05;

    ctx.clearRect(0, 0, W, H);

    // Nebulae
    nebulae.forEach(n => {
      const grd = ctx.createRadialGradient(n.ox, n.oy, 0, n.ox, n.oy, n.r);
      grd.addColorStop(0, n.color);
      grd.addColorStop(1, 'transparent');
      ctx.globalAlpha = isLight() ? 0.04 : 1;
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(n.ox, n.oy, n.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Stars
    time += 0.008;
    stars.forEach(s => {
      s.twinkle += 0.025;
      const flicker = 0.7 + 0.3 * Math.sin(s.twinkle);
      const px = ((s.ox + offX * s.parallax * 60 + W) % W);
      const py = ((s.oy + offY * s.parallax * 60 + H) % H);
      ctx.globalAlpha = isLight() ? 0.08 : s.opacity * flicker;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Solar system
    const sunX = SUN.x + offX * 0.015;
    const sunY = SUN.y + offY * 0.015;
    ctx.globalAlpha = isLight() ? 0.1 : 1;

    orbitPlanets.forEach(p => {
      ctx.globalAlpha = isLight() ? 0.04 : 0.1;
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.ellipse(sunX, sunY, p.orbitR, p.orbitR * 0.28, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    const sunGrad = ctx.createRadialGradient(sunX - SUN.r * 0.3, sunY - SUN.r * 0.3, 0, sunX, sunY, SUN.r * 3);
    sunGrad.addColorStop(0,   'rgba(255,249,196,0.9)');
    sunGrad.addColorStop(0.3, 'rgba(251,191,36,0.6)');
    sunGrad.addColorStop(0.6, 'rgba(245,158,11,0.2)');
    sunGrad.addColorStop(1,   'transparent');
    ctx.globalAlpha = isLight() ? 0.12 : 1;
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, SUN.r * 3, 0, Math.PI * 2);
    ctx.fill();

    const sunBody = ctx.createRadialGradient(sunX - SUN.r * 0.3, sunY - SUN.r * 0.3, 0, sunX, sunY, SUN.r);
    sunBody.addColorStop(0, '#fff9c4');
    sunBody.addColorStop(0.5, '#fbbf24');
    sunBody.addColorStop(1, '#f59e0b');
    ctx.globalAlpha = isLight() ? 0.15 : 1;
    ctx.fillStyle = sunBody;
    ctx.beginPath();
    ctx.arc(sunX, sunY, SUN.r, 0, Math.PI * 2);
    ctx.fill();

    orbitPlanets.forEach(p => {
      p.angle += p.speed;
      const px = sunX + Math.cos(p.angle) * p.orbitR;
      const py = sunY + Math.sin(p.angle) * p.orbitR * 0.28;

      const haloR = p.r * 2.5;
      const halo = ctx.createRadialGradient(px, py, 0, px, py, haloR);
      halo.addColorStop(0, p.glow);
      halo.addColorStop(1, 'transparent');
      ctx.globalAlpha = isLight() ? 0.06 : 0.7;
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(px, py, haloR, 0, Math.PI * 2);
      ctx.fill();

      if (p.hasRing) {
        ctx.globalAlpha = isLight() ? 0.04 : 0.35;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(px, py, p.r * 1.9, p.r * 0.45, Math.PI * 0.2, 0, Math.PI * 2);
        ctx.stroke();
      }

      const bodyGrad = ctx.createRadialGradient(px - p.r * 0.3, py - p.r * 0.35, 0, px, py, p.r);
      bodyGrad.addColorStop(0, lightenHex(p.color, 60));
      bodyGrad.addColorStop(1, p.color);
      ctx.globalAlpha = isLight() ? 0.1 : 1;
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
  }

  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      SUN.x = W * 0.5;
      SUN.y = H * 0.5;
    }, 150);
  });
}

function lightenHex(hex, amount) {
  const n = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, (n >> 16) + amount);
  const g = Math.min(255, ((n >> 8) & 0xff) + amount);
  const b = Math.min(255, (n & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

// ══════════════════════════════════════════════════════
// 4. N8N-STYLE NETWORK BACKGROUND (Light Mode)
// ══════════════════════════════════════════════════════
function initN8nNetwork() {
  const canvas = document.getElementById('n8nCanvas');
  const ctx    = canvas.getContext('2d');

  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const isLight = () => document.documentElement.dataset.theme === 'light';

  // Create nodes that drift slowly
  const nodeCount = isMobile ? 18 : 32;
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 6 + 6,   // node radius
    color: Math.random() > 0.5 ? '#0077aa' : '#7c3aed',
    pulse: Math.random() * Math.PI * 2,
    type: Math.floor(Math.random() * 3), // 0=circle, 1=square, 2=diamond
  }));

  const MAX_DIST = isMobile ? 160 : 210;

  function drawNode(node, alpha) {
    const p = 0.7 + 0.3 * Math.sin(node.pulse);
    ctx.globalAlpha = alpha * p;

    if (node.type === 0) {
      // Circle node (action node)
      const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r);
      grad.addColorStop(0, node.color + 'ee');
      grad.addColorStop(1, node.color + '44');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = node.color + 'aa';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (node.type === 1) {
      // Rounded-rect node (integration node)
      const s = node.r * 1.6;
      ctx.fillStyle = node.color + 'cc';
      ctx.strokeStyle = node.color + 'bb';
      ctx.lineWidth = 1.5;
      const rx = node.x - s / 2, ry = node.y - s / 2;
      ctx.beginPath();
      ctx.roundRect(rx, ry, s, s, 5);
      ctx.fill();
      ctx.stroke();
    } else {
      // Diamond node (trigger node)
      const s = node.r * 1.3;
      ctx.fillStyle = node.color + 'cc';
      ctx.strokeStyle = node.color + 'bb';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(node.x, node.y - s);
      ctx.lineTo(node.x + s, node.y);
      ctx.lineTo(node.x, node.y + s);
      ctx.lineTo(node.x - s, node.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Glow halo
    ctx.globalAlpha = alpha * 0.15 * p;
    const halo = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 3);
    halo.addColorStop(0, node.color);
    halo.addColorStop(1, 'transparent');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r * 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  }

  // Animated connection packets
  const packets = [];

  function maybeSpawnPacket() {
    if (packets.length > 20) return;
    // Pick two nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST && Math.random() < 0.003) {
          packets.push({ from: i, to: j, t: 0, speed: Math.random() * 0.008 + 0.004 });
          return;
        }
      }
    }
  }

  function drawN8n() {
    requestAnimationFrame(drawN8n);
    if (!isLight()) return;

    ctx.clearRect(0, 0, W, H);

    // Update nodes
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += 0.02;
      if (n.x < -20) n.x = W + 20;
      if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20;
      if (n.y > H + 20) n.y = -20;
    });

    // Draw edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const alpha = (1 - d / MAX_DIST) * 0.3;
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = '#0077aa';
          ctx.lineWidth = 1;
          ctx.setLineDash([6, 8]);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    }
    ctx.globalAlpha = 1;

    // Draw nodes
    nodes.forEach(n => drawNode(n, 0.65));

    // Update + draw packets
    maybeSpawnPacket();
    for (let i = packets.length - 1; i >= 0; i--) {
      const pk = packets[i];
      pk.t += pk.speed;
      if (pk.t >= 1) { packets.splice(i, 1); continue; }

      const from = nodes[pk.from], to = nodes[pk.to];
      const px = from.x + (to.x - from.x) * pk.t;
      const py = from.y + (to.y - from.y) * pk.t;

      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#00d4ff';
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  }

  drawN8n();

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

// ══════════════════════════════════════════════════════
// 5. PARTICLE EXPLOSION ON CLICK / TAP
// ══════════════════════════════════════════════════════
function initExplosionCanvas() {
  const canvas = document.getElementById('explosionCanvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function spawnExplosion(x, y) {
    const count  = isMobile ? 18 : 30;
    const colors = ['#00d4ff','#7c3aed','#f472b6','#fbbf24','#a78bfa','#10b981'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
      const speed = Math.random() * 4 + 2;
      particles.push({
        x, y,
        vx:    Math.cos(angle) * speed,
        vy:    Math.sin(angle) * speed,
        r:     Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        gravity: 0.08
      });
    }
  }

  function animateExplosion() {
    requestAnimationFrame(animateExplosion);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.97;
      p.alpha -= p.decay;
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
  animateExplosion();

  let lastExplosion = 0;
  function handleExplosion(x, y) {
    const now = Date.now();
    if (now - lastExplosion < 100) return;
    lastExplosion = now;
    spawnExplosion(x, y);
  }

  document.addEventListener('click', e => {
    // Don't explode on interactive elements
    if (e.target.closest('.rose-chat, #themeToggle, #musicToggle, .back-top, #navbar, .btn-primary, .btn-ghost')) return;
    handleExplosion(e.clientX, e.clientY);
  });
  document.addEventListener('touchstart', e => {
    if (e.touches.length > 0) handleExplosion(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ══════════════════════════════════════════════════════
// 6. CUSTOM CURSOR (desktop only)
// ══════════════════════════════════════════════════════
function initCursor() {
  if (isMobile) return;
  const glow = document.getElementById('cursorGlow');
  const dot  = document.getElementById('cursorDot');
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
  }, { passive: true });
}

// ══════════════════════════════════════════════════════
// 7. NAVBAR SCROLL
// ══════════════════════════════════════════════════════
function initNavbar() {
  const nav = document.getElementById('navbar');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ══════════════════════════════════════════════════════
// 8. MOBILE MENU
// ══════════════════════════════════════════════════════
function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileNav');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });
}

function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ══════════════════════════════════════════════════════
// 9. TYPING ANIMATION
// ══════════════════════════════════════════════════════
function initTyping() {
  const el = document.getElementById('typingEl');
  if (!el) return;

  const roles = [
    'Frontend Developer | Part-time Cricketer 🏏',
    'Data Scientist',
    'Web Developer',
    'ML Enthusiast',
    'Problem Solver',
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2400);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 52 : 95);
  }
  type();
}

// ══════════════════════════════════════════════════════
// 10. N8N-STYLE CONNECTOR LINES
// ══════════════════════════════════════════════════════
function initConnectors() {
  const svg      = document.getElementById('connectorSvg');
  const pipeline = document.getElementById('pipeline');

  const connections = [
    { from: 'out-hero',     to: 'in-about'   },
    { from: 'out-about',    to: 'in-skills'  },
    { from: 'out-skills',   to: 'in-projects'},
    { from: 'out-projects', to: 'in-journey' },
    { from: 'out-journey',  to: 'in-contact' },
  ];

  const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
  const grad = document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
  grad.setAttribute('id','connGrad');
  grad.setAttribute('x1','0%'); grad.setAttribute('y1','0%');
  grad.setAttribute('x2','0%'); grad.setAttribute('y2','100%');
  [['0%','#00d4ff','0.7'],['100%','#7c3aed','0.35']].forEach(([off,col,op]) => {
    const s = document.createElementNS('http://www.w3.org/2000/svg','stop');
    s.setAttribute('offset',off);
    s.setAttribute('stop-color',col);
    s.setAttribute('stop-opacity',op);
    grad.appendChild(s);
  });
  defs.appendChild(grad);
  svg.appendChild(defs);

  function getCenter(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const rect  = el.getBoundingClientRect();
    const pRect = pipeline.getBoundingClientRect();
    return {
      x: rect.left + rect.width  / 2 - pRect.left,
      y: rect.top  + rect.height / 2 - pRect.top + window.scrollY
    };
  }

  const dots = [];

  function drawConnectors() {
    svg.querySelectorAll('path,circle').forEach(e => e.remove());
    dots.length = 0;

    connections.forEach((c, i) => {
      const from = getCenter(c.from);
      const to   = getCenter(c.to);
      if (!from || !to) return;

      const dy   = to.y - from.y;
      const cp1x = from.x, cp1y = from.y + dy * 0.4;
      const cp2x = to.x,   cp2y = to.y   - dy * 0.4;

      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d', `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`);
      path.setAttribute('fill','none');
      path.setAttribute('stroke','url(#connGrad)');
      path.setAttribute('stroke-width','2');
      path.setAttribute('stroke-dasharray','8 5');
      path.setAttribute('opacity','0.5');
      path.style.animation = `dashFlow ${3.2 + i * 0.3}s linear infinite`;
      svg.appendChild(path);

      const dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
      dot.setAttribute('r','4');
      dot.setAttribute('fill','#00d4ff');
      dot.setAttribute('opacity','0.85');
      svg.appendChild(dot);
      dots.push({ dot, path, duration: 3500 + i * 350 });
    });

    dots.forEach(({ dot, path, duration }) => {
      let start = null;
      const len = path.getTotalLength ? path.getTotalLength() : 300;
      function step(ts) {
        if (!start) start = ts;
        const t = ((ts - start) % duration) / duration;
        try {
          const pt = path.getPointAtLength(t * len);
          dot.setAttribute('cx', pt.x);
          dot.setAttribute('cy', pt.y);
        } catch(e) {}
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  setTimeout(drawConnectors, 300);

  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(drawConnectors, 60);
  }, { passive: true });

  let resizeTimer2;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer2);
    resizeTimer2 = setTimeout(drawConnectors, 150);
  });
}

// ══════════════════════════════════════════════════════
// 11. SCROLL REVEAL
// ══════════════════════════════════════════════════════
function initReveal() {
  const items = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.max(0, idx) * 0.08}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
}

// ══════════════════════════════════════════════════════
// 12. SKILL BAR ANIMATION
// ══════════════════════════════════════════════════════
function initSkillBars() {
  const bars = document.querySelectorAll('.sk-fill');
  bars.forEach(b => {
    const w = b.dataset.w || 0;
    b.style.setProperty('--target-width', w + '%');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(b => observer.observe(b));
}

// ══════════════════════════════════════════════════════
// 13. BACK TO TOP
// ══════════════════════════════════════════════════════
function initBackToTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ══════════════════════════════════════════════════════
// 14. DARK / LIGHT MODE TOGGLE
// ══════════════════════════════════════════════════════
function initThemeToggle() {
  const btn  = document.getElementById('themeToggle');
  const html = document.documentElement;

  const saved = localStorage.getItem('pkc-theme') || 'dark';
  html.dataset.theme = saved;

  btn.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('pkc-theme', next);
  });
}

// ══════════════════════════════════════════════════════
// 15. MUSIC TOGGLE — Interstellar Ambient
// ══════════════════════════════════════════════════════
function initMusic() {
  const btn  = document.getElementById('musicToggle');
  const icon = document.getElementById('musicIcon');

  /* ─────────────────────────────────────────────────
     HOW TO ADD YOUR MUSIC FILE:
     1. Download the Interstellar soundtrack (or any
        ambient MP3 you like).
     2. Rename it to "interstellar.mp3"
     3. Place it in the same folder as index.html
     4. The button below will play it automatically.
     ─────────────────────────────────────────────── */
  const audio = new Audio('interstellar_experienc.mp3');
  audio.loop   = true;
  audio.volume = 0;  // Start silent; fade in

  let playing = false;
  let fadeInterval = null;

  function fadeTo(target) {
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
      const diff = target - audio.volume;
      if (Math.abs(diff) < 0.02) {
        audio.volume = target;
        clearInterval(fadeInterval);
        if (target === 0) audio.pause();
      } else {
        audio.volume += diff * 0.12;
      }
    }, 40);
  }

  btn.addEventListener('click', async () => {
    if (!playing) {
      try {
        audio.volume = 0;
        await audio.play();
        fadeTo(0.35);
        playing = true;
        btn.classList.add('playing');
        icon.className = 'fas fa-pause';
        btn.title = 'Pause Music';
      } catch (e) {
        // Browser blocked autoplay — show friendly note
        console.warn('Music play failed:', e.message);
      }
    } else {
      fadeTo(0);
      playing = false;
      btn.classList.remove('playing');
      icon.className = 'fas fa-music';
      btn.title = 'Play Interstellar Music';
    }
  });

  // Pause when page hidden (battery saving)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && playing) fadeTo(0);
  });
}

// ══════════════════════════════════════════════════════
// 16. CONTACT FORM
// ══════════════════════════════════════════════════════
function handleFormSubmit(btn) {
  const name  = document.getElementById('formName')?.value.trim();
  const email = document.getElementById('formEmail')?.value.trim();
  const msg   = document.getElementById('formMsg')?.value.trim();

  if (!name || !email || !msg) {
    btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Fill all fields!';
    btn.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-satellite-dish"></i> Send Signal';
      btn.style.background = '';
    }, 2000);
    return;
  }

  const original = btn.innerHTML;
  btn.innerHTML  = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled   = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Signal Sent! ✦';
    btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
    setTimeout(() => {
      btn.innerHTML  = original;
      btn.style.background = '';
      btn.disabled   = false;
      document.getElementById('formName').value  = '';
      document.getElementById('formEmail').value = '';
      document.getElementById('formMsg').value   = '';
    }, 3000);
  }, 1200);
}

// ══════════════════════════════════════════════════════
// 17. INJECT KEYFRAMES
// ══════════════════════════════════════════════════════
const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes dashFlow { to { stroke-dashoffset: -52; } }`;
document.head.appendChild(styleTag);

// ══════════════════════════════════════════════════════
// 18. AI ASSISTANT — ROSE 🌹
// ══════════════════════════════════════════════════════
function initRose() {
  const trigger  = document.getElementById('roseTrigger');
  const chatBox  = document.getElementById('roseChatBox');
  const closeBtn = document.getElementById('roseClose');
  const input    = document.getElementById('roseInput');
  const sendBtn  = document.getElementById('roseSend');
  const messages = document.getElementById('roseMessages');

  let isOpen = false;

  // Show initial greeting
  appendMessage('rose', "Hi! I'm Rose 🌹 I know everything about Priyanshu! Ask me about his skills, projects, or career goals 💫");

  // Toggle chat open/close
  function toggleChat() {
    isOpen = !isOpen;
    chatBox.classList.toggle('open', isOpen);
    if (isOpen) {
      input.focus();
      // Hide the ping dot once opened
      const ping = trigger.querySelector('.rose-ping');
      if (ping) ping.style.display = 'none';
    }
  }

  trigger.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', () => {
    isOpen = false;
    chatBox.classList.remove('open');
  });

  // Send on button click or Enter key
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage();
  });

  // ── Append a message bubble ──────────────────────
  function appendMessage(sender, text) {
    const div = document.createElement('div');
    div.className = `rose-msg from-${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'rose-bubble';
    bubble.textContent = text;

    div.appendChild(bubble);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  // ── Typing indicator ────────────────────────────
  function showTyping() {
    const div = document.createElement('div');
    div.className = 'rose-msg from-rose rose-typing';
    div.id = 'roseTyping';
    div.innerHTML = `<div class="rose-bubble">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('roseTyping');
    if (t) t.remove();
  }

  // ── Send message flow ────────────────────────────
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    input.value = '';
    sendBtn.disabled = true;

    showTyping();

    try {
      const reply = await askRose(text);
      hideTyping();
      appendMessage('rose', reply);
    } catch (err) {
      hideTyping();
      appendMessage('rose', "Sorry, I'm having a moment 🌸 Try again in a bit!");
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // ── Call Claude API with Priyanshu's context ─────
// 🔑 Apni Gemini API Key yahan rakho (config.js mein rakhna safer hai)
// ── Gemini API with Priyanshu's context ─────
  const GEMINI_API_KEY = 'AIzaSyCLrQS1DnGVEL0rHfmkjybq6HUFTN4y-Yg'; // 🔑 Nayi key yahan

  async function askRose(userMessage) {

    if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      return "🔑 Gemini API key missing hai! GEMINI_API_KEY mein apni key paste karo.";
    }

    const systemPrompt = `You are Rose 🌹, a friendly AI assistant on Priyanshu Kumar Choudhary's portfolio.
Your personality: Warm, encouraging, slightly playful. Use light emojis.
About Priyanshu:
- BCA Final Year, Sambalpur University, Odisha (2022-2025)
- Frontend Developer | Part-time Cricketer 🏏
- Skills: HTML5 (90%), CSS3 (85%), JavaScript (75%), Bootstrap (80%), Tailwind (72%), Python (80%), SQL (75%), ML (65%)
- Tools: GitHub, VS Code, Jupyter, scikit-learn, MySQL, Figma
- Learning: React.js, Deep Learning, Cloud Basics
- Open to: Jobs, Internships, Collaborations
- Instagram: @priyanshu__74
- Available for work: YES
Keep answers short (2-4 sentences). If unrelated question, redirect to Priyanshu.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt + '\n\nUser: ' + userMessage }]
          }],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.75
          }
        })
      }
    );

    if (!response.ok) {
      console.error('Gemini Error:', await response.json());
      throw new Error('API error');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
           || "I couldn't think of a reply 🌸";
  }
}
