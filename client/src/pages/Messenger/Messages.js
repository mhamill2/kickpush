import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import ScrollRef from '../../components/ScrollRef';
import Spinner from '../../components/Spinner/Spinner';
import { sendMessage } from '../../state/message/messageActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Messages = ({ user, messages, loading, receiverId }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onMessageChange = (e) => setText(e.target.value);

  const onEnterPressed = async (e) => {
    if (e.key.toLowerCase() === 'enter' && e.shiftKey === false) {
      e.preventDefault();
      sendNewMessage();
    }
  };

  const sendNewMessage = async (e) => {
    if (text.trim().length > 0) {
      const message = { text: text.trim(), receiverId };
      const messageObj = await sendMessage(message);

      dispatch({ type: 'ADD_NEW_MESSAGE', payload: messageObj });
      setText('');
    }
  };

  return (
    <>
      <main id="messages-container" className="flex flex-col gap-4 px-4 mb-20">
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
            <ScrollRef />
          </>
        )}
        <div className="bottom-0 left-0 w-full text-sm text-gray-900 flex justify-end px-2 bg-white fixed">
          <div className="w-full mb-4 rounded-3xl bg-gray-50 flex items-center px-4">
            <textarea id="text" name="text" rows="1" className="block p-3 w-full rounded-3xl bg-gray-50 border border-gray-50 focus:outline-none resize-none" placeholder="Your message..." onChange={onMessageChange} onKeyPress={onEnterPressed} value={text} />
            <FontAwesomeIcon icon={faPaperPlane} className="text-gray-900 ml-2 cursor-pointer" onClick={sendNewMessage} />
          </div>
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  messages: state.message.messages
});

export default connect(mapStateToProps)(Messages);
