const EXTRA_TESTS = [
  { sourceIndex: 0, title: "Test 3", id: "test-3" },
  { sourceIndex: 1, title: "Test 4", id: "test-4" },
];

function parsePx(value) {
  const number = Number.parseFloat(value || "0");
  return Number.isFinite(number) ? number : 0;
}

function findNodeForLabel(label) {
  const inner = label.closest(".inner");
  if (!inner) return null;

  const labelLeft = parsePx(label.style.left);
  const labelTop = parsePx(label.style.top);
  const isRight = label.classList.contains("right");

  return [...inner.querySelectorAll(".node")].reduce((best, node) => {
    const left = parsePx(node.style.left);
    const top = parsePx(node.style.top);
    const width = parsePx(node.style.width);
    const height = parsePx(node.style.height);
    const expectedLabelLeft = isRight ? left + width + 10 : left - 10;
    const score = Math.abs(expectedLabelLeft - labelLeft) + Math.abs(top + height / 2 - labelTop);

    return !best || score < best.score ? { node, score } : best;
  }, null)?.node || null;
}

function isIncomingPath(path, node) {
  if (!(path instanceof SVGPathElement)) return false;

  const length = path.getTotalLength();
  const end = path.getPointAtLength(length);
  const left = parsePx(node.style.left);
  const top = parsePx(node.style.top);
  const height = parsePx(node.style.height);

  return Math.abs(end.x - left) < 1.5 && end.y >= top - 1 && end.y <= top + height + 1;
}

function setOpacity(element, value) {
  element.style.setProperty("opacity", String(value), "important");
}

function clearOpacity(element) {
  element.style.removeProperty("opacity");
}

function applyGlobalHighlight(label) {
  const activeNode = findNodeForLabel(label);
  if (!activeNode) return;

  const activeInner = label.closest(".inner");
  const viewport = label.closest(".diagram-viewport");
  if (!activeInner || !viewport) return;

  viewport.querySelectorAll(".flow-path").forEach((path) => {
    const active = path.closest(".inner") === activeInner && isIncomingPath(path, activeNode);
    setOpacity(path, active ? 0.35 : 0.15);
  });

  viewport.querySelectorAll(".node").forEach((node) => {
    setOpacity(node, node === activeNode ? 1 : 0.5);
  });

  viewport.querySelectorAll(".label").forEach((item) => {
    setOpacity(item, item === label ? 1 : 0.7);
  });
}

function clearGlobalHighlight(viewport) {
  viewport.querySelectorAll(".flow-path,.node,.label").forEach(clearOpacity);
}

function attachHover(label) {
  if (label.dataset.extraHoverAttached === "true") return;
  label.dataset.extraHoverAttached = "true";

  label.addEventListener("pointerenter", () => {
    applyGlobalHighlight(label);
    requestAnimationFrame(() => applyGlobalHighlight(label));
  });

  label.addEventListener("pointerleave", () => {
    const viewport = label.closest(".diagram-viewport");
    if (!viewport) return;
    requestAnimationFrame(() => clearGlobalHighlight(viewport));
  });
}

function normalizeClone(section) {
  section.querySelectorAll(".flow-path").forEach((path) => {
    path.style.opacity = "0.35";
  });

  section.querySelectorAll(".node,.label").forEach((element) => {
    element.style.opacity = "1";
  });
}

function ensureExtraTests() {
  const column = document.querySelector(".tests-column");
  if (!column) return;

  const originals = [...column.children].filter(
    (child) => child.classList.contains("test-section") && !child.dataset.extraTest,
  );

  if (originals.length < 2) return;

  EXTRA_TESTS.forEach(({ sourceIndex, title, id }) => {
    if (column.querySelector(`[data-extra-test="${id}"]`)) return;

    const clone = originals[sourceIndex].cloneNode(true);
    clone.dataset.extraTest = id;
    clone.querySelector(".section-title").textContent = title;
    normalizeClone(clone);
    column.appendChild(clone);
  });

  column.querySelectorAll(".label").forEach(attachHover);
}

ensureExtraTests();

const observer = new MutationObserver(() => {
  requestAnimationFrame(ensureExtraTests);
});

observer.observe(document.documentElement, { childList: true, subtree: true });
