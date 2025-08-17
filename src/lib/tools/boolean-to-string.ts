export function booleanToString(value: Boolean): 'true' | 'false' {
  if (value === true) {
    return 'true';
  } else {
    return 'false';
  }
}
