// 原生事件代理实现

const DOCUMENT_NODE_TYPE = 9;

interface IElement extends Element {
  matchesSelector?: (selectors: string) => boolean;
  mozMatchesSelector?: (selectors: string) => boolean;
  msMatchesSelector?: (selectors: string) => boolean;
  oMatchesSelector?: (selectors: string) => boolean;
  webkitMatchesSelector: (selectors: string) => boolean;
  matches: (selectors: string) => boolean;
}

if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  const proto: IElement = Element.prototype;

  proto.matches = proto.matchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    proto.webkitMatchesSelector;
}

function closest(element: any, selector: string) {
  while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
    if (typeof element.matches === 'function' &&
      element.matches(selector)) {
      return element;
    }
    element = element.parentNode;
  }
  return null;
}

type delegateFunc = (el: any, selector: string, type: string, callback: any, useCapture?: boolean) => any;

const privateDelegate: delegateFunc = (element, selector, type, callback, useCapture) => {
  const listenerFn = listener(element, selector, callback);

  element.addEventListener(type, listenerFn, useCapture);

  return {
    destroy() {
      element.removeEventListener(type, listenerFn, useCapture);
    }
  }
}

const delegate: delegateFunc = (elements, selector, type, callback, useCapture = false) => {
  // Handle the regular Element usage
  if (typeof elements.addEventListener === 'function') {
    return privateDelegate(elements, selector, type, callback, useCapture);
  }

  // Handle Element-less usage, it defaults to global delegation
  if (typeof type === 'function') {
    // Use `document` as the first parameter, then apply arguments
    // This is a short way to .unshift `arguments` without running into deoptimizations
    return privateDelegate(document, selector, type, callback, useCapture);
  }

  // Handle Selector-based usage
  if (typeof elements === 'string') {
    elements = document.querySelectorAll(elements);
  }

  // Handle Array-like based usage
  return Array.prototype.map.call(elements, (element: any) => {
    return privateDelegate(element, selector, type, callback, useCapture);
  });
}

function listener(element: any, selector: string, callback: any) {
  return (e: any) => {
    e.delegateTarget = closest(e.target, selector);

    if (e.delegateTarget) {
      callback.call(element, e);
    }
  }
}

export default delegate