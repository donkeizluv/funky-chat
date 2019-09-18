import io from "socket.io-client";
export default io(
  process.env.VUE_APP_ENV === "prod"
    ? process.env.VUE_APP_BASE_URI
    : "localhost:8000"
);
