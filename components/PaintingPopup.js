import { useRef } from 'react';
import { POPUP_IMG_WIDTH, POPUP_IMG_HEIGHT } from '@/utils/constants';

export default function PaintingPopup({ toggleItemSelect, active, setPopupOpen, popupItem }) {
    const closeContainerRef = useRef(null);
    const closeBtnRef = useRef(null);

    const popupContainerStyle = {
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        background: 'rgba(255,255,255,.2)',
        border: '5px color green'
    };
    popupContainerStyle.display = active ? 'flex' : 'none';

    const popupWrapper = {
        position: 'relative',
        top: '75px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '80%',
        height: '25%',
        background: 'rgba(255,255,255,.8)',
        border: '2px solid black',
        padding: '10px',
    }

    const thumbStyle = {
        maxHeight: `${POPUP_IMG_HEIGHT}px`,
        maxWidth: `${POPUP_IMG_WIDTH}px`,
    };

    const popupCloseWrapper = { position: 'absolute', zIndex: 150, width: '100%', display: 'flex', justifyContent: 'flex-end' };

    const popupContent = {
        position: 'relative',
        color: 'black',
        width: '100%'
    };

    const handleClose = e => {
        setPopupOpen(false);
    }

    return (
        <div ref={closeContainerRef} style={popupContainerStyle}>
            <div style={popupWrapper}>
                <div style={popupCloseWrapper}>
                    <svg ref={closeBtnRef} onClick={handleClose} viewBox="0 0 48 48" width="48" height="48">
                        <circle cx="24" cy="24" r="22" fill="#ccc"></circle>
                        <path stroke="#fff" strokeWidth="3" d="M13 13l22 22M35 13L13 35"></path>
                    </svg>
                </div>
                <div style={popupContent}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                        <div style={{marginRight: '10px'}}>
                            <img src={popupItem.src} style={thumbStyle} />
                        </div>
                        <div>
                            <ul style={{ fontSize: '8pt', color: 'black' }} className="list-none">
                                <li>{popupItem.name}</li>
                                <li>{popupItem.artist}</li>
                                <li>{popupItem.date}</li>
                            </ul>
                            <button onClick={toggleItemSelect}>Toggle</button>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}