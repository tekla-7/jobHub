import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8000;

await connectDB()
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
process.on("unhandledRejection", (err) => {
    console.error('UNHANDLED REJECTION');
    console.error(err);
    server.close(() => process.exit(1)
    );
})
process.on("uncaughtException", (err) => {
    console.error('Uncaught exception');
    console.error(err);
    server.close(() => process.exit(1))
})