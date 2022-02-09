import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import {useState,useEffect}    from 'react';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from '../modify.json';

export default function Edit(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	

	const [patron, setPatron] = useState();
	const [subjects, setSubjects] = useState();
	const [authors, setAuthors] = useState();
	const [formats, setFormats] = useState();


	const handleSubmit = async(data) => {
		delete data._id
		var results = await client({url:"/hashad/patrons",params:{method:"POST",body:data}})
		success(["Success","Your Patron record was updated."]);
		window.location.href = '/hashad/admin/patrons/'; 
	}


	useEffect(async () => {
		let isMounted = true;
 
		let _subjects = await client({url:'/hashad/subjects'});
		let _authors  = await client({url:'/hashad/authors'});
		let _formats  = await client({url:'/hashad/formats'});
		
		if(isMounted){
			setSubjects(_subjects);
			setAuthors(_authors);
			setFormats(_formats);
		}
		return () => (isMounted = false)
	},[]);

	
	
	if(subjects&& authors && formats){

		data.form.subtitle = "New Patron "
		data.form.title = "Insert";

		data.form.fields[4].options = subjects.map(item=>({label:item.name,name:item._id,value:item._id}));
		data.form.fields[5].options = formats.map(item=>({label:item.name,name:item._id,value:item._id}));
		data.form.fields[6].options = authors.map(item=>({label:item.name,name:item._id,value:item._id}));
		
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />
	}else{
		return <></>
	}
	

	
	
}
