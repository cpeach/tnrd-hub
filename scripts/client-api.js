// JavaScript Document
import Router  from 'next/router';

export default async function ClientAPI(args){
	var url    = args.url;
	var params = args.params || {method:"GET"}
	var type   = args.type   || "json"

	url = url.indexOf('http')>-1?url:'https://api.tnrdit.ca'+url;
		
	params.method = params.method || 'GET';

	params.headers = params.headers || {};

	params.headers['Content-Type'] = params.headers['Content-Type']  || 'application/json';
	params.headers['Content-Type']==="delete"?delete params.headers['Content-Type'] : null;

	params.headers['x-application']  = params.headers['x-application'] || '60906b4cf5e24d7d2498642b';
	params.headers['x-user']         = params.headers['x-user']        || localStorage.user;
	params.headers['Authorization']  = params.headers['Authorization'] || 'Bearer '+localStorage.token;
	console.log(typeof params.body==='object' && !params.ignore&&params.ignore!=='body')
	params.body = typeof params.body==='object' && !params.ignore&&params.ignore!=='body'?JSON.stringify(params.body):params.body;
	params.body = params.body||null;

	var res = await fetch(url,params);

	if(res.status===401){
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		Router.push('/signin')
	}
	
	return type.toLowerCase()!=='json'?await res.text():await res.json();
	
}