import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Form     from '/components/forms/index.js';
import {notification} from 'antd';
import ld   from './test.json';

export default function Test(props){

	const l_data = JSON.parse(JSON.stringify(ld))
	
	const handleSubmit = async(data) => {
	
		var notice = {duration:4}

		data.ui = data.ui ? data.ui : {};
		data.ui.menu = data.menu || [];
		data.ui.resources = data.resources || []
		delete data.menu;
		delete data.resources;

		var results = await client({url:"/api-console/applications",params:{method:"POST",body:data}})
		
		if(results._id){
			notice.duration    = l_data.notices.insert.complete.duration;
			notice.message     = l_data.notices.insert.complete.message.replace('_$name',results.name);
			notice.description = l_data.notices.insert.complete.description;
			notification['success'](notice);
		}else{
			notice.duration    = l_data.notices.insert.complete.duration;
			notice.message     = l_data.notices.insert.failed.message;
			notice.description = results.message; 
			notification['error'](notice);
	
		}
		
		window.location.href = '/api-console/applications'

	}

	var departments = api({url:"/api-console/departments"})
	if(departments && departments.length>0){
		
		return ( <Form user={props.user} apps={props.apps} data={l_data} active="1" />)
	}else{
		return <></>
	}
	
}

