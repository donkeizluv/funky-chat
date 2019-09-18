import io from "socket.io-client";
export default io(process.env.VUE_APP_BASE_URI);
