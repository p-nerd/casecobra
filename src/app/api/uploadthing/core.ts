import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import { db } from "@/db";

import sharp from "sharp";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .input(z.object({ createCaseId: z.string().optional() }))
        .middleware(async ({ input }) => {
            return { input };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const res = await fetch(file.url);
            const buffer = await res.arrayBuffer();
            const { width, height } = await sharp(buffer).metadata();

            const { createCaseId } = metadata.input;
            if (!createCaseId) {
                const createCase = await db.createCase.create({
                    data: {
                        imageUrl: file.url,
                        imageWidth: width || 500,
                        imageHeight: height || 500,
                    },
                });
                return { createCaseId: createCase.id };
            } else {
                const createCase = await db.createCase.update({
                    where: {
                        id: createCaseId,
                    },
                    data: {
                        croppedImageUrl: file.url,
                    },
                });
                return { createCaseId: createCase.id };
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
