import { FRAME_HEIGHT, FRAME_WIDTH } from "@/pages/utils/helpers";
export function GalleryItem(props) {
  const { itemkey, item, handleItemClick } = props;

  const thumbStyle = {
    maxHeight: `${FRAME_HEIGHT}px`,
    maxWidth: `${FRAME_WIDTH}px`,
  };
  const identifier = item.name;
  const selectedItem = item.selected ? "bg-orange-100" : "bg-white";
  const itemClass = `flex flex-col items-center w-1/5 py-3 ${selectedItem} cursor-pointer hover:bg-slate-200`;

  return (
    <div
      key={itemkey}
      data-identifier={identifier}
      onClick={handleItemClick}
      className={itemClass}
    >
      <div>
        <img className="drop-shadow-lg" src={item.src} style={thumbStyle} />
      </div>
      <div className="text-center text-black">{item.name}</div>
      <div className="text-center text-black">{item.date}</div>
    </div>
  );
}
