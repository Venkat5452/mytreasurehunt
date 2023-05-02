import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap';

const Card=({card,setselected,cardselected})=>{
    const [isflipped,setisflipped]=useState(false);
    const handleClick=()=>{
      setselected([...cardselected,card]) ; 
    };

    useEffect(()=>{
        if(cardselected[0]===card || cardselected[1]===card || card.isMatch) {
            setisflipped(true);
        } 
        else {
            setisflipped(false);
        }
    },[cardselected]);
  return (
    <div className={isflipped ? "card open stop-clicking" : "card "} onClick={handleClick}>
        <div className="front">
            <Image src={card.img} alt='' height={100} width={90}/>
        </div>
        <div className='back'></div>
    </div>
  )
};

export default Card;