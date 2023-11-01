import React, { useEffect, useState } from 'react';
import { Input, Card, Back, Button, CommonTable, showToast, NoDataFound } from '@Components';
import { useInput, useLoader, useWindowDimensions, useNavigation } from '@Hooks';
import { createQuestionSection, getQuestionSection } from '@Redux'
import { CREATE_QUESTION_SECTION_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '@Routes';


function WeightageCountForm() {

  const { goTo } = useNavigation()
  const dispatch = useDispatch()
  const { height } = useWindowDimensions()
  const nameInput = useInput('');
  const descriptionInput = useInput('');
  const weightageInput = useInput('');
  const [sections, setSections] = useState<any>([]);
  const [displayOrderCount, setDisplayOrderCount] = useState(1);
  const loginLoader = useLoader(false);
  const [loading, setLoading] = useState(false)
  const { selectedRole, selectedQuestionForm, questionSection } = useSelector((state: any) => state.DashboardReducer)


  useEffect(() => {
    getQuestionSectionApi()
  }, [])

  const submitQuestionSectionHandler = () => {

    setDisplayOrderCount((prevCount) => prevCount + 1);
    const inputValues = {
      name: nameInput?.value,
      description: descriptionInput?.value,
      weightage: parseInt(weightageInput?.value),
      question_form_id: selectedRole?.id,
      display_order: displayOrderCount
    }

    let updatedParams: any = [...sections]
    updatedParams = [...updatedParams, inputValues]
    setSections(updatedParams);

    const sum = updatedParams.reduce((n, { weightage }) => n + weightage, 0)

    if (sum < 100 && sum > 0) {
      const params = {
        'sections': updatedParams
      }

      const validation = validate(CREATE_QUESTION_SECTION_RULES, {
        name: nameInput?.value,
        description: descriptionInput?.value,
      })

      if (ifObjectExist(validation)) {
        loginLoader.show()
        setLoading(true)
        dispatch(
          createQuestionSection({
            params,
            onSuccess: (response: any) => () => {
              if (response.success) {
                resetValues()
                loginLoader.hide()
                showToast(response.message, "success");
                goTo(ROUTES['group-module']['question-sections'])
              }
              setLoading(false)
            },
            onError: (error) => () => {
              showToast(error.error_message);
              setLoading(false)
              loginLoader.hide()
            },
          })
        );
      } else {
        showToast(getValidateError(validation));
      }
    }

  }


  const getQuestionSectionApi = () => {
    const params = {
      question_form_id: selectedQuestionForm?.id
    };

    dispatch(
      getQuestionSection({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => {
        },
      })
    );
  }
  function resetValues() {
    nameInput.set('');
    descriptionInput.set('');
    weightageInput.set('');
  }

  const getTotalWeightage = () => {
    return questionSection.reduce((total, task) => total + parseInt(task.weightage, 10), 0);
  };

  const normalizedTableData = (data: any) => {
    if (data && data?.length > 0)
      return data.map((el: any) => {
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
            type={"number"}
            value={weightageInput.value}
            onChange={weightageInput.onChange}
            maxLength={2}
          />
        </div>

        <div className="col mt-4">
          <Button size={'md'} text={'Submit'} onClick={submitQuestionSectionHandler} />
        </div>

        {
          questionSection?.length > 0 ? (
            <div className={'mt-4 mx-3'} >
              <CommonTable
                tableDataSet={questionSection}
                displayDataSet={normalizedTableData(questionSection)}
              />

            </div>
          ) :
            <div className={'d-flex justify-content-center align-items-center'} style={{ height: '90vh' }}>
              <NoDataFound text={"No Data Found"} />
            </div>
        }
      </Card>
    </>
  );
}

export { WeightageCountForm };
