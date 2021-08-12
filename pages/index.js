
import style     from '/styles/Index.module.css';
import api     from '/scripts/api.js';
import Frame   from '/components/frames/frame.js';
import Card    from '/components/layout/cards/card.js';
import Container from '/components/layout/containers/index.js';
import { SearchOutlined } from '@ant-design/icons';
import { Empty,Divider  } from 'antd';	
import { useState,useEffect  } from 'react';
export default function _Index() { 
	
	var data = {}

	const applications = api({url:'/admin/hub/applications/'});
	const departments  = api({url:'/admin/hub/departments/'});

	const [filters, setFilters] = useState({});
	const [count, setCount] = useState();


	const clear =  (e)=>{}

	const filter = (e)=>{
		var _count = 0;
		var cards = document.getElementById("cards").children;
		if(e.currentTarget.id==="all"){
			_count = cards.length-1
			for(var i=0; i<cards.length;i++){
				cards[i].style.display = 'inline-block';
			}
			var _filters = document.getElementById("filters").children;
			for(var i=0; i<_filters.length;i++){
				_filters[i].className = _filters[i].className.replace("active","")
			}
			document.getElementById("all").className="active";
		}else{
			
			for(var i=0; i<cards.length;i++){
				if(filters[cards[i].id]){
					_count = filters[cards[i].id].includes(e.currentTarget.id)?_count+1:_count;
					cards[i].style.display = filters[cards[i].id].includes(e.currentTarget.id)?'inline-block':'none';
				}
			}

			var _filters = document.getElementById("filters").children;
			for(var i=0; i<_filters.length;i++){
				_filters[i].className = _filters[i].className.replace("active","")
			}
			e.currentTarget.className = "active"
		}
		setCount(_count);
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


	
	if(departments && applications && applications.unauthorized !== true){
		
		applications.map((item)=>{
			filters[item._id] = item.departments.map(dep=>(dep._id));
		});
		data.content = (
			<div>
				<Container padding={{all:'xs'}} valign="top" size="8" align="center" >
					
					<div  className="main_search">
						<input type="text" placeholder="Search Applications" />
						<SearchOutlined key="icon"  style={{"fontSize":"21px","width":"10%"}} />
					</div>
					<div id="filters" className="main_filters">
						<span id="all" className="active" onClick={filter}>All</span>
						{
							departments.map((item,i)=>{
								return <span key={"filter-"+i} id={item._id} onClick={filter}>{item.name}</span>
							})
						}
					</div>
				</Container>
				<div className={style.divider}><Divider>{(count!=undefined?count:applications.length) +" / "+ applications.length + " Applications"}</Divider></div>
				<Container id="cards" padding={{all:'sm'}} valign="top" size="12" align="left">
					{cards(applications)}
					<div className="overlay"></div>
				</Container>
			</div>
		);	
	}			
							
	return (<Frame key="frame" data={data}  active="1" navigation="false" />)
} 

