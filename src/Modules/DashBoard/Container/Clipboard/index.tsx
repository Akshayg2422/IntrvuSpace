import { useEffect, useState } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { UncontrolledTooltip } from "reactstrap";
import { ClipboardProps } from './interfaces';


const Clipboard = ({ id, linkToCopy, tooltipText = 'Copy To Clipboard', copedText, onCopy }: ClipboardProps) => {

    const [copiedText, setCopiedText] = useState('')

    useEffect(() => {
        if (copedText) {
            setCopiedText(copedText)
        }
    }, [copedText])



    return (

        <div>
            <CopyToClipboard
                text={linkToCopy}
                onCopy={() => {
                    if (onCopy) {
                        onCopy(linkToCopy)
                    }
                    setCopiedText(linkToCopy)
                }}>
                <span className='pointer mb-0 text-primary font-weight-bolder' id={`tooltip${id}`}>
                    {tooltipText}
                </span>
            </CopyToClipboard >
            <UncontrolledTooltip
                delay={0}
                trigger="hover focus"
                target={`tooltip${id}`}
            >
                {copiedText === linkToCopy
                    ? "Link copied"
                    : tooltipText}
            </UncontrolledTooltip>

        </div>
    );
};

export { Clipboard };
