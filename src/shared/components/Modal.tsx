import { FC } from 'react';
import { Modal, ModalContent, ModalHeader } from '@nextui-org/react';
import { TfiClose } from 'react-icons/tfi';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ModalComponent: FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      scrollBehavior="outside"
      radius="lg"
      backdrop="opaque"
      isDismissable={false}
      isOpen={isOpen}
      onClose={onClose}
      closeButton={<TfiClose size={18} />}
      classNames={{
        wrapper: 'bazi-modal-container',
        closeButton: 'size-10 top-2.5 right-2',
      }}
      className="rounded bazi-modal"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 rounded-t-[6px] bg-gray-200">
          {title}
        </ModalHeader>
        {children}
      </ModalContent>
    </Modal>
  );
};
