export const getSelectedText = () => {
  const selectedText = window?.getSelection()?.toString();

  return selectedText;
};
