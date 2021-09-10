import {forwardRef,useImperativeHandle,useRef,useState} from 'react';
import style       from '../Form.module.css';
import Text        from './text.js';
//import Select      from './select.jsx';
//import MultiSelect from './multi_select.jsx';
//import Image       from './image.jsx';
//import List        from './list.jsx';

const Field = forwardRef((props, ref) => {

	const [valid, setvalid]   = useState(true);
	const [value, setValue]   = useState('');
	const [_style, setStyle]   = useState(style.field);
	const [description, setDescription]   = useState("");

	const fieldRef = useRef();
	const data = props.data;

	const handleChange = (p)=>{
		console.log(p);
		setValue(p.value);
		setStyle(p.valid?style.field:style.field_invalid);
		setDescription(p.description);
		props.onChange(p);	
		console.log(fieldRef.current.getValue())
	
	}
	useImperativeHandle(ref, () => ({getValue() {return fieldRef.current.getValue()}}));
	//const getValue = ()=>{return field.getValue();}
	//const getName = ()=>{return this.refs.field.getName();}
	//const validate = ()=>{return this.refs.field.validate();}
	
	const inputs = ()=>{
		let element;
		switch(data.tag){
			case 'text':
				element = (<Text ref={fieldRef} data={data} onChange={handleChange} />)
			/* case 'select':
				element = (<Select key="input-list" data={data} onChange={handleChange} />);
			case 'multi_select':
				element = (<MultiSelect required={data.required} key="input-multi_select" data={data} onChange={handleChange} />)
			case 'image':
				element = (<Image key="input-image" data={data} onChange={handleChange} />);
			case 'list':
				element = (<List key="input-list" data={data} onChange={handleChange}  />); */
		}
		
		return element;
	}
	
	
	return (
		<div className={_style + " _"+data.size}>
			<label key="label">{data.label}</label>
			<div key="inputs">
				{
					inputs()
				}
			</div>
			<span key="desc" >{description}</span>
		</div>		
	)
})

export default Field;