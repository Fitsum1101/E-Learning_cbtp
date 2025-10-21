export const AvaterUrl = (style, seed) =>
  `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`;

export const isErrorExistsfUN = (data) => {
  if (!data || data.length < 3) {
    return true;
  }
  return false;
};

export const isValidNumber = (number) => {
  if (!number || number < 0) return false;
  return true;
};
