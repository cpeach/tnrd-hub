import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from '../modify.json';

export default function Insert(props){

	const router = useRouter();
	const data   = JSON.parse(JSON.stringify(ld))
	const {_id}  =  router.query

	const handleSubmit = async(data) => {
		delete data._id
		var results = await client({url:"/stats-counter/collection_items",params:{method:"POST",body:data}})
		success(["Success","A new Collection Item record was inserted."]);
		window.location.href = '/stats-counter/admin/groups/collection_items/'+_id; 
	}

	data.form.path.back.href += _id;
	data.form.fields[2].value = _id;

	return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />
	
}
