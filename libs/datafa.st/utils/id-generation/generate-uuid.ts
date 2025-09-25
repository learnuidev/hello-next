export const generateUUID = (template: string): string =>
  template.replace(/[xy]/g, (char) => {
    const randomValue = (16 * Math.random()) | 0;
    return (char === "x" ? randomValue : (randomValue & 3) | 8).toString(16);
  });
