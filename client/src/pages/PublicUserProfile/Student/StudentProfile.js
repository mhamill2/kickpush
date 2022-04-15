import { connect } from 'react-redux';

const StudentProfile = ({ user, closeEditModal, openEditModal }) => {
  return <></>;
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(StudentProfile);
