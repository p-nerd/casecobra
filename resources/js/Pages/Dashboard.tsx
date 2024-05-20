import { Container } from "@/components/ui2/misc";

import SiteLayout from "@/layouts/SiteLayout";

const Dashboard = () => {
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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </Container>
        </SiteLayout>
    );
};

export default Dashboard;
