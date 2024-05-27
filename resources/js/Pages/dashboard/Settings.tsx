import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Transition } from "@headlessui/react";
import { Form, TextField } from "@/components/ui2/form";
import { Container, Header, Header2, Section, Title } from "@/components/ui2/misc";

import SiteLayout from "@/layouts/SiteLayout";
import { ReactNode } from "react";

const CaseSettings = (props: { caseBasePrice?: number }) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        caseBasePrice: props.caseBasePrice,
    });

    return (
        <Section>
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
        <Container>
            <Header2>
                <Title>Settings</Title>
            </Header2>
            <CaseSettings caseBasePrice={props.caseBasePrice} />
        </Container>
    );
};

Settings.layout = (page: ReactNode) => <SiteLayout children={page} title="Site Settings" />;

export default Settings;
