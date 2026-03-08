import express, { Router } from "express";
import path from "path";

interface Options {
    port: number;
    routes: Router;
    publicPath?: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;
    constructor(options: Options) {
        const { port, publicPath = 'public', routes } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    async start() {
        // console.log("Server started");
        //* Middleware
        this.app.use(express.json());
        /*Routers  */
        this.app.use(this.routes);
        //* Public Folder
        this.app.use(express.static(this.publicPath));
        // this.app.get('/*', (req, res) => {
        //     res.send('Hello World');
        // });
        //* Catch all route
        this.app.use((req, res) => {
            // res.send("Hello World");
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            console.log(indexPath);

            res.sendFile(indexPath);
        });
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}