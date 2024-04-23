export interface DragListProps {
  /**
   * @description  拖拽完成的回掉
   */
  onDragEnd: (fromIndex: number, toIndex: number) => void;
  /**
   * @default ""
   * @description  触发拖拽的手柄，不传代表整行触发
   */
  handleSelector?: string;
  /**
   * @default tr
   * @description  支持拖拽的节点选择器
   */
  nodeSelector?: string;
  /**
   * @default ""
   * @description  不支持拖拽的节点选择器
   */
  ignoreSelector?: string;
  /**
   * @default true
   * @description  是否启用滚动
   */
  enableScroll?: boolean;
  /**
   * @default 10
   * @description  滚动速度
   */
  scrollSpeed?: number;
  /**
   * @default ""
   * @description  拖拽指示线的类名
   */
  lineClassName?: string;
}

export interface DataRef {
  fromIndex: number;
  toIndex: number;
  scrollElement: HTMLElement | null;
  scrollTimerId: number;
  direction: number;
  dragList: HTMLElement | null;
  dragLine: HTMLElement | null;
  cacheDragTarget: HTMLElement | null;
}

export interface SuperFn {
  getDragLine?: (preFn: () => HTMLElement, dataRef: DataRef) => HTMLElement;
  resolveAutoScroll?: (
    e: DragEvent,
    target: HTMLElement,
    dataRef: DataRef,
    fns: { autoScroll: () => void; stopAutoScroll: () => void },
  ) => void;
  fixDragLine?: (
    target: HTMLElement,
    dataRef: DataRef,
    fns: { getDragLine: () => HTMLElement; hideDragLine: () => void },
  ) => void;
}
