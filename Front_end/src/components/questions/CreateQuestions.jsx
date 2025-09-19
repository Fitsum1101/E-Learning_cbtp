import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { X, Plus, Save, ShieldAlert } from "lucide-react";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import SelectCourse from "./SelectCourse";
import api from "../../services/api";

const CreateQuestions = (props) => {
  const [option, setOption] = useState([1, 2]);
  const [errors, setErrors] = useState({});
  const [answer, setanswer] = useState(undefined);

  const { mutate: createQuestion, isPending } = useMutation({
    mutationKey: ["question", { id: props.selectedCourse?.id }],
    mutationFn: ({ data }) => {
      return api.post(`api/question/course/${props.selectedCourse.id}`, data);
    },
    onSuccess: (_, variables) => {
      toast.success("Question created successfuly!!");
      variables.form.reset();
      setanswer(undefined);
    },
    onError: (error) => {
      const backErrors = error?.response?.data?.errors;
      console.log({ backErrors });
      if (backErrors.options) return setErrors({ ...backErrors.options });
      setErrors({ ...backErrors });
    },
  });

  const isErrorExists = Object.keys(errors).length > 0;

  const hadleForm = (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);
    const question = formData.get("question").trim();
    let options = [];

    if (question.length <= 0) {
      return setErrors((prev) => ({
        ...prev,
        question: "please write some question",
      }));
    }

    const optionErrors = {};

    option.forEach((opt) => {
      let name = `option${opt}`;

      const value = formData.get(name).trim();

      if (value.length === 0)
        optionErrors[name] = "Options cannot be empty or duplicated.";
      else options.push({ text: value, name, isCorrect: false });
    });

    if (Object.values(optionErrors).length > 0) {
      return setErrors((prev) => ({ ...prev, ...optionErrors }));
    }

    options.forEach((opt, index) => {
      const optIndex = options.findIndex(
        (op, i) => index !== i && op.name === opt.name
      );

      if (optIndex !== -1) {
        return setErrors({
          duplicated: "Options cannot be duplicated",
        });
      }
    });

    if (!answer)
      return setErrors({
        answer: "One option must be marked as the correct answer",
      });

    options = options.map((opt, i) => {
      if (opt.name === answer?.name) {
        opt.isCorrect = true;
      }
      return { text: opt.text, isCorrect: opt.isCorrect };
    });

    createQuestion({ data: { question, options }, form });
  };

  return (
    <div>
      <div className="flex justify-between text-gray-800">
        <h2 className="pb-6 text-lg font-semibold capitalize">
          Create new questions
        </h2>
        <div
          onClick={props.handleCreateQuestion}
          className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer hover:text-white text-md hover:bg-blue-800"
        >
          <X className="w-5 h-5 " />
        </div>
      </div>
      <Button
        disabled={isPending}
        loading={isPending}
        className="flex items-center px-1 text-white capitalize bg-blue-800 text-md"
      >
        Create new Questions
      </Button>
      <div className="py-2">
        <p className="flex items-center pb-1 font-semibold capitalize text-md">
          Course
        </p>
        <SelectCourse
          handleSelcetCourse={props.handleSelcetCourse}
          handleOpen={props.handleOpen}
          dropdownOpen={props.dropdownOpen}
          selectedCourse={props.selectedCourse}
          courses={props.courses}
        />
      </div>
      <form action="post" onSubmit={hadleForm}>
        <div>
          <label
            className="flex items-center pb-1 font-semibold capitalize text-md"
            htmlFor="question"
          >
            Question text
          </label>
          <textarea
            name="question"
            id="question"
            onChange={() =>
              setErrors((prev) => {
                const newPrev = { ...prev };
                if (prev["question"]) {
                  delete newPrev.question;
                  return newPrev;
                }
                return prev;
              })
            }
            className="w-full h-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          {isErrorExists && errors["question"] && (
            <p className="text-sm text-red-600 ">{errors["question"]}</p>
          )}
        </div>
        <div>
          <div className="w-full">
            <div className="flex items-center justify-between my-3">
              <p className="font-semibold capitalize text-md">answer options</p>
              <div className="flex items-center gap-3">
                {isErrorExists &&
                  (errors[`duplicated`] || errors[`answer`]) && (
                    <div className="text-sm text-red-600 ">
                      <ShieldAlert className="inline w-4 h-4 mr-2" />
                      {errors[`duplicated`] || errors[`answer`]}
                    </div>
                  )}
                {option !== 6 && (
                  <Button
                    className="flex items-center justify-center px-1 py-1 text-sm text-gray-800 border border-blue-800 text-md hover:text-white hover:bg-blue-800"
                    onClick={() => {
                      if (option.length < 6)
                        setOption((prev) => [...prev, prev.length + 1]);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Option
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              {option.map((val, index) => (
                <div key={index} className="">
                  <div className="flex items-center w-full gap-2">
                    <div
                      onClick={() => {
                        setanswer({ name: `option${val}` });
                        setErrors({});
                      }}
                      className={`w-4 h-4 cursor-pointer flex items-center mb-2 rounded-full border-2 flex-shrink-0 ${
                        answer?.name === `option${val}`
                          ? "border-blue-600 bg-blue-600"
                          : "border-blue-300"
                      }`}
                    >
                      {answer?.name === `option${val}` && (
                        <div className="w-full h-full scale-50 bg-white rounded-full" />
                      )}
                    </div>
                    <div className="flex w-full items-center justify-between gap-4">
                      <Input
                        className="w-full py-1 border-t-0 border-b border-l-0 border-r-0 focus:py-1 focus:border-b-0 border-b-gray-200"
                        placeholder={`option${val}`}
                        name={`option${val}`}
                        onChange={() =>
                          setErrors((prev) => {
                            const newPrev = { ...prev };
                            delete newPrev.duplicated;
                            if (newPrev[`option${val}`])
                              delete newPrev[`option${val}`];
                            return newPrev;
                          })
                        }
                      />
                      {option.length > 2 && (
                        <X
                          onClick={() =>
                            setOption((prev) => prev.filter((i) => i !== val))
                          }
                          className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-700"
                        />
                      )}
                    </div>
                  </div>
                  {isErrorExists && errors[`option${val}`] && (
                    <div className="pb-3 -mt-2 text-sm text-red-600 ">
                      <ShieldAlert className="inline w-4 h-4 mr-2" />
                      {errors[`option${index + 1}`]}
                    </div>
                  )}
                </div>
              ))}
              <p className="text-sm text-gray-600">
                Select the radio button next to the correct answer. You can add
                up to 6 options.
              </p>
              <div className="flex gap-2 my-4">
                <Button
                  type="submit"
                  className="flex items-center justify-center py-1 text-white capitalize bg-blue-800 hover:bg-blue-900 capitalizes flex-1/3 "
                >
                  <Save className="w-5 h-5 mr-2" />
                  create question
                </Button>
                <Button
                  onClick={props.handleCreateQuestion}
                  className="py-1 capitalize border border-blue-800 hover:bg-blue-800 hover:text-white"
                >
                  cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestions;
