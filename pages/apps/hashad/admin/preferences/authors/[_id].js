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

	const [author, setAuthor] = useState();

	const handleSubmit = async(data) => {
		
		var results = await client({url:"/hashad/authors",params:{method:"PUT",body:data}})
		success(["Success","Your Format record was updated."]);
		window.location.href = '/hashad/admin/preferences/authors/';  
	}

	useEffect(async () => {
		let isMounted = true;
		let _subject = await client({url:'/hashad/authors/'+_id});

		if(isMounted){
			setAuthor(_subject);
		}
		return () => (isMounted = false)
	},[]);

	if(author){

		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update";

		data.form.fields[0].value = author.name;
		data.form.fields[1].value   = _id;
		
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />
	}else{
		return <></>
	}
	

	
	
}
