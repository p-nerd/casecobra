import { useRef } from "react";
import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Form, TextField } from "@/components/ui2/form";
import { Transition } from "@headlessui/react";
import { Section } from "@/components/ui2/misc";

const UpdatePassword = () => {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = () => {
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: errors => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <Form onSubmit={updatePassword} className="mt-6 max-w-xl">
                <TextField
                    label="Current Password"
                    ref={currentPasswordInput}
                    value={data.current_password}
                    onChange={value => setData("current_password", value)}
                    type="password"
                    autoComplete="current-password"
                    name="current_password"
                    error={errors.current_password}
                />
                <TextField
                    label="New Password"
                    name="password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={value => setData("password", value)}
                    type="password"
                    autoComplete="new-password"
                    error={errors.password}
                />
                <TextField
                    label="Confirm Password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={value => setData("password_confirmation", value)}
                    type="password"
                    autoComplete="new-password"
                    error={errors.password_confirmation}
                />
                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </Form>
        </Section>
    );
};

export default UpdatePassword;
