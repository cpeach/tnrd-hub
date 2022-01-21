import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';
import {useState,useEffect} from 'react';

export default function Insert(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	const [format, setFormat] = useState();

	const handleSubmit = async(data) => {
		
		var results = await client({url:"/hashad/formats",params:{method:"PUT",body:data}})
		success(["Success","Your Format record was updated."]);
		window.location.href = '/hashad/admin/preferences/formats/';  
	}

	useEffect(async () => {
		let isMounted = true;
		let _format = await client({url:'/hashad/formats/'+_id});

		if(isMounted){
			
			setFormat(_format);
		}
		return () => (isMounted = false)
	},[]);

	if(format){

		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update";

		data.form.fields[0].value = format.name;
		data.form.fields[1].value = format.code;
		data.form.fields[2].value   = _id;
		
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />
	}else{
		return <></>
	}
	

	
	
}
