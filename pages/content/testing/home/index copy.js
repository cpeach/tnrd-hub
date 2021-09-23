

import style     from '/styles/Index.module.css';
import api     from '/scripts/api.js';
import client 	from '/scripts/client-api.js';
import Link    from 'next/link';
import Router from 'next/router';
import Image from 'next/image';
import Frame   from '/components/frames/frame.js';
import Card    from '/components/layout/cards/card.js';
import Container from '/components/layout/containers/index.js';
import { SearchOutlined,CloseCircleOutlined } from '@ant-design/icons';
import { Empty,Divider  } from 'antd';	
import { useState,useEffect,ReactDOM  } from 'react';

export default function _Index(props) { 
	
	var data = {}

	
	const departments  = api({url:'/api-console/departments/'});

	const [filters, setFilters] = useState({});
	const [count, setCount] = useState();
	const [applications, setApplications] = useState();
	const [cards, setCards] = useState();

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
				_filters[i].className = '';//_filters[i].className.replace("active","")
			}
			document.getElementById("all").className=style.main_filters_active;
		}else{
			
			for(var i=0; i<cards.length;i++){
				if(filters[cards[i].id]){
					_count = filters[cards[i].id].includes(e.currentTarget.id)?_count+1:_count;
					cards[i].style.display = filters[cards[i].id].includes(e.currentTarget.id)?'inline-block':'none';
				}
			}

			var _filters = document.getElementById("filters").children;
			for(var i=0; i<_filters.length;i++){
				_filters[i].className = '';//_filters[i].className.replace("active","")
			}
			e.currentTarget.className =style.main_filters_active;
		}
		setCount(_count);
	}

	const getCards = (p)=>{
		var out;
		if(p && p.length>0){
			out = p.map((card,i)=>(
        
				<Container id={card.id?card.id:''} name={card.name?card.name:''} key={card.name} size="4" padding={{all:"xs"}} visable={card.visable} >
					<div className={style.card} onClick={()=>{Router.push("content/applications/"+card._id)}}>
						<Container  key={card.name} size="12" padding={{all:"md"}} align="left" >
							<img src={(card.image?card.image.url:'')===''?"/icons/app.png":card.image.url} width={42} height={42} />
							<h3   className={style.card_title}>{card.name}</h3>
							<p    className={style.card_details}>{card.description.substr(0,94)+" ..."}</p>
							<a    className={style.card_link}>View</a>
						</Container>
					</div>
				</Container>
				/* { <Card id={card._id} image={card.image?card.image.url:''} key={"card-"+i} title={card.name} link={"/"+card._id}  name={'card-'+i} /> }*/
			))
		}else{
			out = <Empty key="empty" image={Empty.PRESENTED_IMAGE_SIMPLE} />
		}
		setCards(out);
	}

 	const search = async (e)=>{
    let value = e.currentTarget.value;
    if (value.trim(" ").length > 0){
      e.currentTarget.parentElement.style.background = 'white';
      e.currentTarget.parentElement.style.color = 'black';
    } else {
      e.currentTarget.parentElement.removeAttribute('style');
    }
    
     var clearsearch = document.querySelector('#clearsearch');
		 
    
		 if (value.trim(" ").length > 3){
       var apps = await client({url:"/api-console/applications/search",params:{method:"POST",body:{term:e.currentTarget.value}}})
			setApplications(apps);
			getCards(apps);
       clearsearch.style.opacity = 1;
		 } else {
       clearsearch.style.opacity = 0;
       let apps = await client({url:'/api-console/applications/'});
       setApplications(apps);
			 getCards(apps);
     }
	 }
  
  const clearSearch = async (e)=>{
    var input = document.querySelector('.searchinput');
    input.value = '';
    let apps = await client({url:'/api-console/applications/'});
    setApplications(apps);
		getCards(apps);
  }


	useEffect(async () => {
		let isMounted = true;
		let apps = await client({url:'/api-console/applications/'});
		if(isMounted){
			setApplications(apps);
			getCards(apps);
		}
		return () => (isMounted = false)
  	},[]);


	if(departments){
		
		

		/*  applications.map((item)=>{
			filters[item._id] = item.departments.map(dep=>(dep._id));
		});  */
		data.content = (
			<>
				<Container valign="top" size="12" align="center" color="primary" >
					<div className={style.main_search}>
					
						<h2>Applications and Online Services</h2>
						<div className={style.main_search_wrapper}>
							<SearchOutlined key="icon"  style={{"fontSize":"21px","width":"8%","paddingTop":"5px"}} />
							<input type="text" className="searchinput" placeholder="Search for Applications..." onKeyUp={search} required/>
              <CloseCircleOutlined key="icon-1" id="clearsearch" className={style.clearsearch} onClick={clearSearch}/>
						</div>
					</div>
				</Container>
				<Container size="12" align="center"  color="white" style={{"backgroundColor":"white","borderBottom":"1px solid rgb(220,220,220)"}}>
					<div id="filters" className={style.main_filters}>
						<span id="all" className={style.main_filters_active} onClick={filter}>All</span>
						{
							departments.map((item,i)=>{
								return <span key={"filter-"+i} id={item._id} onClick={filter}>{item.name}</span>
							})
						}
					</div>					
				</Container>


				<Container id="cards" valign="top" size="12" align="center" padding={{"y":"md"}} color="light">
				
					<div className={style.cards}>
						{cards}
					</div>
						
					<div className="overlay"></div>
				</Container>
			</>
		);	
	}			
							
	return ( <Frame user={props.user} apps={props.apps} key="frame" data={data} active="1" navigation="false" path={false} />)
} 


{/* <div className={style.divider}><Divider>{(count!=undefined?count:applications.length) +" / "+ applications.length + " Applications"}</Divider></div> */}