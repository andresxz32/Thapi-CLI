const getControllerTestTemplate = ({ singularName }) => {
  const lowerSingularName = singularName.toLowerCase()
  return `   
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../src/app.module';

describe('${singularName}GetController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/${lowerSingularName}/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/${lowerSingularName}/b496a6a6-cfd1-4a33-85c5-32a3399f0899')
      .expect(200)
      .expect('Hello World!');
  });
});
`
}


const postControllerTestTemplate = ({ singularName }) => {
  return `   
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../src/app.module';

describe('${singularName}PostController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({})//Set Body here
      .expect(200)
      .expect('Ok');
  });
});
`

}

const putControllerTestTemplate = ({ singularName }) => {
  return `   
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../src/app.module';

describe('${singularName}PutController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (PUT)', () => {
    return request(app.getHttpServer())
      .put('/')
      .send({})//Set Body here
      .expect(200)
      .expect('Ok');
  });
});
`
}


module.exports = {
  getControllerTestTemplate,
  postControllerTestTemplate,
  putControllerTestTemplate
}