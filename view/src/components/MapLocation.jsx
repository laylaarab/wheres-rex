import React, { useEffect } from 'react';
import ImageMapper from 'react-img-mapper';


export default function MapLocation({width, height, handler}) {
  function handleImgClick(evt) {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    handler(coords)
  }
  return (
    <ImageMapper className="map-image" src={'/map.png'}  width={width} height={height} onImageClick={handleImgClick}/>
  );
}
