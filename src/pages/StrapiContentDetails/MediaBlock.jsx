import React from "react";
import ReactPlayer from "react-player";
import { FileType } from "../../shared/enum";

function MediaBlock({ block }) {
  const fileData = block.file.data ? block.file?.data?.attributes : null;
  const videoURL = block.videoUrl;
  const audioURL = block.audioUrl;

  return (
    <div>
      {/* for files only */}
      <div className="mb-[16px]">
        {fileData && fileData?.mime?.includes(FileType.IMAGE) ? (
          <img
            className="block my-0 mx-auto rounded-2xl"
            src={
              fileData.formats.medium
                ? fileData.formats.medium.url
                : fileData?.url
            }
          />
        ) : fileData?.mime?.includes(FileType.AUDIO) ? (
          <div>
            <audio
              className="block mx-auto my-0 pt-[16px]"
              controls
              src={fileData?.url}
            ></audio>
            <caption className="text-center w-full block">
              {fileData?.caption}
            </caption>
          </div>
        ) : fileData?.mime?.includes(FileType.VIDEO) ? (
          <div className="block mx-auto my-0 w-[50%]">
            <video controls preload="metadata">
              <source src={`${fileData?.url}#t=1.0`} type={fileData?.mime} />
            </video>
          </div>
        ) : null}
      </div>
      {/* for video url only */}
      {videoURL && (
        <ReactPlayer className="block mx-auto my-0" url={videoURL} />
      )}
      {/* for audio url only */}
      {audioURL && (
        <audio
          className="block mx-auto my-0 pt-[16px]"
          controls
          src={audioURL}
        ></audio>
      )}
    </div>
  );
}

export default MediaBlock;
