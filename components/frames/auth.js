import React from 'react'
import { withRouter } from 'next/router'
import style   from './Frames.module.css';
import Container from '/components/layout/containers/index.js';
class _Auth extends React.Component { 
	
	constructor(props) {
		super(props);
		this.state    = {username:'',password:''};
		this.onSubmit = this.onSubmit.bind(this);
		this.request  = new Request();
	  }
	updateState(){
		this.setState({[event.target.name]:event.target.value});
	}
	async onSubmit(e){
		/*
		var application = "60906b4cf5e24d7d2498642b";
		var p = {
			application:application,
			user:this.state.username,
			pass:this.state.password
		}
		var res = await this.request.post('https://api.tnrdit.ca/accounts/signin',{params:p})
		if(res.code){
			localStorage.setItem("token",res.payload.refresh);
			localStorage.setItem("user",res.payload.identity.email);
			localStorage.removeItem("code")
			localStorage.removeItem("login_error")
			router.reload()
		}*/
		console.log(res)
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








