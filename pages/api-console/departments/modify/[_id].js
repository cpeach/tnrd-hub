import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';

export default function Update(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	let {_id} =  router.query
	
	const handleSubmit = async(data) => {
	
		data._id = _id;
		
		var results = await client({url:"/api-console/departments",params:{method:"PUT",body:data}})
		success(["Success","Department record was updated."]);
		
		 
		window.location.href = '/api-console/departments' 
	}



	var department = api({url:"/api-console/departments/"+_id})
	
	if(department){
		
		data.title   = "Update";	
		
		var form = data.form

		form.subtitle = "ID : "+_id;
		form.title = "Update"
		
		form.fields[0].value = department.name;
		form.fields[1].value = department.short;

		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />

	}else{
		return <></>
	}

	
	
}



