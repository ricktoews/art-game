import { useRef } from 'react';
import { POPUP_IMG_WIDTH, POPUP_IMG_HEIGHT } from '@/utils/constants';

export default function PaintingPopup({ toggleItemSelect, active, setPopupOpen, popupItem }) {
    const closeContainerRef = useRef(null);
    const closeBtnRef = useRef(null);
    const popupContentRef = useRef(null);

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
        width: '90%',
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
        top: '5px',
        right: '5px',
        zIndex: 150,
        cursor: 'pointer'
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
            <path d="M13,20 l4,4 l8,-8" stroke="#FFF" strokeWidth="2" fill="none" />
        </svg>
    );

    const handleClose = e => {
        setPopupOpen(false);
    }

    const handleOuterClick = e => {
        e.preventDefault();
        const { target } = e;
        const { current } = popupContentRef;
        const clickedInPopup = target === current || current.contains(target);
        if (!clickedInPopup) {
            setPopupOpen(false);
        }
        console.log('====> clicked on', target, target === current, current.contains(target));
    }

    return (
        <div ref={closeContainerRef} onClick={handleOuterClick} style={popupContainerStyle}> {/* full page transparent overlay block */}
            <div style={popupWrapper}> {/* wrapper to provide a maximum height for popup block */}

                <div ref={popupContentRef} style={popupContent}>  {/* visible popup content */}

                    {/* Close Popup icon */}
                    <div style={popupCloseWrapper}>
                        <svg ref={closeBtnRef} onClick={handleClose} viewBox="0 0 35 35" width="35" height="35">
                            <circle cx="17.5" cy="17.5" r="16.5" fill="#ccc"></circle>
                            <path stroke="#fff" strokeWidth="3" d="M9.5 9.5l16.5 16.5M26 9.5L9.5 26"></path>
                        </svg>
                    </div>

                    {/* Image thumbnail and information layout */}
                    <div style={{ width: 'auto' }}>

                        <div style={{ marginBottom: '20px' }}>Tap thumbnail to toggle inclusion.</div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                                <div style={{ cursor: 'pointer', position: 'relative' }} onClick={toggleItemSelect}>
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