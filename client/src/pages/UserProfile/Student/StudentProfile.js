import { connect } from 'react-redux';

const StudentProfile = ({ user, closeEditModal, openEditModal }) => {
  return (
    <>
      <div>Hello</div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(StudentProfile);
