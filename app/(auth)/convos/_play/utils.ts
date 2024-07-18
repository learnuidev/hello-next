const formatNumber = (time: any) => (time > 9 ? `${time}` : `0${time}`);

export const formatTime = (ex: any) => {
  const example = Math.floor(ex);
  if (example > 60) {
    const minutes = Math.floor(example / 60);
    const seconds = example % 60;
    return `00:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  }
  return example > 9 ? `00:00:${example}` : `00:00:0${example}`;
};
