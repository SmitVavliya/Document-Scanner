export const getImageDimensions = (imageHeight, imageWidth) => {
  let height;
  let width;
  let x;
  let y;
  let ratio;

  if (imageHeight < imageWidth) {
    ratio = imageHeight / imageWidth;
    if (ratio > 0.5) {
      width = 250;
      x = 0;
      height = width * ratio;
      if (height > 350) {
        height = 350;
      }
      y = (350 - height) / 2;
    } else {
      width = 250 - 250 * (0.5 - ratio);
      x = (250 - width) / 2;
      height = width * ratio;
      y = (350 - height) / 2;
    }
  } else {
    ratio = imageWidth / imageHeight;
    if (ratio > 0.5) {
      height = 350;
      y = 0;
      width = height * ratio;
      if (width > 350) {
        width = 350;
      }
      x = (250 - width) / 2;
    } else {
      height = 350 - 350 * (0.5 - ratio);
      y = (350 - height) / 2;
      width = height * ratio;
      x = (250 - width) / 2;
    }
  }

  return {height, width, x, y};
};
