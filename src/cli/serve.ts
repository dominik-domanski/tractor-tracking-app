import Application from '../app';

const { PORT = 3000 } = process.env;

const app = new Application({ port: PORT });
app.serve();

export { app };