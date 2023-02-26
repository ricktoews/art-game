import { FRAME_HEIGHT, FRAME_WIDTH } from "@/utils/constants";

export function GalleryItem(props) {
  const { itemkey, item, handleItemClick } = props;

  const thumbStyle = {
    maxHeight: `${FRAME_HEIGHT}px`,
    maxWidth: `${FRAME_WIDTH}px`,
  };
  const identifier = item.name;
  if (item.selected) {
    thumbStyle.border = '1px solid white';
  } else {
    thumbStyle.boxShadow = '2px 2px 4px rgba(0,0,0,.3)';
  }
  const selectedItem = item.selected ? "bg-slate-200" : "transparent";
  const itemClass = `flex flex-col justify-center items-center p-2 ${selectedItem} cursor-pointer`;

  return (
    <div
      key={itemkey}
      data-identifier={identifier}
      onClick={handleItemClick}
      className={itemClass}
    >
      <div>
        <img src={item.src} style={thumbStyle} />
      </div>
      <div className="hidden">
        <div className="text-center text-black">{item.name}</div>
        <div className="text-center text-black">{item.date}</div>
      </div>
    </div>
  );
}
