import React from 'react'

const PreviewPic = (props) => {
  const { picURL } = props;
  return (
    <img style={{width:"100%"}} src={picURL} />
  );
}

export default PreviewPic
