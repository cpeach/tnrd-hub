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

		
		var results = await client({url:"/expiring-patrons/settings",params:{method:"PUT",body:data}})
		success(["Success","Your settings were updated."]);
		 
		window.location.href = '/expiring-patrons/admin/' 
	}

	const handleDelete = ()=>{
		return null
	}

	useEffect(async () => {
		let isMounted = true;
		var _settings = await client({url:"/expiring-patrons/settings"});
		var _types = await client({url:"/expiring-patrons/settings/types"});
		var _administrators = await client({url:"/expiring-patrons/settings/administrators"});

		if(isMounted){
			
			setSettings(_settings);
			setTypes(_types);
			setAdministrators(_administrators);
			
			//var options = _departments.map(item=>({value:item._id,name:item.short,label:item.name}))
			
		}
		return () => (isMounted = false)
	},[]);

	
	if(settings&&types&&administrators){
	
		var form = data.form

		form.fields[0].value = settings.range;
		form.fields[1].options = types.map(item=>({label:item.name,name:item.ptype_id,value:item.ptype_id}));
		form.fields[2].options = administrators.map(item=>({label:item.name,name:item.short,value:item._id}));
		
		form.fields[1].value = settings.types
		form.fields[2].value = settings.administrators

		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />

	}else{
		return <></>
	}

	
	
}



