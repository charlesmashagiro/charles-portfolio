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
      if (navigation.classList.contains("open")) {
        const target = document.getElementById(link.hash.slice(1));
        closeMenu();
        if (target) {
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
        }
      }
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
// Mark the section the visitor is reading, including after an anchor jump.
const sectionLinks = [...document.querySelectorAll("#nav-links a[href^='#']")]
  .map(link => ({link, section: document.getElementById(link.hash.slice(1))}))
  .filter(item => item.section);
const header = document.querySelector(".site-header");
let scheduled = false;
function updateCurrentSection() {
  scheduled = false;
  const offset = (getComputedStyle(header).position === "sticky" ? header.offsetHeight : 0) + 42;
  let current;
  for (const item of sectionLinks) {
    if (item.section.getBoundingClientRect().top <= offset) current = item;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    current = sectionLinks[sectionLinks.length - 1];
  }
  for (const item of sectionLinks) {
    if (item === current) item.link.setAttribute("aria-current", "location");
    else item.link.removeAttribute("aria-current");
  }
}
function scheduleSectionUpdate() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(updateCurrentSection);
}
window.addEventListener("scroll", scheduleSectionUpdate, {passive: true});
window.addEventListener("resize", scheduleSectionUpdate);
window.addEventListener("load", scheduleSectionUpdate);
scheduleSectionUpdate();

// A visitor can use webmail even without a configured mail application.
const copyButton = document.querySelector(".copy-email");
const emailLink = document.querySelector("#contact a[href^='mailto:']");
if (copyButton && emailLink && navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    const email = emailLink.getAttribute("href").slice(7).split("?")[0];
    const feedback = document.querySelector(".copy-feedback");
    try {
      await navigator.clipboard.writeText(email);
      feedback.textContent = "Email address copied.";
    } catch {
      feedback.textContent = "Copy this address manually: " + email;
    }
  });
}
