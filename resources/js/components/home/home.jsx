import React,{useState, useEffect} from 'react';
import { useNavigate,useParams , Link } from 'react-router-dom';
import axios from 'axios';
import GetWeek from './getWeek';
import GetPast from './getPast';
import FillOut from './fillOut';
import Detail from '../detail/detail';




function Home() {

    const {id,userId} = useParams();
    const [groupName,setGroupName] = useState();
    const [userInfo,setUserInfo] = useState();

    const [response,setResponse] = useState('');
    const [length,setLength] = useState(7);

    useEffect(()=>{
        axios.post('/api/home', {id: id,userId: userId})
        .then((res) => {
            //console.log(res);
            setUserInfo(res.data[1]);
            const infoByDB = res.data[0];
            const infoByUser = res.data[1]
            const infoBySession = res.data[2];
            if(infoBySession.name === undefined){
                location.href = '/checkin'
            }
            if(infoByUser.name === infoBySession.name && infoByUser.password === infoBySession.password){
                setGroupName(infoByDB.groupName);
            }
        }).catch(error => {
            console.log(error);
        });

        axios.post('/api/getWeek', {id: id})
        .then((res) => {
            if(res.data.length < 7){
            setLength(res.data.length);
        }
            setResponse(res.data);
        }).catch(error => {
            console.log(error);
        });
    },[])

    if(userInfo && response){
        return (
            <div className="Home">
                {/* <div className='home-side'>
                    <h1>Home</h1>
                    <p>{groupName}</p>
                    <p>ようこそ {userInfo.name} さん</p>
                </div> */}
                <GetWeek/>
                <Link to={`/home/${id}/user/${userInfo.name}/${userInfo.id}/fillOut`} className='fillOut'>日記を書く</Link>
            </div>
        );
    }
}

export default Home;