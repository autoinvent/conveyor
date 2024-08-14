import * as Accordion from '@radix-ui/react-accordion'

export const SearchResults = () => {
  return (
    <Accordion.Root type='multiple'>
      <AccordionItem val='item-1'/>
      <AccordionItem val='item-2'/>
    </Accordion.Root>
  )
}

interface AccordionItemProps {
  val : string
}

const AccordionItem = ({ val } : AccordionItemProps) => {
  return (
    <Accordion.Item value={val}>
      <Accordion.Header className="bg-red-200">
        <Accordion.Trigger className="bg-green-200">
          {`trigger-${val}`}
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="bg-blue-200">
        content
      </Accordion.Content>
    </Accordion.Item>
  )
}