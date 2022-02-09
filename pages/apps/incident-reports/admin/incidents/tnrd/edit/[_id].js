
import client 	from '/scripts/client-api.js';
import Form,{success,error} from '/components/forms/index.js';
import {useState,useEffect} from 'react';
import ld   from './data.json';
import {useRouter} from 'next/router';

export default function Update(props){


	const router = useRouter();
	const {_id}  =  router.query;

	const data = JSON.parse(JSON.stringify(ld));

	const [item, setItem] = useState();
	const [settings, setSettings] = useState();
	const [administrators, setAdministrators] = useState();
	
	const handleSubmit = async(data) => {
	
		console.log(data);
		data._id = _id;
		var results = await client({url:"/incident-reports/incidents/tnrd",params:{method:"PUT",body:data}})
		success(["Success","Application record was updated."]);
		  
		window.location.href = '/incident-reports/admin/incidents/tnrd'  
		
	} 

	const handleDelete = async(data) => {
		var results = await client({url:"/incident-reports/incidents/tnrd/"+_id,params:{method:"DELETE"}})
		if(results.code){
			success(["Success","Your Incident record was deleted."]);
			window.location.href = '/incident-reports/admin/incidents/tnrd' ;
		}else{
			error(["Failed",result.message]);
		}
	}

	useEffect(async () => {
		let isMounted = true;

		let _item = await client({url:"/incident-reports/incidents/tnrd/"+_id});
		let _settings = await client({url:"/incident-reports/settings/tnrd"});
		var _administrators = await client({url:"/incident-reports/settings/administrators"});
		
		if(isMounted){
			setItem(_item)
			setSettings(_settings)
			setAdministrators(_administrators);
		}
		return () => (isMounted = false)
	},[]);


	
	if(item && settings && administrators){
	
		var form = data.form;
	
		form.fields[0].value = item["date"];
		form.fields[1].value = item["time"];
		
		form.fields[2].options = settings["general-types"].map((item,i)=>({label:item.name,name:i,value:i}));
		form.fields[2].value = item["type-general"]
		
		form.fields[3].options = settings["critical-types"].map((item,i)=>({label:item.name,name:i,value:i}));
		form.fields[3].value = item["type-critical"]
		
		form.fields[4].value = item.committee;

		form.fields[5].options = administrators.map((item,i)=>({label:item.name,name:item._id,value:item._id}));
		form.fields[5].value   = item.issuer;
		
		form.fields[6].options = settings["departments"].map((item,i)=>({label:item.name,name:i,value:i}));
		form.fields[6].value   = parseInt(item.department);
		
		form.fields[7].value  = item.location;

		form.fields[8].value  = item.estimate;
		form.fields[9].value  = item.description;
		form.fields[10].value = item.parties;

		form.fields[11].value = item["corrective-action"];
		form.fields[12].value = item["action-items"];
		form.fields[13].value = item["reported"]?true:false;

		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />
	}else{   
		return <></>
	}

	
	
}



