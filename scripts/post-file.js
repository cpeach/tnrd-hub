// JavaScript Document
import Router  from 'next/router';

export default async function ClientAPI(args){
	var url       = args.url;	
	var params    = {};
	params.method = "POST";
	params.body   = args.file;
	console.log(params.body)
	url = url.indexOf('http')>-1?url:'https://api.tnrdit.ca'+url;

	params.headers =  {'Content-Type': 'multipart/form-data'};

	//params.headers['x-application']  = args.application || '60906b4cf5e24d7d2498642b';
/*	params.headers['Authorization']  = params.headers['Authorization'] || 'Bearer '+localStorage.token;
 */
	
	var res = await fetch(url,params);
	
	//if(res.status===401){Router.push('/signin')}
	
	return await res.json();
	
}