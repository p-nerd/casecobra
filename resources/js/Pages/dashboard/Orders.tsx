import { Container, Header } from "@/components/ui2/misc";

import SiteLayout from "@/layouts/SiteLayout";
import DataTable from "@/components/ui2/data-table";

const Orders = () => {
    return (
        <SiteLayout title="Manage Orders">
            <Container className="mx-auto space-y-6 py-12">
                <Header>Manage Orders</Header>
                <DataTable />
            </Container>
        </SiteLayout>
    );
};

export default Orders;
