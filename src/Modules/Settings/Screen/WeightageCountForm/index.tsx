import React, { useState } from 'react';
import { Input, Card, Back, Button, CommonTable } from '@Components';
import { useInput, useWindowDimensions } from '@Hooks';
import { createQuestionSection } from '@Redux'

type Task = {
  name: string;
  description: string;
  weightage: string;
};

function WeightageCountForm() {


  const { height } = useWindowDimensions()
  const [tasks, setTasks] = useState<Task[]>([]);
  const nameInput = useInput('');
  const descriptionInput = useInput('');
  const weightageInput = useInput('');

  const handleSubmit = () => {
    const newWeightage = parseInt(weightageInput.value, 10);
    if (newWeightage <= 100 && newWeightage > 0) {
      const newTask: Task = {
        name: nameInput.value,
        description: descriptionInput.value,
        weightage: weightageInput.value,
      };

      setTasks([...tasks, newTask]);







      nameInput.set('');
      descriptionInput.set('');
      weightageInput.set('');
    } else {
      alert('Weightage should be between 1 and 100');
    }
  };

  const getTotalWeightage = () => {
    return tasks.reduce((total, task) => total + parseInt(task.weightage, 10), 0);
  };

  const normalizedTableData = (data: any) => {
    if (data && data?.length > 0)
      return data.map((el: any) => {
        console.log('--------->', el)
        return {

          "name":
            <div className="row">
              <div className="col-auto ">
                <div className="mr--3">{el?.name}</div>
              </div>
            </div>,

          'description':
            <div>
              {el?.description}
            </div>,

          "weightage count":
            <div className="ml-5 m-0">
              {el?.weightage}
            </div>,

          "total weightage count":
            <div className="ml-6 mb-0">
              {getTotalWeightage()}
            </div>
        };
      });
  };

  return (
    <>
      <Card className="m-3 overflow-auto overflow-hide" style={{ height: height - 30 }}>
        <div className="col">
          <div className="row mt--2">
            <Back />
            <h3 className="ml-3">Create Sections</h3>
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

          <Input
            heading={'Weightage'}
            value={weightageInput.value}
            onChange={weightageInput.onChange}
          />
        </div>

        <div className="col mt-4">
          <Button size={'md'} text={'Submit'} onClick={handleSubmit} />
        </div>

        {
          tasks.length > 0 && (
            <div className={'mt-4 mx-3'} >
              <CommonTable
                tableDataSet={tasks}
                displayDataSet={normalizedTableData(tasks)}
              />

            </div>
          )
        }


      </Card></>
  );
}

export { WeightageCountForm };
