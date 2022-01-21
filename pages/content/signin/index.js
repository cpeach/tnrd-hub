
import style from './Signin.module.css';
import {useState} from 'react';
import Router from 'next/router';
import Container from '/components/layout/containers/index.js';
import { LoadingOutlined } from '@ant-design/icons';

export default function Signin(props) { 
	
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState('none');
	const [error, setError] = useState('');

	const onSubmit = async(e)=>{
		
		let _username = username
		if(_username.indexOf('@') < 0){
			_username +='@tnrd.ca';
		}
		var p = {user:_username,pass:password}
		
		var res = await signin(p);
		
		if(res.token){
			let previous = localStorage.getItem("previous");
			localStorage.setItem("token",res.token);
			localStorage.setItem("user",res.user);
			window.location.href = previous && previous.indexOf('signin') < 0 ? previous : '/';
			//this.props.setUser(res.payload.refresh)
		}else{
			console.log(res);
			setLoading('none');
			setError("Invalid email address or password.")
		} 
		//console.log(res)
		
	}

	const signin = async(p)=>{
		setLoading('');
		var params = {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)}
		var res    = await fetch('https://api.tnrdit.ca/auth/signin',params);
		res        = await res.json();
		return res;
	}


	return (
		<div className={style.signin}>
			<div>
				<div className="_12 _h12 center">
					<div className="shim"></div>
					<div className="box center middle _12">
						<div className={style.signin_panel} >

							<h2>Welcome to the TNRD Application Hub</h2>
							<h1>Sign In</h1>
							<p>Not sure if you have an application hub account yet? Please use your Windows credentials or contact IT for support.</p>
							
							<label>Sign into your account.</label>

							<div className={style.signin_field}>
								<label>Email Address</label>
								<input type="email" onChange={(e)=>{setUsername(e.target.value)}}/>
							</div>
							<div className={style.signin_field}>
								<label>Password</label>
								<input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
							</div>
							<button id="signin-btn" onClick={onSubmit}>
								<LoadingOutlined style={{display:`${loading}`,marginRight:"9px",fontSize: 16 }} spin />
								Signin
							</button>
							<span>{error}</span>
						</div>
					</div>				
				</div>
			</div>
			<div>
				<div className="_12 _h12 center">
					<div className="shim"></div>
					<div className="box center middle _10">
						<img className="_7 box" src="/illustrations/signin3.png" />
					</div>				
				</div>
			</div>
		</div>
	)
} 



