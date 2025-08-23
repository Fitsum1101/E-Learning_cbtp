import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";
import usePostMutation from "../../../hooks/mutaion/usePostMutation";
import api from "../../../services/api";

const scrollTOInputs = () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

const AddCourse = () => {
  const navigation = useNavigate();
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(undefined);

  const { data: category } = useQuery({
    queryKey: ["catg"],
    queryFn: () => api.get("api/categories"),
    select: (response) => response.data.data,
  });

  const errorKeys = Object.keys(errors);

  if (errorKeys.length > 0) {
    scrollTOInputs();
  }

  const { mutate } = usePostMutation(
    "/api/course",
    {
      onError: (errors) => setErrors(errors),
      onSuccess: (data) =>
        navigation("/", {
          state: { courseData: data },
        }),
    },
    "multipart/form-data"
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024;

    let errorMessage;

    if (!allowedTypes.includes(file.type)) {
      errorMessage = "Invalid file type. Only JPG, PNG, and GIF are allowed.";
    } else if (file.size > maxSize) {
      errorMessage = "File size exceeds 2MB.";
    }
    if (errorMessage) {
      return setErrors((prev) => {
        return { ...prev, file: errorMessage };
      });
    } else {
      setErrors((prev) => {
        const newValues = {};
        for (let key in prev) {
          if (key !== "file") {
            newValues[key] = prev[key];
          }
        }
        return newValues;
      });
    }

    const objectUrl = URL.createObjectURL(file);
    setFile(file);
    setPreviewUrl(objectUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const title = data.get("course-title")?.trim();
    const description = data.get("description")?.trim();
    const categoryId = data.get("categoryId")?.trim();
    const courseLevel = data.get("courseLevel")?.trim();
    console.log(courseLevel);

    const newErrors = {};

    if (!errorKeys.includes("title") && !title)
      newErrors.title = "Please front enter a course title.";

    if (
      !errorKeys.includes("description") &&
      (description.length < 150 || description.length > 200)
    ) {
      newErrors.description =
        "The description must front be between 150 and 200 characters.";
    }

    if (!errorKeys.includes("categoryId") && !categoryId)
      newErrors.categoryId = "Please select a course category.";

    if (!errorKeys.includes("file") && !file) {
      newErrors.file = "Please select a file.";
    }

    if (errorKeys.length > 0 || Object.keys(newErrors).length > 0) {
      return setErrors((prev) => {
        return { ...prev, ...newErrors };
      });
    }

    setErrors({});

    const apiData = new FormData();

    apiData.append("title", title);
    apiData.append("description", description);
    apiData.append("categoryId", categoryId);
    apiData.append("courseLevel", courseLevel);
    apiData.append("courseImage", file);

    mutate(apiData);
  };

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <form method="POST" noValidate onSubmit={handleSubmit}>
            <div className="border-b border-gray-200 px-6 py-5">
              <h2 className="text-lg font-medium text-gray-900">
                Course Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Basic details about your course.
              </p>
            </div>
            <div className="px-6 py-5 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Input
                    type="text"
                    name="course-title"
                    id="course-title"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    placeholder="e.g. Introduction to Web Development"
                    label={"course-title"}
                    onChange={() => {
                      const op = {};
                      if (errorKeys.length > 0 && errors.title) {
                        for (let newError in errors) {
                          if (newError !== "title")
                            op[newError] = errors[newError];
                        }
                        setErrors(op);
                      }
                    }}
                    error={errors && errors.title}
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm mb-1 font-medium text-gray-700"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="categoryId"
                    onFocus={(e) => {
                      const op = {};
                      if (errorKeys.length > 0 && errors.categoryId) {
                        for (let newError in errors) {
                          if (newError !== "categoryId")
                            op[newError] = errors[newError];
                        }
                        setErrors(op);
                      }
                    }}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        setErrors((prev) => {
                          return { ...prev, categoryId: true };
                        });
                      }
                    }}
                    required
                    className={`w-full  px-3 py-2 border rounded-md bg-white transition duration-150 ease-in-out 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                   hover:shadow-sm 
  ${errors && errors.categoryId ? "border-red-500" : "border-gray-300"}
`}
                  >
                    <option value="" disabled selected>
                      Select a category
                    </option>
                    {category?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Short Description <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    required
                    onChange={() => {
                      const op = {};
                      if (errorKeys.length > 0 && errors.description) {
                        for (let newError in errors) {
                          if (newError !== "description")
                            op[newError] = errors[newError];
                        }
                        setErrors(op);
                      }
                    }}
                    onBlur={(e) => {
                      const description = e.target.value.trim();

                      if (
                        description.length >= 150 &&
                        description.length <= 200
                      ) {
                        const op = {};
                        for (let newError in errors) {
                          if (newError !== "description")
                            op[newError] = errors[newError];
                        }
                        return setErrors(op);
                      }
                      setErrors((pref) => {
                        return {
                          ...pref,
                          description:
                            "The description must be between 150 and 200 characters.",
                        };
                      });
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors && errors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } `}
                    placeholder="A brief overview of what students will learn in this course"
                  ></textarea>
                </div>
                <p
                  className={` text-sm text-gray-500  ${
                    errors && errors.description && " text-red-500"
                  } `}
                >
                  Write a concise description (150-200 characters).
                </p>
              </div>
              <div className="flex items-center">
                <label for="level" className="mr-2 text-gray-600">
                  Level:
                </label>
                <select
                  id="level"
                  name="courseLevel"
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option defaultChecked value={"beginner"}>
                    Beginner
                  </option>
                  <option value={"intermediate"}>Intermediate</option>
                  <option value={"advanced"}>Advanced</option>
                </select>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-5">
              <h2 className="text-lg font-medium text-gray-900">Media</h2>
              <p className="mt-1 text-sm text-gray-500">
                Upload a cover image for your course.
              </p>
            </div>
            <div className="px-6 py-5">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    id="cover-image"
                    className="file-upload-input absolute"
                    accept="image/*"
                  />

                  <label htmlFor="cover-image" className="file-upload-label">
                    <div
                      className={`mt-1 flex justify-center px-6 pt-5 pb-6 hover:border-gray-400 transition-colors rounded-md border-2 border-dashed border-gray-300 {${
                        errors && errors.file && "border-red-500"
                      }}  `}
                    >
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <span className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none hover:text-blue-500">
                            Upload a file
                          </span>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 2MB
                        </p>
                      </div>
                    </div>
                  </label>
                  {errorKeys.includes("file") && (
                    <p className={` text-sm mt-1  text-red-500`}>
                      {errors.file}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    {!previewUrl && (
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">
                          Image preview will appear here
                        </p>
                      </div>
                    )}
                    <img
                      id="preview-image"
                      className={`preview-image  w-full h-auto rounded ${
                        previewUrl ? "block" : "hidden"
                      }`}
                      src={previewUrl}
                      alt="Cover image preview"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                <Button type="submit">Save Course</Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddCourse;

{
  /* <div className="border-t border-gray-200 px-6 py-5">
              <h2 className="text-lg font-medium text-gray-900">Settings</h2>
              <p className="mt-1 text-sm text-gray-500">
                Additional course configuration.
              </p>
            </div>
            <div className="px-6 py-5">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    for="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="published">Published</option>
                    <option value="draft" selected>
                      Draft
                    </option>
                  </select>
                </div>

                <div>
                  <div className="mt-1  rounded-md shadow-sm">
                    <Input
                      label={"Estimated Reading Time"}
                      type="text"
                      name="reading-time"
                      required
                      id="reading-time"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                      placeholder="e.g. 15 mins"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Estimated time to complete all reading materials.
                  </p>
                </div>
              </div>
            </div> */
}
