import dayjs from 'dayjs'
import {TimeTracking} from "~/@types";
import {z} from "zod";

interface ErrorData {
  err: string;
  ECODE: string;
}

interface ResponseData {
  id: string;
  start: string;
  end: string;
  duration: string;
}

const bodySchema = z.object({
  start_date: z.string(),
  end_date: z.string(),
  team_id: z.string(),
  token: z.string()
})
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { start_date, end_date, token, team_id } = bodySchema.parse(body)

  const url = `https://api.clickup.com/api/v2/team/${team_id}/time_entries`

  if(start_date === '0' || end_date === '0') {
    throw createError({
      statusCode: 400,
      message: 'start_date or end_date not informed'
    })
  }
  
  const query = new URLSearchParams({
    start_date: String(start_date),
    end_date: String(end_date)
  }).toString()

  try {
    const response = await $fetch(`${url}?${query}`, {
      headers: {
        Authorization: token
      }
    })

    const dates: Array<{day: string, hours: string, duration: number}> = []
    const timeTracking = ((response as any).data as ResponseData[])
    for (const time of timeTracking) {
      const key = dayjs(Number(time.end)).format('DD/MM/YYYY')

      dates.push({
        day: key,
        hours: Number(Number(time.duration) / 60 / 60 / 1000).toFixed(2),
        duration: Number(time.duration)
      })
    }

    const totalHours = Number(Object.values(dates).reduce((acc, current) => {
      acc += Number(current.duration)
      return acc
    }, 0)  / 60 / 60 / 1000).toFixed(2)

    return {
      dates,
      totalHours
    }
  } catch (error) {
    const errorData = (error as any).data as ErrorData

    return {
      error: errorData
    }
  }
})