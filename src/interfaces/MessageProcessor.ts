export interface MessageProcessor {
  ({ topic: any, message: any }): unknown
}