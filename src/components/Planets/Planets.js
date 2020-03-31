import React from 'react';
import './Planets.css';
const Planets = ({data,image,select,active}) => {
    return (
       <div className={active === data.name ?"planet-container  active-planet":"planet-container "} onClick={()=>{select(data.name);}}>
           <img  className="planet-image" src={"Planets/"+image+".png"} alt="planet" height="150" width="150"/>
           <div className="planet-heading">{data.name}</div>
           <div className="planet-distance">Distance : {data.distance}</div>
       </div>
    )
};

export default Planets;