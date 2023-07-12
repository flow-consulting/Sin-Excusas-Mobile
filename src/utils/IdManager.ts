
export function generateId() {
  return `${generateTimestampId()}-GCV-${generateRandomId()}`;
}

// Generates a random identifier
export function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

// Generates a timestamp-based identifier
export function generateTimestampId() {
  return Date.now().toString();
}
