import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import {useEffect,useState} from 'react';
import Form,{success,error} from '/components/forms/index.js';
import ld   from './data.json';


export default function Update(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query
	
	const [template, setTemplate] = useState();
	const [types, setTypes] = useState();

	const handleSubmit = async(data) => {
		
		data._id = _id
		var results = await client({url:"/expiring-patrons/templates",params:{method:"PUT",body:data}})
		success(["Success","This template record was updated."]);

		window.location.href = '/expiring-patrons/admin/templates' 
		
	}
	
	useEffect(async () => {
		let isMounted = true;
		let _template = await client({url:'/expiring-patrons/templates/'+_id});
		let _types    = await client({url:"/expiring-patrons/settings/types"});

		if(isMounted){
			setTemplate(_template);
			setTypes(_types);
		}
		return () => (isMounted = false)
	},[]);

	
	if(template&&types){
		
		var form = data.form

		form.subtitle = "Template : "+template._id;
		form.title    = "Update";
		
		form.fields[0].value   = template.name;
		form.fields[1].value   = template.description;
		form.fields[2].options = types.map(item=>({label:item.name,name:item.ptype_id,value:item.ptype_id}));
		form.fields[2].value   = template.types;
		form.fields[3].value   = template.content;
		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} />
		
	}else{
		return <></>
	}

	
	
}



