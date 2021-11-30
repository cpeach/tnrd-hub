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
    const [departmentOptions,setDepartmentOptions]  = useState([]);

    const [collectionsVisable,setCollectionsVisable] = useState(false);
    const [collection,setCollection]             = useState();
    const [collections,setCollections]           = useState();
    const [collectionOptions,setCollectionOptions]  = useState([]);

    const [collectionItemsVisable,setCollectionItemsVisable] = useState(false);
    const [collectionItem,setCollectionItem]             = useState();
    const [collectionItems,setCollectionItems]           = useState();
    const [collectionItemOptions,setCollectionItemOptions]  = useState([]);
 
    const [topicElements,setTopicElements] = useState();
    const [topicCurrent,setTopicCurrent] = useState(0);
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

            element.value = value>-1?value:0;
            
            if(queues[i]){window.clearTimeout(queues[i]);}
            
            queues[i] = window.setTimeout(()=>{
                // set processing
                //element.dataset.loading = "true";
                queues[i] = undefined;
                setQueues(queues);
            },1000);
            setQueues(queues)
        }else{
            console.log("loading...")
        }
    }


//  DATE
    useEffect(async()=>{
       console.log(collectionItem)
        if(collectionItem && date){
            let _values =  await client({url:'/stats-counter/values/list',params:{method:'POST',body:{filters:{date:date,collection_item:collectionItem._id}}}});
            setValues(_values);
        }

	},[date])
 



//  VALUES
    useEffect(async()=>{
      console.log("change value")
      console.log(collection)
     // console.log(items.length)
      if(collection && collection.topics[topic]){
          console.log(collection.topics[topic]);
          let _categories = collection.topics[topic].categories
          _categories?_categories.map(cat=>{
              console.log(values.length)
              for(let i=0;i<values.length;i++){
                  console.log(values[i])
              }
            /*  for(let i=0;i<values.length;i++){
                for(let j=0;j<cat.items.length;j++){
                    cat.items[j]._id===values[i].item?console.log([cat.items[j],values[i]]):null;
                }
            }     */         
          }):null

      }
      
	},[values])



//  CATEGORIES
    useEffect(async()=>{
       if(collection && topic !== undefined && topic > -1){

           // let index = typeof topic==='object'?0:topic;
            let _categories = [];
            let _count = 0;
            collection.topics[topic].categories?collection.topics[topic].categories.map((item,i)=>{
                _categories.push((
                    <div key={"category-"+i} className="pad_x_md">
                        <Divider style={{margin:"48px 0px 48px 0px"}} key={'category-'+i} orientation="center" >{item.name}</Divider>
                        
                        {
                            item.items.map((item,i)=>(
                                <div key={"item"+i} className="border light touch pad_md mar_bottom_lg shadow">
                                    <div className="_6 box middle noselect">
                                        <h2 >{item.name}</h2>
                                        <p className="small mar_top_md">{item.description}</p>
                                    </div>
                                    <div className="_6 box right middle center">
                                        <div className="shim"></div>
                                        <div className="box touch _7 border white ">
                                            <div className="box center _6 middle">
                                                <div className="shim"></div>
                                                <input ref={(element) => {valueRefs.current[item._id]=element}} className="noselect box _11 center" data-loading={false} onChange={(e)=>{update(undefined,item._id)}} type="number" defaultValue="0" style={{fontSize:"24px"}} />
                                            </div>
                                            <div className="box middle b-l _6 center">
                                                <div className="b-b hand-primary" onClick={()=>{update(1,item._id)}} style={{padding:"24px 0px 24px 0px"}}><UpOutlined  style={{fontSize:"21px"}} /></div>
                                                <div className="hand-primary" onClick={()=>{update(-1,item._id)}} style={{padding:"24px 0px 24px 0px"}}><DownOutlined style={{fontSize:"21px"}} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ))
                 
            }):null

            setCategoryElements(_categories);
            
            window.document.getElementById("topic-"+topicCurrent).className = ""
            window.document.getElementById("topic-"+topic).className = "highlight"
            setTopicCurrent(topic);

            let _values = await client({url:'/stats-counter/values/list',params:{method:'POST',body:{filters:{date:date,collection_item:collectionItem._id}}}});
            setValues(_values);

        }


	},[topic])
   
//  TOPICS
    useEffect(async()=>{

        setCollectionItemsVisable(false);
        
        if(collection && collection.name !=="--"){
            console.log(collection)
            let _topics = [];
            for(let i=0;i<collection.topics.length;i++){
                collection.topics[i].categories = await client({url:'/stats-counter/categories/list',params:{method:'POST',body:{filters:{topic:collection.topics[i]._id}}}});
            }
          
            //   Topic Elements
            collection.topics.map((item,i)=>{
                _topics.push(<span id={"topic-"+i} key={'topic-'+i} data-index={i} className={i===0?'':''} onClick={()=>{setTopic(i)}}>{item.name}</span>)
               // i===0?setTopic(_topics[0]):null
            });

            setTopicElements(_topics)
            setTopic(0);
        }else{
            setTopicElements(<></>)
            setTopic(-1);
        }
        
	},[collectionItem])

//  COLLECTION ITEMS
    useEffect(async()=>{
        
	    if(collection && collection.name !=="--"){

            setCollectionsVisable(false);

            // get-set collectionItems
            let _items    = await client({url:'/stats-counter/collection_items/list',params:{method:'POST',body:{filters:{collection:collection._id}}}});
           
             let _options = [], _collectionItem,_collectionItems={};
            _items.map((item,i)=>{
                _collectionItems[item._id] = item;
                _collectionItem = i === 0 ? item : _collectionItem;
                _options.push(<Select.Option key={"collectionItem-"+i} value={item._id}>{item.name}</Select.Option>);
            })
            setCollectionItem(_collectionItem);		
            setCollectionItems(_collectionItems);		
			setCollectionItemOptions(_options);	

           
        }else{
            setCollectionItem({name:"--"});
            setCategoryElements(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)
        }

	},[collection])

//  COLLECTIONS
    useEffect(async()=>{
        
	    if(department){
            setDepartmentsVisable(false);

            // get-set collections
            let _items = await client({url:'/stats-counter/collections/list',params:{method:'POST',body:{filters:{department:department._id}}}});

             let _options = [], _collection,_collections={};
            _items.map((item,i)=>{
                _collections[item._id] = item;
                _collection = i === 0 ? item : _collection;
                _options.push(<Select.Option key={"collection-"+i}  value={item._id}>{item.name}</Select.Option>);
            })

            setCollection(_collection || {name:"--"});		
            setCollections(_collections);		
			setCollectionOptions(_options);	
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
			setDepartmentOptions(_options);		

            
		}
       
		return () => (isMounted = false);

	},[])


	data.content  = (
        <>
            <Page>
                <h1 className="mar_md mar_top_xs pad_bottom_lg">Daily Stats Counter</h1>
                <DatePicker onChange={(d,s)=>{setDate(s)}} style={{verticalAlign:"middle",padding:"12px 12px",marginLeft:"15px",borderRadius:"5px"}} defaultValue={moment()} />
                <div className="btn_light mar_left_sm " onClick={()=>{setDepartmentsVisable(true)}}>{!department||department.name} <CaretDownOutlined /></div>
                <div className="btn_light mar_left_sm" onClick={()=>{setCollectionsVisable(true)}}>{!collection||collection.name} <CaretDownOutlined /></div>
                <div className="btn_light mar_left_sm" onClick={()=>{setCollectionItemsVisable(true)}}>{!collectionItem||collectionItem.name} <CaretDownOutlined /></div>
                
                <div className="menubar mar_y_md">
                    <div>{topicElements}</div>    
                </div>

                {categoryElements}
               
            </Page>

            <Modal visible={departmentsVisable} title="Select Department" onOk={()=>{setDepartmentsVisable(false)}} onCancel={()=>{setDepartmentsVisable(false)}} width={360}>
                <Select defaultValue={!department||department._id } onChange={(p)=>{setDepartment(departments[p])}}> {departmentOptions}</Select>
            </Modal>
            <Modal visible={collectionsVisable} title="Select Collection" onOk={()=>{setCollectionsVisable(false)}} onCancel={()=>{setCollectionsVisable(false)}} width={360}>
                <Select defaultValue={!collection||collection._id } onChange={(p)=>{setCollection(collections[p])}}> {collectionOptions}</Select>
            </Modal>
            <Modal visible={collectionItemsVisable} title="Select Collection Items" onOk={()=>{setCollectionItemsVisable(false)}} onCancel={()=>{setCollectionItemsVisable(false)}} width={360}>
                <Select defaultValue={!collectionItem||collectionItem._id } onChange={(p)=>{setCollectionItem(collectionItems[p])}}> {collectionItemOptions}</Select>
            </Modal>            
        </>
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			





