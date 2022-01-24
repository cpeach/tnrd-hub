
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
		var results = await client({url:"/incident-reports/incidents/tnrl",params:{method:"PUT",body:data}})
		success(["Success","Application record was updated."]);
		  
		window.location.href = '/incident-reports/admin/incidents/tnrl'  
		
	} 

	const handleDelete = async(data) => {
		var results = await client({url:"/incident-reports/incidents/tnrl/"+_id,params:{method:"DELETE"}})
		if(results.code){
			success(["Success","Your Incident record was deleted."]);
			window.location.href = '/incident-reports/admin/incidents/tnrl' ;
		}else{
			error(["Failed",result.message]);
		}
	}

	useEffect(async () => {
		let isMounted = true;

		let _item = await client({url:"/incident-reports/incidents/tnrl/"+_id});
		let _settings = await client({url:"/incident-reports/settings/tnrl"});
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

		form.fields[2].options = administrators.map((item,i)=>({label:item.name,name:item._id,value:item._id}));
		form.fields[2].value   = item["reported-by"];
		
		form.fields[3].options = settings["branches"].map((item,i)=>({label:item.name,name:i,value:i}));
		form.fields[3].value   = parseInt(item.branches);
		
		form.fields[4].value  = item.location;
 
		form.fields[5].value  = item.patrons;

		form.fields[6].options = administrators.map((item,i)=>({label:item.name,name:item._id,value:item._id}));
		form.fields[6].value   = item["staff-present"];

		form.fields[7].value = item.witnesses;

		form.fields[8].value = item.description;

		form.fields[9].options = settings["action-list"].map((item,i)=>({label:item.name,name:i,value:i}));
		form.fields[9].value = item["action-list"];

		form.fields[10].value =  item["action-details"];
		form.fields[11].value =  item["action-followup-items"];
		form.fields[12].value = item["additional"];
	
		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />
	}else{   
		return <></>
	}

	
	
}



