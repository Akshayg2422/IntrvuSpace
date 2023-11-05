import React from 'react'
import { AlertProps } from './interfaces'
import { Modal, ModalFooter } from '@Components'

function Alert({ ...props }: AlertProps) {

    return (
        <Modal {...props}>
            <ModalFooter {...props} primary={'Confirm'} secondary={'Cancel'} />
        </Modal>
    )
}
export { Alert }