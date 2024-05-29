import { useForm } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { Form, TextField } from "@/components/ui2/form";
import { Save, Section } from "@/components/ui2/misc";

export type TUpdateUser = {
    name: string;
    email: string;
    email_verified_at: string;
};

const UpdateUserInfo = (props: {
    user: TUpdateUser;
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: props.user.name,
        email: props.user.email,
    });

    return (
        <Section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">User Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's user information and email address.
                </p>
            </header>

            <Form onSubmit={() => patch(route("profile.update"))} className="mt-6 max-w-xl gap-6">
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
                {props.mustVerifyEmail && props.user.email_verified_at === null && (
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

                        {props.status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}
                <Save disabled={processing} saved={recentlySuccessful} />
            </Form>
        </Section>
    );
};

export default UpdateUserInfo;
