import {forwardRef,useImperativeHandle,useRef,useState} from 'react';
import style       from '../Form.module.css';
import Hidden      from './hidden.js';
import Text        from './text.js';
import URL         from './url.js';
import Email       from './email.js';
import Description from './description.js';
import Select      from './select.js';
import MultiSelect from './multi_select.js';
import Roles       from './roles.js';
import Date        from './date.js';
import Time        from './time.js';
import Image       from './image.js';
import Document    from './document.js';
import File        from './file.js';
import List        from './list.js';
import Editor      from './editor.js';

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
		data.onChange ? data.onChange(p) : null;
	}

	useImperativeHandle(ref, () => ({
		getName    : ()=>{return fieldRef.current.getName()},
		getField   : ()=>{return fieldRef.current.getField()},
		setField   : (v)=>{fieldRef.current.setField(v)},
		clearField : ()=>{return fieldRef.current.clearField();},
	}));
	
	const inputs = ()=>{
		var options = {
			'hidden':(<Text ref={fieldRef} data={data} onChange={update} />),
			'text':(<Text ref={fieldRef} data={data} onChange={update} />),
			'url':(<URL ref={fieldRef} data={data} onChange={update} />),
			'email':(<Email ref={fieldRef} data={data} onChange={update} />),
			'description':(<Description ref={fieldRef} data={data} onChange={update} />),
			'select':(<Select ref={fieldRef} data={data} onChange={update} />),
			'multi_select':(<MultiSelect ref={fieldRef} data={data} onChange={update} />),
			'roles':(<Roles ref={fieldRef} data={data} onChange={update} />),
			'date':(<Date ref={fieldRef} data={data} onChange={update} />),
			'time':(<Time ref={fieldRef} data={data} onChange={update} />),
			'image':(<Image ref={fieldRef} dialog={props.dialog} data={data} defer={props.defer} onChange={update} />),
			'file':(<File ref={fieldRef} dialog={props.dialog} data={data} defer={props.defer} onChange={update} />),
			'document':(<Document ref={fieldRef} dialog={props.dialog} data={data} defer={props.defer} onChange={update} />),
			'list' :(<List ref={fieldRef} data={data} onChange={update} />),
			'editor' :(<Editor ref={fieldRef} data={data} onChange={update} />)
		}
		return options[data.tag];
	}
	
	
	
	return (
		<div className={data.tag!=="hidden"?(_style + " _"+(data.size||"")):style.hidden}>
			<label>{data.label}</label>
			{data.description?<p>{data.description}</p>:<></>}
			<div>{inputs()}</div>
			<span>{error}</span>
			
		</div>		
	)
})

export default Field;