const dotenv = require("dotenv");
const app = require("./app");
const connectDatabase = require("./config/database");
const PORT = process.env.PORT || 4000;


//handeling uncaught exception
process.on("uncaughtExceptionMonitor", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});
dotenv.config({ path: ".env" });
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});