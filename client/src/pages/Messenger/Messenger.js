import { useEffect, useState, use } from 'react';
import { useDispatch, connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import MessagesListItem from './MessagesListItem';
import Spinner from '../../components/Spinner/Spinner';

import { getMessages } from '../../state/message/messageActions';

const Messenger = ({ user, messages }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const getConversations = async () => {
    await getMessages();
    setLoading(false);
  };

  useEffect(() => {
    dispatch({ type: 'NAV_MESSAGING' });
    // eslint-disable-next-line

    messages.length === 0 ? getConversations() : setLoading(false);
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
            {messages.map((message) => (
              <MessagesListItem key={message.message._id} message={message.message} />
            ))}
          </>
        )}
      </main>
    </div>
  );
};

// map state to props
const mapStateToProps = (state) => ({
  user: state.user.user,
  messages: state.message.messages
});

export default connect(mapStateToProps)(Messenger);
