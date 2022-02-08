import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const EditBio = ({ onChange, user }) => {
  return (
    <div className="p-4">
      <p>Use this space to let students get to know you better and show what kind of experience you have.</p>
      <h2 className="mt-5 text-lg">Bio</h2>
      <textarea type="text" rows="10" defaultValue={user.instructorProfile.bio} className="w-full border border-gray-300" name="bio" onChange={onChange} />
    </div>
  );
};

EditBio.propTypes = {
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(EditBio);
