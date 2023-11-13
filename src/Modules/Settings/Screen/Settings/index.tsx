import { useNavigation } from '@Hooks';
import { SettingHeader } from '@Modules';
import { ROUTES } from '@Routes';
import './index.css';

function Settings() {

  const DEPARTMENT = 0
  const DESIGNATION = 1
  const TEAM = 2
  const SECTOR = 3

  const { goTo } = useNavigation()

  const gotoScreen = (index: number) => {
    const routes = [
      ROUTES['designation-module'].department,
      ROUTES['designation-module'].employeeDesignations,
      ROUTES['designation-module'].ManageTeamMate,
      ROUTES['designation-module']['sector']
    ];
    goTo(routes[index]);
  }

  return (
    <div className={'screen-padding'}>

      <SettingHeader title={'Settings'} />


      <div className={'setting-container'}>
        <div
          className={'card-container-no-padding setting-container-item'}
          onClick={() => {
            gotoScreen(DEPARTMENT)
          }}>
          <div className={'setting-heading'}>{'Department'}</div>
        </div>
        <div
          className={'card-container-no-padding setting-container-item'}
          onClick={() => {
            gotoScreen(DESIGNATION)
          }}
        >
          <div className={'setting-heading'}>{'Designation'}</div>
        </div>
      </div>

      <div className={'setting-container'}>
        <div
          className={'card-container-no-padding setting-container-item'}
          onClick={() => {
            gotoScreen(TEAM)
          }}
        >
          <div className={'setting-heading'}>{'Team'}</div>
        </div>
        <div
          className={'card-container-no-padding setting-container-item'}
          onClick={() => {
            gotoScreen(SECTOR)
          }}
        >
          <div className={'setting-heading'}>{'Sector'}</div>
        </div>
      </div>

    </div>
  )
}

export { Settings };
