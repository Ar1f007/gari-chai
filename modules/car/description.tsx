'use client';

import { Button } from '@nextui-org/button';
import { useState } from 'react';

const CarDescription = ({ text }: { text: string }): JSX.Element => {
  const [showSlicedVersion, setShowSlicedVersion] = useState<boolean>(text.length > 500);
  const [buttonLabel, setButtonLabel] = useState<string>(showSlicedVersion ? 'more' : 'less');
  const isTextLong = text.length > 500;

  const toggleShowSlicedVersion = (): void => {
    setShowSlicedVersion((prev) => !prev);
    setButtonLabel(showSlicedVersion ? 'less' : 'more');
  };

  const slicedText = showSlicedVersion ? text.substring(0, 500) : text;

  return (
    <div className='mt-8 flex flex-col space-y-4 rounded-xl bg-foreground-50 p-6'>
      <p>{slicedText}</p>

      {isTextLong && (
        <Button
          onClick={toggleShowSlicedVersion}
          className='w-fit'
        >
          Show {buttonLabel}
        </Button>
      )}
    </div>
  );
};
export default CarDescription;
