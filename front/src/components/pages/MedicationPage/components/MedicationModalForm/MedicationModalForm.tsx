import React, { FC, useCallback } from "react";
import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";

import "./style.css";
import {medicationStore} from "../../../../../store/medication.store";

interface IMedicationModalForm {
    open: boolean
    setOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

export const MedicationModalForm: FC<IMedicationModalForm> = ({ open, setOpen }) => {
    const [ form] = useForm();
    const createMedication = medicationStore(state => state.createMedication);

    const createMedicationCallback = useCallback((values: { name: string, description?: string, count: number, destination_count?: number }) =>
        createMedication(values, () => {
            form.resetFields();
            setOpen(false);
        }
    ), [createMedication, setOpen]);

    const closeModalCallback = useCallback(() => setOpen(false), []);

    return (
        <Modal
            title="Create Medication"
            open={open}
            onCancel={closeModalCallback}
            onOk={form.submit}
        >
            <Form
                onFinish={createMedicationCallback}
                className="MedicationModalForm"
                form={form}
            >
                <Form.Item
                    required
                    label="name"
                    name="name"
                    rules={[
                        { required: true, message: 'count is required' },
                        { min: 6, message: 'name should be more then 6 characters' }
                    ]}
                >
                    <Input placeholder="name"/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="description"
                    rules={[
                        { max: 50, message: 'name should be more then 6 characters' }
                    ]}
                >
                    <Input placeholder="description"/>
                </Form.Item>
                <Form.Item
                    name="count"
                    required
                    rules={[
                        { required: true, message: 'count is required' }
                    ]}
                    label="count"
                >
                    <Input defaultValue={0} min={0} type="number" placeholder="count"/>
                </Form.Item>
                <Form.Item
                    name="destination_count"
                    label="destination count"
                >
                    <Input
                        defaultValue={0}
                        min={0}
                        type='number'
                        placeholder="destination count"
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
};
