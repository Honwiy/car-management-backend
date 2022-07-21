import * as dayjs from 'dayjs'

export function convertDateToTimestampNum(datetime) {
  // const date = datetime.format('YYYY-MM-DD HH:mm:ss')
  return !!datetime ? dayjs(datetime).valueOf() : null
}

export function convertTimstampNumToDate(timestamp) {
  if (timestamp) {
    const date = dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
    return date
  }
}
