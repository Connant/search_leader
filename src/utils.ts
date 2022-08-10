export function prettify(n: string) {
  // eslint-disable-next-line no-useless-concat
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
}
