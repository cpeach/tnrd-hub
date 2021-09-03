
import style from './Signin.module.css';
import {useState} from 'react';
import Router from 'next/router';
import Container from '/components/layout/containers/index.js';

export default function Signin(props) { 
	
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async(e)=>{
		console.log('signin')
		var application = "60906b4cf5e24d7d2498642b";
		var p = {
			application:application,
			user:username,
			pass:password
		}
		//params.headers['Content-Type']   = params.headers['Content-Type'] || 'application/json';
		var params = {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({params:p})}
		var res    = await fetch('https://api.tnrdit.ca/accounts/signin',params);
		res        = await res.json()
		if(res.code){
			localStorage.setItem("token",res.payload.token);
			localStorage.setItem("user",res.payload.identity.sub);
			Router.push('/');
			//this.props.setUser(res.payload.refresh)
		}
		//console.log(res)
		
	}


	return (
		<div className={style.auth}>
			<div className={style.shim}></div>
			<Container color="light" size="6" padding={{y:'lg'}} align="left">
				<h1 className={style.auth_title}>Account Signin</h1>
				<Container size="12" padding={{all:"lg"}} color="white" >
					<div className={style.auth_field}>
						<label>Username</label>
						<input name="username" type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
						<span></span>  
					</div>
					<div className={style.auth_field}>
						<label>Password</label>
						<input name="password" type="password" onChange={(e)=>{setPassword(e.target.value)}} />
						<span></span>  
					</div>
					<div className={style.auth_field}>
						<button className={style.auth_submit} onClick={onSubmit}>Signin</button>
					</div>
				</Container>
			</Container>	  
		</div>
	)
} 



