import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from '../modify.json';

export default function Insert(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	
	const handleSubmit = async(data) => {
		
		delete data._id;
		console.log(data)
		var results = await client({url:"/hub-console/notices",params:{method:"POST",body:data}})
		success(["Success","Your Notice record was inserted."]);
		window.location.href = '/hub-console/admin/notices/'; 
	}
 
	

	if(true){

		data.form.fields[0].options = props.apps.map(item=>({label:item.name,name:item._id,value:item._id,icon:item.image_meta.url}));
		data.form.fields[5].value   = "Application Name";
		data.form.fields[7].value   = '<!doctype html><html><head><meta charset="utf-8"><title>Email Title</title></head><body style="padding:50px"></body></html>';

		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit}  />
	}else{
		return <></>
	}
	

	
	
}
