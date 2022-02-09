import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';
import {useState,useEffect} from 'react';

export default function Insert(props){

	const data   = JSON.parse(JSON.stringify(ld))

	const handleSubmit = async(data) => {
	
		delete data._id;

		var results = await client({url:"/hashad/subjects",params:{method:"POST",body:data}})
		success(["Success","A new Format record was inserted."]);
		window.location.href = '/hashad/admin/preferences/subjects'; 

	}

	
	return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />



	
	
}
