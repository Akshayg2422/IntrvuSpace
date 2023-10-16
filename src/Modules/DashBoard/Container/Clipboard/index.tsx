import React, { useEffect, useRef, useState } from 'react';
import ClipboardJS from 'clipboard';
import { ClipboardProps } from './interfaces';
import { UncontrolledTooltip } from "reactstrap";



const Clipboard = ({ id, linkToCopy }: ClipboardProps) => {
    const copyButtonRef = useRef<any>(null);
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const clipboard: any = new ClipboardJS(copyButtonRef.current);

        clipboard.on('success', () => {
            setCopied(true);
        });

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
            {copied ? <span className={'text-muted'}>Interview Link Copied</span> : 'Copy Interview Link'}
        </span>

    );
};

export { Clipboard }