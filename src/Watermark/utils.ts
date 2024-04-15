export const getTextImgUrl = (
  content: string,
  { color, font, rotate }: { color: string; font: string; rotate: number },
) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'top';
  const { actualBoundingBoxDescent, actualBoundingBoxAscent, width } =
    ctx.measureText(content);
  const height = actualBoundingBoxDescent - actualBoundingBoxAscent;
  const rotatedWidth =
    Math.sin((Math.abs(rotate) * Math.PI) / 180) * height +
    Math.cos((Math.abs(rotate) * Math.PI) / 180) * width;
  const rotatedHeight =
    Math.sin((Math.abs(rotate) * Math.PI) / 180) * width +
    Math.cos((Math.abs(rotate) * Math.PI) / 180) * height;
  canvas.width = rotatedWidth;
  canvas.height = rotatedHeight;
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'top';
  ctx.translate(rotatedWidth / 2, rotatedHeight / 2);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.fillText(content, -width / 2, -height / 2);
  return canvas.toDataURL('image/png');
};

export const getRotateImgUrl = (textImgUrl: string): Promise<string> =>
  new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.src = textImgUrl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      resolve(textImgUrl);
    };
  });
