export const validate = (json: string) => {
  if (!json) return true;
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
};
