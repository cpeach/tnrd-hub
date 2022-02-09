import Frame   from '/components/frames/frame2.js';
import Page    from '/components/layout/pages/index.js'
import Tile    from '/components/layout/tiles/index.js'
import style   from '/styles/global.module.css';
import Link    from 'next/link';
import ld      from './data.json';  // local data
export default function Index(props) { 
    
    let data = JSON.parse(JSON.stringify(ld));
    
	data.content  = (

        <Page>
            <h1 className="mar_md pad_bottom_sm">Welcome to Patron HasHad</h1>
            <p className="mar_md pad_bottom_xl _11">The purpose of this application is to ...</p>
            <Tile size="12" margin="md" type="lg" data={data.tiles.patrons} />
            <Tile  size="4" margin="md" type="md" data={data.tiles.preferences} />
            <Tile  size="4" margin="md" type="md" data={data.tiles.reports} />
            <Tile  size="4" margin="md" type="md" data={data.tiles.settings} />
        </Page>
    
    );

	return ( <Frame user={props.user} apps={props.apps} data={data} active="1" align="center"  />)
} 
			





