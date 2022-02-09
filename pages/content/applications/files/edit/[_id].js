import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import {useState,useEffect}    from 'react';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from '../modify.json';

export default function Insert(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	const [types, setTypes] = useState();
	const [link, setLink] = useState();
	const [application, setApplication] = useState();

	const handleSubmit = async(data) => {
		var results = await client({url:"/hub-console/resource_files",params:{method:"PUT",body:data}})
		success(["Success","Your Resource link record was updated."]);
		window.location.href = '/applications/'+application._id; 
	}
	const handleDelete = async(data) => {
		var results = await client({url:"/hub-console/resource_files/"+_id,params:{method:"Delete"}})
		success(["Success","Your Resource file record was deleted."]);
		window.location.href = '/applications/'+application._id; 
	}

	useEffect(async () => {
		let isMounted = true;

		let _types   = await client({url:"/hub-console/resource_types/"});
		let _link = await client({url:"/hub-console/resource_files/"+_id});
		let _application = await client({url:"/hub-console/applications/"+_link.application});
		
		if(isMounted){
			setTypes(_types)
			setLink(_link)
			setApplication(_application)
		}
		return () => (isMounted = false)
	},[]);



	if(types && link && application){

		data.form.path.back.href += link.application; 
		data.form.subtitle = "Application : "+application.name;
		data.form.title = "Update Resource";

		data.form.fields[0].options = types.map(item=>({label:item.name,name:item._id,value:item._id}));
		data.form.fields[0].value  = link.type; 
		data.form.fields[1].value  = link.name;
		data.form.fields[2].value  = link.description;
		
		data.form.fields[3].value  = link.file?link.file:'';
		data.form.fields[3].meta   = link.file_meta;
		data.form.fields[4].value  = link._id;
		data.form.fields[5].value  = link.application;

		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />
	
	}else{
		return <></>
	}


	
	
}
