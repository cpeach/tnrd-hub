// JavaScript Document
import Router  from 'next/router';
import { message } from 'antd';
import {useState} from 'react';

export default async function ClientAPI(args){
	var url    = args.url;
	var params = args.params || {method:"GET"}
	var type   = args.type   || "json"

	let halt = 0;
	console.log(process.env.NEXT_PUBLIC_api_host)
	url = url.indexOf('http')>-1?url:process.env.NEXT_PUBLIC_api_host+url;
		
	params.method = params.method || 'GET';

	params.headers = params.headers || {};

	params.headers['Content-Type'] = params.headers['Content-Type']  || 'application/json';
	params.headers['Content-Type']==="delete"?delete params.headers['Content-Type'] : null;

	params.headers['x-application']  = params.headers['x-application'] || '60906b4cf5e24d7d2498642b';
	params.headers['x-user']         = params.headers['x-user']        || localStorage.user;
	params.headers['Authorization']  = params.headers['Authorization'] || 'Bearer '+localStorage.token;
	params.body = typeof params.body==='object' && !params.ignore&&params.ignore!=='body'?JSON.stringify(params.body):params.body;
	params.body = params.body||null;

	
	//try {
		var res = await fetch(url,params);
		if(res.status===401){
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			localStorage.setItem("previous",window.location.href);
			Router.push('/signin')
		}
		return type.toLowerCase()!=='json'?await res.text():await res.json();
	/* } catch (err) {
		if(!halt){
			console.log(err);
			message.warning('IT is performing system updates. You may experience intermittent access at this time.',8);
			setTimeout(()=>{location.reload()},8000);
			halt = 1;
		}
	} */

	
	
	
	
}