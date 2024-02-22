'use client';

import { title } from '@/components/primitives';
import extendedDayjs from '@/lib/dayjs';
import { useCallback, useEffect, useState, useRef } from 'react';

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

const CountdownTimer = ({ date, text }: CountdownTimerProps) => {
  const [countDownTime, setCountDownTime] = useState<CountdownTime>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  console.log(new Date(date));

  const intervalId = useRef<NodeJS.Timeout>();

  const getTimeDifference = (endTime: extendedDayjs.Dayjs) => {
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
      clearInterval(intervalId.current!);
    }
  };

  const startCountDown = useCallback(() => {
    const endTime = extendedDayjs(date);
    intervalId.current = setInterval(() => {
      getTimeDifference(endTime);
    }, 1000);
    return () => clearInterval(intervalId.current!);
  }, [date]);

  useEffect(() => {
    startCountDown();
    return () => clearInterval(intervalId.current!);
  }, [startCountDown]);
  // const [countDownTime, setCountDownTime] = useState<CountdownTime>({
  //   days: '00',
  //   hours: '00',
  //   minutes: '00',
  //   seconds: '00',
  // });

  // const intervalId = useRef<NodeJS.Timeout>();

  // const getTimeDifference = (countDownTime: number) => {
  //   const currentTime = new Date().getTime();
  //   const timeDifference = countDownTime - currentTime;
  //   let days =
  //     Math.floor(timeDifference / (24 * 60 * 60 * 1000)) >= 10
  //       ? Math.floor(timeDifference / (24 * 60 * 60 * 1000)).toString()
  //       : `0${Math.floor(timeDifference / (24 * 60 * 60 * 1000))}`;
  //   const hours =
  //     Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)) >= 10
  //       ? Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)).toString()
  //       : `0${Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))}`;
  //   const minutes =
  //     Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60)) >= 10
  //       ? Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60)).toString()
  //       : `0${Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60))}`;
  //   const seconds =
  //     Math.floor((timeDifference % (60 * 1000)) / 1000) >= 10
  //       ? Math.floor((timeDifference % (60 * 1000)) / 1000).toString()
  //       : `0${Math.floor((timeDifference % (60 * 1000)) / 1000)}`;
  //   if (timeDifference < 0) {
  //     setCountDownTime({
  //       days: '00',
  //       hours: '00',
  //       minutes: '00',
  //       seconds: '00',
  //     });
  //     clearInterval(intervalId.current);
  //   } else {
  //     setCountDownTime({
  //       days: days,
  //       hours: hours,
  //       minutes: minutes,
  //       seconds: seconds,
  //     });
  //   }
  // };

  // const startCountDown = useCallback(() => {
  //   const customDate = new Date();
  //   const countDownDate = new Date(
  //     customDate.getFullYear(),
  //     customDate.getMonth() + 1,
  //     customDate.getDate() + 6,
  //     customDate.getHours(),
  //     customDate.getMinutes(),
  //     customDate.getSeconds() + 1,
  //   );
  //   intervalId.current = setInterval(() => {
  //     getTimeDifference(countDownDate.getTime());
  //   }, 1000);
  //   return () => clearInterval(intervalId.current);
  // }, []);

  // useEffect(() => {
  //   startCountDown();
  // }, [startCountDown]);

  return (
    <div className='flex  min-h-[300px] items-center bg-[#191A24] md:min-h-[400px]'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-8 sm:gap-12'>
        {/* px-2 text-center text-2xl font-semibold tracking-widest text-white sm:text-3xl */}
        <h1 className={title({ color: 'violet', size: 'sm', className: '!leading-normal' })}>
          {text}
        </h1>
        <div className='flex justify-center gap-3 sm:gap-8'>
          <div className='relative flex flex-col gap-5'>
            <div className='flex h-16 w-16 items-center justify-between rounded-lg bg-[#343650] sm:h-32 sm:w-32 lg:h-40 lg:w-40'>
              <div className='relative !-left-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3'></div>
              <span className='text-3xl font-semibold text-[#a5b4fc] sm:text-6xl lg:text-7xl'>
                {countDownTime?.days}
              </span>
              <div className='relative -right-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3'></div>
            </div>
            <span className='text-center text-xs capitalize text-[#8486A9] sm:text-2xl'>
              {countDownTime?.days == '01' ? 'Day' : 'Days'}
            </span>
          </div>
          <div className='relative flex flex-col gap-5'>
            <div className='flex h-16 w-16 items-center justify-between rounded-lg bg-[#343650] sm:h-32 sm:w-32 lg:h-40 lg:w-40'>
              <div className='relative !-left-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3'></div>
              <span className='text-3xl font-semibold text-[#a5b4fc] sm:text-6xl lg:text-7xl'>
                {countDownTime?.hours}
              </span>
              <div className='relative -right-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3'></div>
            </div>
            <span className='text-center text-xs font-medium text-[#8486A9] sm:text-2xl'>
              {countDownTime?.hours == '01' ? 'Hour' : 'Hours'}
            </span>
          </div>
          <div className='relative flex flex-col gap-5'>
            <div className='flex h-16 w-16 items-center justify-between rounded-lg bg-[#343650] sm:h-32 sm:w-32 lg:h-40 lg:w-40'>
              <div className='relative !-left-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3'></div>
              <span className='text-3xl font-semibold text-[#a5b4fc] sm:text-6xl lg:text-7xl'>
                {countDownTime?.minutes}
              </span>
              <div className='relative -right-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3'></div>
            </div>
            <span className='text-center text-xs capitalize text-[#8486A9] sm:text-2xl'>
              {countDownTime?.minutes == '01' ? 'Minute' : 'Minutes'}
            </span>
          </div>
          <div className='relative flex flex-col gap-5'>
            <div className='flex h-16 w-16 items-center justify-between rounded-lg bg-[#343650] sm:h-32 sm:w-32 lg:h-40 lg:w-40'>
              <div className='relative !-left-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3'></div>
              <span className='text-3xl font-semibold text-[#a5b4fc] sm:text-6xl lg:text-7xl'>
                {countDownTime?.seconds}
              </span>
              <div className='relative -right-[6px] h-2.5 w-2.5 rounded-full bg-[#191A24] sm:h-3 sm:w-3'></div>
            </div>
            <span className='text-center text-xs capitalize text-[#8486A9] sm:text-2xl'>
              {countDownTime?.seconds == '01' ? 'Second' : 'Seconds'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
