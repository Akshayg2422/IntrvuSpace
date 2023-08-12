import React from 'react'
import { capitalizeFirstLetter, filteredName } from '@Utils'
import { DesignationItemProps } from './interfaces'
import { Divider, NoDataFound, Button, MenuBar } from '@Components'
import { icons } from '@Assets'
import { Card, CardBody, CardHeader } from 'reactstrap'

function DesignationItem({ item, onAdd, onEdit, onView }: DesignationItemProps) {

    const { name, knowledge_group_variant } = item
    const MENU = [{ id: 0, name: "Edit", icon: icons.edit }]


    return (
        <Card className=''>
            <CardHeader className='py-3'>
                <div className='row justify-content-between  mx-0'>
                    <div className='col pl-0'>
                        <h3 className='mb-0'>{filteredName(capitalizeFirstLetter(name), 20)}</h3>
                    </div>
                    <div className='text-right'>
                        {onAdd &&
                            <Button
                                text={'Add'}
                                onClick={() => {
                                    if (onAdd) {
                                        onAdd(item)
                                    }
                                }}
                            />
                        }
                    </div>
                </div>
            </CardHeader>
            <CardBody className='pt-1 pb-1 px-0'>
                <div className='overflow-hide overflow-auto'
                    style={{
                        height: 164,
                    }}>
                    {
                        knowledge_group_variant &&
                            knowledge_group_variant.length > 0 ?
                            knowledge_group_variant.map((each: any, index: number) => {
                                const { id, name } = each;
                                const isFirst = index === 0
                                return (
                                    <div
                                        key={id}
                                        className={`${isFirst ? '' : 'my-2'} row pointer mx-1`}>
                                        <small className='text-sm col'
                                            onClick={onView ?
                                                (e) => {
                                                    if (onView) {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        onView(item, each)
                                                    }
                                                } : undefined
                                            }
                                        >{name}</small>
                                        {onEdit &&
                                            <div className=''>
                                                < MenuBar
                                                    menuData={MENU}
                                                    onClick={(selected) => {

                                                        if (selected?.id === MENU[0].id) {
                                                            if (onEdit) {
                                                                onEdit(item, each)
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        }
                                    </div>
                                )
                            }) :
                            <div className='d-flex align-items-center justify-content-center h-100'>
                                <NoDataFound />
                            </div>
                    }
                </div>
            </CardBody>

        </Card >
    )
}

export { DesignationItem };