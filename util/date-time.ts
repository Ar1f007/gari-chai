import { DEFAULT_TIME_FORMAT } from '@/lib/constants';
import extendedDayjs from '@/lib/dayjs';

export function formatTime(time: string, format = DEFAULT_TIME_FORMAT) {
  return extendedDayjs(time).format(format);
}

export function formatTimeFromNow(time: string, withOutSuffix = false) {
  return extendedDayjs(time).fromNow(withOutSuffix);
}
