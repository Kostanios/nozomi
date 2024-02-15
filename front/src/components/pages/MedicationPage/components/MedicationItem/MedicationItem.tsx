import { Input, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React, { FC, useCallback } from 'react';
import './style.css';

import { Medication } from '../../../../../model/medication.model';
import { medicationStore } from '../../../../../store/medication.store';

interface IMedicationItem {
    medication: Medication
}

export const MedicationItem: FC<IMedicationItem> = ({ medication }) => {
    const updateMedication = medicationStore(state => state.updateMedication);
    const deleteMedication = medicationStore(state => state.deleteMedication);

    const updateCountMedicationCallback = useCallback((e: React.ChangeEvent<HTMLInputElement>) => updateMedication(
        medication.id,
        { count: Number(e.target.value)
    }),[medication.id, updateMedication]);

    const updateDestinationCountMedicationCallback = useCallback((e: React.ChangeEvent<HTMLInputElement>) => updateMedication(
        medication.id,
        { destination_count: Number(e.target.value)
    }),[medication.id, updateMedication]);

    const deleteMedicationCallback = useCallback(() => deleteMedication(medication.id), []);

    return (
        <List.Item>
            <div className="MedicationItem">
                <span>
                    {
                        `${medication.name}${medication.description
                        ? `: ${medication.description}`
                        : ''}`
                    }
                </span>
                <span>
                    <label>
                        <span>Count: </span>
                        <Input
                            min={0}
                            onChange={updateCountMedicationCallback}
                            type="number"
                            value={medication.count}
                        />
                    </label>
                    <label>
                        <span>Destination count:</span>
                        <Input
                            min={0}
                            onChange={updateDestinationCountMedicationCallback}
                            type="number"
                            value={medication.destination_count}
                        />
                    </label>
                    <DeleteOutlined onClick={deleteMedicationCallback} />
                </span>
            </div>
        </List.Item>
    );
};
