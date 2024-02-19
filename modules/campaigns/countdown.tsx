'use client';

import { useCallback, useEffect, useState, useRef } from 'react';

type CountdownTime = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type CountdownTimerProps = {
  time: any;
  text: string;
};

const CountdownTimer = (props: CountdownTimerProps) => {
  const [countDownTime, setCountDownTime] = useState<CountdownTime>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const intervalId = useRef<NodeJS.Timeout>();

  const getTimeDifference = (countDownTime: number) => {
    const currentTime = new Date().getTime();
    const timeDifference = countDownTime - currentTime;
    let days =
      Math.floor(timeDifference / (24 * 60 * 60 * 1000)) >= 10
        ? Math.floor(timeDifference / (24 * 60 * 60 * 1000)).toString()
        : `0${Math.floor(timeDifference / (24 * 60 * 60 * 1000))}`;
    const hours =
      Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)) >= 10
        ? Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)).toString()
        : `0${Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))}`;
    const minutes =
      Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60)) >= 10
        ? Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60)).toString()
        : `0${Math.floor((timeDifference % (60 * 60 * 1000)) / (1000 * 60))}`;
    const seconds =
      Math.floor((timeDifference % (60 * 1000)) / 1000) >= 10
        ? Math.floor((timeDifference % (60 * 1000)) / 1000).toString()
        : `0${Math.floor((timeDifference % (60 * 1000)) / 1000)}`;
    if (timeDifference < 0) {
      setCountDownTime({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      });
      clearInterval(intervalId.current);
    } else {
      setCountDownTime({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }
  };

  const startCountDown = useCallback(() => {
    const customDate = new Date();
    const countDownDate = new Date(
      customDate.getFullYear(),
      customDate.getMonth() + 1,
      customDate.getDate() + 6,
      customDate.getHours(),
      customDate.getMinutes(),
      customDate.getSeconds() + 1,
    );
    intervalId.current = setInterval(() => {
      getTimeDifference(countDownDate.getTime());
    }, 1000);
    return () => clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    startCountDown();
  }, [startCountDown]);

  return (
    <div className='h-screen bg-[#191A24]'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-8 sm:gap-16'>
        <span className='px-2 text-center text-2xl font-semibold tracking-widest text-white sm:text-3xl'>
          {props.text}
        </span>
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
