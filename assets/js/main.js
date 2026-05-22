/* ============================================================
   VPCPA — main.js
   - Mobile nav toggle
   - Language toggle (EN / 繁中) with localStorage persistence
   - Scroll-reveal animations
   ============================================================ */

(function () {
  /* Mobile nav */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    mainNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Language toggle */
  const KEY = "vpcpa.lang";
  const supported = ["en", "zh"];
  function apply(lang) {
    if (!supported.includes(lang)) lang = "en";
    document.documentElement.lang = lang === "zh" ? "zh-HK" : "en-HK";
    document.querySelectorAll(".lang-toggle button").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
    try { localStorage.setItem(KEY, lang); } catch (_) {}
  }
  const saved = (function () {
    try { return localStorage.getItem(KEY); } catch (_) { return null; }
  })();
  if (saved) apply(saved);

  document.querySelectorAll(".lang-toggle button").forEach((b) => {
    b.addEventListener("click", () => apply(b.dataset.lang));
  });

  /* Scroll reveal */
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    items.forEach((it) => io.observe(it));
    /* Defensive fallback: if reveal items never intersect (off-screen iframe,
       background tab, slow render), show them all after 1.5s. */
    setTimeout(() => {
      items.forEach((it) => it.classList.add("visible"));
    }, 1500);
  } else {
    items.forEach((it) => it.classList.add("visible"));
  }

  /* Active section highlight in nav (subtle) */
  const path = location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".main-nav a, .dropdown-menu a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("#") && !href.startsWith("javascript:")) {
      const linkPath = href.replace(/\/$/, "").replace(/^\.\.\//, "/").replace(/^\.\//, "/");
      if (
        path.endsWith(linkPath.replace(/^\//, "")) ||
        (linkPath === "/" && (path === "" || path.endsWith("index.html")))
      ) {
        a.style.color = "var(--blue-800)";
      }
    }
  });
})();
