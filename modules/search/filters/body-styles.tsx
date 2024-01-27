import useGetBodyTypes from '@/hooks/useGetBodyTypes';
import React, { Fragment } from 'react';
import { Spinner } from '@nextui-org/spinner';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Button } from '@nextui-org/button';
import useQueryParam from '@/hooks/useQueryString';

const BodyStyles = () => {
  const { isLoading, bodyTypes, errMsg } = useGetBodyTypes();

  const [selected, setSelected] = React.useState('');
  const { initialValue, setQueryParam } = useQueryParam('bodyType');
  const [showMore, setShowMore] = React.useState(false);

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
          onValueChange={(val) => setQueryParam('bodyType', val)}
          classNames={{
            wrapper: 'grid grid-cols-2 w-full',
          }}
        >
          {bodyTypes.slice(0, 8).map((bodyType) => (
            <Radio
              key={bodyType.value}
              value={bodyType.value}
              classNames={{
                label: 'text-[14.5px]',
              }}
            >
              {bodyType.label}
            </Radio>
          ))}

          {showMore && (
            <React.Fragment>
              {bodyTypes.slice(8).map((bodyType) => (
                <Radio
                  key={bodyType.value}
                  value={bodyType.value}
                  classNames={{
                    label: 'text-[14.5px]',
                  }}
                >
                  {bodyType.label}
                </Radio>
              ))}
            </React.Fragment>
          )}
        </RadioGroup>
        {bodyTypes.length > 8 && (
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

  return <Fragment>{getContent()}</Fragment>;
};

export default BodyStyles;
