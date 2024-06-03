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
describe('Comments routes', () => {
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
  it('should get all comments for event 1', async () => {
    const res = await request(app)
      .get('/api/comments/1')
      // eslint-disable-next-line no-undef
      .set('Authorization', `Bearer ${token}`);
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(200);
  });

  // eslint-disable-next-line no-undef
  it('should like a comment by id', async () => {
    //Remember to pass `like` to signal like or dislike
    //In this case, `like` should be true
    const res = await request(app)
      .post('/api/comments/3/like')
      .set('Authorization', `Bearer ${token}`)
      .send({
        like: true,
      });
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(201);
  });

  // eslint-disable-next-line no-undef
  it('should dislike a comment by id', async () => {
    //Remember to pass `like` to signal like or dislike
    //In this case, `like` should be false
    const res = await request(app)
      .post('/api/comments/3/like')
      .set('Authorization', `Bearer ${token}`)
      .send({
        like: false,
      });
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(204);
  });

  // eslint-disable-next-line no-undef
  it('should cancel the dislike to a comment by id', async () => {
    //Remember to pass `like` to signal like or dislike
    //In this case, `like` should be false
    const res = await request(app)
      .delete('/api/comments/3/like')
      .set('Authorization', `Bearer ${token}`);
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toEqual(204);
  });
});
