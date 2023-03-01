import Masthead from "./Masthead";
import PaintingPopup from "./PaintingPopup";

export default function Layout(props) {
    const { title } = props;
    const popupOpen = !!props.popupOpen;
    const setPopupOpen = props.setPopupOpen ?? (() => {});
    const popupItem = props.popupItem ?? {};
    const toggleItemSelect = props.toggleItemSelect ?? (() => {});

    return (
        <div className="bg-white text-black">
            <Masthead title={title}></Masthead>
            <div className="relative">
                <PaintingPopup active={popupOpen} toggleItemSelect={toggleItemSelect} setPopupOpen={setPopupOpen} popupItem={popupItem}/>
                <div className="flex flex-col items-center py-[75px]">
                    {props.children}
                </div>
            </div>
        </div>
    );
}