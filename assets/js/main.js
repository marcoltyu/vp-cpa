/* ============================================================
   VPCPA — main.js  (v10 clean)
   - Mobile nav toggle
   - Language toggle (EN / 繁中) — single system, localStorage persistence
   - Scroll-reveal animations
   - Active nav link highlight
   ============================================================ */

(function () {

  /* ── Mobile nav ── */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav   = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // Close nav when a link is clicked (lang toggle buttons are not <a>, so unaffected)
    mainNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── Language toggle ── */
  const STORAGE_KEY = "vpcpa.lang";

  function normaliseLang(val) {
    val = (val || "").toString().toLowerCase();
    return (val.includes("zh") || val.includes("繁") || val.includes("中")) ? "zh" : "en";
  }

  function applyLang(lang) {
    const chosen = normaliseLang(lang);
    // Drive CSS via html[lang] — the single source of truth
    document.documentElement.setAttribute("lang", chosen === "zh" ? "zh-HK" : "en-HK");
    // Sync active state on every .lang-toggle button across all three toggle locations
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      const isActive = normaliseLang(btn.dataset.lang || btn.textContent) === chosen;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
    try { localStorage.setItem(STORAGE_KEY, chosen); } catch (_) {}
  }

  // Bind all lang toggle buttons (utility bar + sticky header + mobile nav)
  document.querySelectorAll(".lang-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang || btn.textContent));
  });

  // Restore saved preference on load
  let saved = "en";
  try { saved = localStorage.getItem(STORAGE_KEY) || "en"; } catch (_) {}
  applyLang(saved);

  /* ── Scroll reveal ── */
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
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
    revealItems.forEach((it) => io.observe(it));
    // Fallback: show all after 1.5 s (catches off-screen iframes / background tabs)
    setTimeout(() => revealItems.forEach((it) => it.classList.add("visible")), 1500);
  } else {
    revealItems.forEach((it) => it.classList.add("visible"));
  }

  /* ── Active nav link highlight ── */
  const path = location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".main-nav a, .dropdown-menu a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (!href.startsWith("#") && !href.startsWith("javascript:")) {
      const linkPath = href
        .replace(/\/$/, "")
        .replace(/^\.\.\//, "/")
        .replace(/^\.\//, "/");
      if (
        path.endsWith(linkPath.replace(/^\//, "")) ||
        (linkPath === "/" && (path === "" || path.endsWith("index.html")))
      ) {
        a.style.color = "var(--blue-800)";
      }
    }
  });

})();
