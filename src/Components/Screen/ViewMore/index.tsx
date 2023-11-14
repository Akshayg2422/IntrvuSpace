import React from 'react'
import { ViewMoreProps } from './interfaces'
import './index.css'

function ViewMore({ text, isViewMore = false, onViewMore }: ViewMoreProps) {

    const VIEW_MORE_LENGTH = 300;

    return (
        <>
            {
                text.length < VIEW_MORE_LENGTH ?
                    <span className={'screen-des'}>{text}</span> :
                    <>
                        {
                            !isViewMore ?
                                <div>
                                    <span className={'screen-des'}>
                                        {
                                            text.slice(
                                                0,
                                                VIEW_MORE_LENGTH
                                            ) + '...'
                                        }
                                    </span>
                                    <span
                                        className='view-more-text'
                                        onClick={() => {
                                            if (onViewMore) {
                                                onViewMore(true)
                                            }
                                        }}>
                                        {'View More'}
                                    </span>
                                </div> :
                                <div>
                                    <span className={'screen-des'}>
                                        {
                                            text
                                                .split("\n\n")
                                                .map((paragraph, index) => (
                                                    <React.Fragment key={index}>
                                                        {index > 0 && <br />}{" "}
                                                        {paragraph}
                                                    </React.Fragment>
                                                ))}
                                    </span>
                                    <span
                                        className='view-more-text'
                                        onClick={() => {
                                            if (onViewMore) {
                                                onViewMore(false)
                                            }
                                        }}>
                                        {'View Less'}
                                    </span>
                                </div>


                        }
                    </>
            }
        </>
    )
}

export { ViewMore };