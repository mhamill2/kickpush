import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import Lessons from './Lessons';
import Messages from './Messages';
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';

import { getConversation } from '../../state/message/messageActions';

const MessengerConversation = ({ match, user, messages }) => {
  const dispatch = useDispatch();
  const connectionName = user.connections.find((connection) => connection._id === match.params.userId).firstName;

  const [page, setPage] = useState('messages');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch({ type: 'HIDE_BOTTOM_NAV' });

    const userId = match.params.userId;
    fetchConversation(userId);
    // eslint-disable-next-line
  }, []);

  const fetchConversation = async (userId) => {
    let conversationMessages = await getConversation(userId);

    if (!conversationMessages) {
      conversationMessages = [];
    }

    dispatch({ type: 'GET_MESSAGES_SUCCESS', payload: conversationMessages });
    setLoading(false);
  };

  const openLessons = () => setPage('lessons');
  const openMessages = () => setPage('messages');

  const goBack = () => {
    dispatch({ type: 'SHOW_BOTTOM_NAV' });
    window.history.back();
  };

  return (
    <>
      <header className="p-4 flex sticky top-16 bg-white">
        <h1 className="text-xl font-bold flex-1 flex justify-center">
          <span className="mr-auto" onClick={page === 'messages' ? goBack : openMessages}>
            {page === 'lessons' ? '< Messages' : '<'}
          </span>
        </h1>
        <div className="w-fit self-center flex-1 flex justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <ProfilePicture size={14} />
            <span className="text-lg font-semibold">{connectionName}</span>
          </div>
        </div>
        <h1 className={`text-xl font-bold flex-1 flex justify-center ${page === 'lessons' && 'invisible'}`} onClick={openLessons}>
          <span className="ml-auto">Lessons {'>'}</span>
        </h1>
      </header>
      {page === 'messages' && <Messages messages={messages} loading={loading} receiverId={match.params.userId} />}
      {page === 'lessons' && <Lessons />}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  messages: state.message.messages
});

export default connect(mapStateToProps)(MessengerConversation);
