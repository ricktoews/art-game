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
    };
    popupContainerStyle.display = active ? 'flex' : 'none';

    const popupWrapper = {
        position: 'relative',
        top: '70px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '85%',
        height: '33%',
        overflowY: 'auto',
        //background: 'rgba(0,0,0,1)',
        color: 'rgba(255,255,255,1)',
        padding: '10px',
    }

    const thumbStyle = {
        maxHeight: `${POPUP_IMG_HEIGHT}px`,
        maxWidth: `${POPUP_IMG_WIDTH}px`,
        border: '1px solid white'
    };
    if (!popupItem.selected) {
        thumbStyle.filter = 'saturate(20%)';
    }

    const popupCloseWrapper = {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 150
    };

    const popupContent = {
        border: '2px solid black',
        backgroundColor: 'black',
        position: 'relative',
        color: 'inherit',
        width: '100%',
        marginBottom: '10px',
        padding: '10px',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    // With lots of attempts using ChatGPT, this is the Selected icon I chose.
    const greenCheckbox = (
        <svg width="30" height="30" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="12" fill="#008000" />
            <path d="M13,20 l4,4 l8,-8" stroke="#FFF" stroke-width="2" fill="none" />
        </svg>
    );

    const handleClose = e => {
        setPopupOpen(false);
    }

    return (
        <div ref={closeContainerRef} style={popupContainerStyle}> {/* full page transparent overlay block */}
            <div style={popupWrapper}> {/* wrapper to provide a maximum height for popup block */}

                <div style={popupContent}>  {/* visible popup content */}

                    {/* Close Popup icon */}
                    <div style={popupCloseWrapper}>
                        <svg ref={closeBtnRef} onClick={handleClose} viewBox="0 0 48 48" width="48" height="48">
                            <circle cx="24" cy="24" r="22" fill="#ccc"></circle>
                            <path stroke="#fff" strokeWidth="3" d="M13 13l22 22M35 13L13 35"></path>
                        </svg>
                    </div>

                    {/* Image thumbnail and information layout */}
                    <div style={{ width: '100%' }}>

                        <div style={{ marginBottom: '20px' }}>Tap thumbnail to toggle inclusion.</div>

                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
                            <div style={{ marginRight: '10px' }}>
                                <div style={{ borderBottom: '1px solid gray', marginBottom: '5px', paddingBottom: '5px' }}>
                                    {popupItem.name}
                                </div>
                                <ul style={{ fontSize: '8pt', color: 'inherit' }} className="list-none">
                                    <li>{popupItem.artist}</li>
                                    <li>{popupItem.date}</li>
                                </ul>

                            </div>
                            <div>
                                <div style={{ position: 'relative' }} onClick={toggleItemSelect}>
                                    <div style={{ position: 'absolute', top: '-12px', left: '-12px' }}>
                                        {popupItem.selected ? greenCheckbox : null}
                                    </div>
                                    <img src={popupItem.src} style={thumbStyle} />
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div >
    )
}