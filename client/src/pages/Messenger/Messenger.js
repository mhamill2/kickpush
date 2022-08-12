import { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import MessagesListItem from './MessagesListItem';
import Spinner from '../../components/Spinner/Spinner';

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

    conversations.length === 0 ? getAllConversations() : setLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <header className="w-full p-4 flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Messages</h1>
        <FontAwesomeIcon icon={faSearch} className="cursor-pointer bg-gray-50 p-3 mt-3 rounded-full" />
      </header>
      <main className="px-4 flex flex-col gap-6">
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
