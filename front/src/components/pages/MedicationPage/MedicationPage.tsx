import React, {useEffect, useState} from "react";
import {Button, Card, List} from "antd";

import { MedicationItem } from "./components/MedicationItem/MedicationItem";
import { medicationStore } from "../../../store/medication.store";
import './style.css';
import {MedicationModalForm} from "./components/MedicationModalForm/MedicationModalForm";

export const MedicationPage = () => {
    const medications = medicationStore(state => state.medications);
    const getMedicationsLoading = medicationStore(state => state.loading.getMedications);
    const getMedications = medicationStore(state => state.getMedications);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        void getMedications();
    }, []);

    return (
        <div className="MedicationPage">
            <Card>
                <h1>
                    <span>Medication List</span>
                    <Button onClick={() => setOpen(value => !value)}>Add Medication</Button>
                    <MedicationModalForm open={open} setOpen={setOpen}/>
                </h1>
                <List
                    loading={getMedicationsLoading}
                    renderItem={(medication) => <MedicationItem medication={medication} />}
                    dataSource={medications}
                />
            </Card>
        </div>
    )
}
