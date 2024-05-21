import { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui2/misc";
import { Form, TextField } from "@/components/ui2/form";

import Modal from "@/components/Modal";

const DeleteUser = () => {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = () => {
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <Section className="space-y-6">
            <header>
                <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently
                    deleted. Before deleting your account, please download any data or information
                    that you wish to retain.
                </p>
            </header>

            <Button variant="destructive" onClick={confirmUserDeletion}>
                Delete Account
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <Form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mb-6 mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be
                        permanently deleted. Please enter your password to confirm you would like to
                        permanently delete your account.
                    </p>

                    <TextField
                        name="password"
                        type="password"
                        value={data.password}
                        ref={passwordInput}
                        autoFocus={true}
                        onChange={value => setData("password", value)}
                        className="w-3/4"
                        placeholder="Password"
                        error={errors.password}
                    />
                    <div className="mt-6 flex justify-end">
                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant="destructive" className="ms-3" disabled={processing}>
                            Delete Account
                        </Button>
                    </div>
                </Form>
            </Modal>
        </Section>
    );
};

export default DeleteUser;
