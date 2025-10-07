export const toggleFieldVisibility = ({
  fieldOrder,
  field,
}: {
  fieldOrder: string[];
  field: string;
}) => {
  const newFieldOrder = [...fieldOrder];
  const fieldIndex = newFieldOrder.indexOf(field);
  if (fieldIndex >= 0) {
    newFieldOrder.splice(fieldIndex, 1);
  } else {
    newFieldOrder.push(field);
  }
  return newFieldOrder;
};
