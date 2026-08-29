export class OmegaSocket {
  constructor(url, onMessage) {
    this.url = url;
    this.onMessage = onMessage;
    this.socket = null;
    this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('Connected to OMEGA execution engine');
      this.onMessage({ type: 'status', data: 'online' });
    };

    this.socket.onmessage = (event) => {
      this.onMessage({ type: 'message', data: event.data });
    };

    this.socket.onclose = () => {
      console.log('Disconnected from OMEGA');
      this.onMessage({ type: 'status', data: 'offline' });
      setTimeout(() => this.connect(), 3000);
    };

    this.socket.onerror = (err) => {
      console.error('Socket error:', err);
      this.socket.close();
    };
  }

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    }
  }
}
