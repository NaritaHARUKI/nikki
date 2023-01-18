import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom'

function Main() {
    return (
        <div className='mainContainer'>
          <div className="main">
            <div className='title inview'>
              <div className='char h1'>n</div>
              <div className='char h1'>i</div>
              <div className='char h1'>k</div>
              <div className='char h1'>k</div>
              <div className='char h1'>i</div>
            </div>
            <div className='mainLink'>
                <Link to={`/create`}><div className="card-body" style={{fontSize:'20px'}}>create/add</div></Link>
                <Link to={'/checkin'}><div className="card-body" style={{fontSize:'20px'}}>Login</div></Link>
            </div>
          </div>
          <div className='mainExplanation'>
            <p>
                create : グループを作る<br/>
                add : グループにユーザーを追加する<br/>
                Login : グループにログインする<br/>
            </p>
          </div>
        </div>
    );
}

export default Main;

