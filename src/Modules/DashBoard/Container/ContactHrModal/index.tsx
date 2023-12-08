import { Modal } from "@Components";

const ContactHrModal = () => {
  return (
    <Modal
      isOpen
      title={"Contact HR"}
      subTitle={"Please contact HR to know about your post-interview details."}
      buttonText="OK"
      onClick={() => {window.location.reload()}}
    />
  );
};

export { ContactHrModal };
