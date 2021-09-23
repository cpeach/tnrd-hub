import {forwardRef,useImperativeHandle,useRef,useState} from 'react';
import style       from '../Form.module.css';
import Text        from './text.js';
import URL         from './url.js';
import Description from './description.js';
import Select      from './select.js';
import MultiSelect from './multi_select.js';
import Image       from './image.js';
import List        from './list.js';

const Field = forwardRef((props, ref) => {

	const fieldRef = useRef();
	const data = props.data;

	const [valid, setvalid]   = useState(true);
	const [_style, setStyle]  = useState(style.field);
	const [description, setDescription]   = useState(data.description?data.description:"");
	const [error, setError]   = useState("");

	const update = (p)=>{
		setStyle(p.valid?style.field:style.field_invalid);
		setError(p.error);
		props.onChange(p);	
	}

	useImperativeHandle(ref, () => ({
		getName    : ()=>{return fieldRef.current.getName()},
		getField   : ()=>{return fieldRef.current.getField()},
		setField   : (v)=>{fieldRef.current.setField(v)},
		clearField : ()=>{return fieldRef.current.clearField();},
	}));
	
	const inputs = ()=>{
		var options = {
			'text':(<Text ref={fieldRef} data={data} onChange={update} />),
			'url':(<URL ref={fieldRef} data={data} onChange={update} />),
			'description':(<Description ref={fieldRef} data={data} onChange={update} />),
			'select':(<Select ref={fieldRef} data={data} onChange={update} />),
			'multi_select':(<MultiSelect ref={fieldRef} data={data} onChange={update} />),
			'image':(<Image ref={fieldRef} dialog={props.dialog} data={data} onChange={update} />),
			'list' :(<List ref={fieldRef} data={data} onChange={update} />)
		}
		return options[data.tag];
	}
	
	
	return (
		<div className={_style + " _"+data.size}>
			<label>{data.label}</label>
			<div>{inputs()}</div>
			<span>{error}</span>
			{data.description?<p>{data.description}</p>:<></>}
			
		</div>		
	)
})

export default Field;