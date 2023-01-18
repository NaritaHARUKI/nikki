import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'

export default function Detail() {

  const id = useParams();
  const [content,setContent] = useState();
  const [dom,setDom] = useState();


  useEffect(()=>{
    axios.post('/api/detail', {id: id.detail})
    .then((res) => {
      const infoBySession = res.data[1];
      if(infoBySession.name === undefined){
        location.href = '/checkin'
      }
      setContent(res.data[0][0])
    }).catch(error => {
        console.log(error);
    });
  },[]);

  const HTMLComponent = (props) => {
    return(
        <div dangerouslySetInnerHTML={{__html: props.props}}></div>
    );
}




  if(content){
    return (
      <div className='detail'>
        Detail
        <HTMLComponent props={content.contents}/>
        <p>ー{content.userName}ー</p>
        <p>{content.created_at.slice(5,7)}月{content.created_at.slice(8,10)}日</p>
        <Outlet/>
      </div>
    )
  }

}
