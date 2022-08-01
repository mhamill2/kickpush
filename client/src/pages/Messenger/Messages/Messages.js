import { connect } from 'react-redux';

const Messages = ({ user, connection }) => {
  return <div>Messages</div>;
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Messages);
