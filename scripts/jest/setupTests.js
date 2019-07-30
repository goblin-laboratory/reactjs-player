// jest.setTimeout(30 * 1000);
jest.setTimeout(5 * 1000);

// ['requestFullscreen', 'exitFullscreen'].forEach(each => (document[each] = () => {}));

// if (!global.performance) {
//   global.performance = {};
// }
// if (!global.performance.now) {
//   global.performance.now = Date.now();
// }

// if (!global.requestAnimationFrame) {
//   global.requestAnimationFrame = cb => {
//     return global.setTimeout(() => {
//       cb(global.performance.now);
//     }, 1000);
//   };
// }
