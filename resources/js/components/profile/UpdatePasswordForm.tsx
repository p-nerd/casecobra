import type { FormEventHandler } from "react";

import { useRef } from "react";
import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui2/form";
import { Transition } from "@headlessui/react";

export default function UpdatePasswordForm({ className = "" }: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = e => {
        e.preventDefault();

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
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Password</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 flex flex-col space-y-6">
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
            </form>
        </section>
    );
}
