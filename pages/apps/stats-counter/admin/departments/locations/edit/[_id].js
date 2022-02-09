import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from '../modify.json';

export default function Insert(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	let group;
	const handleSubmit = async(data) => {
		var results = await client({url:"/stats-counter/locations",params:{method:"PUT",body:data}})
		success(["Success","Your Location record was inserted."]);
		window.location.href = '/stats-counter/admin/departments/locations/'+data.group; 
	}

	const handleDelete = async(data) => {
		var results = await client({url:"/stats-counter/locations/"+_id,params:{method:"DELETE"}})
		if(results.code){
			success(["Success","Your Location record was deleted."]);
			window.location.href = '/stats-counter/admin/departments/locations/'+group; 
		}else{
			error(["Failed",result.message]);
		}
	}

	
	var item = api({url:"/stats-counter/locations/"+_id})
	

	if(item){
		console.log(item)
		data.form.path.back.href += item.group;
		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update";
		data.form.fields[0].value = item.name;
		data.form.fields[1].value = item._id;
		data.form.fields[2].value = item.group;

		group = item.group

		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />
	}else{
		return <></>
	}
	

	
	
}
