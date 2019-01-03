const delay = milliseconds =>
  new Promise(resolve => {
    global.setTimeout(() => {
      resolve();
    }, milliseconds);
  });

export default delay;
