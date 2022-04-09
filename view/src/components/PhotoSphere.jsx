import React, { useEffect } from 'react';
import { Pannellum } from "pannellum-react";


export default function PhotoSphere({imgUrl}) {

  return (
    <Pannellum
      width="100%"
      height="100vh"
      image={imgUrl}
      pitch={10} 
      yaw={180}
      hfov={130}
      autoLoad
      showZoomCtrl={true}
   >
  </Pannellum>
  );
}
