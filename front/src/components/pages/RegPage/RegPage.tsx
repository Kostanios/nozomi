import React, { useCallback } from "react";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form, Input } from "antd";

import { authStore } from "../../../store/auth.store";

export const RegPage = () => {
    const [form] = useForm();
    const createUser = authStore(state => state.createUser);
    const loading = authStore(state => state.loading.createUser);
    const createUserError = authStore(state => state.error.createUser);
    const navigate = useNavigate();

    const handleSubmit = useCallback((values: { password: string, username: string }) => {
        void createUser(values.username, values.password, () => navigate('/login'))
    }, [createUser])

    return (
        <Card className="login">
            <Form form={form} onFinish={handleSubmit}>
                <h1>Registration Page</h1>
                <Form.Item
                    required
                    label="Username"
                    name="username"
                    rules={
                        [
                            { required: true, message: 'Enter Username' },
                            { min: 6, message: 'Username must be at least 6 chars length'}
                        ]
                    }
                >
                    <Input placeholder="username"/>
                </Form.Item>
                <Form.Item
                    required
                    label="Password"
                    name="password"
                    rules={
                        [
                            { required: true, message: 'Enter Password' },
                            { min: 6, message: 'Password must be at least 6 chars length'}
                        ]
                    }
                >
                    <Input placeholder="password"/>
                </Form.Item>
                <Button loading={loading} onClick={() => form.submit()}>Registration</Button>
                <div>Have an account? <Link to="/login">Login</Link></div>
                {createUserError && (
                    <Alert
                        message={createUserError.response?.data.message || createUserError.message}
                        type="error"
                    />
                )}
            </Form>
        </Card>
    )
}
