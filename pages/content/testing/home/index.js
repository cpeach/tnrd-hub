import style    from './Index.module.css';
import api      from '/scripts/api.js';
import Router   from 'next/router';
import client   from '/scripts/client-api.js';
import Frame    from '/components/frames/frame.js';
import {useState,useEffect,useRef} from 'react';
import { SearchOutlined,CloseOutlined,LoadingOutlined } from '@ant-design/icons';
import { Empty,Divider,Tooltip  } from 'antd';	

export default function Home(props) { 

	const [initial,setInitial] = useState(true)
	const [cardsStyle,setCardsStyle] = useState(style.home_results_cards_in);
	const [searching,setSearching]   = useState(false);
	const [searchIcon,setSearchIcon] = useState();
	const [searchValue,setSearchValue] = useState();

	const [recordsTotal,setRecordsTotal] = useState(0);
	const [resultsTotal,setResultsTotal] = useState(0);
	const [resultsLabel,setResultsLabel] = useState(0);
	const [results,setResults] = useState([]);
	const [cards,setCards] = useState(<></>);
	
	const [filters,setFilters] = useState();
	let currentFilter;
	//const [applications,setApplications] = useState(props.apps);
	

	const inputRef = useRef();
	const filtersRef = useRef();
	const filterAllRef = useRef();

	var data = {}

//	SEARCH

	const search = ()=>{
		setSearching(true);
		setSearchValue(inputRef.current.value);
	}
	const clear = ()=>{
		filter()
	}

	useEffect(async ()=>{
		if(searching && (searchValue && searchValue!=="")){
			clearFilters();
			setSearchIcon(<LoadingOutlined spin />);
			let apps = await client({url:"/api-console/applications/search",params:{method:"POST",body:{term:inputRef.current.value}}})
			setResults(apps);
			setSearching(false);
			setResultsLabel("Search Term: "+searchValue)
		}else{
			if(inputRef.current.value !== searchValue){
				search()
			}else if(inputRef.current.value){
				setSearchIcon(<Tooltip title="Clear Search" color="rgba(0,0,0,0.7)" ><CloseOutlined onClick={clear}/></Tooltip>);
		
			}else{
				clear();
			}
			
			setSearching(false);
		}

	},[searching]);




	useEffect(()=>{

		let _cards = (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
		if(results.length>0){
			setCardsStyle(style.home_results_cards_out)
			_cards = results.map((item,i)=>(
				<div key={"card-"+i} className={style.home_results_card}>
					<div className={style.home_results_card_wrapper} onClick={()=>{Router.push("/content/applications/"+item._id)}}>
						<div size="12" padding={{all:"md"}} align="left" >
							<img src={(item.image?item.image.url:'')===''?"/icons/app.png":item.image.url} width={42} height={42} />
							<h3  className={style.home_results_card_title}>{item.name}</h3>
							<p   className={style.home_results_card_details}>{item.description}</p>
						</div>
					</div>
				</div>
			));
			setTimeout(() => {setCardsStyle(style.home_results_cards_in)},300);
		}
		setResultsTotal(results.length);
		setCards(_cards);
		
		
	},[results])

//	FILTER

	const filter = async (e)=>{
		let departments = await client({url:'/api-console/departments/'});
		
		if(!e || (e&&e.target.getAttribute("name")==="all")){
			currentFilter?currentFilter.className = style.home_filter : null
			filterAllRef.current.className = style.home_filter_active;
			currentFilter = filterAllRef.current;
			setResults(props.apps);
			setResultsLabel("Filter: All")
		}else{	
			var _apps = props.apps
			currentFilter?currentFilter.className = style.home_filter : null
			e.target.className = style.home_filter_active;
			filterAllRef.current.className = style.home_filter;
			currentFilter = e.target;
			
			var _results = [];
			props.apps.map((item,i)=>{
				var valid = false;
				item.departments.map((dept,d)=>{
					valid = dept.short === e.target.getAttribute("name") ? true : valid;
				})
				valid ? _results.push(item) : null;
			})
			setResults([..._results])

			setResultsLabel("Filter: "+e.target.innerText)
		}
		inputRef.current.value = "";
		setSearchIcon(<></>);
		inputRef.current.className=style.home_search_input;
	}

	const clearFilters = ()=>{
		let _filters = filtersRef.current.children;
		for(var i = 0; i<_filters.length;i++){
			_filters[i].className = style.home_filter;
		}

	}

	useEffect(async()=>{

		let isMounted    = true;
		setRecordsTotal(props.apps.length);
		
		if(isMounted){
			let departments = await client({url:'/api-console/departments/'});
		
			let _filters = departments.map((item,i)=>(
				<span key={"filter-"+i} name={item.short} className={style.home_filter} onClick={filter}>{item.name}</span>
			))
			_filters.unshift((<span ref={filterAllRef} key="filter-all" onClick={filter} className={style.home_filter} name="all">{"All"}</span>))
			setFilters(_filters)
			filter();			
		}

		return () => (isMounted = false);

	},[])


	data.content = (

		<div className={style.home}>

			<div className={style.home_search}>
				<div className={style.home_search_wrapper}>
					<h1>Applications and Online Services</h1>
					<div className={style.home_search_field}>
						<span><SearchOutlined style={{"paddingTop":"5px"}} /></span>
						<input ref={inputRef} type="text" placeholder="Search for Applications..." onKeyUp={search} required/>
						<span className={style.home_search_icon}>{searchIcon}</span>
					</div>
				</div>
			</div>


			<div ref={filtersRef} className={style.home_filters}>
				{filters}	
			</div>

			<div className={style.home_results}>
				<div className={style.home_results_wrapper}>
					<div className={style.home_results_total}>
						Results {resultsTotal} of  {recordsTotal} 
					</div>
					<div className={style.home_results_label}>
						{resultsLabel} 
					</div>
					<div className={cardsStyle}>
						{cards}																												
					</div>
				</div>
			</div>

		</div>

	)


	return ( <Frame user={props.user} apps={props.apps} data={data} navigation="false" path={false} />)
} 





