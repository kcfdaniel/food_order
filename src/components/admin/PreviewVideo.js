import React from 'react'
const PreviewVideo = (props) => {
  const { videoURL } = props;
  return (
    <video width="100%" controls className="responsive-video">
      <source src={videoURL} id="video_here"/>
        Your browser does not support HTML5 video.
    </video>
  );
}

export default PreviewVideo
