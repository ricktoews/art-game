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
  const itemClass = "relative flex flex-col items-center justify-center bg-white p-2 cursor-pointer";

  return (
    <div
      key={itemkey}
      style={{ width: '125px', height: '125px', border: '1px solid gray' }}
      data-identifier={identifier}
      onClick={handleItemClick}
      className={itemClass}
    >
      {item.selected ? (
        <span
          aria-label="Selected for Practice and Game"
          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold leading-none text-white shadow-sm"
        >
          ✓
        </span>
      ) : null}
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
