import React from 'react'
import './AnimatedBookFrame.scss'
import { Card } from '@Components'
import { useWindowDimensions } from '@Hooks'

function AnimationBook() {
    const { height } = useWindowDimensions()
    return (
        <div className={'vh-100 d-flex justify-content-center align-items-center'}>
            <Card className={'col-8'}
                style={{ backgroundColor: '#68d75c', height: height - 130 }}
            >
                <div className="bookshelf_wrapper">
                    <ul className="books_list">
                        <li className="book_item first"></li>
                        <li className="book_item second"></li>
                        <li className="book_item third"></li>
                        <li className="book_item fourth"></li>
                        <li className="book_item fifth"></li>
                        <li className="book_item sixth"></li>
                    </ul>
                    <div className="shelf"></div>
                </div>
                <h3 className='text-white'>Generating Questions...</h3>
            </Card>
        </div>
    )
}

export { AnimationBook }