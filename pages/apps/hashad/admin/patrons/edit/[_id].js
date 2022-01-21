import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import {useState,useEffect}    from 'react';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from '../modify.json';

export default function Edit(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	
	const {_id} =  router.query

	const [patron, setPatron] = useState();
	const [subjects, setSubjects] = useState();

	const handleSubmit = async(data) => {
		var results = await client({url:"/stats-counter/departments",params:{method:"PUT",body:data}})
		success(["Success","Your Patron record was updated."]);
		window.location.href = '/stats-counter/admin/departments/'; 
	}

	useEffect(async () => {
		let isMounted = true;

		let _patron   = await client({url:'/hashad/patrons/'+_id});
		let _subjects = await client({url:'/hashad/subjects'});
		
		if(isMounted){
			setPatron(_patron)
			setSubjects(_subjects)
		}
		return () => (isMounted = false)
	},[]);

	
	
	if(patron&&subjects){

		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update";
		data.form.fields[0].value = patron.name;
		data.form.fields[1].value = patron.type;
		data.form.fields[2].value = patron.legacy_contact;
	
		data.form.fields[3].options = subjects.map(item=>({label:item.name,name:item._id,value:item._id}));
		data.form.fields[3].value   = patron.subjects

		console.log(data.form.fields[3].options)
		console.log(data.form.fields[3].value)
		


		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />
	}else{
		return <></>
	}
	

	
	
}
