
import client 	from '/scripts/client-api.js';
import Form,{success,error} from '/components/forms/index.js';
import {useState,useEffect} from 'react';
import ld   from './data.json';

export default function Update(props){

	const data = JSON.parse(JSON.stringify(ld))
	
	const [settings, setSettings] = useState();
	const [administrators, setAdministrators] = useState();
	
	const handleSubmit = async(data) => {
	
		console.log(data);

		var results = await client({url:"/incident-reports/incidents/tnrl",params:{method:"POST",body:data}})
		success(["Success","Application record was updated."]);
		  
		//window.location.href = '/hub-console/admin/applications'  
		
	} 

	useEffect(async () => {
		let isMounted = true;
		let _settings = await client({url:"/incident-reports/settings/tnrl"});
		var _administrators = await client({url:"/incident-reports/settings/administrators"});
		
		if(isMounted){
			setSettings(_settings)
			setAdministrators(_administrators);
		}
		return () => (isMounted = false)
	},[]);


	
	if(settings && administrators){
	
		var form = data.form
		console.log(settings)
		form.fields[2].options = administrators.map((item,i)=>({label:item.name,name:item._id,value:item._id}));
		form.fields[3].options = settings["branches"].map((item,i)=>({label:item.name,name:i,value:i}));
		form.fields[6].options = administrators.map((item,i)=>({label:item.name,name:item._id,value:item._id}));
		form.fields[9].options = settings["action-list"].map((item,i)=>({label:item.name,name:i,value:i}));
		

		/* form.fields[2].options = settings["general-types"].map((item,i)=>({label:item.name,name:i,value:i}));
		form.fields[3].options = settings["critical-types"].map((item,i)=>({label:item.name,name:i,value:i}));
		
		form.fields[5].options = administrators.map((item,i)=>({label:item.name,name:item._id,value:item._id}));
		form.fields[6].options = settings["departments"].map((item,i)=>({label:item.name,name:i,value:i}));
		form.fields[7].options = settings["locations"].map((item,i)=>({label:item.name,name:i,value:i}));
	 */
		
		
		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} />
	}else{
		return <></>
	}

	
	
}



