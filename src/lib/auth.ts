import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export const getUser = async () => {
    return await getKindeServerSession().getUser();
};

export const getIsAdmin = async (user?: KindeUser | null) => {
    if (!user) {
        user = await getUser();
    }
    return user?.email === process.env.ADMIN_EMAIL;
};
