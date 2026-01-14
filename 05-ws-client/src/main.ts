import { connectToServer } from "./socket-client";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>Websocket client</h2>
    <input
      id="token-input"
      placeholder="Auth token"
    />
    <button id="connect-button">Connect</button>
    <br />
    <span id="server-status">offline</span>
    <ul id="clients-ul">
    </ul>
    <form id="message-form">
      <input
        id="message-input"
        placeholder="Message"
      />
    </form>
    <h3>Messages</h3>
    <ul id="messages-ul">
    </ul>
  </div>
`;

const tokenInput = document.querySelector<HTMLInputElement>("#token-input")!;
const connectButton = document.querySelector<HTMLButtonElement>("#connect-button")!;

connectButton.addEventListener("click", () => {
  const token = tokenInput.value.trim();
  if (token.length <= 0) {
    alert("Please enter a valid auth token.");
    return;
  }

  connectToServer(token);
});
