import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import Spinner from '../../components/Spinner/Spinner';

import { getConversation } from '../../state/message/messageActions';

const MessengerConversation = ({ match, user }) => {
  const dispatch = useDispatch();

  const connectionName = user.connections.find((connection) => connection._id === match.params.userId).firstName;

  useEffect(() => {
    dispatch({ type: 'HIDE_BOTTOM_NAV' });

    const userId = match.params.userId;
    fetchConversation(userId);

    // eslint-disable-next-line
  }, []);

  const [tab, setTab] = useState('messages');
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const fetchConversation = async (userId) => {
    const conversationMessages = await getConversation(userId);
    setMessages(conversationMessages);
    setLoading(false);
  };

  const goBack = () => {
    dispatch({ type: 'SHOW_BOTTOM_NAV' });
    window.history.back();
  };

  return (
    <>
      <header className="p-4 flex">
        <h1 className="text-xl font-bold flex-1 flex justify-center">
          <span className="mr-auto" onClick={goBack}>
            {tab === 'lessons' ? '< Messages' : '<'}
          </span>
        </h1>
        <div className="w-fit self-center flex-1 flex justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <ProfilePicture size={14} />
            <span className="text-lg font-semibold">{connectionName}</span>
          </div>
        </div>
        <h1 className={`text-xl font-bold flex-1 flex justify-center ${tab === 'lessons' && 'invisible'}`}>
          <span className="ml-auto">Lessons {'>'}</span>
        </h1>
      </header>
      <main className="flex flex-col gap-4 px-4">
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div className={`p-4 w-3/4 bg-gray-50 rounded-2xl ${user._id === message.sender._id && 'self-end'}`} key={message._id}>
                <p>{message.body.text}</p>
              </div>
            ))}
          </>
        )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(MessengerConversation);
