import { Back, Button, Card, DropDown, Heading, Input, Image } from '@Components';
import { translate } from '@I18n'
import { ROUTES } from '@Routes';

import React from 'react'
import { useNavigation } from '@Hooks';
import { icons } from '@Assets';

function Settings() {
  const { goTo } = useNavigation()
  const { goBack } = useNavigation();

  return (
    <>
      <div className="container ">
        <div className='row ml-0 mt-3'>
            <div className='d-flex align-items-center'>
              <div className=''>
                <Image
                  onClick={() => goBack()}
                  style={{ cursor: "pointer" }}
                  src={icons.back}
                  height={15}
                />
              </div>
            </div>
            <div className='pl-3' >
              <span className='headingText text-secondary'>{'Setting'}</span>
            </div>
          </div>
   

        <div className="" style={{ paddingTop: 30 }}>

          <Card
            className=" font-weight-bolder text-secondary rounded-sm pointer"
            style={{
              borderWidth: 1.5,
              borderColor: "#e8edff",
              // backgroundColor: "transparent",
            }}onClick={() => goTo(ROUTES['designation-module'].department)}
          >
            <div className="d-flex justify-content-between " >
              <span
                className="text-secondary"
                style={{ fontSize: 10 }}
              >
                <span style={{ fontSize: 18 }} >{"Manage Department"}</span>
              </span>

            </div>

          </Card>

          <Card
            className=" font-weight-bolder text-secondary rounded-sm pointer"
            style={{
              borderWidth: 1.5,
              borderColor: "#e8edff",
              // backgroundColor: "transparent",
            }}
            onClick={() => goTo(ROUTES['designation-module'].employeeDesignations)}
          >
            <div className="d-flex justify-content-between ">
              <span
                className="text-secondary"
                style={{ fontSize: 10 }}
              >
                <span style={{ fontSize: 18 }} >{"Manage Designation"}</span>
              </span>

            </div>

          </Card>

          <Card
            className=" font-weight-bolder text-secondary rounded-sm pointer"
            style={{
              borderWidth: 1.5,
              borderColor: "#e8edff",
              // backgroundColor: "transparent",

            }}
            onClick={() => goTo(ROUTES['designation-module'].ManageTeamMate)}
          >
            <div className="d-flex justify-content-between " >
              <span
                className="text-secondary"
                style={{ fontSize: 10 }}
              >
                <span style={{ fontSize: 18 }}>{"Manage Team mate"}</span>
              </span>

            </div>

          </Card>
          <Card
            className=" font-weight-bolder text-secondary rounded-sm pointer"
            style={{
              borderWidth: 1.5,
              borderColor: "#e8edff",
              // backgroundColor: "transparent",
            }}
            onClick={() => goTo(ROUTES['designation-module']['sector'])}
          >
            <div className="d-flex justify-content-between " >
              <span
                className="text-secondary"
                style={{ fontSize: 10 }}
              >
                <span style={{ fontSize: 18 }}>{"Manage Sectors"}</span>
              </span>

            </div>

          </Card>
        </div>
      </div>
    </>
  )
}

export { Settings } 