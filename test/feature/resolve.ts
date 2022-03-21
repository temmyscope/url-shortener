import request from 'supertest'
import { Express } from 'express-serve-static-core';
import express from 'express';

let app: Express;

beforeAll(async () => {
    const app = express();
})

describe('POST /resolve', () => {
  it('should return 200 & valid response if request param list is empty', async()=> {
    request(app)
      .get(`/api/resolve`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return err;
        
        expect(res.body).toMatchObject({'message': 'Hello, stranger!'});
      })
  })

  it('should return 200 & valid response if name param is set', async()=> {
    request(app)
      .get(`/api/v1/hello?name=Test%20Name`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return err;
        expect(res.body).toMatchObject({'message': 'Hello, Test Name!'})
      })
  })
  
  it('should return 400 & valid error response if name param is empty', async()=> {
    request(app)
      .get(`/api/v1/hello?name=`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return err;
        expect(res.body).toMatchObject({'error': {
          type: 'request_validation', 
          message: expect.stringMatching(/Empty.*\'name\'/), 
          errors: expect.anything()
        }});
      })
  })
});