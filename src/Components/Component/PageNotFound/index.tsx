import { PageNotFoundProps } from './interfaces'
import './index.scss'
import { Button } from '@Components'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'

function PageNotFound({ }: PageNotFoundProps) {

    const { goTo } = useNavigation()

    return (
        <>
            <div className="page_404">
                <div className="container-fluid ">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">404</h1>
                            </div>
                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Look like you're lost
                                </h3>
                                <p>The page you are looking for not available!</p>
                                <Button text={'Go to Home'} size='md' onClick={() => { goTo(ROUTES['auth-module'].splash, true) }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { PageNotFound }