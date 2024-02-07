import Auth from "./components/Auth";
import "./App.css";
import { useState, useRef } from "react";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const handleSignOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md text-white flex flex-col">
              <h1>Enter Room Name:</h1>
              <input 
              ref={roomInputRef}
              className="input bg-white my-4 text-gray-950"
              />
              <button 
              onClick={() => setRoom(roomInputRef.current.value)}
              className="btn btn-primary"
              >
                Enter Chat
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="sign-out">
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
