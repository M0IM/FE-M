function getDateDetails(dateString: Date | string) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {year, month, day};
}

function getDateWithSeparator(
  dateString: Date | string,
  separator: string = '',
) {
  const {year, month, day} = getDateDetails(dateString);

  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
}

function getMonthYearDetails(initialDate: Date) {
  if (isNaN(initialDate.getTime())) {
    throw new Error(`Invalid initialDate: ${initialDate}`);
  }

  const year = initialDate.getFullYear();
  const month = initialDate.getMonth() + 1;
  const day = initialDate.getDate();

  // 매달 1일의 날짜를 명시적으로 설정
  const startDate = new Date(year, month - 1, 1);
  const firstDOW = startDate.getDay();

  // 해당 월의 마지막 날 계산
  const lastDate = new Date(year, month, 0).getDate();

  return {
    month,
    year,
    day,
    startDate,
    firstDOW,
    lastDate,
  };
}

type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  firstDOW: number;
  lastDate: number;
};

function getNewMonthYear(prevData: MonthYear, increment: number) {
  if (isNaN(prevData.startDate.getTime())) {
    throw new Error(`Invalid startDate in prevData: ${prevData.startDate}`);
  }

  const newStartDate = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
  );

  return getMonthYearDetails(newStartDate);
}

function isSameAsCurrentDate(year: number, month: number, date: number) {
  const currentDate = getDateWithSeparator(new Date());
  const inputDate = [
    year,
    String(month).padStart(2, '0'),
    String(date).padStart(2, '0'),
  ].join('');

  return currentDate === inputDate;
}

const detailDate = (date: Date) => {
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date provided: ${date}`);
  }

  const milliSeconds = +new Date() - +date;
  const seconds = milliSeconds / 1000;

  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

function formatKoreanDate(dateString: Date | string) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${dateString}`);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? '오후' : '오전';

  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;

  return `${year}년 ${month}월 ${day}일 ${period} ${String(hours).padStart(
    2,
    '0',
  )}:${minutes}`;
}

export type {MonthYear};
export {
  getMonthYearDetails,
  getDateWithSeparator,
  getNewMonthYear,
  isSameAsCurrentDate,
  detailDate,
  formatKoreanDate,
};
