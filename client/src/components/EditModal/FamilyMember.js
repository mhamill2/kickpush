import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'dateformat';

const FamilyMember = ({ name, birthDate, index, onChange, onDelete }) => {
  return (
    <div data-index={index}>
      <h2 className="flex items-center mt-5 text-lg">
        Member {index + 1}
        <FontAwesomeIcon icon={faTrash} className="cursor-pointer h-3 w-3 ml-2" onClick={onDelete}></FontAwesomeIcon>
      </h2>
      <div className="ml-4" data-index={index}>
        <h2 className={labelStyle}> Name {birthDate}</h2>
        <input type="text" name="name" className={nameInputStyle} onChange={onChange} defaultValue={name} />
        <h2 className={labelStyle}>Birthday</h2>
        <input type="date" name="birthDate" className={birthdayInputStyle} onChange={onChange} defaultValue={dateFormat(birthDate, 'yyyy-mm-dd')} />
      </div>
    </div>
  );
};

const labelStyle = 'mt-5 mb-1 text-sm';
const nameInputStyle = 'w-60 border border-gray-300 rounded p-1';
const birthdayInputStyle = 'border border-gray-300 rounded p-1 mr-1';

export default FamilyMember;
