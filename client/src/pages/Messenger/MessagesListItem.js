import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

const MessagesListItem = ({ message, user }) => {
  const connection = message.receiver._id === user._id ? message.sender : message.receiver;
  const text = message.body.text || (message.body.attachments.length > 0 ? 'Attachment' : '');

  return (
    <Link to={`/messages/${connection._id}`}>
      <div data-user={connection._id} className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-100 rounded-3xl">
        <div className="flex items-center">
          <ProfilePicture size={10} color={'white'} />
          <div className="flex flex-col">
            <p className="ml-3 text-lg font-semibold">{connection.firstName}</p>
            <p className="ml-3 text-sm">{text}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

// map state to props
const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(MessagesListItem);
