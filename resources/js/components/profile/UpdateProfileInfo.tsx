import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui2/misc";
import { Transition } from "@headlessui/react";
import { Form, TextField } from "@/components/ui2/form";

export type TUpdateProfile = {
    phone: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
};

const UpdateProfileInfo = (props: { profile: TUpdateProfile }) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm(props.profile);

    return (
        <Section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information.
                </p>
            </header>

            <Form
                onSubmit={() => patch(route("profile.billing.update"))}
                className=" mt-6 max-w-xl gap-6"
            >
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
        </Section>
    );
};

export default UpdateProfileInfo;
