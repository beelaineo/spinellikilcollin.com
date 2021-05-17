
export type FacebookPixel = {
  track: string;
  eventType: string;
  options?: object;
}

declare global {
  interface Window {
    fbq (track: string, eventType: string, options?: object):void
  }
}
