import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.createMedication)
  .get('/', controller.getUserMedications)
  .patch('/:medication_id', controller.updateUserMedication)
  .delete('/:medication_id', controller.deleteUserMedication);
