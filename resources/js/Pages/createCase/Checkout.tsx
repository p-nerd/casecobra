import type { TID, TProps } from "@/types";

import { Container } from "@/components/ui2/misc";

import Layout from "@/layouts/Layout";

const Checkout = (props: TProps<{ caseDesignId: TID }>) => {
    console.log(props);

    return (
        <Layout title="checkout">
            <Container>Hello</Container>
        </Layout>
    );
};

export default Checkout;
