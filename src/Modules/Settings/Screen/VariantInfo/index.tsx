import {
  Spinner,
  MenuBar
} from "@Components";
import "./index.css";


function VariantInfo() {


  return (
    <div className={'screen'}>
      <div className={'screen-variant-info'}>

        <div className={'variant-header'}>
          <div>
            <div className={'screen-heading'}>{'React Native Developer'}</div>
            <div className={'experience'}>
              {'Fresher'}
            </div>
          </div>

          <div className={'vacancies-container'}>
            <div className={'screen-heading'}>{'4 Vacancies'}</div>
            <div className={'menu-container'}>
              <MenuBar />
            </div>
          </div>

        </div>
      </div>
      {/* <div
          className={
            "vh-100 d-flex justify-content-center align-items-center"
          }
        >
          <Spinner />
        </div> */}
    </div >
  );
}

export { VariantInfo };
