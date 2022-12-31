import { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';

import MessagesListItem from './MessagesListItem';
import Spinner from '../../components/elements/Spinner';

import { getConversations } from '../../state/message/messageActions';

const Messenger = ({ conversations }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const getAllConversations = async () => {
    await getConversations();
    setLoading(false);
  };

  useEffect(() => {
    dispatch({ type: 'NAV_MESSAGING' });
    localStorage.setItem('kp-messenger-page', 'messages');

    conversations.length === 0 ? getAllConversations() : setLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <header className="w-full p-4 flex justify-center items-center mb-4">
        <h1 className="text-2xl font-semibold">Messages</h1>
      </header>
      <main className="px-4 flex flex-col gap-2">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {conversations.map((conversation) => (
              <MessagesListItem key={conversation.message._id} message={conversation.message} />
            ))}
          </>
        )}
      </main>
    </div>
  );
};

// map state to props
const mapStateToProps = (state) => ({
  conversations: state.message.conversations
});

export default connect(mapStateToProps)(Messenger);
