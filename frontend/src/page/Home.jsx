import { useEffect, useState } from "preact/hooks";

import io from "socket.io-client";

const socket = io("http://localhost:3001");

const Home = () => {

    const [text, setText] = useState("");

    socket.on("connect", () => {
      console.log("connected");
    });
  
    useEffect(() => {
      socket.on("text", (data) => {
        setText(data);
      });
    }, [socket]);
  
    const send = (text) => {
      socket.emit("text", text);
    };
    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;