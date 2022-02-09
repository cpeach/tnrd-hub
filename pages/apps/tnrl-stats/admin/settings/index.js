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
		
		var results = await client({url:"/hashad/settings",params:{method:"PUT",body:data}})
		success(["Success","Your settings were updated."]);
		 
		window.location.href = '/hashad/admin/' 
	}

	

	useEffect(async () => {
		let isMounted = true;
		var _settings = await client({url:"/hashad/settings"});
		var _administrators = await client({url:"/hashad/settings/administrators"});

		if(isMounted){
			setSettings(_settings);
			setAdministrators(_administrators);
		}
		return () => (isMounted = false)
	},[]);

	
	if(settings&&administrators){
	
		var form = data.form
		form.fields[0].options = administrators.map(item=>({label:item.name,name:item._id,value:item._id}));
		form.fields[0].value = settings.administrators
		
		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit}/>

	}else{
		return <></>
	}

	
	
}



