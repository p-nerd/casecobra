import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { getImageDimensions } from "@/lib/file";

import { Progress } from "@/Components/ui/progress";
import { ImageIcon, Loader2, MousePointerSquareDashed } from "lucide-react";

import Dropzone from "react-dropzone";
import CreateCaseLayout from "@/Layouts/CreateCaseLayout";

const Upload = () => {
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [progress, setProgress] = useState<number | null>();

    const handleUpload = async (image: File) => {
        try {
            const { height, width } = await getImageDimensions(image);
            router.post(
                "/create-case/upload",
                {
                    image,
                    height,
                    width,
                },
                {
                    forceFormData: true,
                    onProgress: p => setProgress(p?.percentage),
                    onError: e => toast.error(e.image),
                },
            );
        } catch (e: any) {
            toast.error(e?.message || "");
        }
    };

    return (
        <CreateCaseLayout title="Upload your image">
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
                        onDropAccepted={async files => {
                            await handleUpload(files[0]);
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
                        disabled={!!progress}
                        accept={{
                            "image/png": [".png"],
                            "image/jpeg": [".jpeg", ".jpg"],
                            "image/jpg": [".jpg", ".jpeg"],
                        }}
                        multiple={false}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div
                                className="flex h-full w-full flex-1 flex-col items-center justify-center"
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                {isDragOver ? (
                                    <MousePointerSquareDashed className="mb-2 h-6 w-6 text-zinc-500" />
                                ) : progress ? (
                                    <Loader2 className="mb-2 h-6 w-6 animate-spin text-zinc-500" />
                                ) : (
                                    <ImageIcon className="mb-2 h-6 w-6 text-zinc-500" />
                                )}
                                <div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
                                    {progress ? (
                                        <div className="flex flex-col items-center">
                                            <p>Uploading...</p>
                                            <Progress
                                                value={progress}
                                                className="mt-2 h-2 w-40 bg-gray-300"
                                            />
                                        </div>
                                    ) : isDragOver ? (
                                        <p>
                                            <span className="font-semibold ">Drop file</span> to
                                            upload
                                        </p>
                                    ) : (
                                        <p>
                                            <span className="font-semibold ">Click to upload</span>{" "}
                                            or drag and drop
                                        </p>
                                    )}
                                </div>
                                <p className="text-xs text-zinc-500">PNG, JPEG and JPG</p>
                            </div>
                        )}
                    </Dropzone>
                </div>
            </div>
        </CreateCaseLayout>
    );
};

export default Upload;
