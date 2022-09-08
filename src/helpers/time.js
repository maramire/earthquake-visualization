import { formatInTimeZone, utcToZonedTime } from "date-fns-tz"

export const zonedTime = (date) => {
    return utcToZonedTime(new Date(date), 'America/Santiago')
}

export const formatTime = (date) => {
    return formatInTimeZone(date, 'America/Santiago', 'dd/MM/yyyy HH:mm')
}