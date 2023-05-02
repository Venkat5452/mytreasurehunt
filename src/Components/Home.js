import React from 'react'
import { Button } from 'react-bootstrap';
import { datadb } from '../Firebase';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
    const [data,setdata]=useState([]);
    const [l,setl]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        datadb.ref(`Scores`).on('value',(k)=>{
          let scoresArray=[]
          k.forEach((x) => {
            let newscore={
              name:x.val().name,
              score:x.val().score,
              score1:x.val().score1
            }
            scoresArray.push(newscore)
          });
          setdata(scoresArray);
        })
     },[])
     function find(x1,y1,x2,y2){
        if(y2===0 && y1===0) {
          return x1-x2;
        }
        if(y2===0) {
          return -1;
        }
        if(y1===0) {
          return 1;
        }
            x1+=y1;
            x2+=y2;
          return x1-x2;
       }
       data.sort((a,b)=>(
          find(a.score,a.score1,b.score,b.score1)
       ));
       const handleplay=()=>{
          navigate("/Login");
       }
       const handleleader=()=>{
        if(l===true) {
            setl(false);
        }
        else {
            setl(true);
        }
       }
  return (
    <div className='text-center border border-dark'>
        <div className='border border-dark text-center'>
            <h1>Rules and Instructions</h1>
            <div>
                <ul>
                   <h2>For Users : </h2>
                   helloooo players!! Looking for a fun way to test and improve your memory and problem-solving skills. We bring you a challenge and by participating in both rounds and aiming for a high score on the leaderboard, you can challenge yourself and compete with others to see how you rank in terms of skill and ability.
                </ul>
                <ul>
                    <h2>Rules :</h2>
                    <li>To participate in the game, users must complete the first round memory card game with a maximum of 8 mismatches to qualify for the second round 4x4 puzzle.</li>
                    <li>In the second round, users must arrange the tiles such that the numbers are in ascending order, and the fastest completion time wins.</li>
                    <li>If two or more users have the same completion time in the second round, the user with the least number of mismatches in the first round wins.</li>
                    <li>Users can compete against each other for the highest score on</li>
                </ul>
            </div>
        </div>
        {l && (<div className="table-responsive">  
        <table class="table table-dark">
        <thead >
          <tr>
            <th scope="col"> <h6>Rank</h6> </th>
            <th scope="col"> <h6>Name(Email)</h6>  </th>
            <th scope="col"><h6>Level-1(Min Attempts)</h6></th>
            <th scope="col"><h6>Level-2(Min Time)</h6></th>
          </tr>
        </thead>
        <tbody>
         { data.map((x,id)=>{
          return (
          <tr>
            <th scope="row">{id+1}</th>
             <td><h6>{x.name}</h6></td>
             <td><h6>{x.score}</h6></td>
             <td><h6>{x.score1===0 ? "N/A" : x.score1}</h6></td>
             </tr>
           )
          })}
        </tbody>
        </table>
        </div>)}
        <div className=''>
            <div className='p-3'><Button variant="" style={{background:"rgb(238, 9, 121)"}} onClick={handleplay}>Play Game</Button></div>
            {!l && <div className='p-2'><Button variant="" style={{background:"rgb(238, 9, 121)"}} onClick={handleleader}>View LeaderBoard</Button></div>}
            {l && (<div className='p-2'><Button variant="" style={{background:"rgb(238, 9, 121)"}} onClick={handleleader}>Close LeaderBoard</Button></div>)}
        </div>
    </div>
  )
}

export default Home;