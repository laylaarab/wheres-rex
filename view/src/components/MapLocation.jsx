import React, { useEffect } from 'react';
import ImageMapper from 'react-img-mapper';


export default function MapLocation({width, height, socket}) {
  function handleImgClick(evt) {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    socket.emit('submitGuess', coords)
  }
  return (
    <ImageMapper className="map-image" src={'/map.png'}  width={width} height={height} onImageClick={handleImgClick}/>
  );
}
