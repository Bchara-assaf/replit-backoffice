
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmDeleteModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType: string;
}

export function ConfirmDeleteModal({ show, onHide, onConfirm, itemName, itemType }: ConfirmDeleteModalProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the {itemType} "{itemName}"? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
