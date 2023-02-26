import NavMenu from "@/components/NavMenu";

export default function Masthead(props) {
    const { title } = props;

    return (
        <div className="masthead w-full fixed z-10 bg-black">
        <NavMenu />
        <div className="flex flex-col items-center">
          <div className="text-white text-[24pt] mb-1">{title}</div>
        </div>
        <div className="w-full bg-white h-[1px]"></div>
      </div>
    );
}