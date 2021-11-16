import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import {useEffect,useState} from 'react';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';

export default function Update(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query
	
	const [patron, setPatron] = useState();

	const handleSubmit = async(data) => {
		
		data.id = _id
		var results = await client({url:"/expiring-patrons/expiring",params:{method:"PUT",body:data}})
		success(["Success","Patron email was updated."]);
		
		window.location.href = '/expiring-patrons/admin/expiring'  
		
	}

	useEffect(async () => {
		let isMounted = true;
		let _patron = await client({url:'/expiring-patrons/expiring/'+_id});
		
		if(isMounted){
			setPatron(_patron)
			
		}
		return () => (isMounted = false)
	},[]);

	
	if(patron){
		
		var form = data.form

		form.subtitle = "Patron : "+patron.name;
		form.title    = "Update"

		form.fields[0].value = patron.email;
		
		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} />
		
	}else{
		return <></>
	}

	
	
}


