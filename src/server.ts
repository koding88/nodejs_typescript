import app from "./app";

const PORT = 3000;
const HOST = "localhost";

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT} and host ${HOST}`);
});
