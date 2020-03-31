import React, { useEffect, useState } from 'react';
import Planets from '../Planets/Planets';
import Ships from '../Ships/Ships';
import API from '../resource.json';
import './Main.css';
import Toast from '../Toast/Toast';
import Button from '../Button/Button';
import {useHistory} from 'react-router-dom';
import Loading from '../Loading/Loading';

const Main = () => {
    const [planets,setPlanets] = useState([]);
    const [ships,setShips] = useState([]);
    const [planet,setPlanet] = useState('');
    const [ship,setShip] = useState('');
    const [result,setResult] = useState(new Map());
    const [warning,setWarning] = useState('');
    const [random,setRandom] = useState('asca');
    const [token,setToken] = useState('');
    const [show,setShow] = useState(false);
    const [msg,setMsg] = useState('FIND FALCON');
    let history = useHistory();
    useEffect(()=>{
        // console.log(API['planets'])
        fetch(API['planets'])
            .then(resp => resp.json())
            .then(resp => {setPlanets(resp)})

        fetch(API['ships'])
            .then(resp => resp.json())
            .then(resp => {setShips(resp)})

        fetch(API['token'],{method:'POST',headers: {
            'Accept': 'application/json' 
          }})
            .then(resp => resp.json())
            .then(resp => {setToken(resp.token)})
    },[])

    const select = (planet) => {
        setPlanet(planet);
        if(result.get(planet)){
            setShip(result.get(planet))
        }else{
            setShip('');
        }

        

    };

    const remaining = (ship) => {
        let count = ships.find((sh) => {
            if(sh.name === ship){
                return sh.total_no;
            }
        })
        count = count.total_no;
       let keys = [...result.keys()];
       let alloted = 0;
       keys.map(key => {if(result.get(key)=== ship){ alloted++;}})
        return alloted<count;
    }

    const selectShip = (ship,planet) => {
        if(result.size<4 || result.get(planet)){
            if(result.get(planet) === ship){
                setShip('');        
                let map = result;
                map.delete(planet);
                setResult(map);
            }else{
                if(remaining(ship)){
                setShip(ship);        
                let map = result;
                map.set(planet,ship);
                setResult(map);}else{
                    setWarning('No ship remaining');
                    setRandom(Math.random());

                }
            }
        }else{
                setWarning('All 4 Planets Selected');
                setRandom(Math.random());
                
        }

    }
    const goToJourney = ()=>{
        setMsg('Finding Falcon....')
        // setWarning('Finding Falcon...');
        // setRandom(Math.random());
        let keylist = [...result.keys()];
        let values = keylist.map(key => result.get(key));
        // console.log(token);
        // console.log(keylist);
        // console.log(values);
        fetch(API['find'],{
            method:'POST',headers:{
                'Accept':'application/json','Content-type':'application/json'
            },
            body:JSON.stringify({
                'token': token,
                'planet_names':keylist,
                'vehicle_names':values
            })
        })
        .then(resp => resp.json())
        .then(resp => {if(resp['status'] === 'success'){setWarning(`Found Falcon on ${resp['planet_name']}`);setRandom(Math.random());setTimeout(()=>{history.push('/')},1500)}else{setWarning('Unable to find falcon');setRandom(Math.random());};setMsg("Find Falcon");})
    }
    const  toggle =() => {
        setShow(!show);
    }
    return (
        <>
        {result.size === 4?
                <>
                <Button journey={goToJourney} message={msg}/>
                <Button journey={toggle} message={"EDIT"}/>
                </>
        :null}

        <Toast message={warning} random={random}/>
        
        {show || result.size<4 ?<>
         <div className="planets">
        { 
           
            planets.length !==0 ?
            
            planets.map((pl,index) =>
             <Planets 
                key={index} 
                data={pl} 
                image={index+1} 
                select={select}
                active={planet}/>)
            :
            <Loading/>
        }
        </div>
        
        {planet ?
        <div className="ships">
            
            <div className="ship-planet">{planet}</div>
        <div className="ships-container">
        { ships.length !==0 ?
            <Ships 
                data={ships} 
                planet={planet} 
                selectShip={selectShip}
                ship={ship}
                />
                :null}
        </div>
        </div>:null}</> :null }
        </>
    )
};

export default Main;