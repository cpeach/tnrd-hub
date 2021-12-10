import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js'
import Tile    from '/components/layout/tiles/index.js'
import style   from '/styles/global.module.css';
import Link    from 'next/link';
import ld      from './data.json';  // local data
import client  from '/scripts/client-api.js';
import moment from 'moment';
import {useState,useEffect,useRef} from 'react';
import {Empty,DatePicker,Divider,Modal,Select} from 'antd';
import {DownOutlined,UpOutlined,CaretDownOutlined,CalendarOutlined } from '@ant-design/icons';
export default function Index(props) { 
   
    let data = JSON.parse(JSON.stringify(ld));
    
    const valueRefs = useRef({});

    const [departmentsVisable,setDepartmentsVisable] = useState(false);
    const [department,setDepartment]             = useState();
    const [departments,setDepartments]           = useState();
    const [departmentsSelect,setDepartmentsSelect]  = useState([]);

    const [groupsVisable,setGroupsVisable] = useState(false);
    const [group,setGroup]             = useState();
    const [groups,setGroups]           = useState();
    const [groupsSelect,setGroupsSelect]  = useState([]);
    const [groupDefault,setGroupDefault]  = useState();

    const [locationsVisable,setLocationsVisable] = useState(false);
    const [location,setLocation]             = useState();
    const [locations,setLocations]           = useState();
    const [locationsSelect,setLocationsSelect]  = useState([]);
 
    const [topicElements,setTopicElements] = useState();
    const [topicCurrent,setTopicCurrent] = useState(0);
    const [topics,setTopics] = useState();
    const [topic,setTopic] = useState();

    const [categoryElements,setCategoryElements] = useState();
    const [categories,setCategories]     = useState();

    const [itemElements,setItemElements] = useState();
    const [items,setItems]               = useState();

    const [values,setValues]             = useState([]);

    const [date,setDate] = useState(moment().format('YYYY-MM-DD'));

    const [queues,setQueues] = useState({});

   

//  UPDATE
    const update = (p,i)=>{
     
        let element = valueRefs.current[i];
        
        if(element.dataset.loading === "false"){

            let value = p?p+parseInt(element.value):parseInt(element.value);

            value = value>-1?value:0
            element.value = value;
            
            if(queues[i]){window.clearTimeout(queues[i]);}
            let _date = document.getElementById("dateRef").value || date
             queues[i] = window.setTimeout(async()=>{
                
                // set processing
                //element.dataset.loading = "true";
                let res =  await client({url:'/stats-counter/values/',params:{method:'PUT',body:{item:i,location:location._id,date:_date,value:element.value}}});
                console.log(res)
                queues[i] = undefined;
                setQueues(queues);
            },300); 
            setQueues(queues)
        }else{
            console.log("loading...")
        }
    }

    const loadValues = async ()=>{

        if(location && date && Object.keys(valueRefs.current).length > 0){

            let _values = await client({url:'/stats-counter/values/list',params:{method:'POST',body:{filters:{date:date,location:location._id}}}});
            if(_values && _values.length>0){
                for(let v in valueRefs.current){valueRefs.current[v]?valueRefs.current[v].value = 0:null;}
                _values.map(_item=>{
                    valueRefs.current[_item.item]?valueRefs.current[_item.item].value = _item.value : null;
                })
            }
        }
    }

//  DATE
    useEffect(async()=>{loadValues()},[date])

    useEffect(async()=>{loadValues()},[categoryElements])

//  CONTENT
    //useEffect(async()=>{
    const loadContent = ()=>{
        
        if(group && topic !== undefined && topic > -1){
            let _categoryElements=[],itemElements=[];
            let _categories = location.items.map(_item=>_item.category._id)
            
            topics[topic].categories.map((_cat,c)=>{
                if(_categories.includes(_cat._id)){
                    _categoryElements.push(<div key={"cat-"+c} className="pad_x_md pad_y_lg light">{_cat.name}</div>)
                    location.items.map((_item,i)=>{
                        if(_cat._id === _item.category._id){
                            _categoryElements.push((<div key={"itemn-"+i} className="pad_x_md pad_y_lg">
                                <div className="_9 box noselect middle pad_right_lg">
                                    <b>{_item.name}</b>
                                    <p className="small">{_item.description}</p>
                                </div>
                                <div className="_3 box right middle">
                                    <div className="border touch box shadow" style={{overflow:"hidden"}}>
                                        <input ref={(element) => {valueRefs.current[_item._id]=element}} className="noselect box _6 center middle" data-loading={false} onChange={(e)=>{update(undefined,_item._id)}} type="number" defaultValue="0" style={{marginTop:"-6px",fontSize:"19px"}} />
                                        <div className="b-l hand-primary box pad_md _3 center" style={{lineHeight:"0px"}} onClick={()=>{update(-1,_item._id)}} ><DownOutlined style={{fontSize:"19px"}} /></div>
                                        <div className="b-l hand-primary box pad_md _3 center" style={{lineHeight:"0px"}} onClick={()=>{update(1,_item._id)}} ><UpOutlined  style={{fontSize:"19px"}} /></div>
                                    </div>
                                </div>
                            </div>))
                        }
                    })
                }
            });

            setCategoryElements(_categoryElements);
            
            if(window){
                window.document.getElementById("topic-"+topicCurrent).className = "";
                window.document.getElementById("topic-"+topic).className = "highlight";
                setTopicCurrent(topic);
            }

            loadValues()

        }
    }
	//},[topic])

useEffect(async()=>{
    loadContent();
},[topic])


//  TOPICS
    useEffect(async()=>{
        setTopic();
        if(location && location.name !== "--"){
            console.log("set location")
            let _items  = location.items;
            let _topics = await client({url:'/stats-counter/topics/list',params:{method:'POST',body:{}}});
            let _topicElements = [];
            let _includeTopics = [];
            let _currentTopics = [];
            let topic_index = 0
            _items.map((_item,i)=>{
                _topics.map((_topic,t)=>{
                    if(_topic._id === _item.category.topic && !_includeTopics.includes(_topic._id)){
                        _includeTopics.push(_topic._id);
                        _currentTopics.push(_topic);
                        _topicElements.push(<span id={"topic-"+topic_index} key={'topic-'+topic_index} data-index={topic_index} onClick={(e)=>{setTopic(e.currentTarget.dataset.index);}}>{_topic.name}</span>)
                        topic_index++;
                    }
                })
            })
            
            setTopicElements(_topicElements);
            setTopics(_currentTopics);
            setTopic(0);

        }
       
	},[location])

//  LOCATONS
    useEffect(async()=>{
        
	    if(group && group.name !=="--"){

            setGroupsVisable(false);

            // get-set locations
            let _items    = await client({url:'/stats-counter/locations/list',params:{method:'POST',body:{filters:{group:group._id}}}});
           
            let _options = [], _location,_locations={};
            for(let i=0;i<_items.length;i++){
                _locations[_items[i]._id] = _items[i];
                _location = i === 0 ? _items[i] : _location;
                _options.push(<Select.Option key={"location-"+i} value={_items[i]._id}>{_items[i].name}</Select.Option>);
            }
            setLocation(_location);		
            setLocations(_locations);		
            setLocationsSelect(<div className="select_wrapper"><Select style={{padding:"9px 0px"}} bordered={false} defaultValue={_location._id} dropdownMatchSelectWidth={false} onChange={(p)=>{setLocation(_locations[p]);}}> {_options}</Select></div>);		
           
        }
        

	},[group])

//  GROUPS
    useEffect(async()=>{
	    if(department){
            
            setDepartmentsVisable(false);

            // get-set groups
            let _items = await client({url:'/stats-counter/groups/list',params:{method:'POST',body:{filters:{department:department._id}}}});

             let _options = [], _group,_groups={};
            _items.map((item,i)=>{
                _groups[item._id] = item;
                _group = i === 0 ? item : _group;
                _options.push(<Select.Option key={"group-"+i}  value={item._id}>{item.name}</Select.Option>);
            })

            setGroup(_group || {name:"--"});		
            setGroups(_groups);	
            setGroupsSelect(<div className="select_wrapper"><Select style={{padding:"9px 0px"}} bordered={false} defaultValue={_group._id} dropdownMatchSelectWidth={false} onChange={(p)=>{ setGroup(_groups[p])}}> {_options}</Select></div>);		

        }

	},[department])

//  INIT
    useEffect(async()=>{

		let isMounted = true;
		let _items = await client({url:'/stats-counter/departments/list',params:{method:'POST',body:{}}});
		if(isMounted && _items){
            let _options = [], _department,_departments={};
            _items.map((item,i)=>{
                _departments[item._id] = item;
                _department = item.name === 'Libraries' ? item : _department;
                _options.push(<Select.Option key={"option-"+i} value={item._id}>{item.name}</Select.Option>);
            })
            setDepartment(_department);		
            setDepartments(_departments);	
			setDepartmentsSelect(<div className="select_wrapper"><Select style={{padding:"9px 0px"}} defaultValue={_department._id} bordered={false} onChange={(p)=>{setDepartment(_departments[p])}} > {_options}</Select></div>);		

		}
       
		return () => (isMounted = false);

	},[])


	data.content  = (
        <>
            <Page>
                <input id="dateRef" type="hidden"/>
                <h1 className="mar_md mar_top_xs pad_bottom_lg">Daily Stats Counter</h1>
                <DatePicker onChange={(d,s)=>{setDate(s);document.getElementById("dateRef").value=s}} style={{verticalAlign:"middle",marginLeft:"15px",padding:"12px 12px",marginRight:"12px",borderRadius:"5px"}} defaultValue={moment()} />
                {departmentsSelect}
                {groupsSelect}
                {locationsSelect}
                
                <div className="menubar mar_y_md">
                    <div>{topicElements}</div>    
                </div>
                <div className="mar_md border touch shadow">
                    {categoryElements}
                </div>
            </Page>

                   
        </>
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			



