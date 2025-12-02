import app from './app';
import connectDB from './db/index';

const PORT = process.env.PORT || 3000;

// use async/await instead of promises

(async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
})();
