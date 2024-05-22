import type { TOrder } from "@/components/dashboard/OrderDataTable/orderSchema";

import { Container, Header } from "@/components/ui2/misc";

import SiteLayout from "@/layouts/SiteLayout";
import OrderDataTable from "@/components/dashboard/OrderDataTable";

const Orders = (props: { orders: TOrder[] }) => {
    return (
        <SiteLayout title="Manage Orders">
            <Container className="mx-auto space-y-6 py-12">
                <Header>Manage Orders</Header>
                <OrderDataTable />
            </Container>
        </SiteLayout>
    );
};

export default Orders;
