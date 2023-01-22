import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom'
import axios from 'axios';

function Create() {

const [groupData,setGroupData] = useState();
const [userData,setUserDate] = useState();
const [alert,setAlert] = useState();
const [alertAdd,setAlertAdd] = useState();

const onChange = () => {
    let groupName = document.forms.create.groupName.value;
    let password = document.forms.create.password.value;
    let confirmPassword = document.forms.create.confirmPassword.value;
    setGroupData({
        groupName: groupName,
        password: password,
        confirmPassword: confirmPassword
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

const onChangeAdd = ()=>{
    let userName = document.forms.addUser.userName.value;
    let userPassword = document.forms.addUser.userPassword.value;
    let userConfirmPassword = document.forms.addUser.userConfirmPassword.value;
    let addGroupName = document.forms.addUser.addGroupName.value;
    let addGroupPassword = document.forms.addUser.addGroupPassword.value;
    setUserDate({
        userName: userName,
        userPassword: userPassword,
        userConfirmPassword: userConfirmPassword,
        addGroupName: addGroupName,
        addGroupPassword: addGroupPassword
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

const onClick = async()=>{

    if(groupData === undefined){
        setAlert('入力してください');
        return;
    }
    if(groupData.groupName === '' ){
        setAlert('グループ名が空です');
        return;
    }
    if(groupData.password === '' ){
        setAlert('パスワードが空です');
        return;
    }
    if(groupData.password.length < 3 ){
        setAlert('パスワードは3文字以上にしてください');
        return;
    }
    if(groupData.confirmPassword === ''){
        setAlert('確認が空です');
        return;
    }

    if(groupData.password !== groupData.confirmPassword){
        setAlert('パスワードが一致しません');
        return;
    }
    
    await axios.post('/api/create',groupData)
    .then((res) => {
        setGroupData('');
        console.log(res);
        // location.href = 'https://nilkki-waaaaaii.herokuapp.com/';
    }).catch(error => {
        console.log(error);
    });

}

const onClickAdd = async()=>{

    if(userData === undefined){
        setAlertAdd('入力してください');
        return;
    }

    if(userData.userName === ''){
        setAlertAdd('名前が空です');
        return;
    }

    if(userData.userPassword === ''){
        setAlertAdd('ユーザーパスワードが空です');
        return;
    }
    if(userData.userPassword.length < 3 ){
        setAlertAdd('パスワードは3文字以上にしてください');
        return;
    }
    if(userData.userConfirmPassword === ''){
        setAlertAdd('ユーザーパスワード確認が空です');
        return;
    }

    if(userData.addGroupName === ''){
        setAlertAdd('グループ名が空です');
        return;
    }

    if(userData.addGroupPassword === ''){
        setAlertAdd('グループパスワードが空です');
        return;
    }

    if(userData.userPassword !== userData.userConfirmPassword){
        setAlertAdd('パスワードが一致しません');
        return;
    }

    await axios.post('/api/addUser',userData)
    .then((res)=>{
        setUserDate('');
        console.log(res);
        //location.href = 'http://127.0.0.1:8000/';
    }).catch(error => {
        console.log(error);
    });
}

    return (
        <div className="blackContainer">
            <div className='create'>
                <div className='createChild createChildCreate'>
                    {alert ? <p className='createAlert'>{alert}</p> : ''}
                    <form name="create" onChange={onChange}>
                        <div className='create-form-field'>
                            <input name='groupName' type='text' className='input' id='groupName' required/>
                            <label className='label' for="groupName">グループ名</label>
                            <br/><br/>
                            <input name='password' type='text' className='input' id='password' required/>
                            <label className='label' for='password'>パスワード</label>
                            <br/><br/>
                            <input name='confirmPassword' type='current-password' className='input' id='confirmPassword' required/>
                            <label className='label' for="confirmPassword">確認</label><br/><br/>
                            <div className='btn' onClick={onClick}>送信</div>
                        </div>
                    </form>
                </div>
            </div>

            <div className='add'>
                <div className='createChild createChildAdd'>
                    {alertAdd ? <p className='createAlert'>{alertAdd}</p> : ''}
                    <form name='addUser' onChange={onChangeAdd}>
                        <div className='add-form-field'>
                            <input name='userName' type='text' className='input' id='userName' required/>
                            <label className='label' for="userName">名前</label>
                            <br/><br/>
                            <input name='userPassword' type='text' className='input' id='userPassword' required/>
                            <label className='label' for="userPassword">パスワード</label>
                            <br/><br/>
                            <input name='userConfirmPassword' type='current-password' className='input' id='userConfirmPassword' required/>
                            <label className='label' for="userConfirmPassword">確認</label>
                            <br/><br/>
                            <input name='addGroupName' type='text' className='input' id='addGroupName' required/>
                            <label className='label' for="addGroupName">グループ名</label>
                            <br/><br/>
                            <input name='addGroupPassword' type='text' className='input' id='addGroupPassword' required/>
                            <label className='label' for="addGroupPassword">パスワード</label>
                        </div>
                        <div className='btn' onClick={onClickAdd} style={{marginTop:'-14px'}}>送信</div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Create;
