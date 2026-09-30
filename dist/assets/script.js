// assets/script.js

"use strict";

// Mobile navigation
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {
  function closeMenu() {
    navigation.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navigation.classList.contains("open")
    ) {
      closeMenu();
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Element &&
      !event.target.closest(".nav")
    ) {
      closeMenu();
    }
  });

  const desktopNavigation = window.matchMedia("(min-width: 901px)");

  desktopNavigation.addEventListener("change", (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
}

// Read-only progress display
const milestones = [
  ...document.querySelectorAll("#progress .milestone")
];

const progressNumber = document.getElementById("progress-number");
const progressCount = document.getElementById("progress-count");
const progressBar = document.getElementById("learning-progress");

if (milestones.length > 0) {
  const completed = milestones.filter((milestone) => {
    return milestone.classList.contains("completed");
  }).length;

  const total = milestones.length;
  const percentage = Math.round((completed / total) * 100);

  if (progressNumber) {
    progressNumber.textContent = `${percentage}%`;
  }

  if (progressCount) {
    progressCount.textContent =
      `${completed} of ${total} milestones completed`;
  }

  if (progressBar) {
    progressBar.max = total;
    progressBar.value = completed;
    progressBar.textContent = `${percentage}%`;
  }
}