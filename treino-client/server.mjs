import { createServer } from 'node:http';
import { app } from './dist/project-name/server/main.js';

const port = parseInt(process.env.PORT || '4200', 10);

createServer(app).listen(port, () => {
  console.log(`Node server listening on http://localhost:${port}`);
});
