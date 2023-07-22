import React, { useState } from 'react';
import { Input, Card, Back, Button } from '@Components';
import { useInput } from '@Hooks';
import { CardHeader } from 'reactstrap';

type Task = {
  name: string;
  description: string;
  weightage: string;
};

function WeightageCountForm() {
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

  return (
    <Card className="m-3 ">
      <div className="col">
        <div className="row mt--2">
          <Back />
          <h3 className="ml-3">FORM</h3>
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

      {/* Display the table if there are submitted tasks */}
      <div className={'col'}>
      {tasks.length > 0 && (
        <div className="col-4 mt-4 border">
          <CardHeader><h3>Submitted Tasks:</h3></CardHeader>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Weightage</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.weightage}</td>
                </tr>
              ))}
              <tr>
                <td>Total Weightage:</td>
                <td colSpan={2}>{getTotalWeightage()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      </div>
    </Card>
  );
}

export { WeightageCountForm };
