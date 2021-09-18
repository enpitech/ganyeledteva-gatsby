import React from "react";
import { getVideoIdFromYoutubeUrl } from "../../utils";

export default function TadmitVideo({ tadmitVideo, className, mute }) {
  const tadmitVideoYouTubeUrlId = getVideoIdFromYoutubeUrl(tadmitVideo);
  return tadmitVideo ? (
    <iframe
      className={`${className} m-auto sm:h-128 h-auto rounded-xl  sm:rounded-none`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      src={`https://www.youtube.com/embed/${tadmitVideoYouTubeUrlId}?autoplay=1&loop=1&rel=0&modestbranding=1&autohide=1&showinfo=0&mute=${
        mute ? 1 : 0
      }`}
      title="YouTube video player"
      frameBorder="0"
      allowFullScreen
    />
  ) : null;
}
