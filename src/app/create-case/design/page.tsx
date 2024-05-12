import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignCase from "./DesignCase";

const Design = async (p: { searchParams: { id?: string } }) => {
    const { id } = p.searchParams;
    if (!id || typeof id !== "string") {
        return notFound();
    }

    const createCase = await db.createCase.findUnique({ where: { id } });
    if (!createCase) {
        return notFound();
    }

    const { imageUrl, imageHeight, imageWidth } = createCase;

    return (
        <DesignCase
            imageUrl={imageUrl}
            imageDimention={{
                height: imageHeight,
                width: imageWidth,
            }}
        />
    );
};

export default Design;
