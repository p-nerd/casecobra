import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { getImageDimensions } from "@/lib/file";

import { Camera } from "lucide-react";
import { UploadImage } from "@/components/ui2/upload-image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfilePicture = (props: { avatar?: string; name: string }) => {
    const [loading, setLoading] = useState<false>();

    const handleUploadProfilePicture = async (image: File) => {
        try {
            const { height, width } = await getImageDimensions(image);
            router.post(
                route("profile.picture.save"),
                {
                    image,
                    height,
                    width,
                },
                {
                    forceFormData: true,
                    onError: e => {
                        console.log(e);
                        toast.error(e.image);
                        setLoading(false);
                    },
                },
            );
        } catch (e: any) {
            toast.error(e?.message || "");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="group relative">
            <Avatar className="h-48 w-48">
                <AvatarImage src={props?.avatar} alt={props?.name} className="object-contain" />
                <AvatarFallback className="text-3xl">
                    {props?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            {!loading && (
                <UploadImage circle={true} mustCrop={true} onComplete={handleUploadProfilePicture}>
                    <div className="absolute left-0 top-0 hidden h-full w-full rounded-full bg-gray-400/50 transition-all duration-300 group-hover:flex group-hover:flex-col group-hover:items-center group-hover:justify-center">
                        <Camera className="h-10 w-10 text-white" />
                    </div>
                </UploadImage>
            )}
        </div>
    );
};

export default ProfilePicture;
