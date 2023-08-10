import { Button, Input, Card, TextArea, showToast } from '@Components'
import { useInput } from '@Hooks'
import { postJdVariant } from '@Redux'
import { CREATE_CORPORATE_RULES, getValidateError, ifObjectExist, validate } from '@Utils'
import { useDispatch } from 'react-redux'

function CreateCorporateForm() {
    const position = useInput('')
    const experience = useInput('')
    const jd = useInput('')
    const dispatch = useDispatch()


    function submitCorporateHandler() {
        const params = {
            position: position.value,
            experience: experience.value,
            jd: jd.value
        }

        const validation = validate(CREATE_CORPORATE_RULES, params)

        if (ifObjectExist(validation)) {
            dispatch(postJdVariant({
                params,
                onSuccess: (response: any) => () => {
                    resetValues();
                    showToast(response.status, 'success')
                },
                onError: (error: any) => () => {
                    showToast(error.error_message, 'error')
                },
            }))
        } else {
            showToast(getValidateError(validation))
        }
    }

    function resetValues() {
        position.set('')
        experience.set('')
        jd.set('')
    }

    return (
        <div className={'vh-100 d-flex justify-content-center align-items-center'}>

            <Card className='col-xl-7 '>

                <Input
                    heading={'Role'}
                    placeHolder={"Position"}
                    value={position.value}
                    onChange={position.onChange} />
                <Input
                    heading={'Years of experience'}
                    type={'number'}
                    placeHolder={"Experience"}
                    value={experience.value}
                    onChange={experience.onChange} />
                <TextArea
                    heading='Job Description'
                    value={jd.value}
                    onChange={jd.onChange} />
                <div className='text-right'>
                    <Button size='md' text={'Submit'} onClick={submitCorporateHandler} />
                </div>
            </Card>

        </div>
    )
}

export { CreateCorporateForm }