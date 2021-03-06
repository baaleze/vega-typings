import { Expr, MarkType } from '.';

export type EventSource = EventStream['source'] & {};
export type EventType =
  | 'click'
  | 'dblclick'
  | 'dragenter'
  | 'dragleave'
  | 'dragover'
  | 'keydown'
  | 'keypress'
  | 'keyup'
  | 'mousedown'
  | 'mousemove'
  | 'mouseout'
  | 'mouseover'
  | 'mouseup'
  | 'mousewheel'
  | 'touchend'
  | 'touchmove'
  | 'touchstart'
  | 'wheel';
export interface StreamParameters {
  between?: Stream[];
  marktype?: MarkType;
  markname?: string;
  filter?: Expr | Expr[];
  throttle?: number;
  debounce?: number;
  consume?: boolean;
}
export type EventStream = StreamParameters &
  (
    | {
        source?: 'view' | 'scope';
        type: EventType;
      }
    | {
        source: 'window';
        type: keyof HTMLBodyElementEventMap;
      });
export interface DerivedStream extends StreamParameters {
  stream: Stream;
}
export interface MergedStream extends StreamParameters {
  merge: Stream[];
}
export type Stream = EventStream | DerivedStream | MergedStream;
