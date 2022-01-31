
import client   from '/scripts/client-api.js';
import style from './List.module.css';
import Filter from './filters/filter.js';
import {useState,useEffect,useRef} from 'react';
import Link from 'next/link';
import {CloseOutlined,SearchOutlined,FunnelPlotOutlined,CaretDownOutlined,LoadingOutlined } from '@ant-design/icons';
import {Empty,Tooltip,Modal} from 'antd'

export default function List(props)
{	


	const [rowsStyle,setRowsStyle]     = useState(style.home_results_rows_in);
	const [searching,setSearching]     = useState(false);
	const [searchIcon,setSearchIcon]   = useState();
	const [searchValue,setSearchValue] = useState("");

	const [resultsTotal,setResultsTotal] = useState(0);
	const [results,setResults]           = useState([]);
	const [rows,setRows]                 = useState(<></>);
	
	const [filtersVisable,setFiltersVisable] = useState(false);
	const [filterCount,setFilterCount] = useState(0);

	const [currentSort,setCurrentSort] = useState();

	let currentFilter;
	
	const inputRef = useRef();
	const filterRefs = useRef(new Array());

	var data = {}

//	SEARCH

	const search = ()=>{
		setSearching(true);
		setSearchValue(inputRef.current.value);
	}
	const clear = async()=>{
			setSearchIcon(<></>);
			props.onSearch?inputRef.current.value = "":null
			let apps = props.onSearch?await props.onSearch({search:""}):[];
			setResults(apps);
	}

	const getRows = (p)=>{
		let _rows = (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
		_rows = p.map((row,r)=>(
			<div key={"row-"+r}>
				{
					props.data.columns.map((col,c)=>{
						return (
							<div key={"col-"+c}  className={col.align||"left"}>
								{col.render ? col.render(col.ref==='*'?row:row[col.ref]) : typeof row[col.ref] === "string" ? row[col.ref] : ""}
							</div>
						)
					})
				}
			</div>
		));
		return _rows;
	}

	useEffect(async ()=>{
		if(searching && (searchValue && searchValue!=="")){
			setSearchIcon(<LoadingOutlined spin style={{paddingTop:"9px"}} />);
			let apps = await props.onSearch({search:inputRef.current.value});
			setResults(apps);
			setSearching(false);
		}else{
			if(inputRef.current && inputRef.current.value !== searchValue){
				search()
			}else if(inputRef.current && inputRef.current.value){
				setSearchIcon(<Tooltip title="Clear Search" color="rgba(0,0,0,0.7)" ><CloseOutlined onClick={clear} style={{paddingTop:"9px"}} /></Tooltip>);
			}else{
				clear();
			}
			setSearching(false);
		}

	},[searching])


	useEffect(()=>{

		if(results&&results.length>0){
			setResultsTotal(results.length);
			setRows(getRows(results)); 
		}
		
	},[results])

	useEffect(()=>{console.log("rows have chnaged")},[rows])

//	FILTER

	const loadFilters = async (e)=>{
		let _filters = props.data.filters.map((item,i)=>{
			return <Filter ref={(element) => {fieldRefs.current[k]=element}} key={"filter-"+i} data={item} onChange={change}/>
		})
		return _filters
	}


	const filterChange = (p)=>{}	

	useEffect(async()=>{

		let isMounted = true;
		
		if(isMounted && props.data.rows){
			setResults(props.data.rows);			
		}

		return () => (isMounted = false);

	},[])
	

	const applyFilters = async ()=>{

		let data = {},field,valid=true,count=0;
		var refs = filterRefs.current
		
		for(var i=0;i<refs.length;i++){
			let _filter = await refs[i].getFilter();
			data[_filter.name] = _filter.value;
		}  
		for(let i in data){
			switch (typeof data[i]) {
				case "string":
					break;
				case "object":
					data[i].length>0?count++:null;
					break;			
				default:
					break;
			}
		};

		let res = await props.onFilter({search:searchValue,filters:data});
		setResults(res);
		setFilterCount(count);
		setFiltersVisable(false)

	}
	const cancelFilters = ()=>{setFiltersVisable(false)}
	
	const sort = (e)=>{
		console.log(e.target)
		if(currentSort){currentSort.className= style.sort;}
		e.target.className = style.sort_active;
		setCurrentSort(e.target);
		results.sort((a, b) => a[e.target.getAttribute("name")].trim().localeCompare(b[e.target.getAttribute("name")].trim()));
		
		setRows(getRows(results)); 
	}

	return (
		<>
		
		<div className={style.list_heading+" mar_bottom_xl"}>
			<h1>{props.data.title}</h1>
			<div className={style.list_actions}>
				{props.data.new&&props.data.new.href?<Link href={props.data.new.href}>{props.data.new.label}</Link>:<></>}
			</div>			
		</div>
		<div className={style.list_options+" mar_bottom_md"}>
			
			{props.onSearch?<div className={style.list_search}>
				<SearchOutlined style={{paddingTop:"9px",fontSize:"16px"}} />
				<input ref={inputRef} type="text" placeholder="Search Items" onKeyUp={search} required  />
				<span className={style.home_search_icon}>{searchIcon}</span>
			</div>:<></>}
			<div className={style.list_results}>
				{resultsTotal} Records
			</div>
			{props.onFilter?<div className={style.list_filters} onClick={()=>{setFiltersVisable(true)}}>
				<div>Filters {filterCount} <FunnelPlotOutlined style={{marginLeft:"6px",fontSize:"16px",color:"rgb(140,140,140)"}} /></div>
			</div>:<></>}	
			<div className={style.list_more}>
				<div>Options <CaretDownOutlined style={{marginLeft:"6px",color:"rgb(140,140,140)"}} /></div>
			</div>
		</div>

		<div className={style.list}>
			<div>
				{
					props.data.columns.map((col,c)=>(
						col.sort ? 
						<div key={"head-"+c} className={col.align||"left " + style.sort } onClick={sort} name={col.ref}>
							{col.title}
						</div>
						:
						<div key={"head-"+c} className={col.align||"left "}  >
							{col.title}
						</div>						
					))
				}
			</div>
			
			{rows}

		</div>

		<Modal visible={filtersVisable} title="Filters" onOk={applyFilters} onCancel={cancelFilters} width={360}>
			{
				props.data.filters?
				props.data.filters.map((item,i)=>(
					<Filter ref={(element) => {filterRefs.current[i]=element}} key={"filter-"+i} data={item} onChange={filterChange}/>
				))
				:
				<div>No Filters</div>
			}
		</Modal>

		</>
	)
}
