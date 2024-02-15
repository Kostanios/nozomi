import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, List } from 'antd';

import { MedicationItem } from './components/MedicationItem/MedicationItem';
import { medicationStore } from '../../../store/medication.store';
import { MedicationModalForm } from './components/MedicationModalForm/MedicationModalForm';
import './style.css';

export const MedicationPage = () => {
    const medications = medicationStore(state => state.medications);
    const getMedicationsLoading = medicationStore(state => state.loading.getMedications);
    const getMedications = medicationStore(state => state.getMedications);
    const getMedicationsError = medicationStore(state => state.error.getMedications);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        void getMedications();
    }, []);

    return (
        <div className="MedicationPage">
            <Card>
                <h1>
                    <span>Medication List</span>
                    <Button onClick={() => setOpen(value => !value)}>
                        Add Medication
                    </Button>
                    <MedicationModalForm open={open} setOpen={setOpen}/>
                </h1>
                <List
                    loading={getMedicationsLoading}
                    renderItem={medication => <MedicationItem medication={medication} />}
                    dataSource={medications}
                />
                {getMedicationsError && (
                    <Alert
                        closable
                        message={getMedicationsError.response?.data.message || getMedicationsError.message}
                        type="error"
                    />
                )}
            </Card>
        </div>
    );
};
