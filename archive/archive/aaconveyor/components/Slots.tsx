import {
  ReactNode,
  Children,
  isValidElement,
  ReactElement,
  Fragment,
} from 'react';

import Slot, { SlotProps } from './Slot';

interface SlotsProps {
  children?: ReactNode;
}

const Slots = ({ children }: SlotsProps) => {
  const slots: Record<string, { index: number; content: ReactNode }> = {};
  const contents: ReactNode[] = [];
  Children.forEach(children, (child, index) => {
    if (isValidElement(child) && child.type === Slot) {
      const slotChild = child as ReactElement<SlotProps>;
      slots[slotChild.props.slotKey] = {
        index,
        content: slotChild.props.children,
      };
    }
    contents.push(child);
  });
  Object.keys(slots).forEach((slotKey) => {
    contents[slots[slotKey].index] = slots[slotKey].content;
  });
  console.log(contents);

  return (
    <>
      {contents.map((content, index) => (
        <Fragment key={index}>{content}</Fragment>
      ))}
    </>
  );
};

export default Slots;
