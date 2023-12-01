import React from 'react'
import Modal from './Modal'
import { Text, ModalImg } from './Modal.styles'
import { Button } from '../Button/Button'

export default function WinModal({ img, text, buttonText, visible, action }) {
  return (
    <Modal visible={visible} custom>
      <Text>{text}</Text>
      <ModalImg src={img} />
      <Button $secondary onClick={action}>{buttonText}</Button>
    </Modal>
  )
}
