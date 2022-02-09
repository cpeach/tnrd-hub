import api 	from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './data.json';
import {useState,useEffect} from 'react';

export default function Insert(props){

	const data   = JSON.parse(JSON.stringify(ld))

	const [locations, setLocations] = useState();

	useEffect(async () => {
		let isMounted = true;
		let _locations = await client({url:'/tnrl-stats/wifi/locations'});
		
		if(isMounted){
			setLocations(_locations);
			
		}
		return () => (isMounted = false)
	},[]);


	const handleSubmit = async(data) => {
	
		let params = {years:data.years,months:data.months,locations:data.locations}

		delete data._id
		delete data.years
		delete data.months
		delete data.locations

		data.parameters = params;

		console.log(data);

		var results = await client({url:"/tnrl-stats/reports/wifi/usage",params:{method:"POST",body:data}})
		success(["Success","A new Report record was inserted."]);
		window.location.href = '/tnrl-stats/admin/reports/wifi/usage'; 
	}

	if(locations){
		
		data.form.fields[2].options = [
			{label:"2013",name:"2013",value:"2013"},
			{label:"2014",name:"2014",value:"2014"},
			{label:"2015",name:"2015",value:"2015"},
			{label:"2016",name:"2016",value:"2016"},
			{label:"2017",name:"2017",value:"2017"},
			{label:"2018",name:"2018",value:"2018"},
			{label:"2019",name:"2019",value:"2019"},
			{label:"2020",name:"2020",value:"2020"},
			{label:"2021",name:"2021",value:"2021"},
			{label:"2022",name:"2022",value:"2022"},
			{label:"2023",name:"2023",value:"2023"},
			{label:"2024",name:"2024",value:"2024"}
		]

		data.form.fields[3].options = [
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

		data.form.fields[4].options = locations.map((item,i)=>({label:item.name,name:item.lib_id,value:item.lib_id}));
		
		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />

	}else{
		return <></>
	}

	
	
}
