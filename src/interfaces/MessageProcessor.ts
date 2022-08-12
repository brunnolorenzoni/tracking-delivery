export interface MessageProcessor {
  (...args:unknown[]): void
}