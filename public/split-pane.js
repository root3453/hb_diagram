const DIVIDER_SIZE = 16;
const SNAP_DISTANCE = 72;
const DEFAULT_RATIO = 0.5;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createDivider() {
  const divider = document.createElement("div");
  divider.className = "split-pane-divider";
  divider.setAttribute("role", "separator");
  divider.setAttribute("aria-orientation", "vertical");
  divider.setAttribute("aria-label", "Resize Participant Flow and Test Flow panels");
  divider.tabIndex = 0;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "split-pane-divider__button";
  button.setAttribute("aria-label", "Resize panels");

  const dots = document.createElement("span");
  dots.className = "split-pane-divider__dots";
  dots.setAttribute("aria-hidden", "true");

  const arrow = document.createElement("span");
  arrow.className = "split-pane-divider__arrow";
  arrow.setAttribute("aria-hidden", "true");

  button.append(dots, arrow);
  divider.append(button);
  document.body.append(divider);

  return { divider, button, arrow };
}

function initializeSplitPane() {
  const viewport = document.querySelector(".diagram-viewport");
  const canvas = viewport?.querySelector(":scope > .diagram-canvas");
  const participant = canvas?.querySelector(":scope > .participant-section");
  const tests = canvas?.querySelector(":scope > .tests-column");

  if (!viewport || !canvas || !participant || !tests) return false;
  if (viewport.dataset.splitPaneInitialized === "true") return true;

  viewport.dataset.splitPaneInitialized = "true";
  viewport.dataset.splitState = "normal";

  const { divider, button, arrow } = createDivider();
  let currentLeft = 0;
  let currentRatio = DEFAULT_RATIO;
  let lastExpandedRatio = DEFAULT_RATIO;
  let drag = null;

  const availableWidth = () => Math.max(0, viewport.clientWidth - DIVIDER_SIZE);

  const updateDividerPosition = () => {
    const rect = viewport.getBoundingClientRect();
    divider.style.left = `${Math.round(rect.left + currentLeft)}px`;
    divider.style.top = `${Math.round(rect.top)}px`;
    divider.style.height = `${Math.round(rect.height)}px`;
  };

  const updateDividerState = (state) => {
    const collapsed = state !== "normal";
    divider.classList.toggle("is-collapsed", collapsed);
    arrow.textContent = state === "left-collapsed" ? "›" : state === "right-collapsed" ? "‹" : "";

    if (state === "left-collapsed") {
      button.setAttribute("aria-label", "Restore Participant Flow panel");
    } else if (state === "right-collapsed") {
      button.setAttribute("aria-label", "Restore Test Flow panel");
    } else {
      button.setAttribute("aria-label", "Resize panels");
    }
  };

  const applyLeftWidth = (left, state = "normal", remember = true) => {
    const available = availableWidth();
    currentLeft = clamp(left, 0, available);
    viewport.style.setProperty("--split-left", `${currentLeft}px`);
    viewport.dataset.splitState = state;

    if (state === "normal" && available > 0) {
      currentRatio = currentLeft / available;
      if (remember && currentRatio > 0.05 && currentRatio < 0.95) {
        lastExpandedRatio = currentRatio;
      }
    }

    updateDividerState(state);
    updateDividerPosition();
  };

  const collapseLeft = () => applyLeftWidth(0, "left-collapsed", false);
  const collapseRight = () => applyLeftWidth(availableWidth(), "right-collapsed", false);

  const restore = () => {
    const available = availableWidth();
    const ratio = clamp(lastExpandedRatio || DEFAULT_RATIO, 0.15, 0.85);
    applyLeftWidth(available * ratio, "normal", true);
  };

  const finishDrag = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;

    const available = availableWidth();
    const left = currentLeft;
    drag = null;
    divider.classList.remove("is-dragging");

    if (divider.hasPointerCapture(event.pointerId)) {
      divider.releasePointerCapture(event.pointerId);
    }

    if (left <= SNAP_DISTANCE) {
      collapseLeft();
    } else if (available - left <= SNAP_DISTANCE) {
      collapseRight();
    } else {
      applyLeftWidth(left, "normal", true);
    }
  };

  divider.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;

    const state = viewport.dataset.splitState;
    if (state !== "normal") {
      event.preventDefault();
      restore();
      return;
    }

    event.preventDefault();
    divider.setPointerCapture(event.pointerId);
    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startLeft: currentLeft,
    };
    divider.classList.add("is-dragging");
  });

  divider.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;

    event.preventDefault();
    const next = drag.startLeft + event.clientX - drag.startX;
    applyLeftWidth(next, "normal", false);
  });

  divider.addEventListener("pointerup", finishDrag);
  divider.addEventListener("pointercancel", finishDrag);

  button.addEventListener("click", (event) => {
    if (viewport.dataset.splitState === "normal") return;
    event.preventDefault();
    restore();
  });

  divider.addEventListener("keydown", (event) => {
    const step = event.shiftKey ? 80 : 24;
    const state = viewport.dataset.splitState;

    if ((event.key === "Enter" || event.key === " ") && state !== "normal") {
      event.preventDefault();
      restore();
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      collapseLeft();
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      collapseRight();
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      if (state !== "normal") restore();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      applyLeftWidth(currentLeft + direction * step, "normal", true);
    }
  });

  /* Disable the original canvas hand-drag in this branch without blocking native scrollbars. */
  viewport.addEventListener(
    "pointerdown",
    (event) => {
      event.stopPropagation();
    },
    true,
  );

  const resizeObserver = new ResizeObserver(() => {
    const state = viewport.dataset.splitState;
    const available = availableWidth();

    if (state === "left-collapsed") {
      applyLeftWidth(0, state, false);
    } else if (state === "right-collapsed") {
      applyLeftWidth(available, state, false);
    } else {
      applyLeftWidth(available * currentRatio, "normal", false);
    }
  });

  resizeObserver.observe(viewport);
  window.addEventListener("resize", updateDividerPosition);
  window.addEventListener("scroll", updateDividerPosition, true);

  requestAnimationFrame(() => {
    applyLeftWidth(availableWidth() * DEFAULT_RATIO, "normal", true);
  });

  return true;
}

if (!initializeSplitPane()) {
  const observer = new MutationObserver(() => {
    if (initializeSplitPane()) observer.disconnect();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
}
