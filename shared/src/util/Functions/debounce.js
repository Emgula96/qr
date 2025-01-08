//TO DEBOUNCE THE CALLBACK FUNCTION
//RECEIVE CALLBACK AND WAIT TIME
//RETURN THE DEBOUNCED FUNCTION

export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
