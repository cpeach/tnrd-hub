import '../styles/globals.css'
import 'antd/dist/antd.compact.min.css';
import App from 'next/app';
import Router from 'next/router';
import UserContext from '/components/context/small.js'; 

export default class Hub extends App {

	state = {
		user: null,
	};	

	componentDidMount = () => {
		const user = localStorage.getItem('user');
		if (user) {
			this.setState({user});
		} else {
			Router.push('/signin');
		}
	};  
	setUser = (user) => {
		//localStorage.setItem('user', user);
		this.setState({user:user},()=>{Router.push('/');});
	};

  
  render() {
    const { Component, pageProps } = this.props;

    return (
      <UserContext.Provider value={{user:this.state.user, setUser: this.setUser}}>
        <Component  {...pageProps} />
      </UserContext.Provider>
    );
  }
}

/*

import '../styles/globals.css'
import 'antd/dist/antd.compact.min.css';
import Auth from '/components/frames/auth.js'
import refresh from '/scripts/refresh.js'
import UserContext from '/components/context/small.js'; 
import React from 'react';
export default function Hub({ Component, pageProps }) {
	
	state = {user: null};

	componentDidMount = () => {
		const user = localStorage.getItem('user');
		if (user) {
		  this.setState({user});
		} else {
			console.log("no user")
		  //Router.push('/signin');
		}
	};
	//console.log(new Date())
	//pageProps.auth = refresh.invoke();
	
	// call 
	
	//pageProps.unauthorized = false;
	
	//for (var o in pageProps){
	//	pageProps.unauthorized= pageProps[o] && pageProps[o].unauthorized  ? true : pageProps.unauthorized;
	//}
	//if(!pageProps.unauthorized && pageProps.auth.code){
		return (
			<UserContext.Provider value={{ user: this.state.user}}>
				<Component {...pageProps} />
			</UserContext.Provider>
		)
	//}else{
	//	return <Auth />
	//}
}
*/
