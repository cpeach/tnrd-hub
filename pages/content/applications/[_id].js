//import { Button } from 'tnrd-components';

import {useState,useEffect,useRef} from 'react';
import Link      from 'next/link';
import {withRouter} from 'next/router';
import api 	   	from '/scripts/api.js';
import client 	   	from '/scripts/client-api.js';
import Frame    from '/components/frames/frame2.js';
import { FileTextOutlined } from '@ant-design/icons';
import { Popconfirm, message,Divider,Descriptions,Empty } from 'antd';
 
import style from './Index.module.css';

function _Application(props) { 
	
	const {_id}  = props.router.query
	const data   = {};
	const [application,setApplication] = useState();
	const [resultsStyle,setResultsStyle] = useState(style.results_in);
	const [resources,setResources] = useState([]);
	const [resultsTotal,setResultsTotal] = useState(0);
	const [results,setResults] = useState((<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />));
	const [currentFilter,setCurrentFilter] = useState();
	
	const filterAllRef = useRef();

	const tags = (data)=>{
		var items = data.departments.map((item,i)=>{
				return <span key={"link-"+i}>{item.name}</span>
		});
		return items; 
	}

	const filter = (e)=>{
		var name = e.target.getAttribute("name")
		
		if(application && application.ui && application.ui.resources){
			if(name === 'all'){
				filterAllRef.current.className = style.resources_filter_active;
				setResources(application.ui.resources)
			}else{
				e.target.className = style.resources_filter_active;
				filterAllRef.current.className = style.resources_filter;
				var _resources = [];
				application.ui.resources.map((item,i)=>{
					if(item.type === name){
						_resources.push(item)
					} 
				});
				setResources(_resources)					
			}
			
		}
		currentFilter ? currentFilter.className = style.resources_filter : null;
		setCurrentFilter(e.target);
		

	}

	useEffect(()=>{

		let images = {
			"documentation":["View Document","/icons/document.png"],
			"download":["Get File","/icons/download.png"],
			"license":["See License","/icons/license.png"],
			"faq":["See More","/icons/faq_color.png"],
			"guide":["See More","/icons/info.png"]
		}
		let _results = (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
		setResultsStyle(style.results_out)
		
		if(resources && resources.length>0){
			
			_results = resources.map((item,i)=>(
				<div key={"resource-"+i} className={style.resource}>
					<a href={item.link} target={"_blank"} className={style.resource_wrapper}>
						<div className={style.resource_icon}>
							<img src={images[item.type]?images[item.type][1] :images.documentation[1]}/>
						</div>
						<div className={style.resource_details}>
							<h5>{item.title}</h5>
							{item.description?<p>{item.description}</p>:<></>}
							<label >{images[name]?images[name][0]:images.documentation[0]}</label>
						</div>
					</a>
				</div>
			));
			
		}
		setTimeout(() => {setResultsStyle(style.results_in)},300);
		setResults(_results)
		setResultsTotal(_results.length||0)
		
	},[resources])

	useEffect(async()=>{

		let isMounted    = true;
		var _application = await client({url:'/api-console/applications/'+_id});

		if(isMounted && _application){
			setApplication(_application)
			_application.ui&&_application.ui.resources?setResources(_application.ui.resources):null
		}

		return () => (isMounted = false);

	},[])

	const bookmarked = (app)=>{
		let user = props.user.profile;
		let valid = false;
		console.log(props.user.profile)
		user.bookmarks.map((item,i)=>{
			console.log(item+" "+app._id)
			valid = item===app._id?true:valid;
		});
		console.log(valid)
		return valid;
	}

	const bookmark = async (e)=>{
		
		let user = props.user.profile;
		let bookmarks = props.user.profile.bookmarks || [];
		let results;
		let img  = e.currentTarget.firstElementChild;
		var span = e.currentTarget.lastElementChild;

		if(img.src.indexOf("solid")>-1){
			bookmarks.map((item,i)=>{item === application._id ? bookmarks.splice(i,1):null;});
			img.setAttribute('src','/icons/bookmark.svg');
			span.textContent="Bookmark";
			results = await client({url:"/api-console/users/bookmarks/"+props.user.profile._id,params:{method:"PUT",body:bookmarks}})
		}else{
			bookmarks.push(application._id);
			img.setAttribute('src','/icons/bookmark_solid_orange.svg');
			span.textContent="Bookmarked";
			results = await client({url:"/api-console/users/bookmarks/"+props.user.profile._id,params:{method:"PUT",body:bookmarks}})
		}
		console.log(results);
		console.log(bookmarks)
	
	}

	var _application     = api({url:'/api-console/applications/'+_id});
	
		if(_application){


			data.content = (
			<>	
			<div className={style.panel}>
				<div className={style.content}>
				
					<div className={style.left_panel}>
						<div className={style.img_wrapper}>
							<div></div>
							<img src={(_application.image_meta?_application.image_meta.url:'')===''?"/icons/app.png":_application.image_meta.url} />
						</div>
						<div className={style.details_wrapper}>
							<h1 className={style.title}>{_application.name}</h1>
							<div className={style.tags}>{tags(_application)}</div>
						</div>			
						<p className={style.description}>{_application.description}</p>			
					</div>
					<div className={style.right_panel}>
					
						<div className={style.options}>
							{
								_application.ui.menu.map((item,i)=>(
									(<a key={"option-"+i} href={item.link} target={item.link.indexOf('hub.tnrdit')>-1||item.link.indexOf('http')===-1?"_self":"_blank"} className={item.type==='primary'?style.option_primary:style.option_secondary}>{item.label}</a>))
								)
							}		
							<div onClick={bookmark} className={style.option_more}>
								{
									bookmarked(_application) ? 
									(<><img src={"/icons/bookmark_solid_orange.svg"} /><span>Bookmarked</span></>) : 
									(<><img src={"/icons/bookmark.svg"} /><span>Bookmark</span></>)
								}
								
							</div>
							
							<div className={style.option_sep}></div>	
							<div className={style.option_more}>
								<img src="/icons/lock.svg" />Request Access
							</div>
							<div className={style.option_more}>
								<img src="/icons/bug.svg" />Report an Issue
							</div>
							<div className={style.option_more}>
								<img src="/icons/support.svg" />Get Help
							</div>							

						</div>
					</div>
				</div>
			</div>
			<div className={style.resources}>
				<div className={style.resources_wrapper}>	
					<h2>Resources</h2><label>{resultsTotal} Item(s)</label>
					<div className={style.resources_filters}>
						<div name="all" ref={filterAllRef} className={style.resources_filter_active} onClick={filter}>All</div>
						<div name="guide" className={style.resources_filter} onClick={filter}>Guides</div>
						<div name="faq" className={style.resources_filter} onClick={filter}>FAQs</div>
						<div name="documentation" className={style.resources_filter} onClick={filter}>Documentation</div>
						<div name="download" className={style.resources_filter} onClick={filter}>Downloads</div>
						<div name="licensing" className={style.resources_filter} onClick={filter}>Licensing</div>
					</div>
					<div className={resultsStyle}>
						{results}					
					</div>
				</div>				
			</div>
			</>
		)
	}
		
	return ( <Frame user={props.user} apps={props.apps} background="light" key="frame" data={data} active="1" navigation="false"  />)		
} 

export default withRouter(_Application)



