/* ============================================================
   SUGARY DESIRES — shared behaviour
   Header · mobile drawer · scroll reveal · ribbon · parallax
   · flavour selector · magnetic buttons · gallery · lightbox
   ============================================================ */
(function () {
  "use strict";

  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- sticky header ------------------------------------------------ */
  var hdr = $(".hdr");
  if (hdr) {
    var stick = function () { hdr.classList.toggle("is-stuck", window.scrollY > 24); };
    stick();
    addEventListener("scroll", stick, { passive: true });
  }

  /* ---- mobile drawer ------------------------------------------------- */
  var burger = $(".burger"), drawer = $(".drawer");
  if (burger && drawer) {
    var setMenu = function (open) {
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("menu-open"));
    });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  /* ---- scroll reveal -------------------------------------------------- */
  var revealAll = function () { $$(".rv").forEach(function (el) { el.classList.add("in"); }); };
  if (reduce || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    window.__rvObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    $$(".rv").forEach(function (el) { window.__rvObserver.observe(el); });
  }
  /* re-scan after dynamic content (gallery) is injected */
  window.rvScan = function (root) {
    $$(".rv", root).forEach(function (el) {
      if (el.classList.contains("in")) return;
      if (window.__rvObserver) window.__rvObserver.observe(el); else el.classList.add("in");
    });
  };

  /* ---- seamless ribbon ------------------------------------------------ */
  var ribbon = $(".ribbon__track");
  if (ribbon && ribbon.firstElementChild) {
    ribbon.appendChild(ribbon.firstElementChild.cloneNode(true));
  }

  /* ---- parallax ------------------------------------------------------- */
  var paras = $$("[data-para]");
  if (!reduce && paras.length) {
    var tick = false;
    addEventListener("scroll", function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        paras.forEach(function (el) {
          el.style.transform = "translate(-50%, calc(-50% + " + (y * parseFloat(el.dataset.para)) + "px))";
        });
        tick = false;
      });
    }, { passive: true });
  }

  /* ---- a card with a real photo hides its line-art -------------------- */
  $$(".card").forEach(function (card) {
    var media = $(".card__media", card);
    if (!media) return;
    var img = getComputedStyle(media).getPropertyValue("--img").trim();
    if (img && img !== "none") card.classList.add("has-photo");
  });
  var seal = $(".seal");
  if (seal) {
    var sp = $(".seal__photo", seal);
    if (sp && getComputedStyle(sp).backgroundImage !== "none") seal.classList.add("has-photo");
  }

  /* ---- flavour selector ------------------------------------------------ */
  var flList = $("#flList");
  if (flList) {
    var wash = $("#flWash"), ico = $("#flIco"), meta = $("#flMeta");
    var pick = function (btn) {
      $$("li", flList).forEach(function (li) { li.classList.remove("on"); });
      btn.parentElement.classList.add("on");
      wash.style.setProperty("--a", btn.dataset.a);
      wash.style.setProperty("--b", btn.dataset.b);
      ico.firstElementChild.setAttribute("href", "#" + btn.dataset.ico);
      meta.innerHTML = "";
      var h = document.createElement("h3"); h.textContent = btn.dataset.name;
      var p = document.createElement("p"); p.textContent = btn.dataset.d;
      meta.appendChild(h); meta.appendChild(p);
      meta.classList.remove("fade-in"); void meta.offsetWidth; meta.classList.add("fade-in");
    };
    flList.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (btn) pick(btn);
    });
    flList.addEventListener("mouseover", function (e) {
      var btn = e.target.closest("button");
      if (btn && !btn.parentElement.classList.contains("on")) pick(btn);
    });
  }

  /* ---- magnetic buttons ------------------------------------------------ */
  if (!reduce && matchMedia("(hover: hover)").matches) {
    $$(".btn:not(.btn--ghost)").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        btn.style.transform =
          "translate(" + ((e.clientX - r.left - r.width / 2) * 0.16) + "px," +
                         ((e.clientY - r.top - r.height / 2) * 0.28) + "px)";
      });
      btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
    });
  }

  /* ======================================================================
     GALLERY  (needs data/gallery.js loaded first)
     ====================================================================== */
  var mount = $("#galleryMount");
  if (mount && typeof GALLERY !== "undefined") {
    var draft = (typeof DRAFT !== "undefined") && DRAFT;
    var limit = parseInt(mount.dataset.limit || "0", 10);
    var items = [];

    var style = function (cat) {
      return (typeof CAT_STYLE !== "undefined" && CAT_STYLE[cat]) ||
             { icon: "i-tier", c1: "rgba(125,43,70,.6)", c2: "rgba(154,118,64,.4)", label: cat || "Sugary Desires" };
    };

    /* --- find images/01.jpg, 02.jpg ... without needing a directory
           listing (which static hosting will not give us) ------------- */
    function discover(done) {
      var cfg = (typeof AUTO_PHOTOS !== "undefined") ? AUTO_PHOTOS : null;
      if (!cfg || !cfg.enabled) return done([]);

      var found = [], misses = 0, n = 1;
      var pad = function (x) { return (x < 10 ? "0" : "") + x; };

      function nextNumber() {
        if (n > cfg.max || misses >= cfg.stopAfterMisses) return done(found);
        tryExt(0);
      }
      function tryExt(ei) {
        if (ei >= cfg.exts.length) { misses++; n++; return nextNumber(); }
        var num = pad(n), src = "images/" + num + "." + cfg.exts[ei];
        var probe = new Image();
        probe.onload = function () {
          var meta = (typeof PHOTO_META !== "undefined" && PHOTO_META[num]) || {};
          found.push({
            img: src,
            cat: meta.cat || "",
            ratio: probe.naturalWidth + "/" + probe.naturalHeight,
            title: meta.title || "Sugary Desires Cakes",
            caption: meta.caption || "",
            link: meta.link || "https://www.instagram.com/sugarydesirescakes/"
          });
          misses = 0; n++; nextNumber();
        };
        probe.onerror = function () { tryExt(ei + 1); };
        probe.src = src;
      }
      nextNumber();
    }

    /* real photos if any exist, otherwise the line-art placeholder set */
    discover(function (photos) {
      var source = photos.length ? photos : GALLERY;
      items = limit > 0 ? source.slice(0, limit) : source;
      mount.dataset.mode = photos.length ? "photos" : "placeholder";
      renderTiles();
      wire();
    });

    function renderTiles() {
    items.forEach(function (it, i) {
      var st = style(it.cat);
      var tile = document.createElement("button");
      tile.type = "button";
      tile.className = "tile rv";
      tile.style.setProperty("--d", (i % 3) * 0.06 + "s");
      tile.dataset.cat = it.cat || "";
      tile.dataset.i = String(i);
      tile.setAttribute("aria-label", "Open " + (it.title || st.label));

      var ph = document.createElement("span");
      ph.className = "tile__ph";
      ph.style.cssText = "--ar:" + (it.ratio || "4/5") + ";--c1:" + st.c1 + ";--c2:" + st.c2;

      if (it.img) {
        var im = document.createElement("img");
        im.src = it.img;
        im.alt = it.title || st.label;
        im.loading = "lazy";
        im.decoding = "async";
        /* missing file → fall back to line art, page never breaks */
        im.addEventListener("error", function () {
          im.remove();
          ph.appendChild(lineArt(st.icon));
        });
        ph.appendChild(im);
      } else {
        ph.appendChild(lineArt(st.icon));
      }

      var veil = document.createElement("span");
      veil.className = "tile__veil";
      ph.appendChild(veil);

      var cap = document.createElement("span");
      cap.className = "tile__cap";
      var tag = document.createElement("span");
      tag.className = "tile__tag";
      tag.textContent = st.label;
      cap.appendChild(tag);
      if (it.caption) {
        var p = document.createElement("p");
        p.textContent = it.caption;
        cap.appendChild(p);
      } else if (draft) {
        var d = document.createElement("p");
        d.style.color = "rgba(226,165,162,.8)";
        d.textContent = "Caption needed — paste the Instagram caption into data/gallery.js";
        cap.appendChild(d);
      }
      ph.appendChild(cap);

      var more = document.createElement("span");
      more.className = "tile__more";
      more.innerHTML = '<svg width="15" height="15" aria-hidden="true"><use href="#i-plus"/></svg>';
      ph.appendChild(more);

      tile.appendChild(ph);
      mount.appendChild(tile);
    });

    if (window.rvScan) window.rvScan(mount);
    }

    function wire() {
    /* --- filters ------------------------------------------------------- */
    var filters = $("#filters");
    if (filters) {
      filters.addEventListener("click", function (e) {
        var b = e.target.closest("button");
        if (!b) return;
        $$("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        var f = b.dataset.filter;
        $$(".tile", mount).forEach(function (t) {
          t.classList.toggle("is-hidden", f !== "all" && t.dataset.cat !== f);
        });
      });
    }

    /* --- lightbox ------------------------------------------------------- */
    var lb = $("#lb");
    if (lb) {
      var lbVis = $("#lbVis"), lbTag = $("#lbTag"), lbT = $("#lbT"), lbP = $("#lbP"), lbLink = $("#lbLink");
      var current = 0, opener = null;

      var showAt = function (i) {
        var visible = $$(".tile:not(.is-hidden)", mount);
        if (!visible.length) return;
        current = (i + visible.length) % visible.length;
        var tile = visible[current];
        var it = items[parseInt(tile.dataset.i, 10)];
        var st = style(it.cat);

        lbVis.style.cssText = "--c1:" + st.c1 + ";--c2:" + st.c2;
        lbVis.innerHTML = "";
        if (it.img) {
          var im = document.createElement("img");
          im.src = it.img;
          im.alt = it.title || st.label;
          im.addEventListener("error", function () { im.remove(); lbVis.appendChild(lineArt(st.icon)); });
          lbVis.appendChild(im);
        } else {
          lbVis.appendChild(lineArt(st.icon));
        }

        lbTag.textContent = st.label;
        lbT.textContent = it.title || st.label;
        lbP.textContent = it.caption ||
          (draft ? "No caption yet. Paste the Instagram caption for this post into data/gallery.js."
                 : "");
        lbLink.href = it.link || "https://www.instagram.com/sugarydesirescakes/";
      };

      var open = function (tile) {
        opener = tile;
        var visible = $$(".tile:not(.is-hidden)", mount);
        showAt(visible.indexOf(tile));
        lb.classList.add("on");
        document.body.style.overflow = "hidden";
        $("#lbX").focus();
      };
      var close = function () {
        lb.classList.remove("on");
        document.body.style.overflow = "";
        if (opener) { opener.focus(); opener = null; }
      };

      mount.addEventListener("click", function (e) {
        var t = e.target.closest(".tile");
        if (t) open(t);
      });
      $("#lbX").addEventListener("click", close);
      $("#lbPrev").addEventListener("click", function () { showAt(current - 1); });
      $("#lbNext").addEventListener("click", function () { showAt(current + 1); });
      lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
      addEventListener("keydown", function (e) {
        if (!lb.classList.contains("on")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") showAt(current - 1);
        if (e.key === "ArrowRight") showAt(current + 1);
      });
    }
    }
  }

  function lineArt(icon) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("class", "illus");
    s.setAttribute("viewBox", "0 0 120 120");
    var u = document.createElementNS("http://www.w3.org/2000/svg", "use");
    u.setAttribute("href", "#" + icon);
    s.appendChild(u);
    return s;
  }
})();
