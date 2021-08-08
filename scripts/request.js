
export default class Request {
	
	constructor(cookies,host){
		
		this.host    = host?host:'https://api.tnrdit.ca';
		this.cookies = cookies;
		this.get     = this.get.bind(this);
		this.post    = this.post.bind(this);
		this.put     = this.put.bind(this);
		this.delete  = this.delete.bind(this);
		this.params  = this.params.bind(this);
		
		//console.log(cookies)
	}
	
	async get(url,params,type){
		var res = await fetch(url.indexOf('http')>-1?url:this.host+url,this.params('GET'));
		return type && type.toLowerCase()!=='json'?await res.text():await res.json();
	}
	
	async post(url,body,params,type){
		var res = await fetch(url.indexOf('http')>-1?url:this.host+url,this.params('POST',body,params));
		return type && type.toLowerCase()!=='json'?await res.text():await res.json();
	}
	
	async put(url,body,params,type){
		var res = await fetch(url.indexOf('http')>-1?url:this.host+url,this.params('PUT',body,params));
		return type && type.toLowerCase()!=='json'?await res.text():await res.json();
	}
	
	async delete(url,params,type){
		var res = await fetch(url.indexOf('http')>-1?url:this.host+url,this.params('DELETE'));
		return type && type.toLowerCase()!=='json'?await res.text():await res.json();
	}
	
	params(m,b,p){
		//console.log(this.cookies)
		let params  = p || {};
		
		params.method = m || 'GET';
		
		params.headers = params.headers || {};
		params.headers['Content-Type']   = params.headers['Content-Type'] || 'application/json';
		params.headers['x-application']  = '60906b4cf5e24d7d2498642b';
		params.headers['Authentication'] = 'Bearer '+this.cookies;
		
		b = typeof b==='object'?JSON.stringify(b):b;
		b?params.body=b:null;
		
		return params;
	}
}