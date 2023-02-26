import NavMenu from "@/components/NavMenu";

export default function Masthead(props) {
    const { title } = props;

    return (
        <div className="masthead w-full fixed z-10 bg-slate-400">
        <NavMenu />
        <div className="flex flex-col items-center">
          <div className="text-[24pt] mb-1">{title}</div>
        </div>
        <div className="w-full bg-black h-[1px]"></div>
      </div>
    );
}