import { Accordion, AccordionItem } from '@nextui-org/accordion';

const BrandsAndModels = () => {
  return (
    <Accordion variant='splitted'>
      <AccordionItem
        key='1'
        aria-label='Brand and Model'
        title='Brand'
      ></AccordionItem>
    </Accordion>
  );
};
export default BrandsAndModels;
