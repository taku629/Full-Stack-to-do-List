import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import jwt from 'jsonwebtoken';

interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
}

export const setupWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws: AuthenticatedWebSocket, req) => {
    console.log('New WebSocket connection');

    // Extract token from query string
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || 'your-secret-key'
        ) as { userId: string };
        ws.userId = decoded.userId;
        console.log(`User ${decoded.userId} authenticated via WebSocket`);
      } catch (error) {
        console.error('WebSocket authentication failed:', error);
        ws.close(1008, 'Authentication failed');
        return;
      }
    }

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);

        // Broadcast to all connected clients except sender
        wss.clients.forEach((client: WebSocket) => {
          const authClient = client as AuthenticatedWebSocket;
          if (
            client !== ws &&
            client.readyState === WebSocket.OPEN &&
            authClient.userId === ws.userId
          ) {
            client.send(JSON.stringify(data));
          }
        });
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  return wss;
};

export const broadcastToUser = (wss: WebSocketServer, userId: string, data: any) => {
  wss.clients.forEach((client: WebSocket) => {
    const authClient = client as AuthenticatedWebSocket;
    if (authClient.userId === userId && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
