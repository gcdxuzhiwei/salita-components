import { useUnmount } from 'ahooks';
import type { LegacyRef, PointerEventHandler } from 'react';
import { useRef } from 'react';
import type { DataRef, DragListProps, SuperFn } from './type';
import { closest, getDomIndex, getScrollElement } from './util';

const DEFAULT_NODE_SELECTOR = 'tr';
const DIRECTIONS = {
  TOP: 1,
  BOTTOM: 3,
};
const UNIT_PX = 'px';
const DRAG_LIND_STYLE =
  'position:fixed;z-index:9999;height:0;' +
  'margin-top:-1px;border-bottom:dashed 2px red;display:none;';
const DEFAULT_SUPER_FN = {};
const DEFAULT_GET_DRAG_LINE: SuperFn['getDragLine'] = (preFn) => {
  return preFn();
};

export const useDrag = (
  props: DragListProps,
  superFn: SuperFn = DEFAULT_SUPER_FN,
) => {
  const {
    onDragEnd: propOnDragEnd,
    handleSelector = '',
    nodeSelector = DEFAULT_NODE_SELECTOR,
    ignoreSelector = '',
    enableScroll = true,
    scrollSpeed = 10,
    lineClassName = '',
  } = props;

  const {
    getDragLine: propGetDragLine = DEFAULT_GET_DRAG_LINE,
    resolveAutoScroll: propResolveAutoScroll,
    fixDragLine: propFixDragLine,
  } = superFn;

  const data = useRef<DataRef>({
    fromIndex: -1,
    toIndex: -1,
    scrollElement: null,
    scrollTimerId: -1,
    direction: DIRECTIONS.BOTTOM,
    dragList: null,
    dragLine: null,
    cacheDragTarget: null,
  });

  useUnmount(() => {
    if (data.current.dragLine && data.current.dragLine.parentNode) {
      data.current.dragLine.parentNode.removeChild(data.current.dragLine);
      data.current.dragLine = null;
      data.current.cacheDragTarget = null;
    }
  });

  const hideDragLine = () => {
    if (data.current.dragLine) {
      data.current.dragLine.style.display = 'none';
    }
  };

  const getDragLine = () => {
    return propGetDragLine(() => {
      if (!data.current.dragLine) {
        data.current.dragLine = window.document.createElement('div');
        data.current.dragLine.setAttribute('style', DRAG_LIND_STYLE);
        window.document.body.appendChild(data.current.dragLine);
      }
      data.current.dragLine.className = lineClassName || '';
      return data.current.dragLine;
    }, data.current);
  };

  const getDragNode = (target: HTMLElement) => {
    return closest(target, nodeSelector, data.current.dragList!);
  };

  const getHandleNode = (target: HTMLElement) => {
    return closest(
      target,
      handleSelector || nodeSelector,
      data.current.dragList!,
    );
  };

  const fixDragLine = propFixDragLine
    ? (target: HTMLElement) => {
        propFixDragLine(target, data.current, { getDragLine, hideDragLine });
      }
    : (target: HTMLElement) => {
        const dragLine = getDragLine();
        if (
          !target ||
          data.current.fromIndex < 0 ||
          data.current.fromIndex === data.current.toIndex
        ) {
          hideDragLine();
          return;
        }
        const { left, top, width, height } = target.getBoundingClientRect();
        const lineTop =
          data.current.toIndex < data.current.fromIndex ? top : top + height;
        if (enableScroll && data.current.scrollElement) {
          const { height: scrollHeight, top: scrollTop } =
            data.current.scrollElement.getBoundingClientRect();
          if (
            lineTop < scrollTop - 2 ||
            lineTop > scrollTop + scrollHeight + 2
          ) {
            hideDragLine();
            return;
          }
        }
        dragLine.style.left = left + UNIT_PX;
        dragLine.style.width = width + UNIT_PX;
        dragLine.style.top = lineTop + UNIT_PX;
        dragLine.style.display = 'block';
      };

  const stopAutoScroll = () => {
    clearInterval(data.current.scrollTimerId);
    data.current.scrollTimerId = -1;
    fixDragLine(data.current.cacheDragTarget!);
  };

  const autoScroll = () => {
    const { scrollTop } = data.current.scrollElement!;
    if (data.current.direction === DIRECTIONS.BOTTOM) {
      data.current.scrollElement!.scrollTop = scrollTop + scrollSpeed;
      if (scrollTop === data.current.scrollElement!.scrollTop) {
        stopAutoScroll();
      }
    } else if (data.current.direction === DIRECTIONS.TOP) {
      data.current.scrollElement!.scrollTop = scrollTop - scrollSpeed;
      if (data.current.scrollElement!.scrollTop <= 0) {
        stopAutoScroll();
      }
    } else {
      stopAutoScroll();
    }
  };

  const resolveAutoScroll: (e: DragEvent, target: HTMLElement) => void =
    propResolveAutoScroll
      ? (e, target) => {
          propResolveAutoScroll(e, target, data.current, {
            autoScroll,
            stopAutoScroll,
          });
        }
      : (e, target) => {
          if (!data.current.scrollElement) {
            return;
          }
          const { top, height } =
            data.current.scrollElement.getBoundingClientRect();
          const targetHeight = target.offsetHeight;
          const { clientY } = e;
          const compatibleHeight = targetHeight * (2 / 3);
          data.current.direction = 0;
          if (clientY > top + height - compatibleHeight) {
            data.current.direction = DIRECTIONS.BOTTOM;
          } else if (clientY < top + compatibleHeight) {
            data.current.direction = DIRECTIONS.TOP;
          }
          if (data.current.direction) {
            if (data.current.scrollTimerId < 0) {
              data.current.scrollTimerId = +setInterval(autoScroll, 20);
            }
          } else {
            stopAutoScroll();
          }
        };

  const onDragEnd: HTMLElement['ondragend'] = (e) => {
    const target = getDragNode(e.target as HTMLElement);
    stopAutoScroll();
    if (target) {
      target.removeAttribute('draggable');
      target.ondragstart = null;
      target.ondragend = null;
      (target.parentNode as HTMLElement).ondragenter = null;
      (target.parentNode as HTMLElement).ondragover = null;
      if (
        data.current.fromIndex >= 0 &&
        data.current.fromIndex !== data.current.toIndex
      ) {
        propOnDragEnd(data.current.fromIndex, data.current.toIndex);
      }
    }
    hideDragLine();
    data.current.fromIndex = -1;
    data.current.toIndex = -1;
  };

  const onDragEnter: HTMLElement['ondragenter'] = (e) => {
    const target = getDragNode(e.target as HTMLElement);
    const eventData = e;
    let toIndex;
    if (target) {
      toIndex = getDomIndex(target, ignoreSelector);
      if (enableScroll) {
        resolveAutoScroll(eventData, target);
      }
    } else {
      toIndex = -1;
      stopAutoScroll();
    }
    data.current.cacheDragTarget = target;
    data.current.toIndex = toIndex;
    fixDragLine(target!);
  };

  const onDragStart: HTMLElement['ondragstart'] = (e) => {
    const target = getDragNode(e.target as HTMLElement);
    const eventData = e;
    if (target) {
      const parentNode = target.parentNode as HTMLElement;
      eventData.dataTransfer!.setData('Text', '');
      eventData.dataTransfer!.effectAllowed = 'move';
      parentNode.ondragenter = onDragEnter;
      parentNode.ondragover = (ev) => {
        ev.preventDefault();
        return true;
      };
      const fromIndex = getDomIndex(target, ignoreSelector);
      data.current.fromIndex = fromIndex;
      data.current.toIndex = fromIndex;
      data.current.scrollElement = getScrollElement(parentNode);
    }
  };

  const startDrag: PointerEventHandler<HTMLElement> = (e) => {
    const handle = getHandleNode(e.target as HTMLElement);
    if (handle) {
      const target =
        !handleSelector || handleSelector === nodeSelector
          ? handle
          : getDragNode(handle);
      if (target) {
        handle.setAttribute('draggable', 'false');
        target.setAttribute('draggable', 'true');
        target.ondragstart = onDragStart;
        target.ondragend = onDragEnd;
        target.onmouseup = () => {
          target.removeAttribute('draggable');
        };
      }
    }
  };

  const bindRef: LegacyRef<HTMLElement> = (c) => {
    data.current.dragList = c;
  };

  return {
    startDrag,
    bindRef,
  };
};
