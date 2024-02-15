import React, { useCallback } from 'react';
import { useForm } from 'antd/es/form/Form';
import { Alert, Button, Card, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

import { authStore } from '../../../store/auth.store';
import './style.css';

export const LoginPage = () => {
    const [form] = useForm();
    const logIn = authStore(state => state.logIn);
    const loading = authStore(state => state.loading.login);
    const loginUserError = authStore(state => state.error.login);

    const handleSubmit = useCallback((values: { password: string, username: string }) => {
        void logIn(values.username, values.password, () => { window.location.href = '/';});
    }, [logIn]);

    return (
        <Card className="login">
            <Form form={form} onFinish={handleSubmit}>
                <h1>Login Page</h1>
                <Form.Item
                    required
                    label="Username"
                    name="username"
                    rules={
                        [
                            { required: true, message: 'Enter Username' },
                            { min: 6, message: 'Username must be at least 6 chars length' }
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
                            { min: 6, message: 'Password must be at least 6 chars length' }
                        ]
                    }
                >
                    <Input placeholder="password"/>
                </Form.Item>
                <Button loading={loading} onClick={form.submit}>Log in</Button>
                <div>Dont have an account? <Link to="/reg">Registration</Link></div>
                {loginUserError && (
                    <Alert
                        message={loginUserError.response?.data.message || loginUserError.message}
                        type="error"
                    />
                )}
            </Form>
        </Card>
    );
};
