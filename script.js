// Helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/**
 * Header shadow on scroll
 */
const header = $(".site-header");
const setHeaderShadow = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 6);
};
window.addEventListener("scroll", setHeaderShadow, { passive: true });
setHeaderShadow();

/**
 * Mobile nav toggle
 */
const navToggle = $(".nav-toggle");
const navList = $("#navList");
if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const open = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // close menu after click
  $$(".nav-link", navList).forEach((a) => {
    a.addEventListener("click", () => {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // close on outside click (mobile)
  document.addEventListener("click", (e) => {
    const isClickInside = navList.contains(e.target) || navToggle.contains(e.target);
    if (!isClickInside) {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/**
 * Scrollspy (active nav item)
 */
const navLinks = $$(".nav-link");
const sections = navLinks
  .map((a) => document.getElementById(a.dataset.section))
  .filter(Boolean);

const setActive = (id) => {
  navLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.section === id));
};

if ("IntersectionObserver" in window && sections.length) {
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) setActive(visible.target.id);
    },
    {
      root: null,
      threshold: [0.2, 0.35, 0.5, 0.65],
      rootMargin: `-${Math.round(parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")))}px 0px -55% 0px`,
    }
  );
  sections.forEach((s) => io.observe(s));
}

/**
 * Camps: cards -> show detail panel
 */
const campCards = $$(".camp-card");
const campPanels = {
  ostern: $("#camp-ostern"),
  sommer: $("#camp-sommer"),
  herbst: $("#camp-herbst"),
};

const hideAllCamps = () => {
  Object.values(campPanels).forEach((p) => {
    if (p) p.hidden = true;
  });
  campCards.forEach((c) => c.setAttribute("aria-expanded", "false"));
};

const showCamp = (key) => {
  hideAllCamps();
  const panel = campPanels[key];
  if (!panel) return;
  panel.hidden = false;

  const card = campCards.find((c) => c.dataset.camp === key);
  if (card) card.setAttribute("aria-expanded", "true");

  panel.scrollIntoView({ behavior: "smooth", block: "start" });
};

campCards.forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.camp;
    const panel = campPanels[key];

    const isOpen = panel && !panel.hidden;
    if (isOpen) {
      hideAllCamps();
      return;
    }
    showCamp(key);
  });
});

/**
 * Timeline toggle
 */
const toggleTimeline = $("#toggleTimeline");
const timelineMore = $("#timelineMore");
if (toggleTimeline && timelineMore) {
  toggleTimeline.addEventListener("click", () => {
    const isHidden = timelineMore.hidden;
    timelineMore.hidden = !isHidden;
    toggleTimeline.textContent = isHidden ? "Weniger anzeigen" : "Mehr anzeigen";
  });
}

/**
 * Click-to-load Google Maps
 */
const loadMapBtn = $("#loadMapBtn");
const mapEmbed = $("#mapEmbed");
const mapPlaceholder = $("#mapPlaceholder");

if (loadMapBtn && mapEmbed && mapPlaceholder) {
  loadMapBtn.addEventListener("click", () => {
    const src =
      "https://www.google.com/maps?q=TC%20Angertal%20Ernst-Stinshoff-Stra%C3%9Fe%2050%2040883%20Ratingen&output=embed";

    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;
    iframe.title = "Google Maps: TC Angertal";

    mapEmbed.innerHTML = "";
    mapEmbed.appendChild(iframe);

    mapPlaceholder.hidden = true;
    mapEmbed.hidden = false;
  });
}

/**
 * Footer year
 */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
