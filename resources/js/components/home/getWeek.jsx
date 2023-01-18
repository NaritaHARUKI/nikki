import React, { Fragment, useEffect, useState } from 'react'
import { useParams , Link, Outlet } from 'react-router-dom';
import Detail from '../detail/detail';

export default function GetWeek() {

  const id = useParams();
  const [response,setResponse] = useState('');
  const [length,setLength] = useState(7);
  const [naiyo,setNaiyo] = useState();
  const [searchQuely,setSearchQuely] = useState();
  const b = ['a','b','c'];
  let count =0;

  useEffect(()=>{
    axios.post('/api/getWeek', {id: id.id})
    .then((res) => {
       if(res.data.length < 7){
          setLength(res.data.length);
       }
       setResponse(res.data);
       setSearchQuely(res.data);
    }).catch(error => {
        console.log(error);
    });
  },[]);

  const onClick = (e)=>{
    const number = e.target.getAttribute('number')
    const content = response[number];
    const div = document.createElement('div')
    div.className = 'nikkiChild';
    div.innerHTML = content.contents + `<p>--${content.userName}--</p>` +  `<p>${content.created_at.slice(5,7)}月${content.created_at.slice(8,10)}日</p>`;
    const target = document.getElementById('target');
    if(target.children.length > 0){

      target.removeChild(target.children[0]);
    }
    target.appendChild(div);
  }

  const onChange = (e)=>{
    const value = e.target.value;
    let outcome = [];

    response.filter((a)=>{
      console.log(a.userName.toLowerCase().includes(value));
      if(a.userName.toLowerCase().includes(value)){
        outcome.push(a);
      }else if(a.created_at.toLowerCase().includes(value)){
        outcome.push(a);
      }
    })
    setSearchQuely(outcome);
  }


  if(response){
    return (
      <div className='getWeekBody'>
        {console.log(searchQuely)}
        <input type='text' id='search' placeholder='🔍検索 日付は(01-01の形式)' className='searchInput' onChange={(e)=>{onChange(e)}} />
        <div className='list'>
        {searchQuely.map((data) => {
            count++;
            return <div key={Math.random()}>
              <div number={count-1} onClick={(e)=>{onClick(e)}} className='getweek-btn'>
                {data.userName} {data.created_at.slice(5,7)}月{data.created_at.slice(8,10)}日
              </div>
              </div>
          })
        }
        </div>
      <div id='target'/>
      </div>
    )
  }


  
}
