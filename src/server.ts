import app from './app'
import ws from './ws'

const API_PORT = 3000 || process.env.PORT;
const WS_PORT = 8080 || process.env.WS_PORT;

app.express.listen(API_PORT, () => {
  console.log(`App is running on port: ${API_PORT}!`);
  console.log(`http://localhost:${API_PORT}/`);
});

ws.httpServer.listen(WS_PORT, () => {
  console.log(`Socket is running on port: ${WS_PORT}!`);
  console.log(`http://localhost:${WS_PORT}/`);
});