import { useEffect, useState } from "preact/hooks";
import "./app.css";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export function App() {
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
    <>
      <h1>App</h1>
      <textarea
        cols="30"
        rows="10"
        value={text}
        className="textarea"
        placeholder="Start typing"
        onInput={(e) => send(e.currentTarget.value)}
      />
    </>
  );
}
