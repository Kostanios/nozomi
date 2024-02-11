import { Request, Response } from 'express';

import L from '../../../common/logger';
import { pool } from '../../../routes';
import { medicationSchema } from '../../schema/medication';

export class MedicationController {
  async createMedication(req: Request, res: Response) {
    try {
      const { error } = medicationSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // @ts-ignore
      const userId: string = req.user.user_id;

      const { name, description, count, destination_count } = req.body;

      const medicationResult = await pool.query(
        'INSERT INTO "Medication" (user_id, name, description, count, destination_count) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, name, description, count, destination_count]
      );

      const medication = medicationResult.rows[0];

      L.info(medication, 'Created medication');

      return res.status(200).json({
        medication,
      });
    } catch (error) {
      L.error(error, 'Error: while creating medications');
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserMedications(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId: string = req.user.user_id;

      const medicationsResult = await pool.query(
        'SELECT * FROM "Medication" WHERE user_id = $1',
        [userId]
      );

      const medications = medicationsResult.rows;

      L.info(medications, 'Get medications');

      return res.status(200).json({
        medications,
      });
    } catch (error) {
      L.error(error, 'Error: while getting medications');
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateUserMedication(req: Request, res: Response) {
    try {
      const { count, destination_count } = req.body;
      const medication_id = req.params.medication_id;

      if (!medication_id) {
        res.status(400).json({ error: 'medication_id is required' });
        return; // Return to exit the function if medication_id is not provided
      }

      const fieldsToUpdate = [];
      const valuesToUpdate = [];

      if (typeof count === 'number') {
        fieldsToUpdate.push('count');
        valuesToUpdate.push(count);
      }
      if (typeof destination_count === 'number') {
        fieldsToUpdate.push('destination_count');
        valuesToUpdate.push(destination_count);
      }

      if (fieldsToUpdate.length === 0) {
        // If no valid fields to update, return or handle accordingly
        res.status(400).json({ error: 'No valid fields to update' });
        return;
      }

      const updateQuery = `UPDATE "Medication" SET ${fieldsToUpdate
        .map((field, index) => `"${field}" = $${index + 1}`)
        .join(', ')} WHERE id = $${fieldsToUpdate.length + 1} RETURNING *`;

      const medicationsResult = await pool.query(updateQuery, [
        ...valuesToUpdate,
        medication_id,
      ]);

      const medication = medicationsResult.rows[0];

      L.info(medication, 'Updated medication');

      return res.status(200).json(medication);
    } catch (error) {
      L.error(error, 'Error: while updating medication');
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteUserMedication(req: Request, res: Response) {
    try {
      const medication_id = req.params.medication_id;

      if (!medication_id) {
        res.status(400).json({ error: 'medication_id is required' });
        return;
      }

      const medicationsResult = await pool.query(
        'DELETE FROM "Medication" WHERE id = $1',
        [medication_id]
      );

      const isDeleted = !!medicationsResult.rowCount;

      L.info(null, 'Deleted medication');

      if (isDeleted) {
        return res
          .status(200)
          .json({ message: `Medication with id ${medication_id} deleted` });
      } else {
        return res.status(404).json({
          message: `Medication with id ${medication_id} is not exist`,
        });
      }
    } catch (error) {
      L.error(error, 'Error: while deleting medication');
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
export default new MedicationController();
