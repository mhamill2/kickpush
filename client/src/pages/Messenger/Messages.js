import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner';
import { sendMessage } from '../../state/message/messageActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Messages = ({ user, messages, setMessages, loading, receiverId }) => {
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log('hjere');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messagesEndRef]);

  const onMessageChange = (e) => {
    setText(e.target.value);
  };

  const onEnterPressed = async (e) => {
    if (e.key.toLowerCase() === 'enter' && e.shiftKey === false && text.trim().length > 0) {
      e.preventDefault();

      const message = { text: text.trim(), receiverId };
      const messageObj = await sendMessage(message);

      setMessages([...messages, messageObj]);
      setText('');
    }
  };

  const sendNewMessage = async (e) => {
    if (text.length > 0) {
      const message = { text: text.trim(), receiverId };
      const messageObj = await sendMessage(message);

      messages.push(messageObj);
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
            <div ref={messagesEndRef} />
          </>
        )}
        <div className="bottom-0 left-0 w-full text-sm text-gray-900 flex justify-end px-2 bg-white fixed">
          <div className="w-full mb-4 rounded-3xl bg-gray-50 flex items-center px-4">
            <textarea id="text" name="text" rows="1" className="block p-3 w-full rounded-3xl bg-gray-50 border border-gray-50 focus:outline-none resize-none" placeholder="Your message..." onChange={onMessageChange} onKeyPress={onEnterPressed} value={text} />
            <FontAwesomeIcon icon={faPaperPlane} className="text-gray-900 ml-2 cursor-pointer" onClick={sendNewMessage} />
          </div>
          s
        </div>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Messages);
