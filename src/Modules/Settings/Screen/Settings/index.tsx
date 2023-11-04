import { Back, Button, Card, DropDown, Input } from '@Components';
import { translate } from '@I18n'
import { ROUTES } from '@Routes';

import React from 'react'
import { useNavigation } from '@Hooks';

function Settings() {
  const { goTo } = useNavigation()

  return (
    <>
      <div className="mt-3 m-3">
        <div>
          <Back></Back>
          <span
            className="font-weight-bolder text-secondary "
            style={{ fontSize: 26 }}
          >
            {"Settings"}
          </span>
        </div>


        <div className="" style={{ paddingTop: 30 }}>

          <Card
            className=" font-weight-bolder text-secondary rounded-sm"
            style={{
              borderWidth: 1.5,
              borderColor: "#e8edff",
              // backgroundColor: "transparent",
            }}
          >
            <div className="d-flex justify-content-between pointer" onClick={()=>goTo(ROUTES['designation-module'].department)}>
              <span
                className="text-secondary"
                style={{ fontSize: 10 }}
              >
                <span style={{ fontSize: 20 }} >{"Manage Department"}</span>
              </span>

            </div>

          </Card>

          <Card
            className=" font-weight-bolder text-secondary rounded-sm"
            style={{
              borderWidth: 1.5,
              borderColor: "#e8edff",
              // backgroundColor: "transparent",
            }}
          >
            <div className="d-flex justify-content-between pointer" onClick={()=>goTo(ROUTES['designation-module'].employeeDesignations)}>
              <span
                className="text-secondary"
                style={{ fontSize: 10 }}
              >
                <span style={{ fontSize: 20 }} >{"Manage Designation"}</span>
              </span>

            </div>

          </Card>

          <Card
            className=" font-weight-bolder text-secondary rounded-sm"
            style={{
              borderWidth: 1.5,
              borderColor: "#e8edff",
              // backgroundColor: "transparent",
            }}
          >
            <div className="d-flex justify-content-between pointer" onClick={()=>goTo(ROUTES['designation-module'].AddTeamMate)}>
              <span
                className="text-secondary"
                style={{ fontSize: 10 }}
              >
                <span style={{ fontSize: 20 }}>{"Manage Add Team mate"}</span>
              </span>

            </div>

          </Card>
          <Card
            className=" font-weight-bolder text-secondary rounded-sm"
            style={{
              borderWidth: 1.5,
              borderColor: "#e8edff",
              // backgroundColor: "transparent",
            }}
          >
            <div className="d-flex justify-content-between pointer" onClick={()=>goTo(ROUTES['designation-module']['sector'])}>
              <span
                className="text-secondary"
                style={{ fontSize: 10 }}
              >
                <span style={{ fontSize: 20, }}>{"Manage Sectors"}</span>
              </span>

            </div>

          </Card>
        </div>
      </div>
    </>
  )
}

export { Settings } 