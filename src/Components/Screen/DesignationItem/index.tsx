import { DesignationItemProps } from "./interfaces";
import { NoDataFound, Button, MenuBar, Image, Badge } from "@Components";
import { icons } from "@Assets";
import { Card, CardBody, CardFooter } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigation } from "@Hooks";
import { ROUTES } from "@Routes";
import { capitalizeFirstLetter } from "@Utils";

function DesignationItem({
  item,
  onAdd,
  onEdit,
  onView,
  onClick,
}: DesignationItemProps) {
  const MENU = [{ id: 0, name: "Edit", icon: icons.edit }];
  const [formattedDate, setFormattedDate] = useState("");
  const { goTo, goBack } = useNavigation();
  const VIEW_MORE_LENGTH = 300;
  const [jdMore, setJdMore] = useState<any>([]);
  const [updatedJdDetails, setUpdatedJdDetails] = useState<any>({});


  useEffect(() => {
    setUpdatedJdDetails({ ...item.job_description, isActive: false });
  }, []);


  useEffect(() => {
    const dateObj = new Date(item.starts_from);
    const option: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formattedDate = dateObj.toLocaleDateString("en-US", option);

    setFormattedDate(formattedDate);
  }, []);

  return (
    <>
      <Card
        className="rounded px-sm-5 py-sm-4 p-3"
        style={{
          borderWidth: "1px",
          borderColor: "#d3deff",
          backgroundColor: "transparent",
        }}
      >
        <CardBody className="pt-1 pb-1 px-0">
          <div className="text-secondary">
            {item ? (
              <div key={item.id} className="mx-0">
                <div className="d-flex align-items-center mb-3 justify-content-between">
                  <div className="">
                    <div className="d-flex flex-sm-row flex-column align-items-sm-center">
                      <span
                        className="col p-0 m-0 font-weight-800"
                        style={{ fontSize: 26 }}
                      >
                        {capitalizeFirstLetter(item.job_description.position)}
                      </span>
                      {/* <div className={'ml-3 px-3'} style={{backgroundColor:'#ebe4ff', borderRadius:"50px", height:"30px"}}> <h4 className=' text-primary font-weight-900 pt-1 px-1'>{item.candidate_details.selected_candidates} Selected</h4></div> */}
                      <div className="mt-sm-1 pl-sm-3 pl-sm-1">
                        <Badge
                          className="text-primary text-lowercase"
                          style={{
                            backgroundColor: "#ebe4ff",
                            borderRadius: 30,
                            fontSize: 12,
                            borderWidth: 0,
                          }}
                          text={
                            item.candidate_details.selected_candidates
                              ? `${item.candidate_details.selected_candidates} Selected`
                              : ""
                          }
                        />
                      </div>
                    </div>
                    <h5 className="m-0 font-weight-500">
                      {item.job_description.experience}
                    </h5>
                  </div>
                  <div className="ml-sm-0">
                    <Button
                      style={{
                        fontSize: "15px",
                        borderColor: "#d8dade",
                        borderRadius: 4,
                      }}
                      outline
                      size="lg"
                      className={"px-md-5 m-0"}
                      text={"View Details"}
                      onClick={(e) => {
                        if (onView) {
                          e.preventDefault();
                          e.stopPropagation();
                          onView(item);
                        }
                      }}
                    />
                    <div className=" d-flex align-items-center justify-content-center mt-1">
                      {item.is_active ? (
                        <>
                          {" "}
                          <img
                            src={icons.check}
                            height={20}
                            width={20}
                            style={{
                              objectFit: "contain",
                            }}
                          />
                          <h5 className="p-0 font-weight-800 m-0">Active</h5>
                        </>
                      ) : (
                        <h5 className="p-0 font-weight-800 m-0 text-default">
                          Closed
                        </h5>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-default">
                  <div
                    className=" d-flex flex-wrap pt-2 h5"
                    style={{ marginTop: -10 }}
                  >
                    <div className="mb-0 p-0 mr-4">
                      <b>{item.vacancies}</b>
                      <span className="pl-1 font-weight-500">Vacancies</span>
                    </div>

                    <div className="mb-0 p-0 mr-4">
                      <b>{item.candidate_details.total_candidates}</b>
                      <span className="pl-1 font-weight-500">
                        Candidates added
                      </span>
                    </div>
                    <div className=" mb-0 p-0">
                      <b>{item.interview_duration} min</b>
                      <span className="pl-1 font-weight-500">Duration</span>
                    </div>
                  </div>
                  {item.job_description.details.length < VIEW_MORE_LENGTH ||
                  updatedJdDetails.isActive ? (
                    <div className="mt-3 mb-2" style={{ fontSize: "14px" }}>
                      <span> {item.job_description.details} </span>
                      {updatedJdDetails.isActive && <span
                        className="text-primary font-weight-800 pointer"
                        onClick={() => {
                          setUpdatedJdDetails({
                            ...updatedJdDetails,
                            isActive: false,
                          });
                        }}
                      >
                        {"View Less"}
                      </span>}
                    </div>
                  ) : (
                    <div className="mt-3 mb-2" style={{ fontSize: "14px" }}>
                      <span className="">
                        {item.job_description.details.slice(
                          0,
                          VIEW_MORE_LENGTH
                        )}
                        ...{" "}
                      </span>
                      <span
                        className="text-primary font-weight-800 pointer"
                        onClick={() => {
                          setUpdatedJdDetails({
                            ...updatedJdDetails,
                            isActive: true,
                          });
                        }}
                      >
                        {"View More"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <NoDataFound />
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export { DesignationItem };
