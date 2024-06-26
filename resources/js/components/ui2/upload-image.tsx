import "react-advanced-cropper/dist/style.css";

import type { ReactNode } from "react";
import type { ImageType } from "react-images-uploading";

import { useState, useRef } from "react";

import { CircleStencil, Cropper } from "react-advanced-cropper";

import ImageUploading from "react-images-uploading";

const ImageUploadingButton = (props: {
    value: ImageType[];
    onChange: (x: ImageType[]) => void;
    children: ReactNode;
}) => {
    return (
        <ImageUploading value={props.value} onChange={props.onChange}>
            {({ onImageUpload, onImageUpdate }) => (
                <div onClick={props.value ? onImageUpload : () => onImageUpdate(0)}>
                    {props.children}
                </div>
            )}
        </ImageUploading>
    );
};

const getImageFormatFromURLData = (dataURL: string) => {
    let format = "";

    for (let i = 11; ; i++) {
        if (dataURL[i] === ";") {
            break;
        }
        format += dataURL[i];
    }
    return format;
};

const dataURLtoFile = (dataURL: string) => {
    const format = getImageFormatFromURLData(dataURL);
    const filename = Date.now() + `.${format}`;
    const base64Data = dataURL.split(",")[1];
    const binaryData = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }
    return new File([uint8Array], filename);
};

const Show = (p: {
    when?: boolean | string | number;
    children: ReactNode;
    fallback?: ReactNode;
}) => {
    return p.when ? <>{p.children}</> : <>{p.fallback || ""}</>;
};

const ImageCropper = (props: {
    open: boolean;
    image?: string;
    onComplete: (filePromise: Promise<File>) => void;
    onClose: () => void;
    circle?: boolean;
    mustCrop?: boolean;
}) => {
    const [isEdit, setIsEdit] = useState(false);

    const cropperRef = useRef<any>(null);

    const handle_done = () => {
        const canvas = cropperRef.current?.getCanvas() as HTMLCanvasElement;
        if (canvas) {
            canvas.toBlob(blob => {
                if (blob) {
                    props.onComplete(Promise.resolve(new File([blob], "pic.png")));
                    setIsEdit(false);
                }
            }, "image/png");
        }
    };

    return (
        <Show when={props.open}>
            <div className="fixed inset-0 z-[200] overflow-auto bg-gray-900 bg-opacity-50">
                <div className="flex min-h-screen items-center justify-center">
                    <div className="mx-auto w-[95%] overflow-hidden rounded-lg bg-white shadow-lg lg:w-[600px]">
                        <div className="p-4">
                            <Show
                                when={isEdit || props.mustCrop}
                                fallback={
                                    <>
                                        <div className="flex w-full flex-col items-center justify-center rounded-lg p-3  pt-10 lg:min-h-[360px] ">
                                            <img
                                                src={props.image}
                                                className="h-[360px] lg:h-[460px]"
                                            />
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <div
                                                onClick={() => setIsEdit(true)}
                                                className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-white"
                                            >
                                                Crop
                                            </div>
                                            <div
                                                className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-white"
                                                onClick={() => {
                                                    if (props.image) {
                                                        props.onComplete(
                                                            Promise.resolve(
                                                                dataURLtoFile(props.image),
                                                            ),
                                                        );
                                                    }
                                                    setIsEdit(false);
                                                }}
                                            >
                                                Done
                                            </div>
                                        </div>
                                    </>
                                }
                            >
                                <>
                                    <div className="mb-4 text-xl font-bold">Image Cropper</div>
                                    <div className="relative h-[265px] w-full rounded-lg p-2 lg:h-[360px]">
                                        <Cropper
                                            ref={cropperRef}
                                            src={props.image}
                                            stencilProps={{ grid: true }}
                                            stencilComponent={
                                                props.circle ? CircleStencil : undefined
                                            }
                                            className="cropper rounded-lg bg-white"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div
                                            onClick={() => {
                                                props.onClose();
                                                setIsEdit(false);
                                            }}
                                            className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-white"
                                        >
                                            Close
                                        </div>
                                        <div
                                            className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-white"
                                            onClick={handle_done}
                                        >
                                            Done
                                        </div>
                                    </div>
                                </>
                            </Show>
                        </div>
                    </div>
                </div>
            </div>
        </Show>
    );
};

export const UploadImage = (props: {
    onComplete: (imageFile: File) => void;
    children: ReactNode;
    circle?: boolean;
    mustCrop?: boolean;
}) => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <ImageUploadingButton
                value={images}
                onChange={newImages => {
                    setDialogOpen(true);
                    setImages(newImages);
                }}
            >
                {props.children}
            </ImageUploadingButton>
            <ImageCropper
                open={dialogOpen}
                image={images.length > 0 ? images[0].dataURL : ""}
                onComplete={imagePromises => {
                    imagePromises.then(image => {
                        props.onComplete(image);
                        setDialogOpen(false);
                    });
                }}
                onClose={() => setDialogOpen(false)}
                circle={props.circle}
                mustCrop={props.mustCrop}
            />
        </>
    );
};
