import React from "react";
import "./KakaoMap.style.css";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";


const KakaoMap = () => {
  const [ loading, error ] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_API_KEY // 발급 받은 APPKEY
     // 추가 옵션
  })
  return (
   <div className="map-area"> <Map 
   center={{ lat: 37.4480158, lng: 126.6575041}}
   style={{
     width: '100%',
     height: '100%',
     // borderRadius: '20px',
   }}
 >

 
   <MapMarker
     style={{ border: 'tranparent' }}
     position={{ lat: 37.4480158, lng: 126.6575041}}
   >

   
     <div
       style={{
         color: '#9971ff',
         fontSize: '19px',
         fontWeight: '700',
         border: '4px solid #9971ff',
         borderRadius: '10px',
         padding: '2.5px',
       }}
     >
     </div>
   </MapMarker>
 </Map>
</div>
   




   
  );
};

export default KakaoMap;
