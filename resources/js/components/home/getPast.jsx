import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

export default function GetPast() {

  const id = useParams();
  console.log('aaa');

  return (
    <div>getPast<Outlet/></div>
  )
}
