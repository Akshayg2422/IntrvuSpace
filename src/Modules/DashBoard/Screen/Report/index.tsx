import { icons, image } from "@Assets";
import {
  Badge,
  Button,
  ButtonGroup,
  CommonTable,
  Divider,
  DropDown,
  DropDownIcon,
  Heading,
  Image,
  NoDataFound,
  Spinner,
} from "@Components";
import { useDropDown, useLoader } from "@Hooks";
import { fetchBasicReport } from "@Redux";
import { color } from "@Themes";
import {
  capitalizeFirstLetter,
  getPhoto,
  ifObjectExist,
  COUNTRY_ISO_CODE,
} from "@Utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { Card, CardBody, CardFooter, CardHeader, Progress } from "reactstrap";
import {
  BasicReportMatrixCard,
  DetailedReport,
  DetailedReportMatrixCard,
  JobDescriptionKeyAreas,
} from "@Modules";

const PERFORMANCE_CONTENT = [
  {
    id: 1,
    topic: "skill_matrix",
    subText:
      "Performance in relation to the specified job description and specifications",
  },
  {
    id: 2,
    topic: "communication",
    subText:
      "Evaluation of communication skills, encompassing fluency and grammar",
  },
  {
    id: 3,
    topic: "trait",
    subText: "Diplomacy, work ethics, character and suitability for the role",
  },
];

const NOTE = [
  { id: 1, icon: icons.check, text: "Completely Covered" },
  { id: 2, icon: icons.checkBlack, text: "Partially Covered" },
  { id: 3, icon: icons.frame, text: "Covered by invalid" },
];

const REPORT_TYPE = [
  { id: "BR", text: "Basic Report" },
  { id: "DR", text: "Detailed Report" },
];

function Report() {
  const { schedule_id } = useParams();

  const dispatch = useDispatch();

  const [dataId, setDataId] = useState<any>([
    "trait",
    "communication",
    "skill_matrix",
  ]);

  const [basicReportData, setBasicReportData] = useState<any>(undefined);
  // const filter = useDropDown(FILTER[0]);

  const componentRef = useRef(null);
  let basicReportLoader = useLoader(false);
  const [check, setCheck] = useState<any>(0);
  const heightRef = useRef<any>();
  const [cardHeight, setCardHeight] = useState<any>(null);
  const [percentage, setPercentage] = useState<any>({});
  const [fileName, setFileName] = useState("");
  // const [reportType, setReportType] = useState(REPORT_TYPE[0].id);
  const reportType = useDropDown(REPORT_TYPE[0]);

  useEffect(() => {
    getBasicReportData();
  }, [reportType.value.id]);

  // useEffect(() => {
  //   if (basicReportData) {
  //     removeDuplicates();
  //   }
  // }, [basicReportData]);

  const handleRating = (el: any) => {
    if (typeof el.rating === "string" && !isNaN(el.rating)) {
      return parseInt(el.rating);
    } else if (typeof el.rating === "number" && !isNaN(el.rating)) {
      return el.rating;
    } else {
      return 0;
    }
  };

  function getPercentage(array: any, key: string) {
    const arrayWithUpdatedRatings = array.map((it) => {
      return {
        ...it,
        rating: handleRating(it),
      };
    });

    return (
      arrayWithUpdatedRatings.reduce(function (acc, obj) {
        return acc + parseFloat(obj[key]);
      }, 0) / array.length
    );
  }

  const getBasicReportData = () => {
    basicReportLoader.show();
    const params = {
      schedule_id: schedule_id,
      ...(reportType.value.id === "DR" && { is_detailed: true }),
    };
    dispatch(
      fetchBasicReport({
        params,
        onSuccess: (success) => () => {
          basicReportLoader.hide();
          setBasicReportData(success.details);

          const {
            communication,
            skill_matrix,
            trait,
            overall_weightage,
            name,
            sub_text,
          } = success.details;
          setFileName(name + "_" + sub_text + "_" + reportType);
        },
        onError: (error) => () => {
          basicReportLoader.hide();
          console.log(error, "error");
        },
      })
    );
  };
  console.log(basicReportData, "basicReportData");

  useEffect(() => {
    setCardHeight(heightRef?.current?.offsetHeight);
  }, []);

  const colorVariant = (percentage) => {
    if (percentage <= 20) {
      return "red";
    } else if (percentage <= 40) {
      return "orange";
    } else if (percentage <= 60) {
      return "#ebeb1b";
    } else if (percentage <= 80) {
      return "green";
    } else if (percentage <= 100) {
      return "#FFD700";
    }
  };

  function getCountryName(code: string) {
    return COUNTRY_ISO_CODE.find((country) => country.code === code)?.name
      ? COUNTRY_ISO_CODE.find((country) => country.code === code)?.name
      : code;
  }

  // console.log("basicReportData===>", basicReportData);

  return (
    <>
      {" "}
      <div className="position-relative ml-sm-6">
        <div className="col-sm-3 position-absolute top-3 left-0 p-0">
          <DropDown
            id={"status"}
            data={REPORT_TYPE}
            selected={reportType.value}
            onChange={reportType.onChange}
          />
        </div>
      </div>
      <div
        className="row position-fixed bottom-0 right-0 m-sm-3 p-3"
        style={{
          zIndex: 1,
        }}
      >
        <div className="ml-3">
          {fileName && (
            <ReactToPrint
              documentTitle={fileName}
              trigger={() => (
                <Button
                  variant={"icon-rounded"}
                  color="info"
                  icons={"bi bi-printer-fill text-white fa-lg"}
                />
              )}
              content={() => componentRef.current}
            />
          )}
        </div>
      </div>
      {basicReportLoader.loader ? (
        <div
          className={"vh-100 d-flex justify-content-center align-items-center"}
        >
          <Spinner />
        </div>
      ) : basicReportData ? (
        <div
          className="d-flex flex-column px-sm-6 px-3 py-3"
          ref={componentRef}
        >
          <div className="">
            <div className="position-relative ">
              <div className="mt-5">
                <div
                  className={"d-flex align-items-center justify-content-center"}
                >
                  {basicReportData?.candidate_photo && (
                    <div
                      className={
                        "d-flex flex-column align-items-center justify-content-center"
                      }
                    >
                      <div
                        className=""
                        style={{
                          width: "35mm",
                          height: "45mm",
                          overflow: "hidden",
                          border: "1px solid rgba(0, 0, 0, 0.05)",
                          padding: "1px",
                        }}
                      >
                        <Image
                          src={getPhoto(basicReportData?.candidate_photo)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div>
                        {!ifObjectExist(
                          basicReportData.interview_meta_info
                            ?.user_location_info
                        ) && (
                          <div>
                            <div className="mt-1">
                              <span className="text-secondary text-center font-weight-500">
                                {basicReportData?.interview_meta_info
                                  ?.user_location_info?.city === "-"
                                  ? ""
                                  : basicReportData?.interview_meta_info
                                      ?.user_location_info?.city}
                              </span>
                              <span>{", "}</span>
                              <span className="text-secondary text-center font-weight-500">
                                {basicReportData?.interview_meta_info
                                  ?.user_location_info?.region === "-"
                                  ? ""
                                  : basicReportData?.interview_meta_info
                                      ?.user_location_info?.region}
                              </span>
                            </div>
                            <div className="text-secondary text-center font-weight-400">
                              {basicReportData?.interview_meta_info
                                ?.user_location_info?.country === "-"
                                ? ""
                                : getCountryName(
                                    basicReportData?.interview_meta_info
                                      ?.user_location_info?.country
                                  )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className={"text-center ml-3"}>
                    <div className="">
                      <span
                        style={{ fontSize: 38 }}
                        className="font-weight-bolder text-secondary"
                      >
                        {basicReportData?.interview_meta_info?.name}
                      </span>
                    </div>
                    <div className="mt--2">
                      <span
                        className="font-weight-bolder text-secondary font-weight-600"
                        style={{ fontSize: 12 }}
                      >
                        {`${basicReportData.interview_meta_info?.role} - ${
                          !basicReportData.interview_meta_info?.experience
                            ? "Fresher"
                            : basicReportData.interview_meta_info?.experience
                        } ${
                          basicReportData.interview_meta_info?.experience > 1
                            ? "years"
                            : basicReportData.interview_meta_info
                                ?.experience === 1
                            ? "year"
                            : ""
                        }`}
                      </span>
                    </div>
                    <div>
                      <Badge
                        className="text-primary text-lowercase mt-1 font-weight-bolder px-4"
                        style={{
                          backgroundColor: "#ebe4ff",
                          borderRadius: 30,
                          fontSize: 12,
                          borderWidth: 0,
                        }}
                        text={`${basicReportData.interview_meta_info?.interview_duration} min Interview`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="position-absolute right-0 top-2 p-0">
                <h1
                  className="font-weight-bolder text-right display-2"
                  style={{
                    color: colorVariant(basicReportData.candidate_score),
                  }}
                >
                  {basicReportData.candidate_score}
                </h1>
              </div>
            </div>
          </div>

          {reportType.value.id === "BR" ? (
            <BasicReportMatrixCard reportData={basicReportData} />
          ) : (
            <DetailedReportMatrixCard reportData={basicReportData} />
          )}

          <div className="mt-3 px-0">
            <div>
              <span
                className="font-weight-bolder text-secondary "
                style={{ fontSize: 26 }}
              >
                {"Job Description Key Areas"}
              </span>
            </div>

            {/** Job Description key Areas */}

            <JobDescriptionKeyAreas reportData={basicReportData} />

            {/** Detailed report QA */}

            {reportType.value.id === "DR" && (
              <DetailedReport reportData={basicReportData} />
            )}
          </div>
          <div className="d-flex justify-content-end mt-5 mb-6">
            <a
              href={"https://www.intrvu.space"}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={icons.poweredBy} height={40} />
            </a>
          </div>
        </div>
      ) : (
        <div
          className={
            "d-flex h-100vh justify-content-center align-items-center mx-auto"
          }
        >
          <NoDataFound />
        </div>
      )}
    </>
  );
}

export { Report };
