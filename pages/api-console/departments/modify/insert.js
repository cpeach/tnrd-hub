import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';

export default function Insert(props){

	const data = JSON.parse(JSON.stringify(ld))
	
	const handleSubmit = async(data) => {
		var results = await client({url:"/api-console/departments",params:{method:"POST",body:data}})
		success(["Success","Department record was inserted."]);
		window.location.href = '/api-console/departments' 
	}

	return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />
	

	
	
}
