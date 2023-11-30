/* eslint-disable jsx-a11y/anchor-is-valid */
import { icons } from "@Assets";
import { Card, Modal, showToast } from "@Components";
import { useState } from "react";
import {
  Col,
  Button as RSButton,
  Row
} from "reactstrap";
import { downloadFile } from '@Utils'
import { BulkUploadProps } from './interfaces';


function BulkUpload({ loading, tempFile, isOpen, onClose, onUpload }: BulkUploadProps) {
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState<any>();

  const selectHandler = (e: any) => {
    let fileName = document.getElementById(
      "selectImage"
    ) as HTMLInputElement | null;
    let check = fileName && fileName.value.toLowerCase();

    if (check != null) {
      const file = e.target.files[0];

      setFileName(file.name);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded =
          reader &&
          reader.result &&
          reader.result.toString().replace("data:", "").replace(/^.+,/, "");
        setFileData(encoded);
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


  function onUploadHandler() {
    if (!fileData) {
      showToast("Please select a file.", "error");
      return;
    }

    if (onUpload) {
      onUpload(fileData);
    }
  }


  const downloadCSVTemplate = () => {
    downloadFile(tempFile);
  };


  return (
    <Modal
      loading={loading}
      title={'Upload Candidates'}
      isOpen={isOpen}
      subTitle={
        <div className="text-decoration-underline-hover pointer" onClick={downloadCSVTemplate}>
          <i className="bi bi-file-arrow-down-fill text-primary"></i>
          <a role={"button"} className="font-weight-600 text-primary ml-1" >
            {"Download template"}
          </a>
        </div>
      }
      onClose={onClose}
      buttonText={'Upload'}
      onClick={onUploadHandler}
    >
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
              borderColor: "#e0fad9",
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
            <button className="dz-button text-primary px-3" type="button" style={{backgroundColor: "#f2faf0"}}>
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
    </Modal>
  );
}

export { BulkUpload };
