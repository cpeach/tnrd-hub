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
	const [authors, setAuthors] = useState();
	const [formats, setFormats] = useState();

	const handleSubmit = async(data) => {
		data._id = _id;
		console.log(data)
		var results = await client({url:"/hashad/patrons",params:{method:"PUT",body:data}})
		success(["Success","Your Patron record was updated."]);
		//window.location.href = '/hashad/admin/patrons/'; 
	}

	const handleDelete = async(data) => {
		
		var results = await client({url:"/hashad/patrons/"+_id,params:{method:"DELETE"}})
		if(results.deletedCount===1){
			success(["Success","Your Patron record was deleted."]);
			window.location.href = '/hashad/admin/patrons/'; 
		}else{
			error(["Failed",results.message]);
		}
	}

	useEffect(async () => {
		let isMounted = true;

		let _patron   = await client({url:'/hashad/patrons/'+_id});
		let _subjects = await client({url:'/hashad/subjects'});
		let _authors  = await client({url:'/hashad/authors'});
		let _formats  = await client({url:'/hashad/formats'});
		
		if(isMounted){
			setPatron(_patron)
			setSubjects(_subjects);
			setAuthors(_authors);
			setFormats(_formats);
		}
		return () => (isMounted = false)
	},[]);

	
	
	if(patron&&subjects&&authors&&formats){

		data.form.subtitle = "ID : "+_id;
		data.form.title = "Update";
		data.form.fields[0].value = patron.name;
		data.form.fields[1].value = patron.type;
		data.form.fields[2].value = patron.barcode;
		data.form.fields[3].value = patron.legacy_contact;

		data.form.fields[4].options = subjects.map(item=>({label:item.name,name:item._id,value:item._id}));
		data.form.fields[4].value   = patron.subjects

		data.form.fields[5].options = formats.map(item=>({label:item.name,name:item._id,value:item._id}));
		data.form.fields[5].value   = patron.formats

		data.form.fields[6].options = authors.map(item=>({label:item.name,name:item._id,value:item._id}));
		data.form.fields[6].value   = patron.authors		

		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />
	}else{
		return <></>
	}
	

	
	
}
