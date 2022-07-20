declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEV_MODE: '0' | '1' | undefined,
      BOT_TOKEN: string,
      WEBHOOK_URL: string,
      PORT: number
    }
  }
}

export { }
