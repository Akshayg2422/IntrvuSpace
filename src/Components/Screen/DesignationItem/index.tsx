import React from 'react'
import { capitalizeFirstLetter } from '@Utils'
import { DesignationItemProps } from './interfaces'
import { Divider, NoDataFound, Button, MenuBar } from '@Components'
import { icons } from '@Assets'

function DesignationItem({ item, onAdd, onEdit, onView }: DesignationItemProps) {

    const { name, knowledge_group_variant } = item
    const MENU = [{ id: 0, name: "Edit", icon: icons.edit }]


    return (
        <div className='card justify-content-center p-3'>
            <div className='col'>
                <div className='row justify-content-between'>
                    <h3 className='mb-0'>{capitalizeFirstLetter(name)}</h3>
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
            <Divider className={'px-0'} space={'3'} />
            <div className='overflow-auto  overflow-hide' style={{
                height: 150
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
                                    className={`${isFirst ? '' : 'my-2'} row justify-content-between align-items-center mx-2 pointer`}
                                    onClick={onView ?
                                        () => {
                                            if (onView) {
                                                onView(item, each)
                                            }
                                        } : undefined
                                    }>
                                    <small className='text-sm'>{capitalizeFirstLetter(name)}</small>
                                    {onEdit &&
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
                                    }
                                </div>
                            )
                        }) :
                        <div className='d-flex align-items-center justify-content-center h-100'>
                            <NoDataFound />
                        </div>
                }
            </div>

        </div >
    )
}

export { DesignationItem };