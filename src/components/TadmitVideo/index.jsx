import React from "react";
import { getVideoIdFromYoutubeUrl } from "../../utils";

export default function TadmitVideo({ tadmitVideo }) {
  const tadmitVideoYouTubeUrlId = getVideoIdFromYoutubeUrl(tadmitVideo);
  return tadmitVideo ? (
    <iframe
      className="w-4/5 m-auto h-128 rounded-lg"
      src={`https://www.youtube.com/embed/${tadmitVideoYouTubeUrlId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ) : null;
}
