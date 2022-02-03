import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useEffect,useState} from 'react';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';

export default function Update(props){

	const [settings, setSettings] = useState();
	const [types, setTypes] = useState();
	const [administrators, setAdministrators] = useState();
	const [users, setUsers] = useState();

	const data = JSON.parse(JSON.stringify(ld))
	
	const handleSubmit = async(data) => {
	
		//data._id = settings._id;
		window.location.href = '/incident-reports/admin/settings/'
	}

	useEffect(async () => {
		let isMounted = true;
		
		var _settings = await client({url:"/incident-reports/settings/global"});
		
		if(isMounted){
			setSettings(_settings);
			
		}
		return () => (isMounted = false)
	},[]);

	
	if(settings){
	
		var form = data.form
		
		

		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit}  />

	}else{
		return <></>
	}

	
	
}



