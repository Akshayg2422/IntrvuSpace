import React, { useEffect, useRef } from 'react';
import ClipboardJS from 'clipboard';
import { ClipboardProps } from './interfaces';



const Clipboard = ({ id, linkToCopy }: ClipboardProps) => {
    const copyButtonRef = useRef<any>(null);

    useEffect(() => {
        const clipboard: any = new ClipboardJS(copyButtonRef.current);

        // clipboard.on('success', (e) => {
        //     alert('Link copied to clipboard: ' + e.text);
        //     e.clearSelection();
        // });

        // clipboard.on('error', () => {
        //     alert('Failed to copy link to clipboard.');
        // });

        return () => {
            clipboard.destroy();
        };
    }, []);


    return (

        <span
            className={'text-primary font-weight-bolder pointer pl-3'}
            ref={copyButtonRef}
            data-clipboard-text={linkToCopy}
            style={{ fontSize: '15px', color: 'blue' }}
        >
            Copy Interview Link
        </span>

    );
};

export { Clipboard }