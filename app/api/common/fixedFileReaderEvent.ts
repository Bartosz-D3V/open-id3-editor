/**
 * Please see:
 * https://github.com/Microsoft/TypeScript/issues/299#issuecomment-168538829
 * for rationale.
 */

interface FixedEventTarget extends EventTarget {
  result: string | ArrayBuffer;
}

export default interface FixedFileReaderEvent extends Event {
  target: FixedEventTarget;
  getMessage(): string;
}
