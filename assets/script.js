(() => {
  const header = document.getElementById("siteHeader");
  const btn = header?.querySelector(".nav-toggle");
  const nav = document.getElementById("mobileNav");

  // Jahr im Footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  if (!header || !btn || !nav) return;

  const isMobile = () => window.matchMedia("(max-width:900px)").matches;

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    setOpen(!header.classList.contains("is-open"));
  });

  nav.addEventListener("click", (e) => {
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
