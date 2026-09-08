type PhoneBite = { mask: SVGMaskElement; left: number; top: number };
type Bite = {
  ranges: Range[];
  elements: Set<HTMLElement | SVGElement>;
  phone?: PhoneBite;
};
export function readContent(size: number) {
  const floating: (HTMLElement | SVGElement)[] = [];
  const anchored = new WeakMap<Element, boolean>();
  const followsViewport = (element: Element): boolean => {
    const cached = anchored.get(element);
    if (cached !== undefined) return cached;
    const position = getComputedStyle(element).position;
    const result =
      position === "fixed" ||
      position === "sticky" ||
      !!(element.parentElement && followsViewport(element.parentElement));
    anchored.set(element, result);
    return result;
  };
  const food = new Map<string, Bite>();
  const add = (
    rect: DOMRect,
    range?: Range,
    element?: HTMLElement | SVGElement,
    phone?: PhoneBite,
  ) => {
    const top = rect.top + window.scrollY;
    for (
      let y = Math.floor(top / size);
      y <= Math.floor((top + rect.height - 1) / size);
      y++
    ) {
      for (
        let x = Math.max(0, Math.floor(rect.left / size));
        x <=
        Math.min(
          Math.floor(innerWidth / size) - 1,
          Math.floor((rect.right - 1) / size),
        );
        x++
      ) {
        const key = `${x}:${y}`;
        const bite: Bite = food.get(key) ?? {
          ranges: [],
          elements: new Set<HTMLElement | SVGElement>(),
        };
        if (range) bite.ranges.push(range);
        if (element) bite.elements.add(element);
        if (phone) bite.phone = phone;
        food.set(key, bite);
      }
    }
  };
  const root = document.getElementById("root")!;
  const skip = "dialog,script,style,.studio-tools,.phone-device,[hidden]";
  const controls = "button,a,select,input,textarea,summary";
  root
    .querySelectorAll<HTMLElement | SVGElement>(
      `${controls},img,svg,canvas,hr,.tags span`,
    )
    .forEach((element) => {
      if (element.closest(skip) || element.parentElement?.closest(controls))
        return;
      const rect = element.getBoundingClientRect();
      if (
        rect.width &&
        rect.height &&
        getComputedStyle(element).visibility !== "hidden"
      ) {
        if (followsViewport(element)) floating.push(element);
        else add(rect, undefined, element);
      }
    });
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (
      node.parentElement?.closest(
        skip + "," + controls + ',.tags span,[aria-hidden="true"]',
      )
    )
      continue;
    if (
      node.parentElement &&
      getComputedStyle(node.parentElement).visibility === "hidden"
    )
      continue;
    for (let i = 0; i < (node.textContent?.length ?? 0); i++) {
      if (!node.textContent![i].trim()) continue;
      const range = document.createRange();
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const rect = range.getBoundingClientRect();
      if (rect.width && rect.height) add(rect, range);
    }
  }
  const phone = root.querySelector<HTMLElement>(
    '.phone-stage[data-phase="escaped"] .phone-device',
  );
  const mask = phone?.querySelector<SVGMaskElement>("[data-phone-mask]");
  if (phone && mask) {
    const rect = phone.getBoundingClientRect();
    add(rect, undefined, undefined, {
      mask,
      left: rect.left,
      top: rect.top + window.scrollY,
    });
  }
  return { food, floating };
}
