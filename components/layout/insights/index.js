import style from './Insights.module.css';
import Container from '/components/layout/containers/index.js';

export default function _Insights(props)  {

	const containers = props.data.containers;
	const blocks    = props.data.blocks;
	const divisionStyle = {'display':'flex','flex-direction': 'column'};
	const containerSize=(size)=>{
		switch(size){
			case 4 : return 12;
			case 3 : return 9;
			case 2 : return 6;
			case 1 : return 3;
			default : return 12;
		}
	}

	const getBlock=(b,i,k)=>{
		if(b.container==i){
			var sep = b.separator?{'borderRight':'1px solid rgb(220,220,220)','height':'100%'}:{'height':'100%'}
			switch(b.type){
				case 'statistic' :
					return (
						<Container size={b.size} align="center" color={b.shade?"light":"white"} style={sep} >
							<>
								<div className={style.statistic}>
									<label>{b.label}</label>
									<div className={b.color?'text-'+b.color:''}>{b.value}</div>								
								</div>
								<div className="vlm" style={{'height':'100%'}}></div>
							</>
						</Container>
					);
				case 'legend' :
					return (
						<Container  size={b.size} align="center" color={b.shade?"light":"white"} style={sep} >
							<>
							<div className={style.legend}>
								{
									b.values.map((item)=>(
										<div>
											<label>{item.label}</label>
											<div>{item.value}</div>
										</div>
									))						
								}	
							</div>
							<div className="vlm" style={{'height':'100%'}}></div>
							</>
						</Container>
					);
			}
		}
	}	

	const getMargin=(i)=>{return i<containers.length-1?{'right':'sm'}:{}}

	

	return (
		<Container size={props.size?props.size:12}  padding={{y:'md'}} style={{'display':'flex'}} >
				{
					containers.map((container,i)=>(
						<Container key={"c-"+i}  size={containerSize(container.division)} padding={getMargin(i)} style={divisionStyle} shadow={true} >
						{	
							<Container color="white" border="true" touch="true" size="12"  style={{'overflow':'hidden','height':"100%"}} >
								{blocks.map((block,k)=>(getBlock(block,i,k)))}
							</Container>
						}
						</Container>
					))
				}
		</Container>
	)
}

 