/* Portfolio Boutheina Megharzi — comportements de la page
   Le site fonctionne sans JavaScript. Ce fichier ajoute :
   1. le lien de prise de rendez-vous (CONFIG)
   2. le menu mobile
   3. la section active dans la navigation
   4. l'ouverture des fiches projets (aussi depuis les pastilles de l'accueil)
   5. l'apparition douce des blocs au défilement */

/* ------------------------------------------------------------------
   CONFIGURATION — le seul endroit à modifier
   bookingUrl : collez ici votre lien Calendly / Cal.com / Google Agenda
   (ex. "https://calendly.com/votre-nom/entretien-stage").
   Laissé vide, « Planifier un échange » ouvre un e-mail pré-rempli.
------------------------------------------------------------------- */
const CONFIG = {
  bookingUrl: ""
};

(function () {
  "use strict";

  /* Lien de réservation : remplace le mailto si un lien est renseigné */
  if (CONFIG.bookingUrl) {
    document.querySelectorAll('[data-cta="booking"]').forEach(function (a) {
      a.href = CONFIG.bookingUrl;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* Menu mobile */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("nav");
  var toggleLabel = toggle ? toggle.querySelector(".sr-only") : null;

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    if (toggleLabel) toggleLabel.textContent = open ? "Fermer le menu" : "Ouvrir le menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" && !e.target.closest(".topbar")) setMenu(false);
    });
  }

  /* Section active dans la navigation */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav__list a"));
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        var link = byId[entry.target.id];
        if (link) { link.classList.add("is-active"); link.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* Fiches projets : repliées par défaut, ouvertes par « Voir la fiche » (une à la fois) */
  var ficheBtns = document.querySelectorAll(".zone__btn[data-fiche]");
  if (ficheBtns.length) {
    document.documentElement.classList.add("js");
    var fiches = document.querySelectorAll(".fiche");
    fiches.forEach(function (f) { f.hidden = true; });
    var closeAll = function () {
      fiches.forEach(function (f) { f.hidden = true; });
      ficheBtns.forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
        b.textContent = "Voir la fiche";
        b.closest(".zone").classList.remove("is-open");
      });
    };
    ficheBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.getElementById(btn.getAttribute("data-fiche"));
        var wasOpen = btn.getAttribute("aria-expanded") === "true";
        closeAll();
        if (wasOpen || !target) return;
        target.hidden = false;
        btn.setAttribute("aria-expanded", "true");
        btn.textContent = "Masquer la fiche";
        btn.closest(".zone").classList.add("is-open");
        var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      });
    });
  }

  /* Pastilles de l'accueil : ouvrent directement la fiche projet correspondante */
  document.querySelectorAll("[data-open-fiche]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var btn = document.querySelector('.zone__btn[data-fiche="' + a.getAttribute("data-open-fiche") + '"]');
      if (!btn) return;
      e.preventDefault();
      if (btn.getAttribute("aria-expanded") !== "true") btn.click();
      else document.getElementById(a.getAttribute("data-open-fiche")).scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* Apparition douce des blocs au défilement, pour toutes les sections sauf l'accueil (qui reste fixe).
     Sans JS, la page reste complète. */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var groups = [".section__head > *", ".about__head > *", ".about__text > *", ".traj > *", ".growing > *", ".roadmap > :not(.bigsteps)",
                  ".contact__intro > *", ".contact__list > li",
                  ".story > li", ".skills > *", ".labmap > *", ".method > li", ".bigsteps > li", ".graph > li", ".footer__inner > *"];
    var targets = document.querySelectorAll(groups.join(","));
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.12 });
    var footObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); footObs.unobserve(entry.target); }
      });
    });
    targets.forEach(function (el) {
      var idx = Array.prototype.indexOf.call(el.parentElement.children, el);
      if (el.parentElement.matches(".story, .skills, .labmap, .method, .bigsteps, .contact__list, .graph")) {
        el.style.setProperty("--reveal-delay", (idx % 4) * 0.09 + "s");
      } else {
        el.style.setProperty("--reveal-delay", Math.min(idx, 5) * 0.12 + "s");
      }
      el.classList.add("reveal");
      /* Le pied de page touche le bas de l'écran : il apparaît dès qu'il entre dans la vue */
      (el.closest(".footer") ? footObs : revealObs).observe(el);
    });
  }

})();
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section, section");
  if (!sections.length) return;

  // Active l'état caché uniquement si IntersectionObserver est disponible
  if (!("IntersectionObserver" in window)) {
    sections.forEach((sec) => sec.classList.add("is-visible"));
    return;
  }

  sections.forEach((sec) => sec.classList.add("reveal-ready"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  sections.forEach((sec) => observer.observe(sec));
});

