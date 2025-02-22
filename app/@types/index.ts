export interface TimeTracking {
  duration: number;
  hours: string
}

export interface Data {
  dates: Array<{day: string, hours: string, duration: number}>
  totalHours: string
}
