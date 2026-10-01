"use strict";

/* MOBILE NAVIGATION */

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#nav-links");

if (menuButton && navigation) {
  document.documentElement.classList.add("js-enabled");
  menuButton.hidden = false;

  function closeMenu({ restoreFocus = false } = {}) {
    navigation.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");

    if (restoreFocus) {
      menuButton.focus();
    }
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
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navigation.classList.contains("open")
    ) {
      closeMenu({ restoreFocus: true });
    }
  });

  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Element &&
      !event.target.closest(".navigation")
    ) {
      closeMenu();
    }
  });

  document.addEventListener("focusin", (event) => {
    if (
      event.target instanceof Element &&
      !event.target.closest(".navigation")
    ) {
      closeMenu();
    }
  });

  window
    .matchMedia("(min-width: 901px)")
    .addEventListener("change", () => {
      closeMenu();
    });
}

/* READ-ONLY LEARNING PROGRESS

   Update a milestone in index.html by changing data-status:

   data-status="completed"
   data-status="in-progress"
   data-status="planned"

   Then commit and push your source changes to GitHub.

   Visitors have no editing controls, saved browser state,
   or endpoint that writes changes to the published website.
*/

const statusDefinitions = {
  completed: {
    label: "Completed",
    icon: "#icon-check"
  },

  "in-progress": {
    label: "In progress",
    icon: "#icon-clock"
  },

  planned: {
    label: "Planned",
    icon: "#icon-calendar"
  }
};

const milestones = [
  ...document.querySelectorAll(".milestone[data-status]")
];

let completedCount = 0;

milestones.forEach((milestone) => {
  const requestedStatus = milestone.dataset.status;

  const status = Object.prototype.hasOwnProperty.call(
    statusDefinitions,
    requestedStatus
  )
    ? requestedStatus
    : "planned";

  const definition = statusDefinitions[status];

  milestone.classList.remove(
    "completed",
    "in-progress",
    "planned"
  );

  milestone.classList.add(status);

  const label = milestone.querySelector(".status");
  const icon = milestone.querySelector("svg use");

  if (label) {
    label.textContent = definition.label;
  }

  if (icon) {
    icon.setAttribute("href", definition.icon);
  }

  if (status === "completed") {
    completedCount += 1;
  }
});

const total = milestones.length;

const percentage = total > 0
  ? Math.round((completedCount / total) * 100)
  : 0;

const progressNumber = document.getElementById("progress-number");
const progressCount = document.getElementById("progress-count");
const progressBar = document.getElementById("learning-progress");

if (progressNumber) {
  progressNumber.textContent = `${percentage}%`;
}

if (progressCount) {
  progressCount.textContent =
    `${completedCount} of ${total} milestones completed`;
}

if (progressBar) {
  progressBar.max = Math.max(total, 1);
  progressBar.value = completedCount;
  progressBar.textContent = `${percentage}%`;
}