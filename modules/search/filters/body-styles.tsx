import { Accordion, AccordionItem } from '@nextui-org/accordion';

import useGetBodyTypes from '@/hooks/useGetBodyTypes';
import React from 'react';
import { Spinner } from '@nextui-org/spinner';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Button } from '@nextui-org/button';

const BodyStyles = () => {
  const { isLoading, bodyTypes, errMsg } = useGetBodyTypes();

  const [selected, setSelected] = React.useState('');
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
          value={selected}
          onValueChange={setSelected}
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

  return (
    <Accordion
      variant='splitted'
      keepContentMounted
    >
      <AccordionItem
        key='1'
        aria-label='Models'
        title='Body Styles'
        className='group-[.is-splitted]:shadow-small'
      >
        {getContent()}
      </AccordionItem>
    </Accordion>
  );
};

export default BodyStyles;
