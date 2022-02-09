import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import {useState,useEffect} from 'react'
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';

export default function Update(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld));
	const [image, setImage] = useState();

	let {_id} =  router.query
	
	useEffect(async () => {
		let isMounted = true;
		let _image = await client({url:"/hub-console/images/"+_id});
		if(isMounted){
			setImage(_image)
		}
		return () => (isMounted = false)
	},[]);


	const handleSubmit = async(data) => {
		console.log(data)
		
		var results = await client({url:"/hub-console/applications",params:{method:"PUT",body:data}})
		success(["Success","Image record was updated."]);
		
		window.location.href = '/hub-console/admin/applications' 
		
	}

	const handleDelete = async(data) => {
		var results = await client({url:"/hub-console/images/"+_id,params:{method:"DELETE"}})
		console.log(results)
		if(results.deletedCount===1){
			success(["Success","Your Image record was deleted."]);
			window.location.href = '/hub-console/admin/images/'; 
		}else{
			error(["Failed",results.message]);
		}
	}

	
	
	if(image){
		
		data.title = "Update";	
		
		var form = data.form

		form.subtitle = "ID : "+_id;
		form.title = "Update"
		console.log(image)
		/* form.fields[0].value = application.name;
		form.fields[1].value = application.short;
		form.fields[2].options = departments.map(item=>({label:item.name,name:item.short,value:item._id}));
		form.fields[2].value = application.departments.map(item=>(item._id));

		form.fields[3].value = application.description;


		form.fields[4].value = application.hosted || false;

		form.fields[5].value = application.image?application.image:'';
		form.fields[5].meta  = application.image_meta;
		form.fields[6].value = application.ui&&application.ui.menu?application.ui.menu:'';
		form.fields[7].value = application.ui&&application.ui.resources?application.ui.resources:''; */

		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} onDelete={handleDelete} />
	}else{
		return <></>
	}

	
	
}



