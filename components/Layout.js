import Masthead from "./Masthead";

export default function Layout(props) {
    const { title } = props;

    const wallpaperFile = './wallpaper/wallpaper.jpg';
    const wallpaper = {
        backgroundRepeat: 'repeat',
        backgroundImage: `url(${wallpaperFile})`,
        backgroundPosition: 'center center'
    }
    return (
        <div style={wallpaper} className="bg-white text-black">
            <Masthead title={title}></Masthead>
            <div className="flex flex-col items-center py-[75px]">
                {props.children}
            </div>
        </div>
    );
}