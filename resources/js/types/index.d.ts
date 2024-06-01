import type { Config } from "ziggy-js";

export type TID = number;

type TUser = {
    id: TID;
    name: string;
    email: string;
    email_verified_at: string;
};

type TProfile = {
    avatar?: string;
};

type TMessage = {
    id: TID;
    user_id: TID;
    replier?: {
        id: TID;
        name: string;
    };
    content: string;
    created_at: string;
    updated_at: string;
};

export type TProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user?: TUser;
        messages: TMessage[];
        profile?: TProfile;
        admin?: boolean;
    };
    ziggy: Config & { location: string };
};
