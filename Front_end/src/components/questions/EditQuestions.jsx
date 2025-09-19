import { useEffect, useState } from "react";
import Button from "../common/Button/Button";
import { ClipLoader } from "react-spinners";
import { Plus, X, Save, ShieldAlert } from "lucide-react";
import Input from "../common/Input/Input";
import SelectCourse from "./SelectCourse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import { toast } from "react-toastify";

const EditQuestions = (props) => {
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({});

  console.log({ options });

  const queryClient = useQueryClient();

  const isErrorExists = Object.keys(errors).length > 0;

  const { data: question, isLoading } = useQuery({
    queryKey: ["getUpdateQuestionData", { id: props?.id }],
    queryFn: ({ queryKey }) => api.get(`api/questions/${queryKey[1].id}`),
    select: (response) => {
      if (response?.data) {
        if (options.length === 0) {
          console.log("called");
          setOptions(
            response?.data?.data.options.map((opt, i) => ({
              ...opt,
              name: `option${i + 1}`,
            }))
          );
        }
        return response?.data?.data;
      }
      return [];
    },
  });

  const { mutate: UpdateQuestions } = useMutation({
    mutationKey: ["updateQuestions", { id: props?.id }],
    mutationFn: (data) => api.put(`api/questions/${props?.id}`, data),
    onSuccess: () => {
      toast.success("Question updated successfuly!!");
      queryClient.prefetchQuery(["getUpdateQuestionData", { id: props?.id }]);
    },
    onError: (error) => {
      const backErrors = error?.response?.data?.errors;

      if (backErrors.options && !backErrors.question)
        return setErrors({ ...backErrors.options });
      setErrors({ ...backErrors });
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const question = formData.get("question");

    // if (question.length <= 0) {
    //   return setErrors((prev) => ({
    //     ...prev,
    //     question: "please write some question",
    //   }));
    // }

    const optionErrors = {};
    const optionValues = [];

    options.forEach((opt) => {
      const value = formData.get(opt.name).trim();

      if (value.length === 0)
        optionErrors[opt.name] = "Options cannot be empty or duplicated.";
      if (value.length !== 0 || options.length >= 2)
        optionValues.push({
          text: value,
          name: opt.name,
          isCorrect: opt.isCorrect,
        });
    });

    // if (Object.values(optionErrors).length > 0) {
    //   return setErrors((prev) => ({ ...prev, ...optionErrors }));
    // }

    // optionValues.forEach((opt, index) => {
    //   const optIndex = optionValues.findIndex(
    //     (op, i) => opt.name !== op.name && op.text === opt.text
    //   );

    //   if (optIndex !== -1) {
    //     return setErrors({
    //       duplicated: "Options cannot be duplicated",
    //     });
    //   }
    // });
    // if (!isErrorExists)
    UpdateQuestions({
      question,
      options: optionValues,
      courseId: props?.selectedCourse?.id,
    });
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <ClipLoader color="blue" size={60} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between text-gray-800">
        <h2 className="pb-6 text-lg font-semibold capitalize">
          update questions
        </h2>
        <div
          onClick={props.handelCloseUpdate}
          className="flex items-center justify-center w-8 h-8 rounded-md cursor-pointer hover:text-white text-md hover:bg-blue-800"
        >
          <X className="w-5 h-5 " />
        </div>
      </div>
      <Button className="flex items-center px-1 text-white capitalize bg-blue-800 text-md">
        update question
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
      <form method="PUT" onSubmit={handleFormSubmit}>
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
            defaultValue={question?.question}
            className="w-full h-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          {isErrorExists && errors["question"] && (
            <p className="text-sm text-red-600 ">{errors["question"]}</p>
          )}
        </div>
        <div>
          <div className="w-full">
            <div className="flex items-center justify-between my-3">
              <p className="font-semibold capitalize text-md">answe options</p>
              <div className="flex items-center gap-3">
                {isErrorExists &&
                  (errors[`duplicated`] || errors[`answer`]) && (
                    <div className="text-sm text-red-600 ">
                      <ShieldAlert className="inline w-4 h-4 mr-2" />
                      {errors[`duplicated`] || errors[`answer`]}
                    </div>
                  )}

                {options.length < 6 && (
                  <Button
                    onClick={() =>
                      setOptions((prev) => [
                        ...prev,
                        {
                          name: `option${options.length + 1}`,
                          isCorrect: false,
                          text: "",
                        },
                      ])
                    }
                    className="flex items-center justify-center px-1 py-1 text-sm text-gray-800 border border-blue-800 text-md hover:text-white hover:bg-blue-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Option
                  </Button>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              {options.length > 0 &&
                options.map((opt, i) => (
                  <div key={i} className="flex-col items-center w-full gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() =>
                          setOptions(
                            options.map((opt) => {
                              if (opt.name === `option${i + 1}`)
                                return { ...opt, isCorrect: true };
                              return { ...opt, isCorrect: false };
                            })
                          )
                        }
                        className={`w-4 h-4 cursor-pointer flex items-center mb-2 rounded-full border-2 flex-shrink-0 ${
                          opt?.isCorrect
                            ? "border-blue-600 bg-blue-600"
                            : "border-blue-300"
                        }`}
                      >
                        {opt?.isCorrect && (
                          <div className="w-full h-full scale-50 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="flex w-full items-center justify-between gap-4">
                        <Input
                          defaultValue={opt.text}
                          name={opt.name}
                          placeholder={`option ${i + 1}`}
                          className="w-full py-1 border-t-0 border-b border-l-0 border-r-0 focus:py-1 focus:border-b-0 border-b-gray-200"
                          onChange={() =>
                            setErrors((prev) => {
                              const newPrev = { ...prev };
                              delete newPrev.duplicated;
                              if (newPrev[`option${i + 1}`])
                                delete newPrev[`option${i + 1}`];
                              return newPrev;
                            })
                          }
                        />
                        {options?.length > 2 && (
                          <X
                            onClick={() => {
                              setOptions((prev) => {
                                const sortedOptions = [...prev]
                                  .sort((a, b) => a - b)
                                  .filter(
                                    (opt) => opt.name !== `option${i + 1}`
                                  );
                                const updatedOptions = [];
                                sortedOptions.forEach((opt, i) => {
                                  const newOption = { ...opt };

                                  if (newOption.name !== `option${i + 1}`)
                                    newOption.name = `option${i + 1}`;
                                  updatedOptions.push(newOption);
                                });
                                return updatedOptions;
                              });
                              setErrors(() => {
                                const prev = { ...errors };
                                delete prev[`option${i + 1}`];
                                return prev;
                              });
                            }}
                            className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-700"
                          />
                        )}
                      </div>
                    </div>
                    {isErrorExists && errors[`option${i + 1}`] && (
                      <div className="pb-3 -mt-2 text-sm text-red-600 ">
                        <ShieldAlert className="inline w-4 h-4 mr-2" />
                        {errors[`option${i + 1}`]}
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
                  update question
                </Button>
                <Button
                  // onClick={props.handleCreateQuestion}
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

export default EditQuestions;
