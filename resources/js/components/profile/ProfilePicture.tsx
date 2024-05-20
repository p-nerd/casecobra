import { Camera } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfilePicture = (props: { avatar?: string; name: string }) => {
    return (
        <div className="group relative">
            <Avatar className="h-36 w-36">
                <AvatarImage src={props?.avatar} alt={props?.name} />
                <AvatarFallback>{props?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="absolute left-0 top-0 hidden h-full w-full rounded-full bg-gray-400/50 transition-all duration-300 group-hover:flex group-hover:flex-col group-hover:items-center group-hover:justify-center">
                <Camera className="h-10 w-10 text-white" />
            </div>
        </div>
    );
};

export default ProfilePicture;
