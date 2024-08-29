function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format, replacing 0 with 12
  const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two-digit minutes
  return `${period} ${formattedHours}시 ${formattedMinutes}분`;
}

function parseTimeStringToDate(timeString: string): Date {
  const regex = /^(오전|오후)\s(\d+)시\s(\d+)분$/;
  const matches = timeString.match(regex);

  if (!matches) {
    throw new Error('Invalid time format');
  }

  const [, period, hours, minutes] = matches;
  let hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);

  if (period === '오후' && hour !== 12) {
    hour += 12;
  } else if (period === '오전' && hour === 12) {
    hour = 0; // Midnight
  }

  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
}

export {formatTime, parseTimeStringToDate};
