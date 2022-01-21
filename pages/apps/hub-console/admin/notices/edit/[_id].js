import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import {useEffect,useState} from 'react';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from '../modify.json';

export default function Insert(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	const [notice, setNotice] = useState();
	const [administrators, setAdministrators] = useState();
	
	const handleSubmit = async(data) => {
		
		console.log(data)
		data._id = _id;
		var results = await client({url:"/hub-console/notices",params:{method:"PUT",body:data}})
		success(["Success","Your Notice record was updated."]);
		window.location.href = '/hub-console/admin/notices/'; 
	}
 
	useEffect(async () => {
		let isMounted = true;
		
		var _notice = await client({url:"/hub-console/notices/"+_id});
		var _administrators = await client({url:"/incident-reports/settings/administrators"});

		if(isMounted){
			setNotice(_notice);
			setAdministrators(_administrators);
		}
		return () => (isMounted = false)
	},[]);	

	if(notice && administrators){

		data.form.fields[0].options = props.apps.map(item=>({label:item.name,name:item._id,value:item._id,icon:item.image_meta.url}));
		data.form.fields[0].value   = notice.application;

		data.form.fields[1].value   = notice.name;
		data.form.fields[2].value   = notice.details;
		data.form.fields[3].value   = notice.filters;
		data.form.fields[4].value   = notice.subject;
		data.form.fields[5].value   = notice.sender;
		data.form.fields[6].value   = notice.receiver;
		data.form.fields[7].value   = notice.body;

		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit}  />
	}else{
		return <></>
	}
	

	
	
}
