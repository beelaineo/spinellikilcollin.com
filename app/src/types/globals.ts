export type FacebookPixel = {
  track: string
  eventType: string
  options?: Record<string, unknown>
  eventData?: Record<string, unknown>
}

export type TikTokPixel = {
  track: string
  eventType: string
  eventData?: Record<string, unknown>
}

declare global {
  interface Window {
    fbq(
      track: string,
      eventType: string,
      options?: Record<string, unknown>,
      eventData?: Record<string, unknown>,
    ): void
    ttq(
      track: string,
      eventType: string,
      eventData?: Record<string, unknown>,
    ): void
  }
}
