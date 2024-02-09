import { config } from 'dotenv';
import { validate } from 'uuid';
import { CreateUserBody, Method, User } from '../src/core/typings';
import createSerever from '../src/core/server';

config();

const PORT = process.env.PORT;

const server = createSerever();

const baseUrl = `http://localhost:${PORT}`;

let createdRecord = {} as User;
let updatedRecord = {} as User;
let createdRecordId = '';

describe('API Tests', () => {
  beforeAll((done) => {
    server.listen(PORT);
    done();
  });

  afterAll((done) => {
    server.close(done);
  });

  test('GET api/users should return an empty array', async () => {
    const url = `${baseUrl}/api/users`;

    const response = await fetch(url);
    const users: User[] = await response.json();

    expect(response.status).toBe(200);
    expect(users).toEqual([]);
  });

  test('POST api/users should return a newly created record', async () => {
    const url = `${baseUrl}/api/users`;

    const testUser: CreateUserBody = {
      username: 'User Name',
      age: 42,
      hobbies: ['programming', 'crying'],
    };

    const response = await fetch(url, {
      method: Method.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });

    createdRecord = await response.json();

    expect(response.status).toBe(201);
    expect(validate(createdRecord.id)).toBe(true);
    expect(createdRecord.username).toEqual(testUser.username);
    expect(createdRecord.age).toEqual(testUser.age);
    expect(createdRecord.hobbies).toEqual(testUser.hobbies);

    createdRecordId = createdRecord.id;
  });

  test('GET api/users/{userId} should return the created record', async () => {
    const url = `${baseUrl}/api/users/${createdRecordId}`;

    const response = await fetch(url);
    const user: User = await response.json();

    expect(response.status).toBe(200);
    expect(createdRecordId).toEqual(user.id);
    expect(createdRecord.username).toEqual(user.username);
    expect(createdRecord.age).toEqual(user.age);
    expect(createdRecord.hobbies).toEqual(user.hobbies);
  });

  test('PUT api/users/{userId} should return the updated record', async () => {
    const url = `${baseUrl}/api/users/${createdRecordId}`;

    const testUser: Partial<CreateUserBody> = {
      hobbies: ['testing', 'diving'],
    };

    const response = await fetch(url, {
      method: Method.PUT,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });

    updatedRecord = await response.json();

		expect(response.status).toBe(200);
		expect(updatedRecord.id).toEqual(createdRecordId);
		expect(updatedRecord.username).toEqual(createdRecord.username);
		expect(updatedRecord.age).toEqual(createdRecord.age);
		expect(updatedRecord.hobbies).toEqual(testUser.hobbies);
  });
});
