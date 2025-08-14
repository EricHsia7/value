export function stripTopLevelModel(value: string): { result: string; model: string } {
  const trimmed = value.trim();
  const trimmedLen = trimmed.length;
  let start = 0;
  let end = 0;
  for (let i = 0, l = trimmedLen; i < l; i++) {
    const char = trimmed[i];
    if (char === '(') {
      start = i;
      break;
    }
  }
  for (let i = trimmedLen - 1; i >= start; i--) {
    const char = trimmed[i];
    if (char === ')') {
      end = i;
      break;
    }
  }
  return {
    result: trimmed.slice(start + 1, end).trim(),
    model: trimmed.slice(0, start).trim()
  };
}
