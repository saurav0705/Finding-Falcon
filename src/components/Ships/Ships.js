import React from 'react';
import './Ships.css';
const Ships = ({data,planet,selectShip,ship}) => {
    return (
        <>
        {/* <div className="ship-planet">{planet}</div> */}
        {data.map((data,index) =>
            {
                if(data.total_no > 0 ){
                return (
                    <div key={index} className={ship === data.name ? "shipcontainer  active":"shipcontainer"} onClick={()=> {selectShip(data.name,planet)}}>
                        <img src={"Spaceships/"+(index+1)+".png"}  alt="ship"/>
                        <div className="ship-name">{data.name}</div>
                        <div className="ship-total">Total : {data.total_no}</div>
                        <div className="ship-speed">Speed : {data.speed}</div>
                        <div className="ship-distance">Distance : {data.max_distance}</div>
                    </div>
                )}else{
                    return (<></>)
                }
            })}
        </>
    )
};

export default Ships;