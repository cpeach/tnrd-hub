// JavaScript Document
import Router  from 'next/router';
import useSWR  from 'swr';

export default function API(args){
	var url    = args.url;
	var params = args.params || {method:"GET"}
	var type   = args.type   || "json"
	var app_id = '60906b4cf5e24d7d2498642b';
	
	const { data,error } = useSWR(url,async (url)=>{
		url = url.indexOf('http')>-1?url:'https://api.tnrdit.ca'+url;

		params.method = params.method || 'GET';

		params.headers = params.headers || {};
		params.headers['Content-Type']   = params.headers['Content-Type']   || 'application/json';
		params.headers['x-application']  = params.headers['x-application']  || app_id;
		params.headers['Authorization'] = params.headers['Authorization']   || 'Bearer '+localStorage.token;

		params.body = typeof params.body==='object'?JSON.stringify(params.body):params.body;
		params.body = params.body||null;

		var res = await fetch(url,params);
		
		if(res.status===401){
			Router.push('/signin')
		}
		return type.toLowerCase()!=='json'?await res.text():await res.json();

	});
	return data;
	
	
	
	
	
}