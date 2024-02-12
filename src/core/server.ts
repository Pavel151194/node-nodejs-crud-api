import { IncomingMessage, ServerResponse, createServer } from 'http';
import { Method } from './typings';
import respond from './respond';
import userController from '../controllers/userController';

const runSerever = () =>
  createServer((req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;
    const [basePath, endpointPath, param, ...rest] = url.substring(1).split('/');

    try {
      switch (method) {
        case Method.GET:
          if (url === `/${basePath}/${endpointPath}`) {
            userController.getUsers(res);
            break;
          }

          if (url.startsWith(`/${basePath}/${endpointPath}/`) && url.endsWith(param) && !rest.length) {
            userController.getUserById(res, param);
            break;
          }

          respond.notFound(res, { message: 'not found' });
          break;
        case Method.POST:
          if (req.url === `/${basePath}/${endpointPath}`) {
            userController.addUser(req, res);
            break;
          }

          respond.notFound(res, { message: 'not found' });
          break;
        case Method.PUT:
          if (url.startsWith(`/${basePath}/${endpointPath}/`) && url.endsWith(param) && !rest.length) {
            userController.updateUserById(req, res, param);
            break;
          }

          respond.notFound(res, { message: 'not found' });
          break;
        case Method.DELETE:
          if (url.startsWith(`/${basePath}/${endpointPath}/`) && url.endsWith(param) && !rest.length) {
            userController.deleteUserById(res, param);
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
