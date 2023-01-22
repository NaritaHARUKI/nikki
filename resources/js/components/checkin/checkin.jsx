import React,{useState, useEffect, Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate, useParams } from 'react-router-dom';
import Home from '../home/home';



function Checkin(err) {

    const [groupData,setGroupData] = useState();
    const [alert,setAlert] = useState();

    const onChange = () => {
        let groupName = document.forms.login.name.value;
        let password = document.forms.login.password.value;
        setGroupData({
            groupName: groupName,
            password: password,
        });
        //css
        let input = document.getElementsByClassName('input');
        for(let i=0; i < input.length; i++){
            if(input[i].value){
                input[i].classList.add('not-empty');
            }else{
                input[i].classList.remove('not-empty');
            }
        }
    }

    const onClick = async(e)=>{
        await axios.post('/api/checkin', {
            groupName: groupData.groupName,
            password: groupData.password,
        }).then((res) => {
            setGroupData('');
            console.log(res)
            // if(res.status === 200){
            //     location.href=`/home/${res.data.belongs_to}/user/${res.data.id}`;
            // }
        }).catch(error => {
            console.log(error)
            //location.href = `/checkin/error`;
        });
    }



        
        

    return (
        <div className='blackContainer'>  
            <div className='checkin'>
                <div className='title inview'>
                    <span className='char'>L</span>
                    <span className='char'>O</span>
                    <span className='char'>G</span>
                    <span className='char'>I</span>
                    <span className='char'>N</span>
                </div>
                {err.err ? <p  style={{marginTop:'10px',padding:'5px',color:'#d65050',borderRadius:'10px'}}>ユーザーが見つかりませんでした</p> : ""}
                <form name="login" onChange={onChange}>
                    <div className='login-form-field'>
                        <input name='name' type='text' className='input' id='name' required/>
                        <label className='login-label' for="name">名前</label>
                        <br/><br/>
                        <input name='password' type='text' className='input' id='password' required/>
                        <label className='login-label' for="password">パスワード</label>
                        <br/>
                        <div className='btn' onClick={()=>onClick()} style={{marginTop:'28px'}}>参加</div>
                    </div>
                </form>
            </div>  
        </div>
    );

}

export default Checkin;


