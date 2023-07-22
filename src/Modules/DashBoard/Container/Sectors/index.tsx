import { Image, Spinner } from '@Components'
import { getPhoto } from '@Utils'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SectorsProps } from './interface'
import { useLoader } from '@Hooks'
import { getSectors, setClientSector } from '@Redux'

function Sectors({ }: SectorsProps) {

    const { sectors, selectedClientSector } = useSelector((state: any) => state.DashboardReducer)
    const dispatch = useDispatch()
    const DEFAULT_SECTOR = {
        id: "-1",
        name: "All"
    }

    const loader = useLoader(false)

    useEffect(() => {
        getSectorsApiHandler();
    }, [])

    const getSectorsApiHandler = () => {
        const params = {}
        dispatch(
            getSectors({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        );
    };

    return (
        <div
            className='row overflow-auto  overflow-hide'>

            <div className='d-flex'>
                {sectors && sectors.length > 0 &&
                    [DEFAULT_SECTOR, ...sectors].map((el: any, index: number) => {
                        const { id, name, photo } = el;
                        const isSelected = id === selectedClientSector?.id;
                        const bgColor = isSelected ? "bg-primary" : "bg-white"
                        const textColor = isSelected ? "text-white" : ""

                        return (
                            <div
                                className={`card ${bgColor} ${index !== 0 && "ml-2"} pointer d-flex justify-content-center align-items-center`}
                                key={id}
                                onClick={() => {
                                    dispatch(setClientSector(el))
                                }}
                                style={{
                                    width: 120,
                                    height: 40,
                                }}
                            >
                                <div className='row align-items-center'>
                                    {el.photo && <Image variant={'rounded'} src={getPhoto(photo)} size={'xs'} />}
                                    <div className={`flex-wrap ml-1 ${textColor}`}>
                                        <div
                                            style={{
                                                fontSize: 10
                                            }}>
                                            {name} </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {loader.loader && <Spinner />}
        </div >
    )
}

export { Sectors }
