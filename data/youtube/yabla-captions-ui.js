// 2. Function to Update the res

var CAPTIONS = [];

const updateUI = () => {
  const currentTime = document.querySelector("video").currentTime;
  const captionsWrap = document.getElementById("captions_wrap");

  const currentCaption = CAPTIONS?.find(
    (caption) =>
      caption?.time_in <= currentTime && currentTime <= caption?.time_out
  );

  const captionIndex = CAPTIONS.findIndex((x) => x.id === currentCaption?.id);

  if (captionIndex >= 0) {
    const captionInnerExists = document.getElementById(currentCaption.id);

    if (captionInnerExists) {
      return;
    } else {
      const captionInner = document.createElement("div");

      captionInner.id = currentCaption.id;

      const p1 = document.createElement("p");
      p1.textContent = currentCaption.romanization;

      captionInner.appendChild(p1);

      const p2 = document.createElement("p");
      p2.textContent = currentCaption.transcript;
      captionInner.appendChild(p2);

      const p3 = document.createElement("p");
      p3.textContent = currentCaption.translation;
      captionInner.appendChild(p3);

      captionsWrap.replaceChildren(captionInner);
    }
  }
};
setInterval(updateUI, 5);
