/** @format */

// proxy.js
import corsAnywhere from "cors-anywhere";

const host = "localhost";
const port = 8080;

corsAnywhere
    .createServer({
        originWhitelist: [], // Allow all origins
    })
    .listen(port, host, () => {
        console.log(`🚀 CORS Proxy running at http://${host}:${port}/`);
    });
