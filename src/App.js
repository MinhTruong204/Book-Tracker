import WallPapper from '~/component/WallPapper';
import {Content} from '~/component/Content';
import wallpaperImg from '~/images/pexels-element5-1370295.jpg';
function App() {
    return (
        <div className="app">
            <WallPapper src={wallpaperImg} />
            <Content/>
        </div>
    );
}
export default App;
