/* ============================================================
   SUGARY DESIRES — GALLERY DATA
   ------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO FILL THE GALLERY.

   HOW TO ADD A PHOTO
   1. Open  https://www.instagram.com/sugarydesirescakes/
   2. Save the photo you want.
   3. Rename it  01.jpg,  02.jpg,  03.jpg ...  and drop it in the
      "images" folder next to this project.
   4. Below, find the matching entry and paste the real Instagram
      caption between the quotes on the "caption:" line.
   5. Paste the post link (the ...instagram.com/p/XXXX/ address)
      on the "link:" line.
   6. Save this file and refresh the page. Done.

   If an image file is missing, that tile automatically falls back
   to gold line-art so the page NEVER looks broken. You can fill
   the gallery in one photo at a time.

   Set DRAFT to false once you are finished — it hides the
   "caption needed" reminders on empty tiles.
   ============================================================ */

var DRAFT = true;

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
