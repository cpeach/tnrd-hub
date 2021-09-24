import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';

export default function Insert(props){

	const data = JSON.parse(JSON.stringify(ld))
	
	const handleSubmit = async(data) => {
	
		data.ui = data.ui ? data.ui : {};
		data.ui.menu = data.menu || [];
		data.ui.resources = data.resources || []
		delete data.menu;
		delete data.resources;

		var results = await client({url:"/api-console/applications",params:{method:"POST",body:data}})
		success(["Success","Application record was updated."]);
		
		window.location.href = '/api-console/applications' 
	}

	
	var departments = api({url:"/api-console/departments/"})
	
	if(departments && departments.length>0){
		
		data.title   = "Update";	
		
		var form = data.form

		form.subtitle = "New Application";
		form.title = "Insert";
		
		form.fields[2].options = departments.map(item=>({label:item.name,name:item.short,value:item._id}));
		
		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} />
	}else{
		return <></>
	}

	
	
}
