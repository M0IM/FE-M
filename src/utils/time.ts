function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format, replacing 0 with 12
  const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two-digit minutes
  return `${period} ${formattedHours}시 ${formattedMinutes}분`;
}

export {formatTime};
