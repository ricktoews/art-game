import Masthead from "./Masthead";

export default function Layout(props) {
    const { title } = props;

    return (
        <div className="bg-white text-black">
            <Masthead title={title}></Masthead>
            <div className="flex flex-col items-center py-[75px]">
                {props.children}
            </div>
        </div>
    );
}