
import client 	from '/scripts/client-api.js';
import {useRouter} from 'next/router';
import {useState,useEffect} from 'react';
import Form,{success,error}     from '/components/forms/index.js';
import ld   from './modify.json';

export default function Add(props){

	const router = useRouter();
	const data = JSON.parse(JSON.stringify(ld))
	const {_id} =  router.query

	const [item, setItem] = useState();
	const [items, setItems] = useState();
	const [categories, setCategories] = useState();


	const handleSubmit = async(data) => {
		
		data._id = _id;
	
		var results = await client({url:"/stats-counter/locations/items",params:{method:"PUT",body:data}})
		success(["Success","Your Stat Item record was updated."]);
		window.location.href = '/stats-counter/admin/departments/locations/'+item.group;  
	}

	useEffect(async () => {
		let isMounted = true;
		let _item =  await client({url:"/stats-counter/locations/"+_id})
		let _items = await client({url:"/stats-counter/items/list",params:{method:"POST",data:{}}})
		let _categories = await client({url:"/stats-counter/categories/list",params:{method:"POST",data:{}}})
		
		if(isMounted){
			setItem(_item);
			setItems(_items);
			setCategories(_categories)
		}
		return () => (isMounted = false)
	},[]);
	
	

	if(item&&items&&categories){

		data.form.path.back.href += item.group;
		data.form.subtitle = "Location: "+item.name;
		data.form.title    = "Manage";

		item.items.map((_item,i)=>{item.items[i].cat=item.items[i].category.name})
		data.form.fields[1].value = item.items;
		
		data.form.fields[1].attributes.form.fields[0].disabled = item.items.map(item=>item._id)
		data.form.fields[1].attributes.form.fields[0].groups = categories.map(item=>({label:item.name,name:item.name,value:item._id}));
		data.form.fields[1].attributes.form.fields[0].options = items.map(item=>({label:item.name,name:item.name,value:item._id,group:item.category._id}));

		data.form.fields[1].attributes.form.onSubmit = (p)=>{
			for(let i=0;i<items.length;i++){
				if(p._id === items[i]._id){ 
					p.name = items[i].name;
					p.cat  = items[i].category.name;
				}
			}
			
		}
		data.form.fields[1].onChange = (p)=>{
			data.form.fields[1].attributes.form.fields[0].disabled = p.value.map(item=>item._id)
		}
		

		return <Form user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handleSubmit} />
	}else{
		return <></>
	}
	

	
	
}
