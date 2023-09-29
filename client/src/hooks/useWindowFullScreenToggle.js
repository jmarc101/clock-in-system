import { useState, useEffect } from "react";

const useWindowFullscreenToggle = () => {
    const [isFullscreen, setIsFullscreen] = useState(document.fullscreenElement !== null);

    useEffect(() => {
        // Handle the change in fullscreen mode
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement !== null);
        };

        // Add event listener to listen for the fullscreen change
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    function toggleFullscreen() {
        // Check if we are currently in fullscreen mode
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

    return {
        isFullscreen,
        toggleFullscreen,
    };
};
export default useWindowFullscreenToggle;
