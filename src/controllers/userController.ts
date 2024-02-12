import { IncomingMessage, ServerResponse } from 'http';
import { v4 as getId, validate } from 'uuid';
import { User } from '../core/typings';
import { validateUser } from '../validators/userValidator';
import { parseBody } from '../core/bodyParser';
import respond from '../core/respond';

let users: User[] = [];

const getUsers = (res: ServerResponse) => {
  respond.success(res, users);
};

const getUserById = (res: ServerResponse, id: string) => {
  if (!validate(id)) {
    respond.badRequest(res, { message: 'invalid userId' });
    return;
  }

  const user = users.find((user) => user.id === id);

  if (user) {
    respond.success(res, user);
    return;
  }

  respond.notFound(res, { message: `record with id === ${id} doesn't exist` });
};

const addUser = async (req: IncomingMessage, res: ServerResponse) => {
  const body = await parseBody(req);

  const user = { ...body, id: getId() };

  if (!validateUser(user)) {
    respond.badRequest(res, { message: 'body does not contain required fields or has extra fields' });
    return;
  }

  users.push(user);
  respond.created(res, user);
};

const updateUserById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  if (!validate(id)) {
    respond.badRequest(res, { message: 'invalid userId' });
    return;
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    respond.notFound(res, { message: `record with id === ${id} doesn't exist` });
    return;
  }

  const body = await parseBody(req);

  const updatedUser = { ...user, ...body };

  users = users.map((user) => (user.id === id ? updatedUser : user));
  respond.success(res, updatedUser);
};

const deleteUserById = (res: ServerResponse, id: string) => {
  if (!validate(id)) {
    respond.badRequest(res, { message: 'invalid userId' });
    return;
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    respond.notFound(res, { message: `record with id === ${id} doesn't exist` });
    return;
  }

  users = users.filter((user) => user.id !== id);

  respond.deleted(res)
};

export default { getUsers, addUser, getUserById, updateUserById, deleteUserById };
