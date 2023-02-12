import { FRAME_HEIGHT, FRAME_WIDTH } from "@/utils/helpers";
export function GalleryItem(props) {
  const { itemkey, item, handleItemClick } = props;

  const thumbStyle = {
    maxHeight: `${FRAME_HEIGHT}px`,
    maxWidth: `${FRAME_WIDTH}px`,
  };
  const identifier = item.name;
  const selectedItem = item.selected ? "bg-orange-100" : "bg-white";
  const itemClass = `flex flex-col justify-center items-center p-4 ${selectedItem} cursor-pointer`;

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
      <div className="hidden">
        <div className="text-center text-black">{item.name}</div>
        <div className="text-center text-black">{item.date}</div>
      </div>
    </div>
  );
}
