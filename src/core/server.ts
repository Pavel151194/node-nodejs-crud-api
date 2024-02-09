import { IncomingMessage, ServerResponse, createServer } from 'http';
import { Method } from './typings';
import respond from './respond';
import userController from '../controllers/userController';

const runSerever = () =>
  createServer((req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;

    const parsedUrl = url.split('/');

    try {
      switch (method) {
        case Method.GET:
          if (url === '/api/users') {
            userController.getUsers(res);
            break;
          }

          if (url.startsWith('/api/users/') && parsedUrl.length === 4) {
            userController.getUserById(res, parsedUrl[3]);
            break;
          }

          respond.notFound(res, { message: 'not found' });
          break;
        case Method.POST:
          if (req.url === '/api/users') {
            userController.addUser(req, res);
            break;
          }

          respond.notFound(res, { message: 'not found' });
          break;
        case Method.PUT:
          if (url.startsWith('/api/users/') && parsedUrl.length === 4) {
            userController.updateUserById(req, res, parsedUrl[3]);
            break;
          }

          respond.notFound(res, { message: 'not found' });
          break;
        case Method.DELETE:
          if (url.startsWith('/api/users/') && parsedUrl.length === 4) {
            userController.deleteUserById(res, parsedUrl[3]);
            break;
          }

          respond.notFound(res, { message: 'not found' });
          break;
        default:
          respond.notFound(res, { message: 'not found' });
          break;
      }
    } catch {
      respond.serverError(res, { message: 'internal server error' });
    }
  });

export default runSerever;
