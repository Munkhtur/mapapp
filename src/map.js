/*global google*/
import {GoogleMapsProvider, useGoogleMap} from '@ubilabs/google-maps-react-hooks';
import {useState, useEffect, useRef} from 'react';
import { SceneWithSpinningBoxes } from './cube';




export default function Map(){

    const [mapContainer, setMapcontainer] = useState(null)
    return <><GoogleMapsProvider
        googleMapsAPIKey ="AIzaSyBpnsYE8hNKnvG_H1mpBbrAN8y1n6uod1c"
        mapOptions={{zoom:12, center: {lat:43.68, lng:-79.43}} }
        mapContainer={mapContainer}
    >
        <div  id='#mapImage'  ref={(node) => setMapcontainer(node)} style= {{height: '90vh'}} />
    
        <Location /> 
    </GoogleMapsProvider>
    </>
}

function Location(){
    const [lat, setLat]  = useState(47.85) 
    const [lng, setLng]  = useState(106.96)
    const [imageLink, setImageLink] = useState("")
    const map = useGoogleMap()
    const markerRef = useRef()

    useEffect(()=>{
        console.log('linkchanfge')
    },[imageLink])
 
    useEffect(()=>{
        if(!map || markerRef.current) return 
        markerRef.current = new google.maps.Marker({map})
    },[map])

    useEffect(()=>{
        if (!markerRef.current) return ;
        if (isNaN(lat) || isNaN(lng)) return
        markerRef.current.setPosition({lat, lng})
        map.panTo({lat, lng})
    },[lat, lng, map])

    return <div className='lat-lng'>
        <input
        type="number"
        value={lat}
        onChange={(e)=> setLat(parseFloat(e.target.value))}
        step={0.01}
        >    
        </input>
        <input
        type="number"
        value={lng}
        onChange={(e)=> setLng(parseFloat(e.target.value))}
        step={0.01}
        >    
        </input>
        <button onClick={() => setImageLink(Export(lat, lng))}>
            Capture Image
            </button>
      
        <SceneWithSpinningBoxes imageLink={imageLink}/>
            

    </div>
}

    

    function Export(lat, lng)  {     
        var link = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=6&size=640x400&path=weight:3|color:blue|enc:aofcFz_bhVJ[n@ZpAp@t@b@uA%60FuAzEoCdJiDpLs@VM@y@s@oBcBkAw@cCoAuBu@eEaAiAa@iAi@w@a@o@g@g@k@e@u@uAaCc@i@w@y@eAo@i@UaBc@kAGo@@]JyKA}EC{G?q@?IGKCeGA{CAyCAyEAwEBaFAkJ?yGEyAIiLAiB?{@BcBJ}@@aBGwBEo@A@j@BjBFTHjEl@fOD%60C?|@RARAJERWPL@FE^S%60AI%60A&key=AIzaSyBpnsYE8hNKnvG_H1mpBbrAN8y1n6uod1c
        `     
        return link
    }
