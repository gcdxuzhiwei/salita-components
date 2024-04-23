import type { FC, PropsWithChildren } from 'react';
import React, { memo } from 'react';
import { useDrag } from './hook';
import type { DragListProps } from './type';

const DragList: FC<PropsWithChildren<DragListProps>> = (props) => {
  const { children, ...restProps } = props;

  const { startDrag, bindRef } = useDrag(restProps);

  return (
    <div role="presentation" onPointerDown={startDrag} ref={bindRef}>
      {children}
    </div>
  );
};

const UNIT_PX = 'px';
const DRAG_LIND_STYLE =
  'width:0;margin-left:-1px;margin-top:0;' +
  'border-bottom:0 none;border-left:dashed 2px red;';
const DIRECTIONS = {
  RIGHT: 2,
  LEFT: 4,
};

const _DragColumn: FC<PropsWithChildren<DragListProps>> = (props) => {
  const { children, ...restProps } = props;

  const { startDrag, bindRef } = useDrag(restProps, {
    getDragLine: (preFn, dataRef) => {
      if (!dataRef.dragLine) {
        preFn();
        dataRef.dragLine!.setAttribute(
          'style',
          dataRef.dragLine!.getAttribute('style') + DRAG_LIND_STYLE,
        );
      }
      return dataRef.dragLine!;
    },
    resolveAutoScroll: (e, target, dataRef, fns) => {
      if (!dataRef.scrollElement) {
        return;
      }
      const { left, width } = dataRef.scrollElement.getBoundingClientRect();
      const targetWidth = target.offsetWidth;
      const { clientX } = e;
      const compatibleWidth = (targetWidth * 2) / 3;
      dataRef.direction = 0;
      if (clientX > left + width - compatibleWidth) {
        dataRef.direction = DIRECTIONS.RIGHT;
      } else if (clientX < left + compatibleWidth) {
        dataRef.direction = DIRECTIONS.LEFT;
      }
      if (dataRef.direction) {
        if (dataRef.scrollTimerId < 0) {
          dataRef.scrollTimerId = +setInterval(fns.autoScroll, 20);
        }
      } else {
        fns.stopAutoScroll();
      }
    },
    fixDragLine: (target, dataRef, fns) => {
      const dragLine = fns.getDragLine();
      if (
        !target ||
        dataRef.fromIndex < 0 ||
        dataRef.fromIndex === dataRef.toIndex
      ) {
        fns.hideDragLine();
        return;
      }
      const { left, top, width, height } = target.getBoundingClientRect();
      const lineLeft =
        dataRef.toIndex < dataRef.fromIndex ? left : left + width;
      if (restProps.enableScroll && dataRef.scrollElement) {
        const { width: scrollWidth, left: scrollLeft } =
          dataRef.scrollElement.getBoundingClientRect();
        if (
          lineLeft < scrollLeft - 2 ||
          lineLeft > scrollLeft + scrollWidth + 2
        ) {
          fns.hideDragLine();
          return;
        }
      }
      dragLine.style.top = top + UNIT_PX;
      dragLine.style.height = height + UNIT_PX;
      dragLine.style.left = lineLeft + UNIT_PX;
      dragLine.style.display = 'block';
    },
  });

  return (
    <div role="presentation" onPointerDown={startDrag} ref={bindRef}>
      {children}
    </div>
  );
};

export default memo(DragList);
export const DragColumn = memo(_DragColumn);
export type { DragListProps };
