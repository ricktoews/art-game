import NavMenu from "@/components/NavMenu";
import { theme } from "@/utils/constants";

export default function Masthead(props) {
    const { title } = props;

    return (
        <div style={{backgroundColor: theme.masthead.background}} className="masthead w-full fixed z-10">
        <NavMenu />
        <div className="flex flex-col items-center">
          <div style={{color: theme.masthead.color}} className="text-[24pt] mb-1">{title}</div>
        </div>
        <div style={{borderBottom: `1px solid ${theme.masthead.border}`}} className="w-full h-[1px]"></div>
      </div>
    );
}