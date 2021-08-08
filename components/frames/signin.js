import React from 'react'
import { withRouter } from 'next/router'
import style   from './Frames.module.css';
import Container from '/components/layout/containers/index.js';


class _Auth extends React.Component { 
	
	constructor(props) {
		super(props);
		this.state    = {username:'',password:''};
		this.onSubmit = this.onSubmit.bind(this);
	  }
	updateState(){
		this.setState({[event.target.name]:event.target.value});
	}
	async onSubmit(e){
		
		var application = "60906b4cf5e24d7d2498642b";
		var p = {
			application:application,
			user:this.state.username,
			pass:this.state.password
		}
		//params.headers['Content-Type']   = params.headers['Content-Type'] || 'application/json';
		var params = {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({params:p})}
		var res    = await fetch('https://api.tnrdit.ca/accounts/signin',params);
		res        = await res.json()
		if(res.code){
			localStorage.setItem("token",res.payload.token);
			localStorage.setItem("user",res.payload.identity.sub);
			localStorage.removeItem("code")
			localStorage.removeItem("login_error")
			this.props.setUser(res.payload.refresh)
		}
		//console.log(res)
		
	}
	render(){	
		
		
		
		return (
			<div className={style.auth}>
				<div className={style.shim}></div>
				<Container color="light" size="6" padding={{y:'lg'}} align="left">
					<h1 className={style.auth_title}>Account Signin</h1>
					<Container size="12" padding={{all:"lg"}} color="white" >
						<div className={style.auth_field}>
							<label>Username</label>
							<input name="username" type="text" onChange={(e)=>{this.setState({username:e.target.value})}}/>
							<span></span>  
						</div>
						<div className={style.auth_field}>
							<label>Password</label>
							<input name="password" type="password" onChange={(e)=>{this.setState({password:e.target.value})}} />
							<span></span>  
						</div>
						<div className={style.auth_field}>
							<button className={style.auth_submit} onClick={this.onSubmit}>Signin</button>
						</div>
					</Container>
				</Container>	  
			</div>
		)
	}
} 

export default withRouter(_Auth);








