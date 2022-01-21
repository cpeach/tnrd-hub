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

	const [subject, setSubject] = useState();

	const handleSubmit = async(data) => {
		
		var results = await client({url:"/hashad/subjects",params:{method:"PUT",body:data}})
		success(["Success","Your Format record was updated."]);
		window.location.href = '/hashad/admin/preferences/subjects/';  
	}

	useEffect(async () => {
		let isMounted = true;
		let _subject = await client({url:'/hashad/subjects/'+_id});

		if(isMounted){
			setSubject(_subject);
		}
		return () => (isMounted = false)
	},[]);

	if(subject){

		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update";

		data.form.fields[0].value = subject.name;
		data.form.fields[1].value   = _id;
		
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />
	}else{
		return <></>
	}
	

	
	
}
