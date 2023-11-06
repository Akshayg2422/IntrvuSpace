import { TopNavbar } from '@Components'
import { FromJD, AdminSchedules } from '@Modules'
import { useSelector } from 'react-redux'

function Clients() {

    const { loginDetails } = useSelector((state: any) => state.AppReducer)

    function renderComponent() {

        let component = loginDetails?.is_super_admin ? <AdminSchedules /> : <FromJD />
        return component;
    }


    return (
        <div className={'screen'}>
            {/* <TopNavbar /> */}
            {
                renderComponent()
            }
        </div>
    )
}

export { Clients }
