import extendedDayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

extendedDayjs.extend(utc);
extendedDayjs.extend(relativeTime);

export default extendedDayjs;
