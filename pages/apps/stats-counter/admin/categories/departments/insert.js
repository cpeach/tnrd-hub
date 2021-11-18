import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';

export default function Insert(props){

	const data = JSON.parse(JSON.stringify(ld))
	
	const handleSubmit = async(data) => {
		var results = await client({url:"/stats-counter/departments",params:{method:"POST",body:data}})
		success(["Success","Department record was updated."]);
		window.location.href = '/stats-counter/admin/collections/'   
	}

	var form = data.form
	return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} />

}
