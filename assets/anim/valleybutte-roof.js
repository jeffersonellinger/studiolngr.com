/* Valley Butte House: roof edge transforms and the ruled surfaces they drive.
   Geometry from the project's Rhino roof model (Campbell_Roof_JE.3dm, layer A-RoofLines_NEW, April 2011),
   in feet. Each L has a diagonal ridge beam from its outer corner to its inner corner. Rulings run across
   each arm, straight, from the outer edge to the inner edge or to the ridge beam, which turns them 90 degrees.
   Sequence: the plan in XY (it does not move), then YZ (edges running north-south), then XZ (east-west).
   Drawn live on a canvas; pauses off screen; one still frame if motion is reduced. */
(function () {
  var CURVES = {"S_in_y":[[69.76,54.82,19.76],[69.76,56.6,19.69],[69.76,58.37,19.6],[69.76,60.15,19.5],[69.76,61.92,19.37],[69.76,63.7,19.23],[69.76,65.47,19.07],[69.76,67.25,18.88],[69.76,69.03,18.68],[69.76,70.8,18.46],[69.76,72.58,18.22],[69.76,74.35,17.96],[69.76,76.13,17.68],[69.76,77.9,17.38],[69.76,79.68,17.07],[69.76,81.46,16.73],[69.76,83.23,16.37],[69.76,85.01,16.0],[69.76,86.78,15.6],[69.76,88.56,15.19],[69.76,90.33,14.76]],"S_out_x":[[91.82,40.87,14.76],[89.3,40.87,14.95],[86.91,40.8,15.15],[84.66,40.69,15.35],[82.57,40.53,15.55],[80.65,40.36,15.74],[78.91,40.17,15.92],[77.35,39.99,16.09],[75.99,39.82,16.23],[74.79,39.65,16.36],[73.69,39.46,16.47],[72.65,39.25,16.57],[71.61,38.99,16.66],[70.52,38.67,16.75],[69.33,38.27,16.85],[68.0,37.79,16.95],[66.52,37.26,17.05],[64.88,36.71,17.15],[63.07,36.18,17.23],[61.08,35.71,17.28],[58.9,35.34,17.31]],"S_end_x":[[58.9,54.82,19.82],[58.9,53.85,19.7],[58.9,52.87,19.57],[58.9,51.9,19.45],[58.9,50.92,19.32],[58.9,49.95,19.19],[58.9,48.98,19.07],[58.9,48.0,18.94],[58.9,47.03,18.82],[58.9,46.05,18.69],[58.9,45.08,18.56],[58.9,44.1,18.44],[58.9,43.13,18.31],[58.9,42.16,18.19],[58.9,41.18,18.06],[58.9,40.21,17.94],[58.9,39.23,17.81],[58.9,38.26,17.68],[58.9,37.28,17.56],[58.9,36.31,17.43],[58.9,35.34,17.31]],"S_end_y":[[69.76,90.33,14.76],[70.87,90.33,14.51],[71.97,90.33,14.26],[73.07,90.33,14.01],[74.18,90.33,13.76],[75.28,90.33,13.51],[76.38,90.33,13.26],[77.49,90.33,13.02],[78.59,90.33,12.77],[79.69,90.33,12.52],[80.79,90.33,12.27],[81.9,90.33,12.02],[83.0,90.33,11.77],[84.1,90.33,11.52],[85.21,90.33,11.27],[86.31,90.33,11.02],[87.41,90.33,10.77],[88.52,90.33,10.52],[89.62,90.33,10.28],[90.72,90.33,10.03],[91.82,90.33,9.78]],"S_ridge":[[69.76,54.82,19.76],[70.87,54.12,19.51],[71.97,53.43,19.26],[73.07,52.73,19.01],[74.18,52.03,18.76],[75.28,51.33,18.51],[76.38,50.64,18.26],[77.49,49.94,18.01],[78.59,49.24,17.76],[79.69,48.54,17.51],[80.79,47.85,17.26],[81.9,47.15,17.01],[83.0,46.45,16.76],[84.1,45.75,16.51],[85.21,45.06,16.26],[86.31,44.36,16.01],[87.41,43.66,15.76],[88.52,42.96,15.51],[89.62,42.27,15.26],[90.72,41.57,15.01],[91.82,40.87,14.76]],"S_in_x":[[58.9,54.82,19.82],[59.49,54.82,19.84],[60.08,54.82,19.86],[60.66,54.82,19.88],[61.24,54.82,19.89],[61.81,54.82,19.91],[62.38,54.82,19.92],[62.95,54.82,19.93],[63.51,54.82,19.93],[64.07,54.82,19.94],[64.62,54.82,19.94],[65.16,54.82,19.94],[65.7,54.82,19.93],[66.24,54.82,19.93],[66.76,54.82,19.92],[67.28,54.82,19.9],[67.8,54.82,19.88],[68.3,54.82,19.86],[68.8,54.82,19.83],[69.29,54.82,19.8],[69.76,54.82,19.76]],"S_out_y":[[91.82,90.33,9.78],[91.82,87.84,9.83],[91.82,85.35,9.96],[91.82,82.87,10.15],[91.82,80.4,10.4],[91.82,77.93,10.7],[91.82,75.46,11.03],[91.82,73.0,11.4],[91.82,70.54,11.78],[91.82,68.08,12.18],[91.82,65.62,12.58],[91.82,63.16,12.97],[91.82,60.7,13.35],[91.82,58.24,13.7],[91.82,55.78,14.02],[91.82,53.31,14.3],[91.82,50.83,14.53],[91.82,48.35,14.7],[91.82,45.87,14.8],[91.82,43.37,14.82],[91.82,40.87,14.76]],"B_out_y":[[0.0,92.88,12.69],[0.0,86.25,12.65],[0.0,80.24,12.54],[0.0,74.8,12.35],[0.0,69.84,12.11],[0.0,65.3,11.82],[0.0,61.11,11.48],[0.0,57.2,11.11],[0.0,53.49,10.72],[0.0,49.93,10.31],[0.0,46.43,9.89],[0.0,42.94,9.47],[0.0,39.37,9.05],[0.0,35.67,8.66],[0.0,31.76,8.29],[0.0,27.56,7.96],[0.0,23.02,7.66],[0.0,18.07,7.42],[0.0,12.62,7.24],[0.0,6.62,7.12],[0.0,-0.01,7.08]],"B_in_y":[[28.83,58.03,16.27],[28.83,53.88,16.26],[28.83,50.13,16.2],[28.83,46.73,16.11],[28.82,43.63,15.99],[28.82,40.8,15.84],[28.82,38.18,15.67],[28.82,35.73,15.48],[28.82,33.42,15.27],[28.82,31.19,15.06],[28.82,29.01,14.84],[28.82,26.82,14.62],[28.82,24.6,14.41],[28.82,22.28,14.2],[28.82,19.84,14.01],[28.82,17.22,13.83],[28.82,14.38,13.68],[28.82,11.28,13.55],[28.82,7.88,13.45],[28.82,4.13,13.39],[28.82,-0.01,13.37]],"B_ridge":[[28.83,58.03,16.27],[27.39,59.77,16.09],[25.94,61.51,15.92],[24.5,63.25,15.74],[23.06,65.0,15.56],[21.62,66.74,15.38],[20.18,68.48,15.2],[18.74,70.22,15.02],[17.3,71.97,14.84],[15.86,73.71,14.66],[14.41,75.45,14.48],[12.97,77.19,14.3],[11.53,78.94,14.12],[10.09,80.68,13.95],[8.65,82.42,13.77],[7.21,84.17,13.59],[5.77,85.91,13.41],[4.33,87.65,13.23],[2.88,89.39,13.05],[1.44,91.14,12.87],[0.0,92.88,12.69]],"B_end_x":[[50.55,92.87,14.76],[50.55,91.13,14.91],[50.55,89.39,15.06],[50.55,87.64,15.21],[50.55,85.9,15.36],[50.55,84.16,15.51],[50.55,82.42,15.66],[50.55,80.67,15.81],[50.55,78.93,15.96],[50.55,77.19,16.11],[50.55,75.44,16.26],[50.55,73.7,16.41],[50.55,71.96,16.56],[50.55,70.21,16.71],[50.55,68.47,16.86],[50.55,66.73,17.01],[50.55,64.99,17.16],[50.55,63.24,17.31],[50.55,61.5,17.46],[50.55,59.76,17.61],[50.55,58.01,17.76]],"B_in_x":[[50.55,58.01,17.76],[48.99,58.01,17.76],[47.5,58.01,17.75],[46.08,58.01,17.73],[44.72,58.01,17.7],[43.41,58.01,17.66],[42.17,58.02,17.61],[40.97,58.02,17.55],[39.82,58.02,17.49],[38.72,58.02,17.42],[37.67,58.02,17.34],[36.65,58.02,17.26],[35.67,58.02,17.17],[34.73,58.02,17.07],[33.81,58.02,16.97],[32.93,58.02,16.86],[32.07,58.02,16.75],[31.23,58.02,16.64],[30.41,58.02,16.52],[29.61,58.03,16.4],[28.83,58.03,16.27]],"B_end_y":[[0.0,-0.01,7.08],[1.44,-0.01,7.39],[2.88,-0.01,7.71],[4.32,-0.01,8.02],[5.77,-0.01,8.34],[7.21,-0.01,8.65],[8.65,-0.01,8.97],[10.09,-0.01,9.28],[11.53,-0.01,9.6],[12.97,-0.01,9.91],[14.41,-0.01,10.22],[15.85,-0.01,10.54],[17.29,-0.01,10.85],[18.73,-0.01,11.17],[20.17,-0.01,11.48],[21.62,-0.01,11.8],[23.06,-0.01,12.11],[24.5,-0.01,12.43],[25.94,-0.01,12.74],[27.38,-0.01,13.06],[28.82,-0.01,13.37]],"B_out_x":[[50.55,92.87,14.76],[46.62,92.87,14.74],[43.07,92.87,14.7],[39.85,92.87,14.64],[36.93,92.87,14.55],[34.28,92.87,14.45],[31.84,92.87,14.32],[29.6,92.87,14.19],[27.5,92.87,14.05],[25.51,92.87,13.9],[23.59,92.87,13.75],[21.7,92.87,13.6],[19.81,92.87,13.45],[17.88,92.87,13.3],[15.87,92.87,13.17],[13.74,92.88,13.04],[11.46,92.88,12.93],[8.98,92.88,12.84],[6.27,92.88,12.77],[3.29,92.88,12.72],[0.0,92.88,12.69]]};
  var RED = '#d7261e', GREY = '#8c8c8c', INK = '#111', SWING = 7.6, ZF = 14;   // SWING: seconds one way; ZF: flat roof height before the pushes

  function ease(t) { return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t); }
  function ramp(t, a, b) { return ease((t - a) / (b - a)); }
  function lerp(a, b, s) { return a + (b - a) * s; }

  // Which push moves each edge: 'y' edges run north-south (YZ), 'x' edges run east-west (XZ).
  var DIR = { B_out_y: 'y', B_in_y: 'y', B_end_x: 'y', S_out_y: 'y', S_in_y: 'y', S_end_x: 'y',
              B_out_x: 'x', B_in_x: 'x', B_end_y: 'x', S_out_x: 'x', S_in_x: 'x', S_end_y: 'x',
              B_ridge: 'r', S_ridge: 'r' };
  var BOW_FLAT_Y = CURVES.S_out_x[0][1];   // the small L's outer edge before the XY push: straight, due west

  // A curve at a moment: plan pushed by bow; height = corner line (moves with both pushes) + bulge (its own push).
  function live(name, st) {
    var c = CURVES[name], n = c.length - 1, z0 = c[0][2], z1 = c[n][2], d = DIR[name];
    var pc = (st.pa + st.pb) / 2, pd = d === 'y' ? st.pa : d === 'x' ? st.pb : 0;
    return c.map(function (p, i) {
      var s = i / n, y = p[1];
      if (name === 'S_out_x') y = c[0][1] + (c[n][1] - c[0][1]) * (p[0] - c[0][0]) / (c[n][0] - c[0][0]);   // straight in plan
      var line = lerp(z0, z1, s), corner = lerp(lerp(ZF, z0, pc), lerp(ZF, z1, pc), s);
      return [p[0], y, corner + (p[2] - line) * pd];
    });
  }

  // Point on a chain of polylines where coordinate ax (0 = x, 1 = y) equals c.
  function at(chains, ax, c) {
    for (var k = 0; k < chains.length; k++) {
      var L = chains[k];
      for (var i = 0; i + 1 < L.length; i++) {
        var a = L[i][ax], b = L[i + 1][ax];
        if ((c - a) * (c - b) <= 0 && a !== b) {
          var s = (c - a) / (b - a);
          return [lerp(L[i][0], L[i + 1][0], s), lerp(L[i][1], L[i + 1][1], s), lerp(L[i][2], L[i + 1][2], s)];
        }
      }
    }
    return null;
  }

  // The four arms: outer edge, inner chain (ridge beam then inner edge), axis the rulings step along.
  var ARMS = [
    { outer: 'B_out_y', inner: ['B_ridge', 'B_in_y'], ax: 1 },
    { outer: 'B_out_x', inner: ['B_ridge', 'B_in_x'], ax: 0 },
    { outer: 'S_out_y', inner: ['S_ridge', 'S_in_y'], ax: 1 },
    { outer: 'S_out_x', inner: ['S_ridge', 'S_in_x'], ax: 0 }
  ];
  var EDGES = Object.keys(CURVES);

  // Isometric projection, mirrored: north to the upper left.
  var C30 = Math.cos(Math.PI / 6);
  function proj(x, y, z) { return [-(x + y) * C30, (y - x) * 0.4 - z * 1.05]; }   // lower eye than isometric

  function state(t) {                        // one way of the swing; eased so it slows into each turn
    return {
      alpha: 1,
      bow: 1,                                   // the plan holds its final L throughout: nothing moves in XY
      plane: 1 - ramp(t, 0.3, 0.9),
      rule: ramp(t, 0.5, 1.2),
      pa: ramp(t, 0.8, 3.8),
      pb: ramp(t, 4.1, 7.1),
      grey: t > 4.1,
      label: t < 0.8 ? 'XY PLANE' : t < 4 ? 'YZ PLANE TRANSFORM' : 'XZ PLANE TRANSFORM',
      pushY: false, pushX: false                 // no arrows
    };
  }

  function setup(canvas) {
    var ctx = canvas.getContext('2d'), scale = 1, ox = 0, oy = 0, dpr = 1, W = 0, Hh = 0;
    var S, start = performance.now(), running = false, forced = null,
        still = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function fit() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; Hh = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = Hh * dpr;
      var r = [1e9, 1e9, -1e9, -1e9];
      EDGES.forEach(function (n) {
        CURVES[n].forEach(function (p) {
          [0, p[2], ZF].forEach(function (z) {
            var q = proj(p[0], Math.min(p[1], BOW_FLAT_Y + 100), z);
            r[0] = Math.min(r[0], q[0]); r[1] = Math.min(r[1], q[1]); r[2] = Math.max(r[2], q[0]); r[3] = Math.max(r[3], q[1]);
          });
        });
      });
      var pad = 0.07, labelRoom = 0;
      scale = Math.min(W * (1 - 2 * pad) / (r[2] - r[0]), Hh * (1 - 2 * pad - labelRoom) / (r[3] - r[1]));
      ox = W / 2 - scale * (r[0] + r[2]) / 2;
      oy = Hh * pad + (Hh * (1 - 2 * pad - labelRoom) - scale * (r[3] - r[1])) / 2 - scale * r[1];
    }
    function P(p, z) { var q = proj(p[0], p[1], z === undefined ? p[2] : z); return [ox + q[0] * scale, oy + q[1] * scale]; }
    function line(a, b) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
    function poly(pts, z) { ctx.beginPath(); pts.forEach(function (p, i) { var q = P(p, z); if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); }); ctx.stroke(); }
    function arrow(a, b, label) {
      var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
      if (L < 6) return;
      line(a, b);
      var ux = dx / L, uy = dy / L, h = Math.max(5, Math.min(9, L * 0.35));
      ctx.beginPath(); ctx.moveTo(b[0], b[1]);
      ctx.lineTo(b[0] - ux * h - uy * h * 0.45, b[1] - uy * h + ux * h * 0.45);
      ctx.lineTo(b[0] - ux * h + uy * h * 0.45, b[1] - uy * h - ux * h * 0.45);
      ctx.closePath(); ctx.fill();
      if (label) ctx.fillText(label, a[0] + 7, a[1] + (dy > 0 ? -3 : 11));
    }

    function frame(now) {
      var e = ((now - start) / 1000) % (2 * SWING);           // swing: forward, then back
      var t = forced !== null ? forced : still ? 13 : (e < SWING ? e : 2 * SWING - e);
      S = state(t);
      var a = S.alpha, L = {};
      EDGES.forEach(function (n) { L[n] = live(n, S); });
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, Hh);
      ctx.font = '600 ' + Math.max(10, Math.round(W / 46)) + 'px system-ui, -apple-system, sans-serif';

      // Footprints at grade, dashed.
      ctx.setLineDash([4, 4]); ctx.strokeStyle = GREY; ctx.lineWidth = 1; ctx.globalAlpha = a * 0.8;
      EDGES.forEach(function (n) { if (DIR[n] !== 'r') poly(L[n], 0); });
      ctx.setLineDash([]);

      // The XY plane, tinted, while the plan is pushed.
      if (S.plane > 0) {
        ctx.globalAlpha = a * S.plane * 0.09; ctx.fillStyle = RED;
        var c = [[-8, -8], [100, -8], [100, 101], [-8, 101]].map(function (p) { return P(p, ZF); });
        ctx.beginPath(); c.forEach(function (q, i) { if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); }); ctx.closePath(); ctx.fill();
      }

      // Rulings: straight members across each arm, outer edge to inner edge or ridge beam.
      if (S.rule > 0) {
        ctx.strokeStyle = S.grey ? GREY : RED; ctx.lineWidth = 0.8; ctx.globalAlpha = a * S.rule * 0.8;
        ARMS.forEach(function (arm) {
          var out = L[arm.outer], inner = arm.inner.map(function (n) { return L[n]; });
          var lo = Math.min(out[0][arm.ax], out[out.length - 1][arm.ax]), hi = Math.max(out[0][arm.ax], out[out.length - 1][arm.ax]);
          var n = Math.round((hi - lo) / 1.4);
          for (var k = 1; k < n; k++) {
            var cc = lerp(lo, hi, k / n), p0 = at([out], arm.ax, cc), p1 = at(inner, arm.ax, cc);
            if (p0 && p1) line(P(p0), P(p1));
          }
        });
      }

      // Edges and the two ridge beams.
      ctx.strokeStyle = RED; ctx.globalAlpha = a;
      EDGES.forEach(function (n) {
        if (DIR[n] === 'r') { if (!S.rule) return; ctx.globalAlpha = a * S.rule; ctx.lineWidth = 2.4; }
        else { ctx.globalAlpha = a; ctx.lineWidth = 2; }
        poly(L[n]);
      });

      // Section pushes: arrows on the outer edges as they move.
      ctx.strokeStyle = INK; ctx.fillStyle = INK; ctx.lineWidth = 1.3; ctx.globalAlpha = a;
      function push(dir) {
        var labelled = false;
        EDGES.forEach(function (n) {
          if (DIR[n] !== dir) return;
          var c = L[n], m = c.length - 1;
          [0.2, 0.8].forEach(function (f) {
            var i = Math.round(m * f), p = c[i], fin = CURVES[n][i][2];
            if (Math.abs(fin - ZF) < 0.8) return;               // edge barely moves here
            var up = fin >= ZF ? 1 : -1;
            var lab = !labelled && n.indexOf('B_out') === 0;
            arrow(P(p, p[2] - up * 7), P(p), '');
            if (lab) labelled = true;
          });
        });
      }
      if (S.pushY) push('y');
      if (S.pushX) push('x');

      if (running && !still && forced === null) requestAnimationFrame(frame);
    }

    canvas.style.cursor = 'pointer';
    canvas.title = 'Click to replay';
    canvas.addEventListener('click', function () { forced = null; start = performance.now(); if (!running) { running = true; requestAnimationFrame(frame); } });
    canvas.showAt = function (t) { forced = t; frame(performance.now()); };   // for checking stills
    fit();
    window.addEventListener('resize', function () { fit(); frame(performance.now()); });
    if ('IntersectionObserver' in window && !still) {
      new IntersectionObserver(function (es) {
        var vis = es[0].isIntersecting;
        if (vis && !running) { running = true; requestAnimationFrame(frame); }
        else if (!vis) running = false;
      }).observe(canvas);
    } else { running = !still; requestAnimationFrame(frame); }
    frame(performance.now());
  }

  function init() { document.querySelectorAll('canvas[data-anim="valleybutte-roof"]').forEach(setup); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
