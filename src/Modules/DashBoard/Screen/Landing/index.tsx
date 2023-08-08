import { image } from '@Assets';
import { Button, Image } from "@Components";
import { ROUTES } from '@Routes';
import { useNavigation } from '@Hooks'

function Landing() {
    const { goTo } = useNavigation()
    return (
        <div className="container-fluid bg-primary h-100vh">
            <div className='col text-right pt-3'>
                <Button color={'white'} text={'Login'} size={'md'} onClick={() => {
                    goTo(ROUTES['auth-module'].login);
                }} />
            </div>
            <div className="row justify-content-center align-items-center "
            style={{
                height:'80vh'
            }}
            >
                <div className="row  justify-content-center">
                    <h1 className='pb-0 mb--1 font-weight-bolder text-white'
                        style={{
                            fontSize: '13vh'
                        }}
                    >MOCK <b className='text-black'>EAZY</b></h1>
                </div>
                <div className="row justify-content-center col-12 ">
                    <p className="text-center text-white "
                        style={{
                            maxWidth: '85vh'
                        }}
                    >
                        Interview App is the easiest way to interview people automatically. Invite people to answer your question spontaneously with their webcam. Where
                    </p>

                </div>
                <div className="row justify-content-center col-12 ">
                    <Image
                        className=""
                        src={image.LOGIN_SIDE_IMAGE}
                        height={'30%'}
                        width={'30%'}
                    />
                </div>

            </div>
        </div>
    )
}

export { Landing };
