import WallPapper from '~/component/WallPapper';
import {Content} from '~/component/Content';
import wallpaperImg from '~/images/sports-car-mountains-retrowave-synthwave-hd-wallpaper-uhdpaper.com-233@0@k.jpg';
function App() {
    return (
        <div className="app">
            <WallPapper src={wallpaperImg} />
            <Content/>
        </div>
    );
}
export default App;
