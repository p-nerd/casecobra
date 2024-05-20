import type { TProps } from "@/types";

import { usePage } from "@inertiajs/react";

import { Container, Section } from "@/components/ui2/misc";

import SiteLayout from "@/layouts/SiteLayout";
import ProfilePicture from "@/components/profile/ProfilePicture";
import DeleteUserForm from "@/components/profile/DeleteUserForm";
import UpdatePasswordForm from "@/components/profile/UpdatePasswordForm";
import UpdateProfileInformationForm from "@/components/profile/UpdateProfileInformationForm";

const Profile = (props: TProps<{ mustVerifyEmail: boolean; status?: string }>) => {
    const { user, profile } = usePage<TProps>().props.auth;
    return (
        <SiteLayout title="Profile">
            <Container className="py-12">
                <div className="mx-auto space-y-6">
                    <Section className="flex flex-col items-center justify-center gap-4 lg:flex-row">
                        <ProfilePicture avatar={profile?.avatar} name={user?.name || ""} />
                        <div className="hidden lg:block">
                            <div className="text-lg font-semibold">{user?.name}</div>
                            <div>{user?.email}</div>
                        </div>
                    </Section>
                    <Section>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={props.mustVerifyEmail}
                            status={props.status}
                            className="max-w-xl"
                        />
                    </Section>
                    <Section>
                        <UpdatePasswordForm className="max-w-xl" />
                    </Section>
                    <Section>
                        <DeleteUserForm className="max-w-xl" />
                    </Section>
                </div>
            </Container>
        </SiteLayout>
    );
};

export default Profile;
