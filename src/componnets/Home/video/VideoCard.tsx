import { useRef, useState } from "react";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
type VideoCardProps = {
  video_url: string;
  post_id: string;
};

function VideoCard({ video_url, post_id }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const videoHandler = (control: string) => {
    if (control === "play") {
      videoRef.current && videoRef.current.play();
      setPlaying(true);
      var vid: number = (document.getElementById(post_id) as HTMLVideoElement)
        .duration;
      setVideoTime(vid);
    } else if (control === "pause") {
      videoRef.current && videoRef.current.pause();
      setPlaying(false);
    }
  };

  const fastForward = () => {
    videoRef.current && (videoRef.current.currentTime += 5);
  };

  const revert = () => {
    videoRef.current && (videoRef.current.currentTime -= 5);
  };

  window.setInterval(function () {
    if (videoRef.current) {
      setCurrentTime(videoRef.current?.currentTime);
      setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }
  }, 1000);

  return (
    <div className="relative max-h-[550px] min-h-[350px] w-full ">
      <video
        id={post_id}
        ref={videoRef}
        onClick={() => videoHandler(!playing ? "play" : "pause")}
        className="max-h-[550px] min-h-[350px] w-full"
        src={video_url}
      ></video>

      <div className=" absolute ttop-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-1/2 top-1/2">
        <div className="">
          {
            !playing && (
              // <img
              //   onClick={() => videoHandler("pause")}
              //   className="controlsIcon--small"
              //   alt=""
              //   src="/pause.svg"
              // />
              <button onClick={() => videoHandler("play")}>
                <AiOutlinePlayCircle size={35}></AiOutlinePlayCircle>
                {/* <AiOutlinePauseCircle size={35}></AiOutlinePauseCircle> */}
              </button>
            )
            //: (
            //   // <img
            //   //   onClick={() => videoHandler("play")}
            //   //   className="controlsIcon--small"
            //   //   alt=""
            //   //   src="/play.svg"
            //   // />
            //   <button onClick={() => videoHandler("play")}>
            //     <AiOutlinePlayCircle size={35}></AiOutlinePlayCircle>
            //   </button>
            // )
          }
        </div>
      </div>

      <div className="absolute bottom-0 px-4 flex items-center w-full justify-between">
        <div>
          <p>
            {Math.floor(currentTime / 60) +
              ":" +
              ("0" + Math.floor(currentTime % 60)).slice(-2)}
          </p>
        </div>
        <div className="h-[5px] w-[80%] border rounded-md bg-red">
          <div
            style={{ width: `${progress}%` }}
            className="bg-black  h-full"
          ></div>
        </div>
        <div>
          <p className="">
            {Math.floor(videoTime / 60) +
              ":" +
              ("0" + Math.floor(videoTime % 60)).slice(-2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
