import { Button } from '@Components'
import { ButtonGroup } from 'reactstrap'
import { RadioProps } from './interface'
function RadioGroup({ onButtonClick, isActive, data }: RadioProps) {

    return (
        <div className=''>
            <ButtonGroup className="btn-group btn-primary btn-group-toggle " data-toggle="buttons">
                {
                    data && data.length > 0 && data.map((el: any, index) => {
                        return (<Button className={`${isActive === el.value && 'active'} text-uppercase`}  onClick={() => { if (onButtonClick) { onButtonClick(el.value) } }} text={el.description} />)
                    })
                }
            </ButtonGroup>


        </div>
    );
}
export { RadioGroup }
