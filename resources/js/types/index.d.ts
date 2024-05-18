import type { Config } from "ziggy-js";

export type TID = number;

export type TUser = {
    id: TID;
    name: string;
    email: string;
    email_verified_at: string;
};

export type TProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: TUser;
    };
    ziggy: Config & { location: string };
};
