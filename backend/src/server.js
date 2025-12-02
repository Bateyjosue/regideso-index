import app from './app.js';
import connectDB from './db/index.js';
const PORT = process.env.PORT || 3000;
// use async/await instead of promises
try {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
catch (error) {
    console.error('Failed to connect to the database:', error);
}
//# sourceMappingURL=server.js.map