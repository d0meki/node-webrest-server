import express from "express";
import path from "path";

interface Options {
    port: number;
    publicPath?: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    constructor(options: Options) {
        const { port, publicPath = 'public' } = options;
        this.port = port;
        this.publicPath = publicPath;
    }

    async start() {
        // console.log("Server started");
        //* Middleware

        //* Public Folder
        this.app.use(express.static(this.publicPath));
        // this.app.get('/*', (req, res) => {
        //     res.send('Hello World');
        // });
        //* Catch all route
        this.app.use((req, res) => {
            // res.send("Hello World");
            const indexPath = path.join(__dirname, `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}