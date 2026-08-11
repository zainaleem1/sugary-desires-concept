/* ============================================================
   SUGARY DESIRES — GALLERY DATA
   ------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO FILL THE GALLERY.

   HOW TO ADD PHOTOS — the short version
   1. Open  https://www.instagram.com/sugarydesirescakes/
   2. Save the photos you want.
   3. Rename them  01.jpg,  02.jpg,  03.jpg ...  and drop them in
      the "images" folder.
   4. That's it. The gallery finds them on its own — you do NOT
      have to edit anything below.

   Captions and categories are optional extras. When you have a
   spare ten minutes, fill them in under PHOTO_META further down
   and the filters and captions start working properly.

   Until any photo exists, the gallery shows gold line-art tiles
   so the page never looks broken or empty.

   Set DRAFT to false to hide the "caption needed" reminders.
   ============================================================ */

var DRAFT = true;

/* ------------------------------------------------------------
   AUTO-DISCOVERY
   Looks for images/01.jpg, 02.jpg, 03.jpg ... and uses whatever
   it finds. Also accepts .jpeg, .png and .webp. Stops looking
   after 4 numbers in a row are missing, so numbering gaps are
   fine but big ones will cut the scan short.
   ------------------------------------------------------------ */
var AUTO_PHOTOS = {
  enabled: true,
  max: 30,
  stopAfterMisses: 4,
  exts: ["jpg", "jpeg", "png", "webp"]
};

/* ------------------------------------------------------------
   OPTIONAL per-photo detail, keyed by file number.
   Anything you leave out just falls back to a sensible default.
   cat must be one of:
     wedding · celebration · cakesicle · brownie · gift · mermaid
   ------------------------------------------------------------ */
var PHOTO_META = {
  "01": { cat: "", caption: "", link: "" },
  "02": { cat: "", caption: "", link: "" },
  "03": { cat: "", caption: "", link: "" },
  "04": { cat: "", caption: "", link: "" },
  "05": { cat: "", caption: "", link: "" },
  "06": { cat: "", caption: "", link: "" },
  "07": { cat: "", caption: "", link: "" },
  "08": { cat: "", caption: "", link: "" },
  "09": { cat: "", caption: "", link: "" },
  "10": { cat: "", caption: "", link: "" },
  "11": { cat: "", caption: "", link: "" },
  "12": { cat: "", caption: "", link: "" }
};

/* Valid "cat" values (these drive the filter buttons):
   wedding · celebration · cakesicle · brownie · gift · mermaid
   Valid "ratio" values: "4/5" (portrait) · "1/1" (square) · "3/4" · "4/3"   */

var GALLERY = [
  {
    img: "images/01.jpg",
    cat: "wedding",
    ratio: "4/5",
    title: "Wedding tier",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/02.jpg",
    cat: "mermaid",
    ratio: "1/1",
    title: "Mermaid cake",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/03.jpg",
    cat: "cakesicle",
    ratio: "4/5",
    title: "Cakesicles",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/04.jpg",
    cat: "celebration",
    ratio: "4/5",
    title: "Celebration cake",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/05.jpg",
    cat: "brownie",
    ratio: "1/1",
    title: "Brownies",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/06.jpg",
    cat: "gift",
    ratio: "4/5",
    title: "Gift pack",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/07.jpg",
    cat: "wedding",
    ratio: "4/5",
    title: "Wedding tier",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/08.jpg",
    cat: "celebration",
    ratio: "1/1",
    title: "Celebration cake",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/09.jpg",
    cat: "cakesicle",
    ratio: "4/5",
    title: "Cakesicles",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/10.jpg",
    cat: "mermaid",
    ratio: "4/5",
    title: "Mermaid cake",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/11.jpg",
    cat: "brownie",
    ratio: "4/3",
    title: "Brownie box",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  },
  {
    img: "images/12.jpg",
    cat: "gift",
    ratio: "1/1",
    title: "Gift pack",
    caption: "",
    link: "https://www.instagram.com/sugarydesirescakes/"
  }
];

/* --- how each category is drawn when no photo is present ------------- */
var CAT_STYLE = {
  wedding:     { icon: "i-tier",      c1: "rgba(125,43,70,.62)",  c2: "rgba(226,165,162,.34)", label: "Wedding" },
  celebration: { icon: "i-candle",    c1: "rgba(180,120,60,.52)", c2: "rgba(226,165,162,.34)", label: "Celebration" },
  cakesicle:   { icon: "i-cakesicle", c1: "rgba(154,118,64,.60)", c2: "rgba(226,165,162,.30)", label: "Cakesicles" },
  brownie:     { icon: "i-brownie",   c1: "rgba(92,52,32,.68)",   c2: "rgba(154,118,64,.34)",  label: "Brownies" },
  gift:        { icon: "i-gift",      c1: "rgba(125,43,70,.52)",  c2: "rgba(154,118,64,.42)",  label: "Gift packs" },
  mermaid:     { icon: "i-cupcake",   c1: "rgba(46,110,132,.60)", c2: "rgba(226,165,162,.28)", label: "Mermaid" }
};
