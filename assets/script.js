// Jahr im Footer
document.getElementById("year").textContent = new Date().getFullYear();

// Sticky shadow beim Scrollen
(() => {
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// Burger-Menü (stabil)
(() => {
  const header = document.getElementById("siteHeader");
  const btn = header.querySelector(".nav-toggle");
  const nav = document.getElementById("primaryNav");

  const isMobile = () => window.matchMedia("(max-width:900px)").matches;
  const isOpen = () => header.classList.contains("is-open");

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.querySelector(".sr-only").textContent = open ? "Menü schließen" : "Menü öffnen";
    if (open) nav.querySelector("a")?.focus();
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!isOpen());
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("click", (e) => {
    if (isOpen() && !header.contains(e.target)) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      btn.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) setOpen(false);
  });
})();

// Kontaktformular -> mailto (für GitHub Pages, ohne Backend)
(() => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");

  const emailTo = "info@heisetennis.de"; // <- später anpassen

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Honeypot
    const hp = form.querySelector(".hp");
    if (hp && hp.value.trim() !== "") return;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      status.textContent = "Bitte alle Felder ausfüllen.";
      return;
    }

    const subject = encodeURIComponent("Anfrage HEISE TENNIS");
    const body = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}\n`
    );

    status.textContent = "Öffne E-Mail-Programm…";
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
  });
})();
