import {forwardRef,useImperativeHandle,useRef,useState} from 'react';
import style       from '../List.module.css';
import Select      from './select.js';
import MultiSelect from './multi_select.js';

const Filter = forwardRef((props, ref) => {

	const filterRef = useRef();
	const data = props.data;

	const [valid, setvalid]   = useState(true);
	const [_style, setStyle]  = useState(style.filter);
	const [description, setDescription]   = useState(data.description?data.description:"");


	const update = (p)=>{
		setStyle(p.valid?style.filter:style.filter_invalid);
	
		props.onChange(p);	
	}

	useImperativeHandle(ref, () => ({
		getName     : ()=>{return filterRef.current.getName()},
		getFilter   : ()=>{return filterRef.current.getFilter()},
		setFilter   : (v)=>{filterRef.current.setFilter(v)},
		clearFilter : ()=>{return filterRef.current.clearFilter();},
	}));
	
	const inputs = ()=>{
		var options = {
			'select':(<Select ref={filterRef} data={data} onChange={update} />),
			'multi_select':(<MultiSelect ref={filterRef} data={data} onChange={update} />),
		}
		return options[data.tag];
	}
	
	
	
	return (
		<div className={_style + " _12"}>
			<label>{data.label}</label>
			<div>{inputs()}</div>
			{data.description?<p>{data.description}</p>:<></>}
			
		</div>		
	)
})

export default Filter;