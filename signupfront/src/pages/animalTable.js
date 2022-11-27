import React,{useState,useEffect} from "react";
import AnimalsTable from "../components/Table";

const AnimalTable=()=>{
    const [animals,setAnimals]=useState();

    return(
        <div className="animaltable">
            <AnimalsTable/>
        </div>
    );
}

export default AnimalTable