import MapHeading from "./map-heading"
import ChoroplethWorldMap from "./map"



const MapComponent = () => {
    
    return (
        <div>
            <MapHeading />
            <div className="bg-white dark:bg-slate-800 p-4 py-8 my-5 rounded-lg">

            <ChoroplethWorldMap/>
            </div>
        </div>
    )
}

export default MapComponent