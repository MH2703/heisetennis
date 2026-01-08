(() => {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  // Header brand (mittig) ab Scroll einblenden
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 120);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile Menü
  const btn = header.querySelector(".nav-toggle");
  const nav = document.getElementById("mobileNav");
  const isMobile = () => window.matchMedia("(max-width:900px)").matches;

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    btn?.setAttribute("aria-expanded", open ? "true" : "false");
  };

  btn?.addEventListener("click", (e) => {
    e.preventDefault();
    setOpen(!header.classList.contains("is-open"));
  });

  nav?.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    if (!header.contains(e.target)) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) setOpen(false);
  });
})();
