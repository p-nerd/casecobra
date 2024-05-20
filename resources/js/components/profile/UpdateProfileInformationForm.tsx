import type { TProps } from "@/types";
import type { FormEventHandler } from "react";

import { useForm, usePage } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui2/form";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<TProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user?.name || "",
        email: user?.email || "",
    });

    const submit: FormEventHandler = e => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <TextField
                    label="Name"
                    name="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={name => setData("name", name)}
                    required={true}
                    autoFocus={true}
                    autoComplete="name"
                    error={errors.name}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={data.email}
                    onChange={value => setData("email", value)}
                    required={true}
                    autoComplete="username"
                    error={errors.email}
                />

                {mustVerifyEmail && user?.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

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
