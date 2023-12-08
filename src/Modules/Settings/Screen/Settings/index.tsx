import { useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';
import './index.css';
import { ScreenHeading } from '@Components';

function Settings() {

  const DEPARTMENT = 0
  const DESIGNATION = 1
  const TEAM = 2
  const SECTOR = 3
  const CANDIDATES = 4

  const { goTo } = useNavigation()

  const gotoScreen = (index: number) => {
    const routes = [
      ROUTES['designation-module'].department,
      ROUTES['designation-module'].employeeDesignations,
      ROUTES['designation-module'].ManageTeamMate,
      ROUTES['designation-module']['sector'],
      ROUTES['designation-module']['candidate'],

    ];
    goTo(routes[index]);
  }

  return (
    <div className={'screen-padding'}>

      <ScreenHeading text={'Settings'} />

      <div className={'setting-container'}>
        <div
          className={'card-container-no-padding setting-container-item'}
          onClick={() => {
            gotoScreen(DEPARTMENT)
          }}>
          <div className={'setting-heading'}>{'Departments'}</div>
        </div>
        <div
          className={'card-container-no-padding setting-container-item'}
          onClick={() => {
            gotoScreen(DESIGNATION)
          }}
        >
          <div className={'setting-heading'}>{'Designations'}</div>
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
          <div className={'setting-heading'}>{'Sectors'}</div>
        </div>
      </div>

      <div className={'setting-container'}>
        <div
          className={'card-container-no-padding setting-container-item'}
          onClick={() => {
            gotoScreen(CANDIDATES)
          }}>
          <div className={'setting-heading'}>{'Candidates'}</div>
        </div>
        <div className='setting-container-item' style={{
          width: '100%'
        }}>

        </div>
      </div>

    </div>
  )
}

export { Settings };
