import {
  Button,
  DropDown,
  Spinner,
  Image
} from "@Components";

import { useDropDown, useLoader } from "@Hooks";
import { BasicReport, ReportHeader, DetailedReport } from '@Modules';
import { fetchBasicReport } from "@Redux";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { icons } from "@Assets";
import './index.css';



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

          /**
           * report
           */

          const { interview_meta_info } = response.details
          const { name, role } = interview_meta_info || {};

          const reportSuffix = reportType.value.id === 'DR' ? 'detailed_report' : 'report';
          const file_name = `${role}_${name}_${reportSuffix}`;

          setFileName(file_name);

        },
        onError: (error: any) => () => {
          loader.hide();
        },
      })
    );
  };

  return (
    <div className={'screen'}>

      {/* <div className={'back-container-vacancies'}>
        <Back />
      </div> */}
      <div className={'report-dropdown-container'}>
        <div style={{
          width: "220px",
          maxWidth: '300px',
        }}>
          <DropDown
            noSpace
            id={"status"}
            data={REPORT_TYPE}
            selected={reportType.value}
            onChange={reportType.onChange}
          />
        </div>
        <div className="ml-3">
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
      </div>


      {
        loader.loader && <div className={'loader-container'}> <Spinner /></div>
      }
      {
        !loader.loader && report &&
        <div
          ref={componentRef}
          className={'screen-padding'}
        >
          <ReportHeader details={report} />
          {reportType?.value?.id === REPORT_TYPE[0].id && <BasicReport details={report} />}
          {reportType?.value?.id === REPORT_TYPE[1].id && <DetailedReport details={report} />}
          <div className="d-flex justify-content-end mt-8 mb-6">
            <a
              href={"https://www.intrvu.space"}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={icons.poweredBy} height={50} style={{
                objectFit: 'contain'
              }} />
            </a>
          </div>
        </div>
      }
    </div>
  );
}

export { Report };
