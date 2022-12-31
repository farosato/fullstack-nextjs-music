import formatDuration from 'format-duration'

export const formatTimeDuration = (timeInSeconds) =>
  formatDuration(timeInSeconds * 1000)

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
