const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes');
const setupSwagger = require('../swagger');

const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

setupSwagger(app);

app.use(express.json());

app.listen(process.env.LISTEN_PORT, process.env.LISTEN_HOST, () => {
  console.log(
    `Server listening on http://${process.env.LISTEN_HOST}:${process.env.LISTEN_PORT}`,
  );
});

let token = '';

// eslint-disable-next-line no-undef
describe('User routes', () => {
  // eslint-disable-next-line no-undef
  it('should report an exist username', async () => {
    const res = await request(app).post('/api/users').send({
      username: 'user1',
      password: 'testpassword',
      user_email: 'testemail@test.mail.com',
    });
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(429);
  });

  // After this test, you should add the token into the header of the following tests
  // eslint-disable-next-line no-undef
  it('should login', async () => {
    const res = await request(app).post('/api/sessions').send({
      username: 'admin',
      password: 'admin',
    });
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(200);
    // eslint-disable-next-line no-undef
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  // eslint-disable-next-line no-undef
  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      // eslint-disable-next-line no-undef
      .set('Authorization', `Bearer ${token}`);
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(200);
  });
  // eslint-disable-next-line no-undef
  it('should get a user by username', async () => {
    const res = await request(app)
      .get('/api/users/user1')
      // eslint-disable-next-line no-undef
      .set('Authorization', `Bearer ${token}`);
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(200);
  });
});
