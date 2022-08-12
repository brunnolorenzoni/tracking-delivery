import app from './app'

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}!`);
  console.log(`http://localhost:${PORT}/`);
});