import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from "../firebase-config";
import EmojiPicker from 'emoji-picker-react';

function Chat(props) {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      name: auth.currentUser.displayName,
      avatar: auth.currentUser.photoURL,
      room: room,
      id:auth.currentUser.uid
    });

    setNewMessage("");
  };

// ...

return (
  <div className="bg-gray-700 h-screen flex flex-col">
    <div className="header text-white text-center py-4">
      <h1 className="text-xl">Welcome to: {room}</h1>
    </div>
    <div className="messages flex-1 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat
          ${message.id===auth.currentUser.uid ? 'chat-start' : 'chat-end'}
          `}
        >
            <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Profile Photo" src={message.avatar} />
    </div>
  </div>
          <div
            className={`chat-header text-white`}
          >
            {message.name}
          </div>
          <div
            className={`chat-bubble text-white`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
    <div className="bg-gray-700 fixed bottom-0 w-full py-4 shadow-lg">
      <form className="containerWrap px-2 flex" onSubmit={handleSubmitForm}>
        <input
          className="input w-full focus:outline-none bg-gray-600 text-white rounded-r-none rounded-l-lg"
          placeholder="Type your message here"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button
          className="w-auto bg-gray-500 text-white rounded-r-none px-3 text-xl"
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😊
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-16 right-0 z-10">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              disableAutoFocus
              emojiTooltip
              emojiSet="apple"
            />
          </div>
        )}
        <button
          className="w-auto bg-gray-900 text-white rounded-r-lg px-5 text-sm"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  </div>
);
// ...

}

export default Chat;

