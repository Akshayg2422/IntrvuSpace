import React, { useState } from 'react';
import { Input, Card, Back, Button, CommonTable } from '@Components';
import { useInput, useWindowDimensions } from '@Hooks';

type Task = {
    name: string;
    description: string;
};

function CreateQuestionForm() {
    const { height } = useWindowDimensions()
    const nameInput = useInput('');
    const descriptionInput = useInput('');

    return (
        <>
            <Card className="m-3 overflow-auto overflow-hide" style={{ height: height - 30 }}>
                <div className="col">
                    <div className="row mt--2">
                        <Back />
                        <h3 className="ml-3">Create Question</h3>
                    </div>
                </div>
                <hr className="mt-2"></hr>

                <div className="col-md-9 col-lg-5">
                    <Input heading={'Name'} value={nameInput.value} onChange={nameInput.onChange} />

                    <Input
                        heading={'Description'}
                        value={descriptionInput.value}
                        onChange={descriptionInput.onChange}
                    />

                </div>

                <div className="col mt-4">
                    <Button size={'md'} text={'Submit'} onClick={() => { }} />
                </div>



            </Card></>
    );
}

export { CreateQuestionForm };
