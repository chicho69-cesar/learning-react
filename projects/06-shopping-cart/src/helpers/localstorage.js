export const updateLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
