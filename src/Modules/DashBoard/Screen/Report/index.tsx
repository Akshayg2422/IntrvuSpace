import { icons } from "@Assets";
import {
  Badge,
  Button,
  DropDown,
  Image,
  NoDataFound,
  Spinner
} from "@Components";
import { useDropDown, useLoader } from "@Hooks";
import { fetchBasicReport } from "@Redux";
import { capitalizeFirstLetter } from "@Utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { Card } from "reactstrap";
import { ReportHeader, BasicReport, DetailedReport } from '@Modules'
import './index.css'



function Report() {

  const dispatch = useDispatch();


  const { schedule_id } = useParams();

  const REPORT_TYPE = [
    { id: "BR", text: "Basic Report" },
    { id: "DR", text: "Detailed Report" },
  ];


  const loader = useLoader(false);
  const [report, setReport] = useState<any>(undefined);


  const componentRef = useRef(null);


  const [fileName, setFileName] = useState("");
  const reportType = useDropDown(REPORT_TYPE[0]);



  useEffect(() => {
    getReportApiHandler();
  }, [reportType.value.id]);


  const getReportApiHandler = () => {
    loader.show();
    const params = {
      schedule_id: schedule_id,
      ...(reportType.value.id === 'DR' && { is_detailed: true }),
    };

    dispatch(
      fetchBasicReport({
        params,
        onSuccess: (response: any) => () => {
          loader.hide();
          setReport(response.details);

          const { interview_meta_info } = response.details

          // const {
          //   name,
          //   sub_text,
          // } = response.details;
          // setFileName(name + "_" + sub_text + "_" + reportType)
        },
        onError: (error: any) => () => {
          loader.hide();
          console.log(error, "error");
        },
      })
    );
  };

  return (
    <div className={'screen'}>
      <div className={'report-dropdown-container'}>
        <div className="col-sm-3">
          <DropDown
            noSpace
            id={"status"}
            data={REPORT_TYPE}
            selected={reportType.value}
            onChange={reportType.onChange}
          />
        </div>
      </div>

      <div className={'print-container'}>
        <ReactToPrint
          documentTitle={fileName}
          trigger={() => (
            <Button
              variant={'icon-rounded'}
              color={'primary'}
              icons={"bi bi-printer-fill fa-lg"}
            />
          )}
          content={() => componentRef.current}
        />
      </div>
      {
        loader.loader && <div className={'loader-container'}> <Spinner /></div>
      }
      {
        !loader.loader && report &&
        <div ref={componentRef} className={'screen-padding'}>
          <ReportHeader details={report} />
          {reportType?.value?.id === REPORT_TYPE[0].id && <BasicReport details={report} />}
          {reportType?.value?.id === REPORT_TYPE[1].id && <DetailedReport details={report} />}

        </div>
      }
    </div>
  );
}

export { Report };
