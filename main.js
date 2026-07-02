/* ============================================================
   Gowtham Sai G — behavior. Vanilla, no dependencies.
   ============================================================ */
(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Theme (persisted) ---------------------------------- */
  const toggle = document.getElementById("themeToggle");
  const label = toggle?.querySelector(".theme__label");
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") root.setAttribute("data-theme", stored);

  function syncLabel() {
    if (label) label.textContent = root.getAttribute("data-theme") === "dark" ? "Light" : "Dark";
  }
  function setTheme(next) {
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (_) {}
    syncLabel();
  }
  syncLabel();
  toggle?.addEventListener("click", () =>
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"));

  // Keyboard: "t" toggles theme (ignored while typing).
  document.addEventListener("keydown", (e) => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (e.metaKey || e.ctrlKey || e.altKey || tag === "input" || tag === "textarea") return;
    if (e.key === "t" || e.key === "T")
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ---- Reveal on scroll ----------------------------------- */
  const revealables = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    revealables.forEach((el) => io.observe(el));
    requestAnimationFrame(() =>
      revealables.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
      }));
  }

  /* ---- Index scroll-spy ----------------------------------- */
  const links = [...document.querySelectorAll(".index a")];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---- Résumé link: warn gracefully if the PDF is missing -- */
  const resume = document.querySelector("[data-resume]");
  resume?.addEventListener("click", async (e) => {
    try {
      const res = await fetch(resume.getAttribute("href"), { method: "HEAD" });
      if (!res.ok) throw new Error();
    } catch (_) {
      e.preventDefault();
      alert('Résumé PDF not added yet — drop your file next to index.html as "Gowtham-Sai-G.pdf".');
    }
  });
})();
