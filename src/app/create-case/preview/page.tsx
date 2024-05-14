import { db } from "@/db";
import { notFound } from "next/navigation";

import PreviewClient from "./PreviewClient";

const Preview = async (p: { searchParams: { id?: string } }) => {
    const { id } = p.searchParams;
    if (!id || typeof id !== "string") {
        return notFound();
    }

    const createCase = await db.createCase.findUnique({ where: { id } });
    if (!createCase) {
        return notFound();
    }

    return <PreviewClient createCase={createCase} />;
};

export default Preview;
