/* ============================================================
   SUGARY DESIRES — order flow
   Six panes, keeps state in one object, ends in a composed
   message the customer sends themselves.
   ------------------------------------------------------------
   TWO OPTIONAL SETTINGS — fill these in and the page does more:

   WHATSAPP  Put the business number here in full international
             form, digits only, no "+" and no spaces.
             e.g. "923001234567". Leave "" to hide the button.

   WEBHOOK   An n8n / Make / Zapier webhook URL. If set, "Send my
             order" POSTs the order as JSON so it lands in a
             sheet, an inbox or a Slack channel automatically.
             Leave "" and the button just prepares the message
             for the customer to paste into a DM.
   ============================================================ */

var WHATSAPP = "";
var WEBHOOK  = "";

(function () {
  "use strict";

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var form = $("#orderForm");
  if (!form) return;

  var panes = $$(".pane", form);
  var railItems = $$("#rail li");
  var step = 0;

  /* state for the button-driven choices; text inputs are read on demand */
  var picked = { occasion: "", range: "", flavour: "", fulfilment: "", style: [] };

  /* ---- pane navigation ------------------------------------------------ */
  function show(i, skipScroll) {
    step = Math.max(0, Math.min(panes.length - 1, i));
    panes.forEach(function (p, n) { p.classList.toggle("on", n === step); });
    railItems.forEach(function (li, n) {
      li.classList.toggle("on", n === step);
      li.classList.toggle("done", n < step);
    });
    if (step === panes.length - 1) build();
    if (!skipScroll) {
      var y = form.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }

  $("#rail").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-go]");
    if (b) show(parseInt(b.dataset.go, 10));
  });

  form.addEventListener("click", function (e) {
    if (e.target.closest("[data-next]")) { if (validate(step)) show(step + 1); return; }
    if (e.target.closest("[data-prev]")) { show(step - 1); return; }

    /* single-choice groups (option cards and chips) */
    var one = e.target.closest("[data-single] .opt, [data-single] .chip");
    if (one) {
      var grp = one.closest("[data-single]");
      var key = grp.dataset.single;
      $$(".opt, .chip", grp).forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      one.setAttribute("aria-pressed", "true");
      picked[key] = one.dataset.v;
      var err = $("#err" + step);
      if (err) err.style.display = "none";
      return;
    }

    /* multi-choice groups */
    var many = e.target.closest("[data-multi] .chip");
    if (many) {
      var mkey = many.closest("[data-multi]").dataset.multi;
      var on = many.getAttribute("aria-pressed") === "true";
      many.setAttribute("aria-pressed", String(!on));
      picked[mkey] = $$("[data-multi='" + mkey + "'] .chip[aria-pressed='true']")
        .map(function (b) { return b.dataset.v; });
    }
  });

  /* ---- validation ------------------------------------------------------ */
  function fail(el, on) {
    var f = el.closest(".field");
    if (f) f.classList.toggle("err", on);
    return !on;
  }

  function validate(i) {
    var err, ok = true;

    if (i === 0 && !picked.occasion) {
      err = $("#err0"); err.style.display = "block"; return false;
    }
    if (i === 1 && !picked.range) {
      err = $("#err1"); err.style.display = "block"; return false;
    }
    if (i === 4) {
      var name = $("#name"), email = $("#email");
      ok = fail(name, !name.value.trim()) && ok;

      var ev = email.value.trim();
      ok = fail(email, ev !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(ev)) && ok;

      var anyContact = $("#handle").value.trim() || ev || $("#phone").value.trim();
      err = $("#err4");
      err.style.display = anyContact ? "none" : "block";
      if (!anyContact) ok = false;

      if (!ok) {
        var firstBad = $(".pane[data-pane='4'] .field.err input");
        if (firstBad) firstBad.focus();
      }
    }
    return ok;
  }

  /* clear a field error as soon as the user starts fixing it */
  form.addEventListener("input", function (e) {
    var f = e.target.closest(".field");
    if (f) f.classList.remove("err");
    if (e.target.id === "handle" || e.target.id === "email" || e.target.id === "phone") {
      $("#err4").style.display = "none";
    }
  });

  /* ---- collect + compose ------------------------------------------------ */
  function val(id) { var el = $("#" + id); return el ? el.value.trim() : ""; }

  function niceDate(v) {
    if (!v) return "";
    var p = v.split("-");
    if (p.length !== 3) return v;
    var months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
    var m = parseInt(p[1], 10) - 1;
    return parseInt(p[2], 10) + " " + (months[m] || p[1]) + " " + p[0];
  }

  function collect() {
    return {
      occasion:   picked.occasion,
      range:      picked.range,
      serves:     val("serves"),
      tiers:      val("tiers"),
      flavour:    picked.flavour,
      style:      picked.style.join(", "),
      colours:    val("colours"),
      inspo:      val("inspo"),
      notes:      val("notes"),
      date:       niceDate(val("date")),
      time:       val("time"),
      fulfilment: picked.fulfilment,
      where:      val("where"),
      name:       val("name"),
      handle:     val("handle"),
      email:      val("email"),
      phone:      val("phone")
    };
  }

  var ROWS = [
    ["Occasion",   "occasion"],
    ["Cake",       "range"],
    ["Serves",     "serves"],
    ["Tiers / qty","tiers"],
    ["Flavour",    "flavour"],
    ["Style",      "style"],
    ["Colours",    "colours"],
    ["Inspiration","inspo"],
    ["Date",       "date"],
    ["Time",       "time"],
    ["Delivery",   "fulfilment"],
    ["Venue / area","where"],
    ["Notes",      "notes"],
    ["Name",       "name"],
    ["Instagram",  "handle"],
    ["Email",      "email"],
    ["Phone",      "phone"]
  ];

  function build() {
    var d = collect();
    var dl = $("#summary");
    dl.innerHTML = "";

    ROWS.forEach(function (r) {
      if (!d[r[1]]) return;
      var row = document.createElement("div");
      row.className = "summary__row";
      var dt = document.createElement("dt"); dt.textContent = r[0];
      var dd = document.createElement("dd"); dd.textContent = d[r[1]];
      row.appendChild(dt); row.appendChild(dd);
      dl.appendChild(row);
    });

    var lines = ["Hi Sugary Desires — I'd like to order a cake.", ""];
    ROWS.forEach(function (r) { if (d[r[1]]) lines.push(r[0] + ": " + d[r[1]]); });
    lines.push("", "Could you let me know if that's possible and what it would cost? Thank you.");
    var msg = lines.join("\n");

    $("#msgOut").textContent = msg;

    if (WHATSAPP) {
      var wa = $("#waBtn");
      wa.hidden = false;
      wa.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
    }
    return { data: d, message: msg };
  }

  /* ---- send ------------------------------------------------------------- */
  var status = $("#status");

  function copy(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (err) { /* clipboard unavailable */ }
      document.body.removeChild(ta);
      done();
    }
  }

  $("#copyBtn").addEventListener("click", function () {
    var btn = this, out = build();
    copy(out.message, function () {
      btn.textContent = "Copied";
      status.textContent = "Message copied. Paste it into the DM.";
      setTimeout(function () { btn.textContent = "Copy message"; }, 2000);
    });
  });

  $("#sendBtn").addEventListener("click", function () {
    var btn = this, out = build();

    if (!WEBHOOK) {
      copy(out.message, function () {
        status.textContent = "Copied. Opening Instagram — paste it straight into the DM.";
        window.open("https://www.instagram.com/sugarydesirescakes/", "_blank", "noopener");
      });
      return;
    }

    btn.disabled = true;
    status.textContent = "Sending…";
    fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "website-order-form",
        submittedAt: new Date().toISOString(),
        order: out.data,
        message: out.message
      })
    }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      status.textContent = "Sent. We'll come back to you with a design and a price.";
      btn.textContent = "Order sent";
    }).catch(function () {
      btn.disabled = false;
      copy(out.message, function () {
        status.textContent = "Couldn't send automatically — your order is copied instead, " +
                             "paste it into our Instagram DM and we'll pick it up there.";
      });
    });
  });

  /* prevent an accidental Enter from reloading the page mid-flow */
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  form.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      if (validate(step) && step < panes.length - 1) show(step + 1);
    }
  });

  show(0, true);
})();
