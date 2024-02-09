import { ServerResponse } from 'http';

export const success = (res: ServerResponse, data?: any) => {
  res.writeHead(200, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const created = (res: ServerResponse, data?: any) => {
  res.writeHead(201, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const deleted = (res: ServerResponse, data?: any) => {
  res.writeHead(204, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const badRequest = (res: ServerResponse, data?: any) => {
  res.writeHead(400, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const notFound = (res: ServerResponse, data?: any) => {
  res.writeHead(404, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const serverError = (res: ServerResponse, data?: any) => {
  res.writeHead(500, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(data));
};

export default { success, created, deleted, badRequest, notFound, serverError };
