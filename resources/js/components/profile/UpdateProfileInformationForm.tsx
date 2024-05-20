import type { TProps } from "@/types";

import { useForm, usePage } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Transition } from "@headlessui/react";
import { Form, TextField } from "@/components/ui2/form";

const UpdateProfileInformationForm = ({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) => {
    const user = usePage<TProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        country: "",
        zip: "",
    });

    const submit = () => {
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

            <Form onSubmit={submit} className="mt-6 gap-6">
                <TextField
                    label="Name"
                    name="name"
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
                <TextField
                    label="Phone"
                    name="phone"
                    type="text"
                    value={data.phone}
                    onChange={value => setData("phone", value)}
                    autoComplete="phone"
                    error={errors.phone}
                />
                <TextField
                    label="Address 1"
                    name="address_1"
                    value={data.address_1}
                    onChange={value => setData("address_1", value)}
                    autoComplete="address_1"
                    error={errors.address_1}
                />
                <TextField
                    label="Address 2"
                    name="address_2"
                    value={data.address_2}
                    onChange={value => setData("address_2", value)}
                    autoComplete="address_2"
                    error={errors.address_2}
                />
                <TextField
                    label="City"
                    name="city"
                    value={data.city}
                    onChange={value => setData("city", value)}
                    autoComplete="city"
                    error={errors.city}
                />
                <TextField
                    label="State"
                    name="state"
                    value={data.state}
                    onChange={value => setData("state", value)}
                    autoComplete="state"
                    error={errors.state}
                />
                <TextField
                    label="Country"
                    name="country"
                    value={data.country}
                    onChange={value => setData("country", value)}
                    autoComplete="country"
                    error={errors.country}
                />
                <TextField
                    label="Zip"
                    name="zip"
                    value={data.zip}
                    onChange={value => setData("zip", value)}
                    autoComplete="zip"
                    error={errors.zip}
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
        </section>
    );
};

export default UpdateProfileInformationForm;
