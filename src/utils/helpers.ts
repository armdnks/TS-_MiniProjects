export function randomValue<T>(value: T[]) {
  return value[Math.floor(Math.random() * value.length)];
}

export function randomHex() {
  return (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
}
