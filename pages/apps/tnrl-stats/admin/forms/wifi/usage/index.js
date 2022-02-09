
import client 	from '/scripts/client-api.js';
import Form,{success,error} from '/components/forms/index.js';
import {useState,useEffect} from 'react';
import ld   from './data.json';
import {useRouter} from 'next/router';

export default function Update(props){


	const router = useRouter();
	const {_id}  =  router.query;

	const data = JSON.parse(JSON.stringify(ld));

	const [items, setItems] = useState();
	
	const handleSubmit = async(data) => {
	
		console.log(data);
		
		var results = await client({url:"/tnrl-stats/wifi/usage",params:{method:"POST",body:data}});
		success(["Success","Usage stats were updated."]);
		  
		window.location.href = '/tnrl-stats/admin/forms/wifi/'  
		
	} 



	useEffect(async () => {
		let isMounted = true;

		let _items = await client({url:"/tnrl-stats/wifi/locations"});
	
		if(isMounted){
			setItems(_items);
		}
		return () => (isMounted = false)
	},[]);


	
	if(items){
	
		var form = data.form;
	

		form.fields[0].options = [
			{label:"2022",name:"2022",value:"2022"},
			{label:"2023",name:"2023",value:"2023"},
			{label:"2024",name:"2024",value:"2024"}
		]

		form.fields[1].options = [
			{label:"January",name:"01",value:"01"},
			{label:"Febuary",name:"02",value:"02"},
			{label:"March",name:"03",value:"03"},
			{label:"April",name:"04",value:"04"},
			{label:"May",name:"05",value:"05"},
			{label:"June",name:"06",value:"06"},
			{label:"July",name:"07",value:"07"},
			{label:"August",name:"08",value:"08"},
			{label:"September",name:"09",value:"09"},
			{label:"October",name:"10",value:"10"},
			{label:"November",name:"11",value:"11"},
			{label:"December",name:"12",value:"12"}
		]

		form.fields[2].options = items.map((item,i)=>({label:item.name,name:item.lib_id,value:item.lib_id}));
		

		return <Form user={props.user} apps={props.apps} data={form} active="1" onSubmit={handleSubmit} />
	}else{   
		return <></>
	}

	
	
}



