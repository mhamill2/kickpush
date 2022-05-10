import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const StudentProfile = ({ user, closeEditModal, openEditModal }) => {
  const familyMembers = user.studentProfile.familyMembers;

  return (
    <section id="family-members" className="border-b-4 p-5">
      <div className="flex justify-between">
        <h1 className={sectionHeadingStyle}>Family Members</h1>
        <FontAwesomeIcon icon={faPenToSquare} className="cursor-pointer" onClick={() => openEditModal('Family Members')}></FontAwesomeIcon>
      </div>
      {familyMembers.length > 0 ? (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 justify-center mb-8">
          {familyMembers.map((familyMember, index) => (
            <div key={index} className="flex justify-start mb-8 flex-wrap gap-2">
              <div className="max-w-1/3 text-center border-gray-100 bg-gray-100 rounded-lg py-2 px-12">
                {familyMember.name}
                <br />
                Age: {familyMember.age}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Add your family members to find instructors for them.</div>
      )}
    </section>
  );
};

const sectionHeadingStyle = 'text-2xl mb-5 inline-block mr-3';

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(StudentProfile);
