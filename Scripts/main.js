"use strict";

// Navigation stays visible without JavaScript. Only small screens collapse it.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const smallScreen = window.matchMedia("(max-width: 700px)");

if (menuToggle && navigation) {
  const setExpanded = (expanded) => {
    menuToggle.setAttribute("aria-expanded", String(expanded));
    navigation.dataset.collapsed = String(smallScreen.matches && !expanded);
  };

  const resetMenu = () => setExpanded(false);
  menuToggle.hidden = false;
  resetMenu();

  menuToggle.addEventListener("click", () => {
    setExpanded(menuToggle.getAttribute("aria-expanded") !== "true");
  });
  smallScreen.addEventListener("change", resetMenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setExpanded(false);
      menuToggle.focus();
    }
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setExpanded(false);
  });
}

// A link from the homepage opens the corresponding abstract automatically.
const revealLinkedAbstract = () => {
  const target = document.getElementById(window.location.hash.slice(1));
  const abstract = target?.querySelector("details.abstract");
  if (abstract) abstract.open = true;
};
revealLinkedAbstract();
window.addEventListener("hashchange", revealLinkedAbstract);
