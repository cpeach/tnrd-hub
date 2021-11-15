
import style from './Signin.module.css';
import {useState} from 'react';
import Router from 'next/router';
import Container from '/components/layout/containers/index.js';
import { LoadingOutlined } from '@ant-design/icons';

export default function Signin(props) { 
	
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState('none');

	const onSubmit = async(e)=>{
		setLoading('');

		var application = "60906b4cf5e24d7d2498642b";
		var p = {
			application:application,
			user:username,
			pass:password
		}
		
		//params.headers['Content-Type']   = params.headers['Content-Type'] || 'application/json';
		var params = {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)}
		var res    = await fetch('https://api.tnrdit.ca/auth/signin',params);
		res        = await res.json()
		if(res.token){
			let previous = localStorage.getItem("previous");
			localStorage.setItem("token",res.token);
			localStorage.setItem("user",res.user);
			window.location.href = previous ? previous : '/';
			//this.props.setUser(res.payload.refresh)
		} 
		//console.log(res)
		
	}


	return (
		<div className={style.signin}>
			<div className={style.signin_left}>
				
				<div className={style.signin_shim_middle}></div>
				<div className={style.signin_panel}>
					<h2>Welcome to TNRD Application Hub</h2>
					<h1>Sign In</h1>
					<p>Not sure if you have an application hub account yet? Please contact support</p>
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
					<hr />
					
				</div>

			</div>
			<div className={style.signin_right}>
				<div className={style.signin_shim_middle}></div>
				<img src="icons/signin.png" />
			</div>
		</div>
	)
} 



