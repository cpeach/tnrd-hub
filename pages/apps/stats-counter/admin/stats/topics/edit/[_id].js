import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from '../modify.json';

export default function Insert(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	
	const handleSubmit = async(data) => {
		var results = await client({url:"/stats-counter/topics",params:{method:"PUT",body:data}})
		success(["Success","Your Topic record was inserted."]);
		window.location.href = '/stats-counter/admin/groups/topics/'+data._collection; 
	}

	var item = api({url:"/stats-counter/topics/"+_id})
	
	if(item){

		data.form.path.back.href += item._collection;
		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update";
		data.form.fields[0].value = item.name;
		data.form.fields[1].value = item._id;
		data.form.fields[2].value = item._collection;
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />
	}else{
		return <></>
	}
	

	
	
}