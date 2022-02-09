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

		 
		var results = await client({url:"/incident-reports/settings/tnrl",params:{method:"PUT",body:data}})
		success(["Success","Your settings were updated."]);
		
		window.location.href = '/incident-reports/admin/settings' 
	}



	useEffect(async () => {
		let isMounted = true;
		
		var _settings       = await client({url:"/incident-reports/settings/tnrl"});
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
		form.fields[0].value = settings["recipients"];

		form.fields[1].value = settings["branches"];
		form.fields[2].value = settings["action-list"];
		

		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit}  />

	}else{
		return <></>
	}

	
	
}



