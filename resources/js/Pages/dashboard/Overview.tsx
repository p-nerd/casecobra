import { Container, Header } from "@/components/ui2/misc";

import SiteLayout from "@/layouts/SiteLayout";

const Overview = () => {
    return (
        <SiteLayout title="Profile">
            <Container className="py-12">
                <div className="mx-auto space-y-6">
                    <Header>Overview</Header>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </Container>
        </SiteLayout>
    );
};

export default Overview;
