const getElement = (getEl, timeout = 3000) => {
  return new Promise(resolve => {
    const el = getEl();
    if (el) {
      resolve(el);
      return;
    }
    setTimeout(() => {
      resolve(getEl());
    }, timeout);
  });
};

export default {
  debug: console.error,
  getElement,
};
