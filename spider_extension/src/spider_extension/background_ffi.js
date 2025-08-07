export function connectWebSocket() {
  let ws = new WebSocket("http://localhost:1234/ws");

  ws.onopen = () => {
    console.log("WebSocket connected!");
    ws.send(JSON.stringify("ping"));
  };

  ws.onmessage = (event) => {
    console.log("Received message:", event.data);
  };

  ws.onclose = (event) => {
    console.log("WebSocket closed:", event.reason);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  return ws;
}
