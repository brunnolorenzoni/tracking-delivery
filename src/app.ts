import server from "./server";

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}!`);
  console.log(`http://localhost:${PORT}/`);
});