import { Modal } from "@Components";

interface ContactHrModalProps {
    onClick?: ()=> void;
}

const ContactHrModal = ({onClick}: ContactHrModalProps) => {

  return (
    <Modal
      isOpen
      title={"Contact HR"}
      subTitle={"Please contact HR to know about your post-interview details."}
      buttonText="OK"
      onClick={onClick}
    />
  );
};

export { ContactHrModal };
