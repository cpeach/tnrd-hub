import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';

export default function Update(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	let {_id} =  router.query
	
	const handleSubmit = async(data) => {
		
		data.resources = [];
		data.resources = data.resources.concat(data['resources-links']);
		data.resources = data.resources.concat(data['resources-docs']);
		delete data['resources-links'];
		delete data['resources-docs'];
		
		/* data._id = _id;
		data.ui = data.ui ? data.ui : {};
		data.ui.menu = data.menu || [];
		data.ui.resources = data.resources || []
		delete data.menu;
		delete data.resources;

		var results = await client({url:"/api-console/applications",params:{method:"PUT",body:data}})
		success(["Success","Application record was updated."]);
		
		window.location.href = '/api-console/applications'  */
	}

	var application = api({url:"/api-console/applications/"+_id})
	var departments = api({url:"/api-console/departments/"})
	
	if(application && departments && departments.length>0){
		
		data.title   = "Update";	
		
		var form = data.form

		form.subtitle = "ID : "+_id;
		form.title = "Update"
		
		form.fields[0].value = application.name;
		form.fields[1].value = application.short;
		form.fields[2].options = departments.map(item=>({label:item.name,name:item.short,value:item._id}));
		form.fields[2].value = application.departments.map(item=>(item._id));

		form.fields[3].value = application.description;

		form.fields[4].value = application.publisher || "";
		form.fields[5].value = application.platform || "";
		form.fields[6].value = application.hosted || false;

		form.fields[7].value = application.image?application.image:'';
		form.fields[7].meta  = application.image_meta;
		form.fields[8].value = application.ui&&application.ui.menu?application.ui.menu:'';
		form.fields[9].value = application.ui&&application.ui.resources?application.ui.resources:'';

		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} />
	}else{
		return <></>
	}

	
	
}



