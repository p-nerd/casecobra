import type { TID } from "@/types";

import { router } from "@inertiajs/react";
import { useCallback } from "react";

export const useChangeStatus = (from: "index" | "show" = "index") => {
    return useCallback(
        (status: string, orderId: TID) => {
            router.patch(route("dashboard.orders.update", { order: orderId }), { status, from });
        },
        [router],
    );
};

export const useDeleteOrder = () => {
    return useCallback(
        (orderId: TID) => {
            if (confirm("Are you sure?")) {
                router.delete(route("dashboard.orders.destroy", { order: orderId }));
            }
        },
        [router],
    );
};
