import type { Config } from "ziggy-js";

export type TID = number;

type TUser = {
    id: TID;
    name: string;
    email: string;
    email_verified_at: string;
};

type TChat = {
    id: TID;
};

type TProfile = {
    avatar?: string;
};

export type TProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user?: TUser;
        chat?: TChat;
        profile?: TProfile;
        admin?: boolean;
    };
    ziggy: Config & { location: string };
};
