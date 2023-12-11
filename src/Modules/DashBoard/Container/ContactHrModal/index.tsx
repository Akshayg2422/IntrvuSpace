import { Modal } from "@Components";

interface ContactHrModalProps {
    onClick?: ()=> void;
}

const ContactHrModal = ({onClick}: ContactHrModalProps) => {

  return (
    <Modal
      isOpen
      title={"Your interview is completed"}
      subTitle={"Please contact HR to know about your post-interview details."}
      buttonText="OK"
      onClick={onClick}
    />
  );
};

export { ContactHrModal };
