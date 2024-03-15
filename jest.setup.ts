import "@testing-library/jest-dom";

type MockMediaQueryList = {
  matches: boolean;
  media: string;
  onchange: null | ((this: MediaQueryList, ev: MediaQueryListEvent) => any);
  addListener: (
    callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any,
  ) => void;
  removeListener: (
    callback: (this: MediaQueryList, ev: MediaQueryListEvent) => any,
  ) => void;
  addEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ) => void;
  removeEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ) => void;
  dispatchEvent: (event: Event) => boolean;
};

global.matchMedia =
  global.matchMedia ||
  function (query: string): MockMediaQueryList {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function (callback) {},
      removeListener: function (callback) {},
      addEventListener: function (type, listener, options) {},
      removeEventListener: function (type, listener, options) {},
      dispatchEvent: function (event) {
        return false;
      },
    };
  };
