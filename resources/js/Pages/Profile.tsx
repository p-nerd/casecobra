import type { TProps } from "@/types";

import { Container } from "@/components/ui2/misc";

import SiteLayout from "@/layouts/SiteLayout";
import DeleteUserForm from "@/components/profile/DeleteUserForm";
import UpdatePasswordForm from "@/components/profile/UpdatePasswordForm";
import UpdateProfileInformationForm from "@/components/profile/UpdateProfileInformationForm";

const Profile = (props: TProps<{ mustVerifyEmail: boolean; status?: string }>) => {
    return (
        <SiteLayout title="Profile">
            <Container className="py-12">
                <div className="mx-auto space-y-6">
                    <header className="bg-white shadow lg:rounded-lg">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                Profile
                            </h2>
                        </div>
                    </header>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={props.mustVerifyEmail}
                            status={props.status}
                            className="max-w-xl"
                        />
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </Container>
        </SiteLayout>
    );
};

export default Profile;
