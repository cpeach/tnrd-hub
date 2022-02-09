import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from '../modify.json';

export default function Insert(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	let topic;

	const handleSubmit = async(data) => {
		var results = await client({url:"/stats-counter/categories",params:{method:"PUT",body:data}})
		success(["Success","Your Category record was inserted."]);
		window.location.href = '/stats-counter/admin/stats/categories/'+data.topic; 
	}

	const handleDelete = async(data) => {
		var results = await client({url:"/stats-counter/categories/"+_id,params:{method:"DELETE"}})
		if(results.code===1){
			success(["Success","Your record record was deleted."]);
			window.location.href = '/stats-counter/admin/stats/categories/'+topic; 
		}else{
			error(["Failed",results.message]);
		}
	}
	
	var item = api({url:"/stats-counter/categories/"+_id})
	
	if(item){
		data.form.path.back.href += item.topic;
		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update";
		data.form.fields[0].value = item.name;
		data.form.fields[1].value = item._id;
		data.form.fields[2].value = item.topic;

		topic = item.topic;

		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />
	}else{
		return <></>
	}
	

	
	
}
