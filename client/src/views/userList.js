import React, { useEffect } from 'react'
import { useDispatch,useSelecter } from 'react-redux'
import {  userData} from '../feautures/user'



export default function UserList() {

    const dispatch=useDispatch();
    useEffect(()=>{
      dispatch(userData());
    })


  return (
    <div>UserList...</div>
  )
}
