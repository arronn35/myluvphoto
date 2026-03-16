export interface Photo {
  id: string
  url: string
  storagePath?: string
  timestamp: number
  width?: number
  height?: number
  favorite?: boolean
}
