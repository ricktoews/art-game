import NavMenu from "@/components/NavMenu";
import { theme } from "@/utils/constants";
import styles from '@/styles/ArtGame.module.css';

export default function Masthead(props) {
    const { title } = props;
    const responsiveTitleSize = `clamp(1rem, ${Math.max(3, 70 / Math.max(title.length, 1))}vw, 2rem)`;

    return (
        <div style={{ backgroundColor: theme.masthead.background }} className="masthead w-full fixed z-10">
            <NavMenu />
            <div className="flex min-h-[55px] items-center justify-center px-16 py-2">
                <div
                    style={{ color: theme.masthead.color, fontSize: responsiveTitleSize }}
                    className={`max-w-full text-center leading-tight ${styles.masthead}`}
                >
                    {title}
                </div>
            </div>
            <div style={{ borderBottom: `1px solid ${theme.masthead.border}` }} className="w-full h-[1px]"></div>
        </div>
    );
}
