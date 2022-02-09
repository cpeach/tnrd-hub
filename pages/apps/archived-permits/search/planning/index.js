
import client 	from '/scripts/client-api.js';
import Form,{success,error} from '/components/forms/index.js';
import { useRouter } from 'next/router'
import {useState,useEffect} from 'react';
import ld   from './data.json';

export default function Update(props){
   
    const router = useRouter()
	const data = JSON.parse(JSON.stringify(ld))
	
	let search = {};

	const handleSubmit = async(data) => {
	
		console.log(data);
		let qs = "?"
		for(let d in data){
			if(data[d] !== ""){
				qs += d+"="+(data[d]?data[d]:"") + "&";
			}
		}
		if(qs.lastIndexOf("&") === (qs.length-1)){
			qs = qs.substring(0, qs.length - 1);
		}
		router.push('/archived-permits/list/planning' + qs);
		
	} 

	const handleChange = async(data) => {
		
		search[data.name] = data.value;
		var results = await client({url:"/archived-permits/records/planning/search/count",params:{method:"POST",body:{data:search}}})
		//console.log(results);
		console.log(results);
		document.getElementById("form_submit_btn").value = "View (" + results + ")"
		
		
	} 
	
	var form = data.form

	form.submit = "View Records";

	return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} onChange={handleChange} />


	
	
}



