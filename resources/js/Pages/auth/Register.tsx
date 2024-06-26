import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { DirectionLink, Form, TextField } from "@/components/ui2/form";

import GuestLayout from "@/layouts/GuestLayout";

const Register = (props: { to?: string }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = () => {
        const params: Record<string, string> = {};
        if (props.to) {
            params.to = props.to;
        }
        post(route("register", params));
    };

    return (
        <GuestLayout title="Register">
            <Form onSubmit={submit}>
                <TextField
                    label="Name"
                    name="name"
                    value={data.name}
                    autoComplete="name"
                    autoFocus={true}
                    onChange={value => setData("name", value)}
                    required={true}
                    error={errors.name}
                />
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={data.email}
                    autoComplete="username"
                    onChange={value => setData("email", value)}
                    required={true}
                    error={errors.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    autoComplete="new-password"
                    onChange={value => setData("password", value)}
                    required={true}
                    error={errors.password}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    autoComplete="new-password"
                    onChange={value => setData("password_confirmation", value)}
                    required={true}
                    error={errors.password_confirmation}
                />
                <div className="flex items-center justify-end gap-4">
                    <DirectionLink href={route("login")} label="Already registered?" />
                    <Button type="submit" disabled={processing}>
                        Register
                    </Button>
                </div>
            </Form>
        </GuestLayout>
    );
};

export default Register;
