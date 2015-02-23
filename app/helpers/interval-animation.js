/**
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
export function requestInterval (fn, delay) {
  var start = new Date().getTime(),
    handle = new Object();

  function loop () {
    var current = new Date().getTime(),
      delta = current - start;

    if (delta >= delay) {
      fn.call();
      start = new Date().getTime();
    }

    handle.value = window.requestAnimationFrame(loop);
  };

  handle.value = window.requestAnimationFrame(loop);
  return handle;
}

/**
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
export function clearRequestInterval (handle) {
  window.cancelAnimationFrame(handle.value)
}
