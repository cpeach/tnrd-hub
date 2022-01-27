import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from '../modify.json';

export default function Insert(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	let category;

	const handleSubmit = async(data) => {
		var results = await client({url:"/stats-counter/items",params:{method:"PUT",body:data}})
		success(["Success","Your Item record was updated."]);
		window.location.href = '/stats-counter/admin/stats/items/'+data.category; 
	}

	const handleDelete = async(data) => {
		var results = await client({url:"/stats-counter/items/"+_id,params:{method:"DELETE"}})
		if(results.code===1){
			success(["Success","Your record record was deleted."]);
			window.location.href = '/stats-counter/admin/stats/items/'+category; 
		}else{
			error(["Failed",results.message]);
		}
	}

	var item = api({url:"/stats-counter/items/"+_id})
	
	
	if(item){
		data.form.path.back.href += item.category;
		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update";
		data.form.fields[0].value = item.name;
		data.form.fields[1].value = item.description;
		data.form.fields[2].value = item._id;
		data.form.fields[3].value = item.category;

		category = item.category;

		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />
	}else{
		return <></>
	}
	

	
	
}
