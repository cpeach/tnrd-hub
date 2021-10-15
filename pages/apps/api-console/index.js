import Frame   from '/components/frames/frame2.js';
import style   from '/styles/global.module.css';

export default function Index(props) { 
    
    let data = {}
	data.content  = (

        <div className={"page mar_y_xl"}>

            <div className={"tile _10 pad_lg"}>
                <div className={"container left"}>
                    <div className={"box _9 middle pad_x_md" }>
                        <h4>Applications</h4>
                        <p className={"pad_y_xs"}>Andy is a general partner at GV. Drawing on his background as an engineer and founder, Andy helps companies bring early-stage technologies from concept to commercial launch.</p>
                        <a className={"bold "+"pad_top_sm"}>Manage (24)</a>
                    </div>
                     <div className={"box _3 middle center"}>
                        <img src="/illustrations/applications3.png" className={"box"} style={{"width":"156px","height":"156px"}}/>
                    </div>
                </div>
            </div>

         

            <div></div>
            
            <div className={"tile _5 pad_lg"}>
                <div className={"container left"}>
                    <div className={"left"}>
                        <img src="/illustrations/applications3.png" className={"box"} style={{"width":"72px","height":"72px"}}/>
                    </div>
                    <div className={" pad_bottom_md" }>
                        <h5>Applications</h5>
                        <p className={" pad_y_sm"}>Andy is a general partner at GV. Drawing on his background as an engineer and founder, Andy helps companies bring early-stage technologies from concept to commercial launch.</p>
                        <a className={"bold "+"pad_top_sm"}>Manage</a>
                    </div>

                </div>
            </div>
            <div className={"tile _5 pad_lg"}>
                <div className={"container left"}>
                    <div className={"left"}>
                        <img src="/illustrations/applications3.png" className={"box"} style={{"width":"72px","height":"72px"}}/>
                    </div>
                    <div className={"pad_bottom_md" }>
                        <h5>Applications</h5>
                        <p className={" pad_y_sm"}>Andy is a general partner at GV. Drawing on his background as an engineer and founder.</p>
                        <a className={"bold "+"pad_top_sm"}>Manage</a>
                    </div>

                </div>
            </div>
           
        </div>
    
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			





