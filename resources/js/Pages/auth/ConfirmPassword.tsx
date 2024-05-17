import { useEffect } from "react";
import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Form, TextField } from "@/components/ui2/form";

import GuestLayout from "@/layouts/GuestLayout";

const ConfirmPassword = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = () => {
        post(route("password.confirm"));
    };

    return (
        <GuestLayout title="Confirm Password">
            <div className="mb-4 text-sm text-gray-600">
                This is a secure area of the application. Please confirm your password before
                continuing.
            </div>
            <Form onSubmit={submit}>
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    isFocused={true}
                    onChange={value => setData("password", value)}
                    error={errors.password}
                />
                <div className="flex items-center justify-end">
                    <Button disabled={processing}>Confirm</Button>
                </div>
            </Form>
        </GuestLayout>
    );
};

export default ConfirmPassword;
