import React from "react";
import NoteList from "./NoteList";

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Quick Notes</h1>
      <NoteList />
    </div>
  );
}
export default App;
