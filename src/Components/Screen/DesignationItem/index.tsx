import { DesignationItemProps } from "./interfaces";
import { NoDataFound, Button, MenuBar, Image, Badge } from "@Components";
import { icons } from "@Assets";
import { Card, CardBody, CardFooter } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigation } from "@Hooks";
import { ROUTES } from "@Routes";
import { capitalizeFirstLetter } from "@Utils";
import './index.scss'

function DesignationItem({
  item,
  onView,
  onViewMore
}: DesignationItemProps) {

  console.log(JSON.stringify(item));

  const { job_description: { position }, candidate_details: { selected_candidates }, is_active } = item

  const VIEW_MORE_LENGTH = 300;

  return (

    <div className={'card-container'}>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <span className={'screen-heading'}>
              {capitalizeFirstLetter(position)}
            </span>
            {
              selected_candidates < 0 &&
              <div className={'badge-schedule'}>
                <span className={'badge-text'}>{`${selected_candidates} Selected`}</span>
              </div>
            }
          </div>
        </div>
        <div>
          <div className={'view-details-btn'}>
            <Button
              outline
              block
              text={'View Details'}
              onClick={() => {
                if (onView) {
                  onView();
                }
              }}
            />
          </div>
          <div className={'d-flex align-items-center justify-content-center'}>
            {is_active && false ? (
              <div className={'status-container'}>
                <Image
                  src={icons.check}
                  height={12}
                  width={12}
                  style={{
                    objectFit: "contain",
                  }}
                />
                <span className="status-active">Active</span>
              </div>
            ) : (
              <h5 className="text-des">
                Closed
              </h5>
            )}
          </div>
        </div>
      </div>

    </div >
  );
}

export { DesignationItem };
