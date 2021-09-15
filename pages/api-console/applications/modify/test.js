import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Form,{success,error}     from '/components/forms/index.js';
import {notification} from 'antd';
import ld   from './test.json';

export default function Test(props){

	const l_data = JSON.parse(JSON.stringify(ld))
	
	const handleSubmit = async(data) => {
	
		console.log(data);

		/* 
		data.ui = data.ui ? data.ui : {};
		data.ui.menu = data.menu || [];
		data.ui.resources = data.resources || []
		delete data.menu;
		delete data.resources;

		var results = await client({url:"/api-console/applications",params:{method:"POST",body:data}})
		*/
		 
		error(["Error","New Application was added."]);

		//window.location.href = '/api-console/applications' 
	}


	var departments = api({url:"/api-console/departments"})
	if(departments && departments.length>0){
		l_data.form.fields[2].attributes.options = [{label:'Admin',name:'admin',value:'12d'},{label:'Libaries',name:'lib',value:'12'}];
		return ( <Form user={props.user} apps={props.apps} data={l_data.form} active="1" onSubmit={handleSubmit} />)
	}else{
		return <></>
	}
	
}

