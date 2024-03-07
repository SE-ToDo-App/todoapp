export function generateTimestampKey(prefix = '') {
  const now = new Date();
  const timestamp = now.getTime();
  const key = `${prefix}${timestamp}`;

  return key;
}