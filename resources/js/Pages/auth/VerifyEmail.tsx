import { useForm } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { Form } from "@/components/ui2/form";
import { Button } from "@/components/ui/button";

import GuestLayout from "@/layouts/GuestLayout";

const VerifyEmail = (props: { status?: string }) => {
    const { post, processing } = useForm({});

    const submit = () => {
        post(route("verification.send"));
    };

    return (
        <GuestLayout title="Email Verification">
            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify your email address
                by clicking on the link we just emailed to you? If you didn't receive the email, we
                will gladly send you another.
            </div>
            {props.status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during
                    registration.
                </div>
            )}
            <Form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button disabled={processing}>Resend Verification Email</Button>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Log Out
                    </Link>
                </div>
            </Form>
        </GuestLayout>
    );
};

export default VerifyEmail;
