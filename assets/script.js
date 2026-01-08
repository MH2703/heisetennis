(() => {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  // 1) Jahr im Footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // 2) Sticky shadow + show header brand on scroll
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 80);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // 3) Mobile menu toggle
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

  // close on click link (mobile)
  nav?.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  // close when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    if (!isMobile()) return;
    if (!header.contains(e.target)) setOpen(false);
  });

  // close on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // on resize: close menu
  window.addEventListener("resize", () => {
    if (!isMobile()) setOpen(false);
  });
})();
