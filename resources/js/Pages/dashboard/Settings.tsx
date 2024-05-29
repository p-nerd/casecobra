import { useState, type ReactNode } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Form, TextField } from "@/components/ui2/form";
import { Container, Header, Save, Section, Title } from "@/components/ui2/parts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SiteLayout from "@/layouts/SiteLayout";
import type { TID } from "@/types";

const CaseSettings = (props: { caseBasePrice?: number }) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        caseBasePrice: props.caseBasePrice,
    });

    return (
        <Section>
            <Title>Case Settings</Title>
            <Form
                onSubmit={() => patch(route("dashboard.settings.update"))}
                className="mt-6 max-w-xl gap-6"
            >
                <TextField
                    type="number"
                    label="Case Base Price (in cents)"
                    name="case-base-price"
                    autoComplete="case-base-price"
                    value={`${data.caseBasePrice}`}
                    onChange={v => setData("caseBasePrice", Number(v))}
                    error={errors.caseBasePrice}
                />
                <Save disabled={processing} saved={recentlySuccessful} />
            </Form>
        </Section>
    );
};

const AddPhoneModel = () => {
    const { data, setData, post, errors, reset, processing, recentlySuccessful } = useForm({
        label: "",
        value: "",
        description: "",
    });

    return (
        <Form
            onSubmit={() =>
                post(route("dashboard.settings.phone-model-save"), {
                    onSuccess: reset as any,
                })
            }
            className="mt-6 max-w-xl gap-4"
        >
            <TextField
                label="Label"
                name="phone-model-label"
                autoComplete="phone-model-label"
                value={`${data.label}`}
                onChange={v => setData("label", v)}
                error={errors.label}
            />
            <TextField
                label="Value"
                name="phone-model-value"
                autoComplete="phone-model-value"
                value={`${data.value}`}
                onChange={v => setData("value", v)}
                error={errors.value}
            />
            <TextField
                label="Description"
                name="phone-model-description"
                autoComplete="phone-model-description"
                value={`${data.description}`}
                onChange={v => setData("description", v)}
                error={errors.description}
            />
            <Save disabled={processing} saved={recentlySuccessful} />
        </Form>
    );
};

type TPhoneModel = {
    id: TID;
    label: string;
    value: string;
    description: string;
};

const PhoneModels = (props: { phoneModels: TPhoneModel[] }) => {
    const [show, setShow] = useState(false);

    return (
        <Section className="flex flex-col gap-4">
            <Title>Phone Models</Title>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Label</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.phoneModels.map(phoneModel => (
                        <TableRow>
                            <TableCell>{phoneModel.label}</TableCell>
                            <TableCell>{phoneModel.value}</TableCell>
                            <TableCell>{phoneModel.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div>
                <Button
                    onClick={() => setShow(prev => !prev)}
                    variant={show ? "destructive" : "default"}
                >
                    {show ? "Close Add Phone Model" : "Add New Phone Model"}
                </Button>
            </div>
            {show && <AddPhoneModel />}
        </Section>
    );
};

const Settings = (props: { caseBasePrice?: number; phoneModels: TPhoneModel[] }) => {
    return (
        <Container>
            <Header>
                <Title>Settings</Title>
            </Header>
            <CaseSettings caseBasePrice={props.caseBasePrice} />
            <PhoneModels phoneModels={props.phoneModels} />
        </Container>
    );
};

Settings.layout = (page: ReactNode) => <SiteLayout children={page} title="Site Settings" />;

export default Settings;
