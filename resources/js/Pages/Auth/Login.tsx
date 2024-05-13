import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import { CheckboxField, DireactionLink, Form, TextField } from "@/Components/ui2/form";

import GuestLayout from "@/Layouts/GuestLayout";

const Login = (props: { status?: string; canResetPassword: boolean }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = () => {
        post(route("login"));
    };

    return (
        <GuestLayout title="Log in">
            {props.status && (
                <div className="mb-4 text-sm font-medium text-green-600">{props.status}</div>
            )}
            <Form onSubmit={submit}>
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={data.email}
                    autoComplete="username"
                    isFocused={true}
                    onChange={value => setData("email", value)}
                    error={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    autoComplete="current-password"
                    onChange={value => setData("password", value)}
                    error={errors.password}
                />
                <CheckboxField
                    label="Remember me"
                    name="remember"
                    checked={data.remember}
                    onChange={checked => setData("remember", checked)}
                />
                <div className="flex items-center justify-end gap-4">
                    {props.canResetPassword && (
                        <DireactionLink
                            href={route("password.request")}
                            label="Forgot your password?"
                        />
                    )}

                    <Button disabled={processing} type="submit">
                        Log in
                    </Button>
                </div>
            </Form>
        </GuestLayout>
    );
};

export default Login;
