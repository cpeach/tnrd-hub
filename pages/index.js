import Link    from 'next/link';
import gd  from './data.json'; // global data
import api     from '/scripts/api.js';
import Frame   from '/components/frames/frame.js';
import Card    from '/components/layout/cards/card.js';
import Container from '/components/layout/containers/index.js';
import Search  from '/components/layout/containers/index.js'
import { SearchOutlined } from '@ant-design/icons';
import { Empty } from 'antd';	
import { useState,useEffect  } from 'react';
export default function _Index() { 
	
	var g_data = JSON.parse(JSON.stringify(gd))

	const applications = api({url:'/admin/hub/applications/'});
	const departments  = api({url:'/admin/hub/departments/'});

	const [filters, setFilters] = useState({});

	const filter = (e)=>{
		var cards = document.getElementById("cards").children;
		console.log(filters)
		for(var i=0; i<cards.length;i++){
			console.log(filters[cards[i].id].includes(e.currentTarget.id))
			cards[i].style.display = filters[cards[i].id].includes(e.currentTarget.id)?'inline-block':'none';
		}
		
		//for(var filter in filters) filters[filter]=false;
		//filters[e.currentTarget.id] = true;
		//setFilters(filters)
	}

	const cards = (p)=>{
		
		var out;
		if(p && p.length>0){
			out = p.map((card,i)=>(
				 <Card id={card._id} image={card.image?card.image.url:''} key={"card-"+i} title={card.name} link={"/"+card._id} details={card.description} name={'card-'+i} />
			))
		}else{
			out = <Empty key="empty" image={Empty.PRESENTED_IMAGE_SIMPLE} />
		}
		return out;
	}



	if(departments && applications){
		applications.map((item)=>{
			filters[item._id] = item.departments.map(dep=>(dep._id));
		});
		g_data.content = (
			<>
				<Container key="filters" padding={{all:'xs'}} valign="top" size="8" align="center" >
					
					<div  className="main_search">
						<input type="text" placeholder="Search Applications" />
						<SearchOutlined key="icon"  style={{"fontSize":"21px","width":"10%"}} />
					</div>
					<div className="main_filters">
						<span className="active">All</span>
						{
							departments.map((item,i)=>{
								return <span key={"filter-"+i} id={item._id} onClick={filter}>{item.name}</span>
							})
						}
					</div>
				</Container>
				<Container id="cards" key="cards" padding={{all:'sm'}} valign="top" size="12" align="left">
					{cards(applications)}
				</Container>
			</>
		);	
	}			
							
	return (<Frame key="frame" data={g_data}  active="1" navigation="false" />)
} 

