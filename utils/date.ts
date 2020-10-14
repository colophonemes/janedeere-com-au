const formatter = new Intl.DateTimeFormat('en-AU').format

export const dateFormat = (dateStr: string) => {
  const date = new Date(dateStr)
  return formatter(date)
}
