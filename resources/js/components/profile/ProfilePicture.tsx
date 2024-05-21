import { Camera } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UploadImage } from "../ui2/upload-image";
import { useState } from "react";
import { getImageDimensions } from "@/lib/file";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

const ProfilePicture = (props: { avatar?: string; name: string }) => {
    const [loading, setLoading] = useState<false>();

    const handleUploadProfilePicture = async (image: File) => {
        try {
            const { height, width } = await getImageDimensions(image);
            router.post(
                "/profiles/upload-pic",
                {
                    image,
                    height,
                    width,
                },
                {
                    forceFormData: true,
                    onError: e => {
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
                <AvatarImage src={props?.avatar} alt={props?.name} />
                <AvatarFallback>{props?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            {!loading && (
                <UploadImage onComplete={handleUploadProfilePicture}>
                    <div className="absolute left-0 top-0 hidden h-full w-full rounded-full bg-gray-400/50 transition-all duration-300 group-hover:flex group-hover:flex-col group-hover:items-center group-hover:justify-center">
                        <Camera className="h-10 w-10 text-white" />
                    </div>
                </UploadImage>
            )}
        </div>
    );
};

export default ProfilePicture;
