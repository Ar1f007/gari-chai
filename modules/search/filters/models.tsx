import useGetCarModels from '@/hooks/useGetCarModels';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Spinner } from '@nextui-org/spinner';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Fragment, useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';

const Models = () => {
  const { fetchCarModels, data: models, errMsg, isLoading } = useGetCarModels();

  const [selected, setSelected] = useState('');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetchCarModels();
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
      <RadioGroup
        value={selected}
        onValueChange={setSelected}
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

        {models.length > 8 && (
          <Button
            variant='light'
            className='w-fit'
            onClick={() => setShowMore((prev) => !prev)}
          >
            Show {showMore ? 'Less' : 'More'}
          </Button>
        )}
      </RadioGroup>
    );
  }

  return (
    <Accordion
      variant='splitted'
      keepContentMounted
      className='pb-5'
    >
      <AccordionItem
        key='1'
        aria-label='Models'
        title='Models'
        className='group-[.is-splitted]:shadow-small'
      >
        <div className='pb-2'>{getContent()}</div>
      </AccordionItem>
    </Accordion>
  );
};
export default Models;
