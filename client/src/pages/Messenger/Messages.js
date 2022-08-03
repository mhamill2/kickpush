import { useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner';
import { sendMessage } from '../../state/message/messageActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Messages = ({ user, messages, loading, receiverId }) => {
  const [text, setText] = useState('');

  const onMessageChange = (e) => {
    setText(e.target.value);
  };

  const sendNewMessage = async (e) => {
    if (text.length > 0) {
      const message = { text, receiverId };
      const messageObj = await sendMessage(message);

      messages.push(messageObj);
      setText('');
    }
  };

  return (
    <>
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
      <div className="bottom-0 fixed left-0 w-full text-sm text-gray-900 flex justify-end px-2">
        <div className="w-full mb-4 rounded-3xl bg-gray-50 flex items-center px-4">
          <textarea id="text" name="text" rows="1" className="block p-3 w-full rounded-3xl bg-gray-50 border border-gray-50 focus:outline-none" placeholder="Your message..." onChange={onMessageChange} value={text} />
          <FontAwesomeIcon icon={faPaperPlane} className="text-gray-900 ml-2" onClick={sendNewMessage} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Messages);
