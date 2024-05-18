import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Form, TextField } from "@/components/ui2/form";

import GuestLayout from "@/layouts/GuestLayout";

const ResetPassword = (props: { token: string; email: string }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: props.token,
        email: props.email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = () => {
        post(route("password.store"));
    };

    return (
        <GuestLayout title="Reset Password">
            <Form onSubmit={submit}>
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={data.email}
                    autoComplete="username"
                    onChange={value => setData("email", value)}
                    error={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    autoComplete="new-password"
                    autoFocus={true}
                    onChange={value => setData("password", value)}
                    error={errors.password}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    autoComplete="new-password"
                    onChange={value => setData("password_confirmation", value)}
                    error={errors.password_confirmation}
                />
                <div className="flex items-center justify-end">
                    <Button disabled={processing}>Reset Password</Button>
                </div>
            </Form>
        </GuestLayout>
    );
};

export default ResetPassword;
