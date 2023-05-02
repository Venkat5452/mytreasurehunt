import React from 'react'
import './TestGame.css'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'


const questions=[
    {
     q:'i am the number where users never use me in denominator ? ',
     id:0
    },
    {
    q:"What is the smallest number that is twice the sum of its digits",
    id:1
    },
    // "i had both head and a tail but no body and you start every counting with me ?",
    // "I am the word that is spelled incorrectly in every dictionary , Enter Length of me ?",
    // 'people use me for travelling by closing my eyes,enter length of my name ?',
    // // "How many times can you subtract 4 from 8?",
    // "Uncle Bill’s farm had a terrible storm and all but seven sheep were killed. How many sheep are still alive?",
    // 'I am the shopkeeper who stakes stuff from you and charge the money for the same (i am boys favorite), enter length of my name ?',
    // "Which word in the dictionary has an odd spelling?",

]
const ans=[
    '0',
    '12',
    '1',
    "incorrectly",
    "horse",
    '1',
    '7',
    'barber',
    'odd',

]

function TestGame() {
    //questions.sort(() => Math.random() - Math.random()).slice(0, 3);
    var temp=questions;
    var ans1=[]
    //temp.sort(() => Math.random() - Math.random()).slice(0, 3);
    const data=temp.map((course) => 
    <li key={course.id}>
      <p>{course.q}</p>
    </li>)
     const anstemp=temp.map((course) =>
       <li key={course.id}>
         <p>{ans[course.id]}</p>
       </li> 
     )
  return (
    <div className='container '>
        <Button >Click</Button>
         <ul className='hello'>{data}</ul>
         <ul className='hello'>{anstemp}</ul>
    </div>
  )
}

export default TestGame;