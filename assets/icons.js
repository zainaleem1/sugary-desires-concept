/* ============================================================
   SUGARY DESIRES — icon sprite
   Injects one hidden <svg> of <symbol>s at the top of <body>.
   Reference anywhere with:  <svg><use href="#i-tier"/></svg>
   (Injected via JS rather than fetched so it also works from file://)
   ============================================================ */
(function () {
  "use strict";

  var SPRITE = '' +
'<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs>' +

/* --- three-tier wedding cake --------------------------------------- */
'<symbol id="i-tier" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M14 106c0-3.4 20.6-5.4 46-5.4S106 102.6 106 106"/>' +
  '<path d="M30 100.6V78h60v22.6"/>' +
  '<path d="M30 78c4 5.6 8 5.6 12 0 4 5.6 8 5.6 12 0 4 5.6 8 5.6 12 0 4 5.6 8 5.6 12 0 4 5.6 8 5.6 12 0"/>' +
  '<path d="M39 74.5V56h42v18.5"/>' +
  '<path d="M39 56c3.5 5 7 5 10.5 0 3.5 5 7 5 10.5 0 3.5 5 7 5 10.5 0 3.5 5 7 5 10.5 0"/>' +
  '<path d="M47 52.5V37h26v15.5"/>' +
  '<path d="M47 37c3.25 4.6 6.5 4.6 9.75 0 3.25 4.6 6.5 4.6 9.75 0 3.25 4.6 6.5 4.6 6.5 0"/>' +
  '<path d="M60 37V26"/>' +
  '<path d="M60 26c0-3.4-4.6-3.8-4.6-7.4A4.6 4.6 0 0 1 60 14a4.6 4.6 0 0 1 4.6 4.6c0 3.6-4.6 4-4.6 7.4z"/>' +
  '<circle cx="45" cy="89" r="1.6" fill="currentColor" stroke="none"/>' +
  '<circle cx="60" cy="93" r="1.6" fill="currentColor" stroke="none"/>' +
  '<circle cx="75" cy="89" r="1.6" fill="currentColor" stroke="none"/>' +
  '<circle cx="52" cy="66" r="1.4" fill="currentColor" stroke="none"/>' +
  '<circle cx="68" cy="66" r="1.4" fill="currentColor" stroke="none"/>' +
'</symbol>' +

/* --- cupcake --------------------------------------------------------- */
'<symbol id="i-cupcake" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M38 66h44l-5.4 36a4 4 0 0 1-4 3.4H47.4a4 4 0 0 1-4-3.4z"/>' +
  '<path d="M50 68l-2.2 37M60 68v37M70 68l2.2 37"/>' +
  '<path d="M36 66c-2.6-7.4 1.6-13.4 8-14.4-1.6-8 4-14 12-13.6 2.4-6.6 9.4-9.6 15.4-6 5.4-3 12 .8 12 7.2 6.6 1 10.6 7 8.6 13.6 4.4 2.6 5.6 8 3.4 13.2z"/>' +
  '<path d="M60 38V26"/>' +
  '<circle cx="60" cy="22" r="4.4"/>' +
  '<path d="M60 17.6c2.6-2.4 6-2 7.4.6"/>' +
'</symbol>' +

/* --- cakesicle ------------------------------------------------------- */
'<symbol id="i-cakesicle" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<rect x="34" y="16" width="52" height="66" rx="12"/>' +
  '<path d="M34 46c5.4 6.6 10.8-6.6 16.2 0 5.4 6.6 10.8-6.6 16.2 0 5.4 6.6 10.8-6.6 16.2 0 1.6 2 3.2 1.6 3.4-1"/>' +
  '<path d="M60 82v22"/><path d="M53 104h14"/>' +
  '<circle cx="49" cy="30" r="2" fill="currentColor" stroke="none"/>' +
  '<circle cx="62" cy="26" r="2" fill="currentColor" stroke="none"/>' +
  '<circle cx="73" cy="33" r="2" fill="currentColor" stroke="none"/>' +
  '<circle cx="58" cy="37" r="2" fill="currentColor" stroke="none"/>' +
'</symbol>' +

/* --- brownie stack --------------------------------------------------- */
'<symbol id="i-brownie" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M26 88l34-14 34 14-34 14z"/><path d="M26 88v-9l34-14 34 14v9"/>' +
  '<path d="M32 68l28-12 28 12"/><path d="M32 68v-9l28-12 28 12v9"/>' +
  '<path d="M38 48l22-10 22 10"/><path d="M38 48v-9l22-10 22 10v9"/>' +
  '<circle cx="60" cy="36" r="2" fill="currentColor" stroke="none"/>' +
  '<circle cx="50" cy="42" r="1.6" fill="currentColor" stroke="none"/>' +
  '<circle cx="71" cy="42" r="1.6" fill="currentColor" stroke="none"/>' +
'</symbol>' +

/* --- gift box -------------------------------------------------------- */
'<symbol id="i-gift" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<rect x="24" y="52" width="72" height="52" rx="3"/>' +
  '<path d="M20 40h80v12H20z"/><path d="M60 40v64"/>' +
  '<path d="M60 40c-8 0-22 .4-25.6-6.6C31.4 27.6 36 21 42.4 21.6 50.6 22.4 57 31.6 60 40z"/>' +
  '<path d="M60 40c8 0 22 .4 25.6-6.6C88.6 27.6 84 21 77.6 21.6 69.4 22.4 63 31.6 60 40z"/>' +
'</symbol>' +

/* --- celebration cake with candles ----------------------------------- */
'<symbol id="i-candle" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M14 106c0-3.4 20.6-5.4 46-5.4S106 102.6 106 106"/>' +
  '<path d="M26 100.6V62h68v38.6"/>' +
  '<path d="M26 62c5.6 6.4 11.3 6.4 17 0 5.6 6.4 11.3 6.4 17 0 5.6 6.4 11.3 6.4 17 0 5.6 6.4 11.3 6.4 17 0"/>' +
  '<path d="M42 58V40M60 58V34M78 58V40"/>' +
  '<path d="M42 40c0-2.6-3.4-3-3.4-5.6A3.4 3.4 0 0 1 42 31a3.4 3.4 0 0 1 3.4 3.4c0 2.6-3.4 3-3.4 5.6z"/>' +
  '<path d="M60 34c0-2.6-3.4-3-3.4-5.6A3.4 3.4 0 0 1 60 25a3.4 3.4 0 0 1 3.4 3.4c0 2.6-3.4 3-3.4 5.6z"/>' +
  '<path d="M78 40c0-2.6-3.4-3-3.4-5.6A3.4 3.4 0 0 1 78 31a3.4 3.4 0 0 1 3.4 3.4c0 2.6-3.4 3-3.4 5.6z"/>' +
  '<circle cx="43" cy="80" r="1.8" fill="currentColor" stroke="none"/>' +
  '<circle cx="60" cy="86" r="1.8" fill="currentColor" stroke="none"/>' +
  '<circle cx="77" cy="80" r="1.8" fill="currentColor" stroke="none"/>' +
'</symbol>' +

/* --- delivery van ---------------------------------------------------- */
'<symbol id="i-van" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M10 78V38h58v40"/><path d="M68 50h16l12 16v12H68z"/>' +
  '<circle cx="34" cy="84" r="7"/><circle cx="82" cy="84" r="7"/>' +
  '<path d="M10 78h17M41 78h34"/>' +
  '<path d="M30 30V22h18v8"/><path d="M30 22c2.6 3.4 5.2 3.4 7.8 0 2.6 3.4 5.2 3.4 7.8 0"/>' +
'</symbol>' +

/* --- occasion icons --------------------------------------------------- */
'<symbol id="i-rings" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<circle cx="46" cy="72" r="24"/><circle cx="76" cy="72" r="24"/>' +
  '<path d="M46 44l-7-11h14z"/><path d="M39 33h14"/>' +
'</symbol>' +
'<symbol id="i-baby" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M34 56a26 26 0 0 1 52 0v6a26 26 0 0 1-52 0z"/>' +
  '<path d="M34 56c-6 0-10 4-10 9s4 9 10 9M86 56c6 0 10 4 10 9s-4 9-10 9"/>' +
  '<path d="M48 86c4 6 20 6 24 0"/><path d="M60 30V16"/><circle cx="60" cy="12" r="4"/>' +
'</symbol>' +
'<symbol id="i-brief" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<rect x="18" y="40" width="84" height="58" rx="4"/>' +
  '<path d="M44 40V30a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v10"/>' +
  '<path d="M18 62h84"/><path d="M54 62v8h12v-8"/>' +
'</symbol>' +
'<symbol id="i-heart" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
  '<path d="M60 100C34 82 18 68 18 50a20 20 0 0 1 42-8 20 20 0 0 1 42 8c0 18-16 32-42 50z"/>' +
'</symbol>' +

/* --- ui glyphs -------------------------------------------------------- */
'<symbol id="i-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.6l1.9 6.6 6.5 2-6.5 2-1.9 6.6-1.9-6.6-6.5-2 6.5-2z"/></symbol>' +
'<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.6l5.2 5.2L20 6.6"/></symbol>' +
'<symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></symbol>' +
'<symbol id="i-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H5M11 6l-6 6 6 6"/></symbol>' +
'<symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></symbol>' +
'<symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></symbol>' +
'<symbol id="i-ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></symbol>' +
'<symbol id="i-wa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.6 20.4l1.3-4.3A8.4 8.4 0 1 1 8.2 19z"/><path d="M8.6 9c.6 2.6 3.8 5.8 6.4 6.4l1.3-1.6 2 1a4.6 4.6 0 0 1-5-.4A11 11 0 0 1 9 9.3a4.6 4.6 0 0 1-.4-5l1 2z"/></symbol>' +

'</defs></svg>';

  function inject() {
    var host = document.createElement("div");
    host.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    host.setAttribute("aria-hidden", "true");
    host.innerHTML = SPRITE;
    document.body.insertBefore(host, document.body.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
