import { useState } from 'react';

const SelectableItem = ({ value, content, selected }) => {
  const [isSelected, setIsSelected] = useState(selected);

  const toggleSelected = (e) => setIsSelected(!isSelected);

  return (
    <div data-value={value} onClick={toggleSelected} className={`text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-8 selectable ${isSelected ? 'border-primary bg-primary text-white' : 'border-gray-100 bg-gray-100'}`}>
      {content}
    </div>
  );
};

export default SelectableItem;
