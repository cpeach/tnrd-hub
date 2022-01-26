//import { Button } from 'tnrd-components';

import {useState,useEffect,useRef} from 'react';
import {withRouter} from 'next/router';
import Link from 'next/link';
import client 	   	from '/scripts/client-api.js';
import Frame        from '/components/frames/frame2.js';
import Page         from '/components/layout/pages/index.js';
import Form         from '/components/forms/index.js';
import { Popconfirm, message,Divider,Descriptions,Empty,Modal } from 'antd';
 
import style from './Index.module.css';


function _Application(props) { 
	
	let data = {}

	const {_id}  = props.router.query;
	const [application,setApplication] = useState();
	const [resultsStyle,setResultsStyle] = useState(style.results_in);
	const [resources,setResources] = useState([]);
	const [allResources,setAllResources] = useState([]);
	const [resultsTotal,setResultsTotal] = useState(0);
	const [results,setResults] = useState((<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />));
	const [currentFilter,setCurrentFilter] = useState();
	const [isModalVisible, setModalVisible] = useState(false);
	const [resourceTypes, setResourceTypes] = useState();
	const filterAllRef = useRef();	
	const formRef      = useRef();

	const tags = (data)=>{
		var items = data.departments.map((item,i)=>{
			return <span key={"link-"+i}>{item.name}</span>
		});
		return items; 
	}

	const filter = (e)=>{
		var name = e.target.getAttribute("name")

		if(application && allResources && allResources.length>0){
			
			if(name === 'all'){
				filterAllRef.current.className = style.resources_filter_active;
				setResources(allResources);
			}else{
				e.target.className = style.resources_filter_active;
				filterAllRef.current.className = style.resources_filter;
				var _resources = [];
				allResources.map((item,i)=>{
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
					<a href={item.url?item.url:item.file_meta.url} target={"_blank"} className={style.resource_wrapper} download>
						<div className={style.resource_icon}>
							<img src={images[item.type]?images[item.type][1] :images.documentation[1]}/>
						</div>
						<div className={style.resource_details}>
							<div><h5 className="box _9 middle">{item.name}</h5><a className="box _3 link right middle" href={"/content/applications/"+(item.url?"links":"files")+"/edit/"+item._id} >Edit</a></div>
							{item.description?<p>{item.description}</p>:<></>}
							<label >{item.url?"Visit Link":"Download File"}</label>
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

		let isMounted       = true;
		var _application    = await client({url:'/hub-console/applications/'+_id});
		var _resource_types = await client({url:'/hub-console/resource_types/'});
		var links   = await client({url:'/hub-console/resource_links/application/'+_id});
		var files   = await client({url:'/hub-console/resource_files/application/'+_id});
		links = links.concat(files)
		
		if(isMounted && _application && _resource_types){
			setApplication(_application);
			setResourceTypes(_resource_types);
			setResources(links)
			setAllResources(links)
		}

		return () => (isMounted = false);

	},[])

	const bookmarked = (app)=>{
		let user = props.user.profile;
		let valid = false;
		user.bookmarks.map((item,i)=>{
			valid = item===app._id?true:valid;
		});
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
			results = await client({url:"/hub-console/users/bookmarks/"+props.user.profile._id,params:{method:"PUT",body:bookmarks}})
		}else{
			bookmarks.push(application._id);
			img.setAttribute('src','/icons/bookmark_solid_orange.svg');
			span.textContent="Bookmarked";
			results = await client({url:"/hub-console/users/bookmarks/"+props.user.profile._id,params:{method:"PUT",body:bookmarks}})
		}

	
	}

	const update = ()=>{
		setIsModalVisible(true)
	}

	const cancel = ()=>{
		formRef.current.clear();
		setModalVisible(false);
	}

	const handleSubmit = async(data) => {

		console.log(data)

		/* delete data._id
		var results = await client({url:"/hub-console/applications/documents",params:{method:"PUT",body:data}})
		success(["Success","A new Department record was inserted."]);
		window.location.href f= '/stats-counter/admin/departments/';  */
	}

	
	
		if(application && resourceTypes){
			data.content = (
				<>	
				<Page >
					<div className={style.panel}>
						<div className={style.content}>
						
							<div className={style.left_panel}>
								<div className={style.img_wrapper}>
									<div></div>
									<img src={(application.image_meta?application.image_meta.url:'')===''?"/icons/app.png":application.image_meta.url} />
								</div>
								<div className={style.details_wrapper}>
									<h1 className={style.title}>{application.name}</h1>
									<div className={style.tags}>{tags(application)}</div>
								</div>			
								<p className={style.description}>{application.description}</p>			
							</div>
							<div className={style.right_panel}>
							
								<div className={style.options}>
									{
										application.ui.menu.map((item,i)=>(
											(<a key={"app_"+i} href={item.link} style={{width:"100%"}} target={item.link.indexOf('http')>-1?"_blank":"_self"} ><div key={"option-"+i} className={item.type==='primary'?style.option_primary:style.option_secondary}>{item.label}</div></a>))
										)
									}		
									<div onClick={bookmark} className={style.option_more}>
										{
											bookmarked(application) ? 
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
				</Page>

				<div className={style.resources + " b-t"}>
					<Page >
						<div className={style.resources_wrapper}>	
							<h2>Resources</h2>
							<div className={style.resources_filters} >
								<div name="all" ref={filterAllRef} className={style.resources_filter_active} onClick={filter}>All</div>
								{
									resourceTypes.map((item,i)=>{
										return <div key={"resourcestype"+i} id={item._id} name={item._id} className={style.resources_filter} onClick={filter}>{item.name}</div>
									})
								}
								
							</div>
							<div className={style.resources_options}>
								<label>{resultsTotal} Item(s)</label>
								<div className="box _6 right middle"><a className="link pad_bottom_sm" onClick={()=>{setModalVisible(true)}}>Add Resource</a></div>
							</div>
							<div className={resultsStyle}>
								{results}					
							</div>
							<div className="pad_y_xl"></div>
						</div>

					</Page>				
				</div>
				<Modal visible={isModalVisible} title="Add Resource" footer={null} onCancel={()=>{setModalVisible(false)}}>
					<Link href={"/content/applications/links/insert/"+_id}>
						<div className="mar_y_md border touch pad_md hand-border-primary">
							<img src="/icons/document.png" className="box _1 top pad_top_sm" />
							<div className="box _11 top pad_x_lg">
								<h6>Resource Link</h6>
								<p className="small">Provide a url link to another resource, outside of Application Hub.</p>
							</div>
						</div>
					</Link>
					<Link href={"/content/applications/files/insert/"+_id}>
						<div className="mar_y_md border touch pad_md hand-border-primary">
							<img src="/icons/document.png" className="box _1 top pad_top_sm" />
							<div className="box _11 top pad_x_lg">
								<h6>Upload File</h6>
								<p className="small">Upload various document types including: PDF, MS Word, Excel, Powerpoint and more.</p>
							</div>
						</div>
					</Link>	
				</Modal>
				</>
			)
		return ( <Frame user={props.user} apps={props.apps}  align="center" data={data} active="1" navigation="false"  />)
	}else{
		return <></>;
	}
		
			
} 

export default withRouter(_Application)

{/* <Form ref={formRef} dialog={true} user={props.user} apps={props.apps} data={data.form} active="1" onSubmit={handlesubmit} visible={isModalVisible} cancel={cancel}/>
			

 */}/* 

 <div name="download" className={style.resources_filter} onClick={filter}>Downloads</div>
								<div name="faq" className={style.resources_filter} onClick={filter}>FAQs</div>
								<div name="guide" className={style.resources_filter} onClick={filter}>Guides & Procedures</div>
								<div name="licensing" className={style.resources_filter} onClick={filter}>Licensing & Billing</div>
								<div name="documentation" className={style.resources_filter} onClick={filter}>Other</div> */