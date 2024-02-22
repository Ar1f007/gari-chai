import extendedDayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

extendedDayjs.extend(utc);
extendedDayjs.extend(relativeTime);
extendedDayjs.extend(duration);

export default extendedDayjs;
