import 'reflect-metadata';
import express from 'express'; // , { NextFunction, Request, Response }
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import './database';
// import AppError from './errors/AppError';
import globalExceptionHandler from './middlewares/globalExceptionHandler';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(globalExceptionHandler);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333!');
});
