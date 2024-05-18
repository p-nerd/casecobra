import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Form, TextField } from "@/components/ui2/form";

import GuestLayout from "@/layouts/GuestLayout";

const ForgotPassword = (props: { status?: string }) => {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = () => {
        post(route("password.email"));
    };

    return (
        <GuestLayout title="Forgot Password">
            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will
                email you a password reset link that will allow you to choose a new one.
            </div>
            {props.status && (
                <div className="mb-4 text-sm font-medium text-green-600">{props.status}</div>
            )}
            <Form onSubmit={submit}>
                <TextField
                    type="email"
                    name="email"
                    value={data.email}
                    autoFocus={true}
                    onChange={value => setData("email", value)}
                    error={errors.email}
                />
                <div className="flex items-center justify-end">
                    <Button disabled={processing}>Email Password Reset Link</Button>
                </div>
            </Form>
        </GuestLayout>
    );
};

export default ForgotPassword;
