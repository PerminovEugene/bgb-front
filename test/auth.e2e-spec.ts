import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { INestApplication } from '@nestjs/common';

const token = '{"test": "token"}';

describe('Auth', () => {
  let app: INestApplication;
  const authService = {
    signUp: async () => token,
    signIn: async () => token,
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/auth/sign-up POST`, () => {
    return request(app.getHttpServer())
      .get('/auth/sign-up')
      .expect(200)
      .expect('Authorisation', token);
  });

  it(`/auth/sign-ip POST`, () => {
    return request(app.getHttpServer())
      .get('/auth/sign-in')
      .expect(200)
      .expect('Authorisation', token);
  });

  afterAll(async () => {
    await app.close();
  });
});
