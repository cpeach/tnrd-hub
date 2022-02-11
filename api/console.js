
import request from '/scripts/request.js'

class API extends request{
	
	
	constructor(){
		super();
		 
		this.path = process.env.NEXT_PUBLIC_api_host+'/accounts';
		
	// 	bind endpoints
		
		this.departments.insert   = this.departments.insert.bind(this);
		this.departments.update   = this.departments.update.bind(this);
		this.departments.get.all  = this.departments.get.all.bind(this);
		this.departments.get.byId = this.departments.get.byId.bind(this);
	
		this.applications.get.all  = this.applications.get.all.bind(this);
		
	
	}

	departments = {
		insert : async()=>{},
		update : async(p)=>{return await this.put(this.path+'/department/',JSON.stringify(p))},
		get : {
			all :async()=>{return await this.get(this.path+'/departments');},
			byId:async(p)=>{return await this.get(this.path+'/department/'+p);}
		},
		
	}
	
	applications = {
		insert : async(p)=>{return await this.post(this.path+'/applications/',JSON.stringify(p))},
		update : async(p)=>{return await this.put(this.path+'/applications/',JSON.stringify(p))},
		get : {
			all :async()=>{return await this.get(this.path+'/applications');},
			byId:async(p)=>{return await this.get(this.path+'/applications/'+p);}
		},
		
	}	
	
	
	
	
}

export default new API();