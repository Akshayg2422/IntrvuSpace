import React from 'react'
import { AlertProps } from './interfaces'
import { Modal, ModalFooter } from '@Components'

function Alert({ primary = 'Confirm', secondary = 'Cancel', ...rest }: AlertProps) {

    return (
        <Modal {...rest}>
            <ModalFooter {...rest} primary={primary} secondary={secondary} />
        </Modal>
    )
}
export { Alert }