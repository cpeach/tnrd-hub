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

		delete data._id;
		data.application = _id;
		
		var results = await client({url:"/hub-console/resource_links",params:{method:"POST",body:data}})
		success(["Success","Your Resource link record was inserted."]);
		window.location.href = '/applications/'+_id; 
	}

	var resources = api({url:"/hub-console/resource_types/"})
	var application = api({url:"/hub-console/applications/"+_id})

	if(resources && application){

		data.form.path.back.href += _id; 
		data.form.subtitle = "Application : "+application.name;
		data.form.title = "Resource Link";
		
		data.form.fields[0].options = resources.map(item=>({label:item.name,name:item._id,value:item._id}));
		
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />
	
	}else{
		return <></>
	}


	
	
}
