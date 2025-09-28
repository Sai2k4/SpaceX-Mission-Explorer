export interface LaunchLinks {
  patch?: { small?: string | null }
  webcast?: string | null
  wikipedia?: string | null
}

export interface Launch {
  id: string
  name: string
  date_utc: string
  success: boolean | null
  details?: string | null
  links?: LaunchLinks
  rocket?: string | null
}
