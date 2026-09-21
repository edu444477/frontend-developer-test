// Remembers MainView's scroll position and how many items were revealed,
// across route changes within the same page load (list -> detail ->
// back), without persisting them to localStorage: a real reload should
// still start collapsed at the top, only in-app navigation should not.
export const PAGE_SIZE = 25;

let rememberedVisibleCount = PAGE_SIZE;
let rememberedScrollY = 0;

export function getRememberedVisibleCount() {
  return rememberedVisibleCount;
}

export function setRememberedVisibleCount(value) {
  rememberedVisibleCount = value;
}

export function getRememberedScrollY() {
  return rememberedScrollY;
}

export function setRememberedScrollY(value) {
  rememberedScrollY = value;
}
