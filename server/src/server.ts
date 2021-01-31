import "reflect-metadata"; // We need this in order to use @Decorators
import config from "./config";
import http from 'http';
import { expressApp } from "./app";

export default async function startServer(): Promise<void> {
    const app = await expressApp();
    
    app.on("error", (e) => {
        console.error(`Error starting application ${e}`);
        process.exit(1);
    });
    app.on("listened", () => {
        console.info(`
          ################################################
          🛡️  Server listening on port: ${config.port} 🛡️ 
          ################################################
        `);
    });
    app.listen(config.port, () => {
        app.emit("listened", null);
    });
}


