import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useEffect,useState} from 'react';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';

export default function Update(props){

	const [settings, setSettings] = useState();
	const [types, setTypes] = useState();
	const [administrators, setAdministrators] = useState();

	const data = JSON.parse(JSON.stringify(ld))
	
	const handleSubmit = async(data) => {
	
		data._id = settings._id;
		console.log(data)

		 
		var results = await client({url:"/incident-reports/settings/tnrd",params:{method:"PUT",body:data}})
		success(["Success","Your settings were updated."]);
		/*
		window.location.href = '/incident-reports/admin/'  */
	}



	useEffect(async () => {
		let isMounted = true;
		
		var _settings = await client({url:"/incident-reports/settings/tnrd"});
		var _administrators = await client({url:"/incident-reports/settings/administrators"});

		if(isMounted){
			setSettings(_settings);
			setAdministrators(_administrators);
		}
		return () => (isMounted = false)
	},[]);

	
	if(administrators && settings){
	
		var form = data.form

		
		form.fields[0].options = administrators.map(item=>({label:item.name,name:item.short,value:item._id}));
		form.fields[0].value = settings.["recipients-cupe"];

		form.fields[1].options = administrators.map(item=>({label:item.name,name:item.short,value:item._id}));
		form.fields[1].value = settings.["recipients-bcgeu"];

		form.fields[2].value = settings.["general-types"];
		form.fields[3].value = settings.["critical-types"];

		form.fields[4].value = settings.["departments"];
		form.fields[5].value = settings.["locations"];
		

		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit}  />

	}else{
		return <></>
	}

	
	
}



