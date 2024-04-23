export const closest = (
  el: HTMLElement,
  selector: string,
  rootNode: HTMLElement,
) => {
  let element: HTMLElement | null = el;
  while (element) {
    const isRoot = element === rootNode || element === document.body;
    if (isRoot || (element.nodeType === 1 && element.matches(selector))) {
      if (isRoot) {
        element = null;
      }
      break;
    }
    element = element.parentNode as HTMLElement;
  }
  return element;
};

export const getScrollElement = (el: HTMLElement) => {
  let element: HTMLElement | null = el;
  do {
    const { overflow } = window.getComputedStyle(element);
    if (
      (overflow === 'auto' || overflow === 'scroll') &&
      element &&
      element.nodeType &&
      (element.offsetWidth < element.scrollWidth ||
        element.offsetHeight < element.scrollHeight)
    ) {
      break;
    }
    if (!element || !element.nodeType || element === document.body) {
      element = null;
      break;
    }
    element = element.parentNode as HTMLElement;
  } while (element);
  return element;
};

export const getDomIndex = (el: HTMLElement, ignoreSelectors: string) => {
  return Array.from(el.parentNode!.children)
    .filter((e) =>
      ignoreSelectors === '' ? true : !e.matches(ignoreSelectors),
    )
    .indexOf(el);
};
