export const checkEmptyInput = (inputText) => {
  if (!inputText.trim()) {
    alert("Không để trống");
    return true;
  }
  return false;
};

