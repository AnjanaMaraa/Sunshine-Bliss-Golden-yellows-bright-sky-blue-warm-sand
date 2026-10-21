/* =========================================================================
   scratch.js — premium scratch-to-reveal card
   ========================================================================= */
(function () {
  'use strict';

  var card = document.getElementById('scratch-card');
  var canvas = document.getElementById('scratch-canvas');
  var statusEl = document.getElementById('scratch-status');
  var burstEl = document.getElementById('scratch-burst');
  var fallbackBtn = document.getElementById('scratch-reveal');
  
  if (!card || !canvas) return;

  var ctx = canvas.getContext('2d', { willReadFrequently: false });
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  var THRESHOLD = 0.5;
  var BRUSH = 24;
  var COLS = 28, ROWS = 18;

  var dpr = 1, w = 0, h = 0;
  var cells = new Uint8Array(COLS * ROWS);
  var cleared = 0;
  var drawing = false;
  var revealed = false;
  var lastPt = null;
  var lastCheck = 0;
  var resizeTimer = null;

  function drawFoil() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';

    var g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#06aed5');
    g.addColorStop(0.5, '#086788');
    g.addColorStop(1, '#06aed5');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    var sheen = ctx.createLinearGradient(0, h, w, 0);
    sheen.addColorStop(0, 'rgba(255,255,255,0)');
    sheen.addColorStop(0.46, 'rgba(255,255,255,.35)');
    sheen.addColorStop(0.5, 'rgba(255,255,255,.75)');
    sheen.addColorStop(0.54, 'rgba(255,255,255,.35)');
    sheen.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = "700 " + Math.max(16, Math.min(26, w * 0.055)) + "px 'Playfair Display', Georgia, serif";
    ctx.fillText('Scratch to Reveal', w / 2, h / 2 - Math.min(12, h * 0.07));
    ctx.font = "400 " + Math.max(12, Math.min(18, w * 0.04)) + "px 'Lato', sans-serif";
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    ctx.fillText("You're Invited!", w / 2, h / 2 + Math.min(16, h * 0.11));
  }

  function setup() {
    var rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.round(rect.width);
    h = Math.round(rect.height);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    cells = new Uint8Array(COLS * ROWS);
    cleared = 0;
    if (revealed) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
    } else {
      drawFoil();
    }
  }

  function pointOf(e) {
    var r = canvas.getBoundingClientRect();
    var clientX = e.clientX || (e.touches && e.touches[0].clientX);
    var clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return { 
      x: (clientX - r.left) * (w / r.width), 
      y: (clientY - r.top) * (h / r.height) 
    };
  }

  function scratch(from, to) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = BRUSH * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  }

  function markCells(from, to) {
    var steps = Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) / 10));
    for (var i = 0; i <= steps; i++) {
      var px = from.x + (to.x - from.x) * (i / steps);
      var py = from.y + (to.y - from.y) * (i / steps);
      var col = Math.floor((px / w) * COLS);
      var row = Math.floor((py / h) * ROWS);
      col = Math.max(0, Math.min(COLS - 1, col));
      row = Math.max(0, Math.min(ROWS - 1, row));
      var idx = row * COLS + col;
      if (!cells[idx]) { cells[idx] = 1; cleared++; }
    }
  }

  function progress() { return cleared / cells.length; }

  function maybeReveal(force) {
    if (revealed) return;
    var now = Date.now();
    if (!force && now - lastCheck < 90) return;
    lastCheck = now;
    if (progress() >= THRESHOLD) reveal();
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    drawing = false;
    card.classList.add('is-revealed');
    
    if (statusEl) {
      var d = invitationData.wedding.date;
      var wd = d ? new Date(d + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' }) : '';
      statusEl.textContent = 'Revealed: ' + invitationData.wedding.displayDate + ', ' + wd + (invitationData.wedding.time ? ', ' + invitationData.wedding.time : '') + '.';
    }
    if (fallbackBtn) { 
        fallbackBtn.disabled = true; 
        fallbackBtn.textContent = 'Invitation Revealed'; 
    }
    if (!reduceMotion.matches) burst();
  }

  function burst() {
    if (!burstEl) return;
    var colors = ['#e6cf98', '#ffffff', '#8fa8c9', '#c8a45d'];
    for (var i = 0; i < 20; i++) {
      var d = document.createElement('span');
      d.className = 'dust';
      var angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.5;
      var dist = 60 + Math.random() * 110;
      d.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      d.style.setProperty('--dy', Math.sin(angle) * dist - 40 + 'px');
      d.style.left = (40 + Math.random() * 20) + '%';
      d.style.top = (40 + Math.random() * 20) + '%';
      d.style.background = colors[i % colors.length];
      d.style.animationDelay = (Math.random() * 0.18) + 's';
      var size = 4 + Math.random() * 5;
      d.style.width = size + 'px'; d.style.height = size + 'px';
      burstEl.appendChild(d);
      setTimeout(function () { d.remove(); }, 1900);
    }
  }

  function onDown(e) {
    if (revealed) return;
    drawing = true;
    lastPt = pointOf(e);
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    scratch(lastPt, lastPt);
    markCells(lastPt, lastPt);
    maybeReveal(true);
  }

  function onMove(e) {
    if (!drawing || revealed) return;
    var pt = pointOf(e);
    scratch(lastPt, pt);
    markCells(lastPt, pt);
    lastPt = pt;
    maybeReveal(false);
  }

  function onUp(e) {
    if (!drawing) return;
    drawing = false;
    lastPt = null;
    try { canvas.releasePointerCapture(e.pointerId); } catch (err) {}
    maybeReveal(true);
  }

  // Use Pointer Events for all inputs
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  
  if (fallbackBtn) fallbackBtn.addEventListener('click', reveal);

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setup, 220);
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { setup(); io.disconnect(); }
    }, { rootMargin: '200px' });
    io.observe(card);
  } else {
    setup();
  }
  
  // Backup init
  setTimeout(setup, 100);

  window.InvitationScratch = { reveal: reveal };
})();
