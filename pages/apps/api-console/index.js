import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js'
import Tile    from '/components/layout/tiles/index.js'
import style   from '/styles/global.module.css';

export default function Index(props) { 
    
    let data = {}
	data.content  = (

        <Page>

            <Tile size="12" margin="md">
                <div className={"container left"}>
                    <div className={"box _9 middle pad_x_md" }>
                        <h4>Applications</h4>
                        <p className={"pad_y_xs"}>Andy is a general partner at GV. Drawing on his background as an engineer and founder, Andy helps companies bring early-stage technologies from concept to commercial launch.</p>
                        <a href="api-console/applications/list" className={"bold "+"pad_top_sm"}>Manage (24)</a>
                    </div>
                        <div className={"box _3 middle center"}>
                        <img src="/illustrations/applications3.png" className={"box"} style={{"width":"144px","height":"144px"}}/>
                    </div>
                </div>
            </Tile>
            <Tile  size="4" margin="md">
                <div className={"container left"}>
                    <div className={"left"}>
                        <img src="/illustrations/dept.png" className={"box"} style={{"width":"72px","height":"72px"}}/>
                    </div>
                    <div className={" pad_bottom_sm" }>
                        <h5 className="pad_y_sm">Departments</h5>
                        <p className={" pad_y_sm"}>Andy is a general partner at GV. Drawing on his background as an engineer and founder, </p>
                        <a className={"bold "+"pad_top_sm"}>Manage</a>
                    </div>
                </div>
            </Tile>
            <Tile  size="4" margin="md">
                <div className={"container left"}>
                    <div className={"left"}>
                        <img src="/illustrations/role.png" className={"box"} style={{"width":"72px","height":"72px"}}/>
                    </div>
                    <div className={" pad_bottom_sm" }>
                        <h5 className="pad_y_sm">Users</h5>
                        <p className={" pad_y_sm"}>Andy is a general partner at GV. Drawing on his background as an engineer and founder, </p>
                        <a className={"bold "+"pad_top_sm"}>Manage</a>
                    </div>
                </div>
            </Tile>
            <Tile  size="4" margin="md">
                <div className={"container left"}>
                    <div className={"left"}>
                        <img src="/illustrations/user.png" className={"box"} style={{"width":"72px","height":"72px"}}/>
                    </div>
                    <div className={" pad_bottom_sm" }>
                        <h5 className="pad_y_sm">Roles</h5>
                        <p className={" pad_y_sm"}>Andy is a general partner at GV. Drawing on his background as an engineer and founder, </p>
                        <a className={"bold "+"pad_top_sm"}>Manage</a>
                    </div>
                </div>
            </Tile>
            
           
        </Page>
    
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			





