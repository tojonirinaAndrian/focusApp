import { Hono } from 'hono';
import dotenv from 'dotenv';
import { fire } from 'hono/service-worker';

import { serveStatic } from "hono/bun"; 
// import { multipart } from "hono/middleWare/multipart";

const prisma: PrismaClient = prismaClient;

dotenv.config();
const app = new Hono();
const FRONT_URL: string = String(process.env.FRONT_URL);

// CORS
app.use('*', cors({
  origin: FRONT_URL,
  allowMethods:['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders:['Content-Type', 'Authorization'],
  credentials: true
}))

//ROUTES
// test route
app.get('/', async (c) => {
  return c.text('Hello Hono!');
})

// similar to app.listen(3000) in Express
fire(app);

export default app
