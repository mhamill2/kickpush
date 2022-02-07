import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const EditLessonInfo = ({ user, onChange }) => {
  const { agesTaught, lessonLocations, skillLevelsTaught } = user.instructorProfile;

  return (
    <div className="p-4">
      <p className="mb-2">Select where you would like to give lessons</p>

      <div className="flex flex-col items-start pl-4">
        <label htmlFor="instructorsHome" data-parent="lessonLocations">
          <input type="checkbox" className="mr-1" name="instructorsHome" onChange={onChange} defaultChecked={lessonLocations.instructorsHome} />
          Your Home
        </label>
        <label htmlFor="studentsHome" data-parent="lessonLocations">
          <input type="checkbox" className="mr-1" name="studentsHome" onChange={onChange} defaultChecked={lessonLocations.studentsHome} />
          Students Home
        </label>
        <label htmlFor="skatepark" data-parent="lessonLocations">
          <input type="checkbox" className="mr-1" name="skatepark" onChange={onChange} defaultChecked={lessonLocations.skatepark} />
          Skatepark
        </label>
        <label htmlFor="virtual" data-parent="lessonLocations">
          <input type="checkbox" className="mr-1" name="virtual" onChange={onChange} defaultChecked={lessonLocations.virtual} />
          Virtual
        </label>
      </div>

      <hr className="my-8" />

      <p className="mb-2">Select what age groups you teach</p>

      <div className="flex flex-col items-start pl-4">
        <label htmlFor="children" data-parent="agesTaught">
          <input type="checkbox" className="mr-1" name="children" onChange={onChange} defaultChecked={agesTaught.children} />
          Children
        </label>
        <label htmlFor="teens" data-parent="agesTaught">
          <input type="checkbox" className="mr-1" name="teens" onChange={onChange} defaultChecked={agesTaught.teens} />
          Teens
        </label>
        <label htmlFor="adults" data-parent="agesTaught">
          <input type="checkbox" className="mr-1" name="adults" onChange={onChange} defaultChecked={agesTaught.adults} />
          Adults
        </label>
      </div>

      <hr className="my-8" />

      <p className="mb-2">Select what skill levels you teach</p>

      <div className="flex flex-col items-start pl-4">
        <label htmlFor="instructors-home" data-parent="skillLevelsTaught">
          <input type="checkbox" className="mr-1" name="beginner" onChange={onChange} defaultChecked={skillLevelsTaught.beginner} />
          Beginner
        </label>
        <label htmlFor="instructors-home" data-parent="skillLevelsTaught">
          <input type="checkbox" className="mr-1" name="intermediate" onChange={onChange} defaultChecked={skillLevelsTaught.intermediate} />
          Intermediate
        </label>
        <label htmlFor="instructors-home" data-parent="skillLevelsTaught">
          <input type="checkbox" className="mr-1" name="advanced" onChange={onChange} defaultChecked={skillLevelsTaught.advanced} />
          Advanced
        </label>
      </div>
    </div>
  );
};

EditLessonInfo.propTypes = {
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(EditLessonInfo);
