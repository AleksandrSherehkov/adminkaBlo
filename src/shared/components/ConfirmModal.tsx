import { FC } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { TfiClose } from 'react-icons/tfi';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Modal
      radius="lg"
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      closeButton={<TfiClose size={18} />}
      classNames={{
        base: 'rounded-[6px]',
        wrapper: 'items-center rounded-[6px] ',
        closeButton: 'size-10 top-2.5 right-2',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 bg-gray-200">
          {title}
        </ModalHeader>
        <ModalBody className="py-8">
          <p className="text-center text-xl">{message}</p>
        </ModalBody>
        <ModalFooter className="flex flex-1 gap-2 border-t-2 px-3">
          <Button
            color="default"
            variant="light"
            onPress={onClose}
            className="rounded-[6px] bg-gray-500 uppercase text-white"
            fullWidth
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={onConfirm}
            className="rounded-[6px] uppercase"
            fullWidth
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
