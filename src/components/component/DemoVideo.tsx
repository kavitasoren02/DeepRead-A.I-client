import { useLayoutEffect } from "react";
import { X } from "lucide-react";
import video from '../../assets/demo_video.mp4'

interface Props {
    setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

const DemoVideo = ({setShowVideo} : Props) => {
    
    useLayoutEffect(() => {
        const root = document.getElementById("rootBody");

        if (root) {
            // save original style in case it wasn't empty
            const prevOverflow = root.style.overflow;

            root.style.overflow = "hidden";

            // cleanup on unmount
            return () => {
            root.style.overflow = prevOverflow;
            };
        }
    }, []);

    return (
        <div className="w-full h-full bg-black/20 absolute top-0 left-0 flex items-center justify-center px-4">
            <div className="h-[620px] w-[1000px] rounded-xl bg-white p-2 ">
                <div className="flex justify-end">
                    <X className="cursor-pointer" onClick={() => setShowVideo(false)} />
                </div>
                <video
                    className="pt-4 w-full"
                    controls
                >
                    <source 
                        src={video}
                    />
                </video>
            </div>
        </div>
    )
}
export default DemoVideo;