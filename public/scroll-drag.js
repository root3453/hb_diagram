const INTERACTIVE_SELECTOR = ".label,.node,.step,.section-title,.tab,button,a,input,select,textarea";

function isScrollbarPointer(event, viewport) {
  const rect = viewport.getBoundingClientRect();
  const verticalScrollbarWidth = viewport.offsetWidth - viewport.clientWidth;
  const horizontalScrollbarHeight = viewport.offsetHeight - viewport.clientHeight;

  const overVerticalScrollbar =
    verticalScrollbarWidth > 0 && event.clientX >= rect.right - verticalScrollbarWidth;
  const overHorizontalScrollbar =
    horizontalScrollbarHeight > 0 && event.clientY >= rect.bottom - horizontalScrollbarHeight;

  return overVerticalScrollbar || overHorizontalScrollbar;
}

function attachScrollDrag(viewport) {
  if (viewport.dataset.scrollDragAttached === "true") return;
  viewport.dataset.scrollDragAttached = "true";

  let drag = null;

  const stopReactDrag = (event) => {
    event.stopPropagation();
  };

  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    if (event.target.closest(INTERACTIVE_SELECTOR)) return;
    if (isScrollbarPointer(event, viewport)) return;

    event.preventDefault();
    stopReactDrag(event);

    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: viewport.scrollLeft,
      startScrollTop: viewport.scrollTop,
    };

    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("dragging");
  };

  const onPointerMove = (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    stopReactDrag(event);

    viewport.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX);
    viewport.scrollTop = drag.startScrollTop - (event.clientY - drag.startY);
  };

  const stopDragging = (event) => {
    if (!drag || drag.pointerId !== event.pointerId) return;

    stopReactDrag(event);
    drag = null;
    viewport.classList.remove("dragging");

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
  };

  viewport.addEventListener("pointerdown", onPointerDown, true);
  viewport.addEventListener("pointermove", onPointerMove, true);
  viewport.addEventListener("pointerup", stopDragging, true);
  viewport.addEventListener("pointercancel", stopDragging, true);
}

function initializeScrollDrag() {
  document.querySelectorAll(".diagram-viewport").forEach(attachScrollDrag);
}

initializeScrollDrag();

const observer = new MutationObserver(initializeScrollDrag);
observer.observe(document.documentElement, { childList: true, subtree: true });
