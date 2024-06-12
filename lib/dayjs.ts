import extendedDayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';

extendedDayjs.extend(utc);
extendedDayjs.extend(relativeTime);
extendedDayjs.extend(duration);
extendedDayjs.extend(isSameOrAfter);
extendedDayjs.extend(isBetween);

export default extendedDayjs;
