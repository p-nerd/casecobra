"use client";

import { useState, useTransition } from "react";
import Dropzone from "react-dropzone";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Upload = () => {
    const router = useRouter();

    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const [isPending, startTransition] = useTransition();

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId;
            startTransition(() => {
                router.push(`/configure/design?id=${configId}`);
            });
        },
        onUploadProgress: p => {
            setUploadProgress(p);
        },
    });

    return (
        <div
            className={cn(
                "relative my-16 flex h-full w-full flex-1 flex-col",
                "items-center justify-center rounded-xl bg-gray-900/5",
                "cursor-pointer p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl",
                {
                    "bg-blue-900/10 ring-blue-900/25": isDragOver,
                },
            )}
        >
            <div className="relative flex w-full flex-1 flex-col items-center justify-center">
                <Dropzone
                    onDropAccepted={files => {
                        startUpload(files, { configId: undefined });
                        setIsDragOver(false);
                    }}
                    onDropRejected={files => {
                        const [file] = files;
                        toast.error(`${file.file.type} is not supported.`, {
                            description: "Please choose a PNG, JPEG and JPG image",
                        });
                        setIsDragOver(false);
                    }}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}
                    disabled={isUploading || isPending}
                    accept={{
                        "image/png": [".png"],
                        "image/jpeg": [".jpeg", ".jpg"],
                        "image/jpg": [".jpg", ".jpeg"],
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className="flex h-full w-full flex-1 flex-col items-center justify-center"
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            {isDragOver ? (
                                <MousePointerSquareDashed className="mb-2 h-6 w-6 text-zinc-500" />
                            ) : isUploading || isPending ? (
                                <Loader2 className="mb-2 h-6 w-6 animate-spin text-zinc-500" />
                            ) : (
                                <Image className="mb-2 h-6 w-6 text-zinc-500" />
                            )}
                            <div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
                                {isUploading ? (
                                    <div className="flex flex-col items-center">
                                        <p>Uploading...</p>
                                        <Progress
                                            value={uploadProgress}
                                            className="mt-2 h-2 w-40 bg-gray-300"
                                        />
                                    </div>
                                ) : isPending ? (
                                    <div className="flex flex-col items-center">
                                        <p>Redirecting, please wait...</p>
                                    </div>
                                ) : isDragOver ? (
                                    <p>
                                        <span className="font-semibold ">Drop file</span> to upload
                                    </p>
                                ) : (
                                    <p>
                                        <span className="font-semibold ">Click to upload</span> or
                                        drag and drop
                                    </p>
                                )}
                            </div>
                            {isPending ? (
                                <></>
                            ) : (
                                <p className="text-xs text-zinc-500">PNG, JPEG and JPG</p>
                            )}
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    );
};

export default Upload;
