import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const FamilyMember = ({ name, age, index, onChange, onDelete }) => {
  return (
    <div data-index={index}>
      <h2 className="flex items-center mt-5 text-lg">
        Member {index + 1}
        <FontAwesomeIcon icon={faTrash} className="cursor-pointer h-3 w-3 ml-2" onClick={onDelete}></FontAwesomeIcon>
      </h2>
      <div className="ml-4" data-index={index}>
        <h2 className={labelStyle}> Name</h2>
        <input type="text" name="name" className={nameInputStyle} onChange={onChange} defaultValue={name} />
        <h2 className={labelStyle}>Age</h2>
        <input type="number" name="age" className={ageInputStyle} onChange={onChange} defaultValue={age} /> years old
      </div>
    </div>
  );
};

const labelStyle = 'mt-5 mb-1 text-sm';
const nameInputStyle = 'w-60 border border-gray-300 rounded p-1';
const ageInputStyle = 'w-10 border border-gray-300 rounded p-1 mr-1';

export default FamilyMember;
