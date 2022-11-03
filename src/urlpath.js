export function path(url) {
  return ""
    .concat(window.location.protocol)
    .concat("//")
    .concat(window.location.hostname)
    .concat(":")
    .concat(window.location.port)
    .concat("/")
    .concat(url);
}

export function redirect(file) {
  window.location.href = path(file);
}
