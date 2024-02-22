'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import extendedDayjs from '@/lib/dayjs';
import { title } from '@/components/primitives';

type CountdownTime = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type CountdownTimerProps = {
  date: string;
  text: string;
};

const TimeUnit = ({ unit, value }: { unit: string; value: string }) => {
  return (
    <div className='relative flex flex-col gap-5'>
      <div className='flex h-16 w-16 items-center justify-between rounded-lg bg-[#343650] sm:h-32 sm:w-32 lg:h-40 lg:w-40'>
        <div className='relative !-left-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3'></div>
        <span className='text-3xl font-semibold text-[#a5b4fc] sm:text-6xl lg:text-7xl'>
          {value}
        </span>
        <div className='relative -right-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3'></div>
      </div>
      <span className='text-center text-xs capitalize text-[#8486A9] sm:text-2xl'>
        {value == '01' ? unit.slice(0, -1) : unit}
      </span>
    </div>
  );
};

const CountdownTimer = ({ date, text }: CountdownTimerProps) => {
  const [countDownTime, setCountDownTime] = useState<CountdownTime>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const intervalId = useRef<NodeJS.Timeout>();

  const stopCountDown = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  }, []);

  const getTimeDifference = useCallback((endTime: extendedDayjs.Dayjs) => {
    const currentTime = extendedDayjs();
    const timeDifference = endTime.diff(currentTime, 'second');
    const duration = extendedDayjs.duration(timeDifference, 'seconds');
    setCountDownTime({
      days: duration.days().toString().padStart(2, '0'),
      hours: duration.hours().toString().padStart(2, '0'),
      minutes: duration.minutes().toString().padStart(2, '0'),
      seconds: duration.seconds().toString().padStart(2, '0'),
    });
    if (timeDifference < 0) {
      stopCountDown();
    }
  }, []);

  const startCountDown = useCallback(() => {
    const endTime = extendedDayjs(date);
    intervalId.current = setInterval(() => {
      getTimeDifference(endTime);
    }, 1000);
    return stopCountDown;
  }, [date, getTimeDifference, stopCountDown]);

  useEffect(() => {
    startCountDown();
    return stopCountDown;
  }, [startCountDown, stopCountDown]);

  return (
    <div className='flex  min-h-[300px] items-center bg-[#191A24] md:min-h-[400px]'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-8 sm:gap-12'>
        <h1 className={title({ color: 'violet', size: 'sm', className: '!leading-normal' })}>
          {text}
        </h1>
        <div className='flex justify-center gap-3 sm:gap-8'>
          <TimeUnit
            unit='Days'
            value={countDownTime?.days}
          />
          <TimeUnit
            unit='Hours'
            value={countDownTime?.hours}
          />
          <TimeUnit
            unit='Minutes'
            value={countDownTime?.minutes}
          />
          <TimeUnit
            unit='Seconds'
            value={countDownTime?.seconds}
          />
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
