import { icons } from "@Assets";
import { Button, Card, Heading, Modal, showToast } from "@Components";
import { useEffect, useState } from "react";
import {
  Col,
  Button as RSButton,
  Row
} from "reactstrap";

interface UploadProps {
  onSelect?: (value) => void;
  isOpen?: boolean;
  size?: "sm" | "md" | "lg";
  title?: string;
  onSubmitClick?: (data) => void;
  isUploadModalOpen?: boolean;
  isDownloadTemplate?: boolean;
  onTemplateClick?: () => void;
  bulkButtonSize?: "sm" | "md" | "lg";
  bulkButtonStyle?: any;
  outline?: any;
}

function DropzoneFilePicker({
  onSelect,
  isOpen,
  size,
  title,
  onSubmitClick,
  isUploadModalOpen = false,
  isDownloadTemplate = false,
  onTemplateClick,
  bulkButtonSize = "lg",
  bulkButtonStyle,
  outline,
}: UploadProps) {
  const [isOpenModal, setIsOpenModal] = useState(isOpen);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState<any>();

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);

  const selectHandler = (e: any) => {
    let fileName = document.getElementById(
      "selectImage"
    ) as HTMLInputElement | null;
    let check = fileName && fileName.value.toLowerCase();

    if (check != null) {
      const file = e.target.files[0];

      setFileName(file.name);

      const name = file.name.split(".");
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded =
          reader &&
          reader.result &&
          reader.result.toString().replace("data:", "").replace(/^.+,/, "");
        if (onSelect) {
          onSelect(encoded);
          setFileData(encoded);
        }
      };
    } else {
      showToast("Please upload Excel files only.", "error");
    }
  };

  const handleRefClick = () => {
    const input = document.getElementById(
      "selectImage"
    ) as HTMLInputElement | null;
    if (input != null) {
      input.click();
    }
  };

  return (
    <div>
      <Button
        className=""
        text={"Bulk Import"}
        size={bulkButtonSize}
        style={{
          borderRadius: 4,
          paddingLeft: 78,
          paddingRight: 78,
          borderColor: "#d8dade",
          ...bulkButtonStyle,
        }}
        onClick={() => {
          setIsOpenModal(!isOpenModal);
        }}
        outline={outline}
      />
      <Modal
        isOpen={isOpenModal}
        size={size}
        onClose={() => setIsOpenModal(!isOpenModal)}
      >
        <>
          <Heading
            heading={title}
            className={"font-weight-800 display-4 mt--5"}
          />
          <div className="mb-3 mt--1">
            <span className="text-decoration-underline-hover pointer" onClick={onTemplateClick}>
              <i className="bi bi-file-arrow-down-fill text-primary "></i>

              <a role={"button"} className="font-weight-600 text-primary ml-1" >
                {"Download templete"}
              </a>
            </span>
          </div>
          <div
            className="dropzone dropzone-multiple mt-3"
            id="dropzone-multiple"
          >
            {!fileData && (
              <Card
                className="dz-default dz-message"
                onClick={() => {
                  handleRefClick();
                }}
                style={{
                  borderWidth: 1.5,
                  borderColor: "#e8edff",
                  backgroundColor: "transparent",
                }}
              >
                <input
                  id="selectImage"
                  type="file"
                  hidden
                  onChange={(e) => selectHandler(e)}
                  accept=".csv"
                />
                <button className="dz-button" type="button">
                  {"Drop file here to upload"}
                </button>
              </Card>
            )}

            {fileName && (
              <div className="mt-3">
                <Row className=" align-items-center">
                  <Col className=" col-auto">
                    <div className=" avatar">
                      <img
                        alt="..."
                        className=" avatar-img rounded"
                        src={icons.excel}
                      />
                    </div>
                  </Col>
                  <div className=" col ml--3">
                    <h4 className=" mb-1">{fileName}</h4>
                  </div>
                  <Col className=" col-auto">
                    <RSButton
                      size="sm"
                      color="warning"
                      onClick={() => {
                        setFileData("");
                        setFileName("");
                      }}
                    >
                      <i className="fas fa-trash" />
                    </RSButton>
                  </Col>
                </Row>
              </div>
            )}
          </div>

          <div className="text-center mt-3 mb-3">
            <Button
              color={"primary"}
              text={"Upload"}
              style={{ borderRadius: 4, paddingLeft: 70, paddingRight: 70 }}
              onClick={() => {
                if (!fileData) {
                  showToast("Please select a file.", "error");
                  return;
                }

                if (onSubmitClick) {
                  setFileData("");
                  setFileName("");
                  onSubmitClick(fileData);
                  setIsOpenModal(false);
                }
              }}
            />
          </div>
        </>
      </Modal>
    </div>
  );
}

export { DropzoneFilePicker };
