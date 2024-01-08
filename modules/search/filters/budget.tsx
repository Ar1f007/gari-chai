import React from 'react';
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {Slider} from "@nextui-org/slider";

const Budget = () => {
    return (
        <Accordion variant="splitted">
            <AccordionItem key="1" aria-label="Budget" title="Budget">
               <Slider
                   label="Price Range"
                   step={50}
                   minValue={0}
                   maxValue={1000}
                   defaultValue={[100, 500]}
                   formatOptions={{style: "currency", currency: "BDT"}}
               />
            </AccordionItem>
        </Accordion>
    );
};

export default Budget;