import {
  Button,
  Divider,
  Modal,
  Input,
  Card,
  showToast,
  Breadcrumbs,
} from "@Components";
import {
  useModal,
  useNavigation,
  useInput,
  useLoader,
  useWindowDimensions,
} from "@Hooks";
import {
  breadCrumbs,
  generateForm,
  getQuestionForm,
  setSelectedQuestionForm,
} from "@Redux";
import { ROUTES } from "@Routes";
import {
  GENERATE_USING_AI_RULES,
  capitalizeFirstLetter,
  getValidateError,
  ifObjectExist,
  validate,
} from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimationBook } from "@Components";
import { GenerateModal } from "@Modules";

function Questions() {
  const { goTo, goBack } = useNavigation();
  const dispatch = useDispatch();
  const addGenerateFormModal = useModal(false);
  const { selectedRole, questions, breadCrumb } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const name = useInput("");
  const description = useInput("");
  const [dataGenerated, setDateGenerated] = useState(false);
  const { height } = useWindowDimensions();
  const loader = useLoader(false);
  const generateJdModal = useModal(false);


  useEffect(() => {
    getQuestionsFormApi();
  }, []);

  const getQuestionsFormApi = () => {
    const params = {
      knowledge_group_variant_id: selectedRole?.id,
    };

    dispatch(
      getQuestionForm({
        params,
        onSuccess: () => () => { },
        onError: () => () => { },
      })
    );
  };

  function proceedGenerateFormApiHandler() {
    setDateGenerated(true);
    addGenerateFormModal.hide();
    generateJdModal.show();

    const params = {
      name: name.value,
      description: description.value,
      knowledge_group_variant_id: selectedRole?.id,
    };

    const validation = validate(GENERATE_USING_AI_RULES, params);

    if (ifObjectExist(validation)) {
      loader.show();
      dispatch(
        generateForm({
          params,
          onSuccess: () => (response) => {
            setDateGenerated(false);
            resetValues();
            showToast(response.message, "success");
            loader.hide();
            generateJdModal.hide();
          },
          onError: () => (error) => {
            setDateGenerated(false);
            showToast(error.error_message, "error");
            loader.hide();
            generateJdModal.hide();
          },
        })
      );
    } else {
      showToast(getValidateError(validation));
    }
  }

  function resetValues() {
    name.set("");
    description.set("");
  }

  return (
    <>
      <Breadcrumbs />

      <div className="m-3">
        <div className="col text-right ml-3">
          <Button
            text={"Generate using AI"}
            className="text-white"
            onClick={addGenerateFormModal.show}
          />

          <Button
            text={"Generate by User"}
            className="text-white"
            onClick={() => {
              goTo(ROUTES["designation-module"]["create-question-form"]);
            }}
          />
        </div>

        <div className="row mt-3 px-1">
          {questions &&
            questions.length > 0 &&
            questions?.map((item: any) => {
              const { id, name, description } = item;
              return (
                <div className="col-4 px-2 mb--3 pb-1" key={id}>
                  <Card
                    className="shadow-none justify-content-center overflow-auto overflow-hide "
                    style={{ height: height - 280 }}
                    onClick={() => {
                      goTo(ROUTES["designation-module"]["question-sections"]);
                      dispatch(setSelectedQuestionForm(item));
                      dispatch(
                        breadCrumbs({
                          name: name,
                          path: window.location.pathname,
                        })
                      );
                    }}
                  >
                    <h4 className="mb-0 pointer mt--2">{name}</h4>
                    <div className={"mx--4"}>
                      <Divider space={"3"} />
                    </div>
                    <small className="mb-0 pointer">{description}</small>
                  </Card>
                </div>
              );
            })}
        </div>
      </div>

      <Modal
        title={"Generate Form"}
        isOpen={addGenerateFormModal.visible}
        onClose={() => {
          addGenerateFormModal.hide();
          resetValues()
        }}
      >
        <Input
          className={"col-6"}
          heading={"Name"}
          value={name.value}
          onChange={name.onChange}
        />
        <Input
          className={"col-6"}
          heading={"Description"}
          value={description.value}
          onChange={description.onChange}
        />
        <Button text={"Submit"} onClick={proceedGenerateFormApiHandler} />
      </Modal>

      <div className={"pt-3"}>
        <GenerateModal
          title={"Generating Questions"}
          isOpen={generateJdModal.visible}
          onClose={generateJdModal.hide}
        >
          <AnimationBook />
        </GenerateModal>
      </div>
    </>
  );
}

export { Questions };
