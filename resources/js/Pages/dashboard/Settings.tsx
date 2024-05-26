import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Transition } from "@headlessui/react";
import { Form, TextField } from "@/components/ui2/form";
import { Container, Header, Section } from "@/components/ui2/misc";

import SiteLayout from "@/layouts/SiteLayout";

const CaseSettings = (props: { caseBasePrice?: number }) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        caseBasePrice: props.caseBasePrice,
    });

    return (
        <Section>
            <h2 className="text-lg font-medium text-gray-900">Case Settings</h2>
            <Form
                onSubmit={() => patch(route("dashboard.settings.update"))}
                className="mt-6 max-w-xl gap-6"
            >
                <TextField
                    type="number"
                    label="Case Base Price (in cents)"
                    name="case_base_price"
                    autoComplete="case_base_price"
                    value={`${data.caseBasePrice}`}
                    onChange={v => setData("caseBasePrice", Number(v))}
                    error={errors.caseBasePrice}
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

const Settings = (props: { caseBasePrice?: number }) => {
    return (
        <SiteLayout title="Site Settings">
            <Container className="flex flex-col gap-4 py-12">
                <Header>Settings</Header>
                <CaseSettings caseBasePrice={props.caseBasePrice} />
            </Container>
        </SiteLayout>
    );
};

export default Settings;
