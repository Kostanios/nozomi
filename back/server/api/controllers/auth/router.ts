import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/reg', controller.reg)
  .post('/login', controller.login);
