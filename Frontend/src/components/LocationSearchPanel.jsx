import React from "react";

const LocationSearchPanel = (props)=>{
    
    const handleSuggestionClick = (suggestion) =>{
        const location = typeof suggestion === 'string' ? suggestion : suggestion?.description ;
        if(props.activeField === 'pickUp'){
            props.setPickUpLocation(location)
        }
        else{
            props.setDestinationLocation(location)
        }
    }

    return(
        <div>
            {
                props.suggestions.map(function(element,index){
                    return(
                        <div key={index} onClick={()=> handleSuggestionClick(element)} 
                            className="flex items-center gap-2 my-3 border-2 border-gray-50 active:border-black rounded-xl p-2 justify-start">
                            <h2 className="bg-[#eeeeee] h-8 w-20 flex items-center justify-center rounded-2xl"><i className="ri-map-pin-line text-xl"></i></h2>
                            <h4 className="font-medium">
                                {typeof element === 'string' ? element : element?.description || 'Unknown Location'}
                            </h4>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default LocationSearchPanel