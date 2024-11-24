'use client'

import { useEffect, useState } from 'react'
import { title } from '@/components/primitives';


type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const TimeUnit = ({ unit, value }: { unit: string; value: number }) => {

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
        {value <= 1 ? unit.slice(0, -1) : unit}
      </span>
    </div>
  );
};


type CountdownProps = {
  text: string
  targetDate: Date
  onComplete?: () => void
}

export function Countdown({ text, targetDate, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        setIsComplete(true)
        onComplete?.()
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      })
    }

    // Calculate immediately
    calculateTimeLeft()

    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  if (isComplete) {
    return null
  }

  return (
    <div className='flex  min-h-[300px] items-center rounded-lg bg-[#191A24] sm:rounded-none md:min-h-[400px]'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-8 sm:gap-12'>
        <h1 className={title({ color: 'violet', size: 'sm', className: '!leading-normal' })}>
          {text}
        </h1>
        <div className='flex justify-center gap-3 sm:gap-8'>
          {
            Object.entries(timeLeft).map(([key, val]) => (
              <TimeUnit
                key={key}
                unit={key}
                value={val}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

