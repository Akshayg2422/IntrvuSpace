import { Button, Divider, Modal, NoRecordsFound } from "@Components";
import { translate } from "@I18n";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DragAndReorderProps } from "./interface";

function DragAndReorder({
    isOpen = false,
    size = 'lg',
    title,
    dndData,
    onSubmitClick,
    isDndModalOpen = false
}: DragAndReorderProps) {
    const [dragAndReorderData, setDragAndReorderData] = useState<any>([])
    const [dndIdSequenceObj, setDndIdSequenceObj] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(isOpen)





    function handleOnDragEnd(result: any) {
        if (!result.destination) return;

        const items = Array.from(dragAndReorderData);


        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        let newItemId = []
        let newitems = items.filter((item: any) => {
            newItemId.push({ id: item.id } as never)
            return newItemId
        })



        const newArrayElement = newItemId.map((item: any, index) => {
            return { ...item, display_order: index + 1 }
        });
        let newArray = items.map((item: any, index) => {
            return { ...item, display_order: index + 1 }
        });

        setDragAndReorderData(newArray);
        setDndIdSequenceObj(newArrayElement as never)
    }




    return (
        <>
            <span className=" ni ni-active-40 mt-1 mr-2 text-light ni-lg pointer" onClick={() => {
                setIsOpenModal(!isOpenModal)
                setDragAndReorderData(dndData)
            }}  ></span>
            <Modal
                isOpen={isOpenModal}
                size={size}
                onClose={() => setIsOpenModal(!isOpenModal)}
                title={title}>
                {dragAndReorderData && dragAndReorderData?.length > 0 ?
                    <div className="overflow-auto overflow-hide pb--3" style={{ height: '55vh' }}>
                        <DragDropContext onDragEnd={handleOnDragEnd} >
                            <Droppable droppableId="id">
                                {(provided: any) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {dragAndReorderData.map(({ id, name }, index) => {
                                            return (
                                                <div className="">
                                                    <Draggable key={id + ''} draggableId={id + ''} index={index}>
                                                        {(provided: any) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <div>
                                                                    <p>
                                                                        {name}
                                                                    </p>
                                                                    {dragAndReorderData.length > 0 && <Divider space="4" />}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </div>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                    : <NoRecordsFound />}
                <div className="text-right mt-3">
                    <Button text={translate("common.submit")} onClick={() => {
                        if (onSubmitClick) {
                            onSubmitClick(dndIdSequenceObj)
                            if (!isDndModalOpen) { setIsOpenModal(!isOpenModal) }
                        }
                    }} />
                </div>
            </Modal>
        </>
    )

}

export { DragAndReorder };

