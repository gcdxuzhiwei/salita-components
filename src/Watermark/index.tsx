import { useMemoizedFn } from 'ahooks';
import type { FC, PropsWithChildren } from 'react';
import React, { useEffect, useState } from 'react';

export interface WatermarkProps extends PropsWithChildren {
  /**
   * @description  水印文字内容
   */
  content: string;
  /**
   * @default rgba(0,0,0,.15)
   * @description  字体颜色
   */
  color?: string;
  /**
   * @default normal normal normal 16px sans-serif
   * @description  文字样式
   */
  font?: string;
  /**
   * @default -22
   * @description  水印绘制时，旋转的角度，单位 °
   */
  rotate?: number;
  /**
   * @default [100, 100]
   * @description  水印之间的间距
   */
  gap?: [number, number];
  /**
   * @default [0,0]
   * @description  水印距离容器左上角的偏移量
   */
  offset?: [number, number];
  /**
   * @default 9
   * @description  追加的水印元素的 z-index
   */
  zIndex?: number;
}

const Watermark: FC<WatermarkProps> = (props) => {
  const {
    content,
    color = 'rgba(0,0,0,.15)',
    font = 'normal normal normal 16px sans-serif',
    rotate = -22,
    gap = [100, 100],
    offset = [0, 0],
    zIndex = 9,
    children,
  } = props;

  const [bgUrl, setBgUrl] = useState('');

  const getImage = useMemoizedFn(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const realRotate = rotate % 360;
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = 'top';
    const { actualBoundingBoxDescent, actualBoundingBoxAscent, width } =
      ctx.measureText(content);
    const height = actualBoundingBoxDescent - actualBoundingBoxAscent;
    const absRotate = Math.abs(realRotate);
    const calcRotate =
      absRotate > 270
        ? 360 - absRotate
        : absRotate > 180
        ? absRotate - 180
        : absRotate > 90
        ? 180 - absRotate
        : absRotate;
    const rotatedWidth =
      Math.sin((calcRotate * Math.PI) / 180) * height +
      Math.cos((calcRotate * Math.PI) / 180) * width;
    const rotatedHeight =
      Math.sin((calcRotate * Math.PI) / 180) * width +
      Math.cos((calcRotate * Math.PI) / 180) * height;
    canvas.width = rotatedWidth + gap[0];
    canvas.height = rotatedHeight + gap[1];
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.translate(rotatedWidth / 2, rotatedHeight / 2);
    ctx.rotate((realRotate * Math.PI) / 180);
    ctx.fillText(content, -width / 2, -height / 2);
    setBgUrl(canvas.toDataURL('image/png'));
  });

  useEffect(() => {
    getImage();
  }, [content, color, font, rotate, gap]);

  return (
    <div style={{ position: 'relative' }}>
      {bgUrl && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${bgUrl})`,
            backgroundRepeat: 'repeat',
            zIndex,
            pointerEvents: 'none',
            backgroundPosition: `${offset[0]}px ${offset[1]}px`,
          }}
        />
      )}
      {children}
    </div>
  );
};

export default Watermark;
