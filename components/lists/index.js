
import client   from '/scripts/client-api.js';
import style from './List.module.css';
import {useState,useEffect,useRef} from 'react';
import {CloseOutlined,SearchOutlined,FunnelPlotOutlined,CaretDownOutlined,LoadingOutlined } from '@ant-design/icons';
import {Empty,Tooltip} from 'antd'

export default function List(props)
{	

	console.log(props.data.rows)
	
	const [initial,setInitial] = useState(true)
	const [rowsStyle,setRowsStyle] = useState(style.home_results_rows_in);
	const [searching,setSearching]   = useState(false);
	const [searchIcon,setSearchIcon] = useState();
	const [searchValue,setSearchValue] = useState();

	const [recordsTotal,setRecordsTotal] = useState(0);
	const [resultsTotal,setResultsTotal] = useState(0);
	const [resultsLabel,setResultsLabel] = useState(0);
	const [results,setResults] = useState([]);
	const [rows,setRows] = useState(<></>);
	
	const [filters,setFilters] = useState();
	let currentFilter;
	//const [applications,setApplications] = useState(props.apps);
	

	const inputRef = useRef();
	const filtersRef = useRef();
	const filterAllRef = useRef();
	const filterBookmarkRef = useRef();

	var data = {}

//	SEARCH

	const search = ()=>{
		setSearching(true);
		setSearchValue(inputRef.current.value);
	}
	const clear = ()=>{filter();}

	useEffect(async ()=>{
		if(searching && (searchValue && searchValue!=="")){
			clearFilters();
			setSearchIcon(<LoadingOutlined spin style={{paddingTop:"9px"}} />);
			let apps = await client({url:"/api-console/applications/search",params:{method:"POST",body:{term:inputRef.current.value}}})
			setResults(apps);
			setSearching(false);
			setResultsLabel("Search Term: "+searchValue)
		}else{
			if(inputRef.current && inputRef.current.value !== searchValue){
				search()
			}else if(inputRef.current && inputRef.current.value){
				setSearchIcon(<Tooltip title="Clear Search" color="rgba(0,0,0,0.7)" ><CloseOutlined onClick={clear} style={{paddingTop:"9px"}} /></Tooltip>);
			}else{
				//clear();
			}
			
			setSearching(false);
		}

	},[searching])


	useEffect(()=>{

		let _rows = (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
		if(results.length>0){
			//setRowsStyle(style.home_results_rows_out)

			_rows = results.map((row,r)=>(
					<div key={"row-"+r}>
						{
							props.data.columns.map((col,c)=>{
								return (
									<div key={"col-"+c}  className={col.align||"left"}>
										{col.render ? col.render(row[col.ref]) : typeof row[col.ref] === "string" ? row[col.ref] : ""}
									</div>
								)
							})
						}
					</div>
			));
			//setTimeout(() => {setRowsStyle(style.home_results_rows_in)},300);
		}
		setResultsTotal(results.length);
		setRows(_rows); 
		
		
	},[results])

//	FILTER

	const filter = async (e)=>{
		let departments = await client({url:'/api-console/departments/'});
		setResults(props.data.rows);
		
		inputRef.current.value = "";
		setSearchIcon(<></>);
	}

	const clearFilters = ()=>{
/* 		let _filters = filtersRef.current.children;
		for(var i = 0; i<_filters.length;i++){
			_filters[i].className = style.home_filter;
		} */

	}

	useEffect(async()=>{

		let isMounted = true;
		
		if(isMounted && props.data.rows){
			setRecordsTotal(props.data.rows.length);
			
		
	/* 		let _filters = departments.map((item,i)=>(
				<span key={"filter-"+i} name={item.short} className={style.home_filter} onClick={filter}>{item.name}</span>
			))
			_filters.unshift((<span ref={filterBookmarkRef} key="filter-bookmark" onClick={filter} className={style.home_filter} name="bookmark"><img style={{width:"18px"}} src="/icons/bookmark.svg" /> Bookmarks</span>))
			_filters.unshift((<span ref={filterAllRef} key="filter-all" onClick={filter} className={style.home_filter} name="all">{"All"}</span>))
				 */
			//setFilters(_filters)
			filter();			
		}

		return () => (isMounted = false);

	},[])
	
	
	
	return (
		<>
		
		<div className={style.list_heading+" mar_bottom_xl"}>
			<h1>Applications</h1>
			<div className={style.list_actions}>
				<div>New Application</div>
			</div>			
		</div>
		<div className={style.list_options+" mar_bottom_md"}>
			

			<div className={style.list_search}>
				<SearchOutlined style={{paddingTop:"9px"}} />
				<input ref={inputRef} type="text" placeholder="Search Items" onKeyUp={search} required  />
				<span className={style.home_search_icon}>{searchIcon}</span>
			</div>
			<div className={style.list_results}>
				{recordsTotal} Records
			</div>
			<div className={style.list_filters}>
				<div>Filters <FunnelPlotOutlined style={{marginLeft:"6px",color:"rgb(140,140,140)"}} /></div>
			</div>	
			<div className={style.list_more}>
				<div>Options <CaretDownOutlined style={{marginLeft:"6px",color:"rgb(140,140,140)"}} /></div>
			</div>
		</div>

		<div className={style.list}>
			<div>
				{
					props.data.columns.map((col,c)=>(
						
						<div key={"head-"+c} className={col.align||"left"}>
							{col.title}
						</div>
					))
					
				}
			</div>
			
			{rows}

			
		</div>
		</>
	)
}
