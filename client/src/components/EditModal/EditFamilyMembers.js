import { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import FamilyMember from './FamilyMember';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const EditFamilyMembers = ({ onChange, user }) => {
  const [familyMembers, updateFamilyMembers] = useState(user.studentProfile.familyMembers);

  const addFamilyMember = () => {
    console.log(familyMembers);
    const newFamilyMember = { name: '', age: 0 };
    user.studentProfile.familyMembers.push(newFamilyMember);
    updateFamilyMembers((familyMembers) => [...user.studentProfile.familyMembers]);
  };

  const deleteFamilyMember = (e) => {
    const index = e.target.closest('[data-index]').getAttribute('data-index');
    user.studentProfile.familyMembers.splice(index, 1);
    updateFamilyMembers((familyMembers) => [...user.studentProfile.familyMembers]);
  };

  return (
    <section>
      {familyMembers.map((familyMember, index) => (
        <FamilyMember key={uuidv4()} index={index} name={familyMember.name} age={familyMember.age || ''} onChange={onChange} onDelete={deleteFamilyMember}></FamilyMember>
      ))}
      <div className="flex justify-center mt-7 text-lg">
        <button className="flex items-center" onClick={addFamilyMember}>
          <FontAwesomeIcon icon={faCirclePlus} className="cursor-pointer h-6 w-6 mr-2"></FontAwesomeIcon>Add New Family Member
        </button>
      </div>
    </section>
  );
};

EditFamilyMembers.propTypes = {
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(EditFamilyMembers);
