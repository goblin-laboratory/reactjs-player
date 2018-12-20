const getScript = (src = '') =>
  new Promise(resolve => {
    if (!src) {
      resolve(false);
      return;
    }
    try {
      const script = global.document.createElement('script');
      global.document.body.appendChild(script);
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      script.async = true;
      script.src = src;
    } catch (errMsg) {
      resolve(false);
    }
  });

export default {
  getScript,
};
