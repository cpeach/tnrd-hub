import {forwardRef,useState,useImperativeHandle,useEffect,useRef} from 'react';
import style from '../Form.module.css';
import { Popconfirm, Modal,message }  from 'antd';
import { PlusCircleFilled,EditOutlined,DeleteFilled } from '@ant-design/icons';
import Form from '/components/forms/index.js';

const List = forwardRef((props, ref) => {

	//var _attributes = JSON.parse(JSON.stringify(props.data.attributes.form))
	const [initial, setInitial] = useState(true);
	const [isModalVisible, setModalVisible] = useState(false);
	const [value, setValue]     = useState(props.data.value||[]);
	const [index, setIndex]     = useState(0);
	const [action, setAction]   = useState('');
	const [current, setCurrent] = useState({});
	const [name, setName]       = useState(props.data.name||props.data.attributes.name);
	const [attributes,setAttributes] = useState(props.data.attributes.form);


	const formRef  = useRef();
	const itemRefs = useRef(new Array());


	useImperativeHandle(ref, () => ({
		getName    : ()=>{return name},
		clearField : ()=>{setInitial(true);setValue([])},
		setField   : (v)=>{setInitial(true);setValue(v)},
		getField   : ()=>{
			var v = validate(value);
			props.onChange(v);

			if(v.valid){
				value.map(async(item,i)=>{
					for(let k in item){
						if(item[k].defer){
							item[k] = await item[k].method(item[k].params);
						}
					}
					
				})
			}
			console.log(value)
			v.value = value;
			v.name  = name;
			return v;
		}
	}));

	const update = async(data)=>{

		var _value = [...value];
		action === 'add'?_value.splice(index,0,data):_value[index]=data;
		setValue(_value);
		setModalVisible(false);
		formRef.current.clear();
		props.onChange(validate(_value));

	}

	const add = (e)=>{
		var valid = value.length === props.data.max	? false : true;
		var error = valid ? "":"You have reached the max number of items for this list"
		if(valid){
			setAction('add'); 
			setIndex(value.length>0 ? index+1 : 0)
			setModalVisible(true);
			
		}else{
			props.onChange({valid:valid,error:error});
		}
	}

	const edit = (e)=>{
		setAction('edit'); 
		formRef.current.set({...value[index]});
		setModalVisible(true);
	}

	const _delete = (e)=>{
		var _value = [...value];
		_value.splice(index,1);
		setValue(_value);
		props.onChange(validate(_value));
	}

	const cancel = ()=>{
		formRef.current.clear();
		setModalVisible(false);
	}


	const validate = (v)=>{
		let valid=true,error="";
		props.data.min = props.data.min?0:props.data.required?1:0;
		valid = v.length<props.data.min?false:true;
		error = valid ?"":"This field requires at least "+props.data.min+" item."
		return {valid:valid,error:error}
	}

	return (
			<div className={style.list} >
				<ul key="list">
					{
						value && value.length>0 ? 
							value.map((item,i)=>(
								<li ref={(element) => {itemRefs.current[i]=element}} data-index={i} key={"item-"+i} name={"item-"+i} onMouseOver={(e)=>(setIndex(e.currentTarget.dataset.index))}>
									<div key="add" onClick={add}><PlusCircleFilled /></div>
									<label key="label">
										{value[i][props.data.ref]}
									</label>
									<div data-index={i} >
										<EditOutlined onClick={edit}/>
										<div></div>
										 <Popconfirm title="Are you sure to delete this item?" onConfirm={_delete} okText="Yes" cancelText="No" >
											<DeleteFilled />	
										</Popconfirm>
									</div>
								</li>							
							))
						: <li className={style.list_add}><div onClick={add}>Add Item</div></li>
					}
				</ul>
				<Form ref={formRef} dialog={true} user={props.user} apps={props.apps} data={attributes} active="1" onSubmit={update} visible={isModalVisible} cancel={cancel} />
					
			</div>
	)
	 
})

export default List;

