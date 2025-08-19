import {useState, useEffect} from "react";
import {LoadScript, GoogleMap, Marker} from '@react-google-maps/api'

const containerStyle ={
    width: '100%',
    height: '100%'
};

const center = {
    lat: -22.23,
    lng: -87.34
}

const LiveTracking = ()=>{

    const [ currentPosition, setCurrentPosition ] = useState(center);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    // useEffect(() => {
    //     const updatePosition = () => {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             const { latitude, longitude } = position.coords;

    //             console.log('Position updated:', latitude, longitude);
    //             setCurrentPosition({
    //                 lat: latitude,
    //                 lng: longitude
    //             });
    //         });
    //     };

    //     updatePosition(); 

    //     const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds

    // }, []);

    return (
         <LoadScript googleMapsApiKey={import.meta.env.VITE_GO_MAPS_API}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    )
}

export default LiveTracking;