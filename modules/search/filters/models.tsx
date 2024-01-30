import { Spinner } from '@nextui-org/spinner';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Fragment, useEffect, useState, useTransition } from 'react';
import { Button } from '@nextui-org/button';

import useQueryParam from '@/hooks/useQueryString';
import useGetCarModels from '@/hooks/useGetCarModels';

const Models = () => {
  const { fetchCarModels, data: models, errMsg, isLoading } = useGetCarModels();

  const [showMore, setShowMore] = useState(false);

  const [_pending, startTransition] = useTransition();

  const { initialValue, setQueryParam } = useQueryParam('model');

  useEffect(() => {
    fetchCarModels();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getContent() {
    if (isLoading) {
      return (
        <div className='text-center'>
          <Spinner label='Loading models...' />
        </div>
      );
    }

    if (errMsg) {
      return <p className='text-red-500'>{errMsg}</p>;
    }

    return (
      <div className='space-y-4'>
        <RadioGroup
          value={initialValue || ''}
          onValueChange={(val) => {
            startTransition(() => {
              setQueryParam('model', val);
            });
          }}
          classNames={{
            wrapper: 'grid grid-cols-2 w-full',
          }}
        >
          {models.slice(0, 8).map((model) => (
            <Radio
              key={model.value}
              value={model.value}
              classNames={{
                label: 'text-[14.5px]',
              }}
            >
              {model.label}
            </Radio>
          ))}

          {showMore && (
            <Fragment>
              {models.slice(8).map((model) => (
                <Radio
                  key={model.value}
                  value={model.value}
                  classNames={{
                    label: 'text-[14.5px]',
                  }}
                >
                  {model.label}
                </Radio>
              ))}
            </Fragment>
          )}
        </RadioGroup>
        {models.length > 8 && (
          <Button
            variant='light'
            className='w-fit'
            onClick={() => setShowMore((prev) => !prev)}
            color='primary'
          >
            Show {showMore ? 'Less' : 'More'}
          </Button>
        )}
      </div>
    );
  }

  return <div className='pb-2'>{getContent()}</div>;
};
export default Models;
