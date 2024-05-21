import type { TProps } from "@/types";
import type { TUpdateUser } from "@/components/profile/UpdateUserInfo";
import type { TUpdateProfile } from "@/components/profile/UpdateProfileInfo";

import { usePage } from "@inertiajs/react";

import { Container, Section } from "@/components/ui2/misc";

import SiteLayout from "@/layouts/SiteLayout";
import DeleteUser from "@/components/profile/DeleteUser";
import ProfilePicture from "@/components/profile/ProfilePicture";
import UpdateUserInfo from "@/components/profile/UpdateUserInfo";
import UpdatePassword from "@/components/profile/UpdatePassword";
import UpdateProfileInfo from "@/components/profile/UpdateProfileInfo";

const Profile = (
    props: TProps<{
        user: TUpdateUser;
        profile: TUpdateProfile;
        mustVerifyEmail: boolean;
        status?: string;
    }>,
) => {
    const auth = usePage<TProps>().props.auth;

    return (
        <SiteLayout title="Profile">
            <Container className="mx-auto space-y-6 py-12">
                <Section className="flex flex-col items-center justify-center gap-4 lg:flex-row">
                    <ProfilePicture avatar={auth.profile?.avatar} name={auth.user?.name || ""} />
                    <div className="hidden text-xl lg:block">
                        <div className="text-2xl font-semibold">{auth.user?.name}</div>
                        <div>{auth.user?.email}</div>
                    </div>
                </Section>
                <UpdateUserInfo
                    user={props.user}
                    mustVerifyEmail={props.mustVerifyEmail}
                    status={props.status}
                />
                <UpdateProfileInfo profile={props.profile} />
                <UpdatePassword />
                <DeleteUser />
            </Container>
        </SiteLayout>
    );
};

export default Profile;
