import React from 'react'
import { AlertProps } from './interfaces'
import { Modal, ModalFooter } from '@Components'

function Alert({ ...props }: AlertProps) {

    return (
        <Modal {...props}>
            <ModalFooter {...props} primary={'Proceed'} secondary={'cancel'} />
        </Modal>
    )
}
export { Alert }