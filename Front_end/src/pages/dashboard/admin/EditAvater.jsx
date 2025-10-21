import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";
import api from "../../../services/api";
import CustomizedMenus from "../../../components/common/DropDown";
import { useEffect } from "react";
import { scrollToStart } from "../../../utils/scroll";
import {
  AvaterUrl,
  isErrorExistsfUN,
  isValidNumber,
} from "../../../utils/editAvater";

const avatarStyles = [
  { value: "adventurer", label: "Adventurer" },
  { value: "avataaars", label: "Avataaars" },
  { value: "bottts", label: "Bottts" },
  { value: "fun-emoji", label: "Fun Emoji" },
  { value: "lorelei", label: "Lorelei" },
  { value: "micah", label: "Micah" },
  { value: "miniavs", label: "Miniavs" },
  { value: "open-peeps", label: "Open Peeps" },
  { value: "personas", label: "Personas" },
  { value: "pixel-art", label: "Pixel Art" },
];

const EditAvaterPage = () => {
  const [style, setStyle] = useState();
  const [seed, setSeed] = useState(undefined);
  const [name, setname] = useState(undefined);

  const [previewUrl, setPreviewUrl] = useState(undefined);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(-1);

  console.log(style);

  const [freeAvater, setfreeAvater] = useState(undefined);

  const checkBox = <div className="w-2 h-2 bg-blue-500 rounded-full" />;

  const isErrorExists = Object.keys(errors).length > 0;

  const { id } = useParams();

  const { mutate: updateavater, error } = useMutation({
    mutationKey: ["update-avater"],
    mutationFn: (data) => api.put(`api/avatar/${id}`, data),
    onError: (error) => {
      const backErrors = { ...error.response?.data.errors };
      const newErros = {};
      if (backErrors?.name) newErros["avatar-name"] = backErrors.name;
      if (backErrors?.url)
        newErros["avatar-seed"] = newErros["avatar-seed"] = backErrors.url;
      if (backErrors?.seed)
        newErros["avatar-seed"] = newErros["avatar-name"] = backErrors.seed;
      if (backErrors?.minCertificates)
        newErros["course-certified"] = newErros["course-certified"] =
          backErrors.minCertificates;
      if (backErrors?.minCompleted)
        newErros["completed-course"] = backErrors.minCompleted;
      setErrors(newErros);
    },
    onSuccess: () => {
      navigate(-1);
      toast.success("updated sucessfuly");
    },
  });

  if (error) console.log({ error });

  useEffect(() => {
    scrollToStart("smooth");
  }, [id]);

  const { data } = useQuery({
    queryKey: ["getAvater", { id }],
    queryFn: ({ queryKey }) => api.get(`api/avatar/${queryKey[1].id}`),
    select: (response) => {
      freeAvater === undefined && setfreeAvater(response.data?.data.isFree);
      !previewUrl && setPreviewUrl(response.data?.data.url);

      style === undefined && setStyle(response.data?.data.style);
      seed === undefined && setSeed(response.data?.data.seed);
      !name && setname(response.data?.data.name);
      return response.data?.data;
    },
  });

  console.log(data);

  const handleGeneratePreview = () => {
    if (!seed) {
      alert("Please enter a seed value");
      return;
    }
    const url = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(
      seed
    )}`;
    setPreviewUrl(url);
  };

  const handleFormSumbiting = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("avatar-name");
    let completedCourse = +formData.get("completed-course") || 0;
    let certifiedCourse = +formData.get("course-certified") || 0;

    const formErrors = {};

    if (isErrorExistsfUN(name))
      formErrors["avatar-name"] = "Please enter a avater name";
    if (isErrorExistsfUN(seed))
      formErrors["avatar-seed"] = "seed name needs to be more that 10";
    if (!freeAvater) {
      if (!isValidNumber(completedCourse) && !isValidNumber(certifiedCourse))
        formErrors["completed-course"] =
          "completed course needs to be more that 0";
      if (!isValidNumber(completedCourse) && !isValidNumber(certifiedCourse))
        formErrors["course-certified"] =
          "certified Course course needs to be more that 0";
    } else {
      completedCourse = 0;
      certifiedCourse = 0;
    }

    console.log({ formErrors });

    if (Object.keys(formErrors).length > 0) return setErrors(formErrors);
    updateavater({
      name,
      url: AvaterUrl(style, seed),
      minCertificates: certifiedCourse,
      minCompleted: completedCourse,
    });
  };

  return (
    <>
      <form
        onSubmit={handleFormSumbiting}
        className="min-h-screen bg-background "
      >
        <div className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              onClick={() => navigate(-1)}
              className="flex items-center py-1 mb-4 cursor-pointer hover:bg-blue-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Avatar
            </Button>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Edit Avatar
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Update avatar details and settings
                </p>
              </div>
              <Button
                type="sumbit"
                className="flex items-center py-1 text-white bg-blue-700 hover:bg-blue-800"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="p-6 lg:col-span-2">
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block font-medium" htmlFor="edit-name">
                    Avatar Name *
                  </label>
                  <Input
                    id="edit-name"
                    name="avatar-name"
                    defaultValue={data?.name}
                    onChange={(e) => {
                      const newErrors = { ...errors };
                      if (
                        newErrors["avatar-name"] ||
                        e.target.value.trim().length > 3
                      ) {
                        delete newErrors["avatar-name"];
                        setErrors(newErrors);
                      }
                      setname(e.target.value.trim());
                    }}
                    placeholder="e.g., Golden Champion"
                  />

                  {isErrorExists && errors["avatar-name"] && (
                    <p className="px-2 font-medium text-red-800 bg-red-300 rounded-md">
                      {errors["avatar-name"]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    className="block mb-1 font-medium"
                    htmlFor="avatar-style"
                  >
                    Avatar Style
                  </label>
                  <CustomizedMenus
                    data={avatarStyles}
                    setSelected={(value) => setStyle(value)}
                    text={"value"}
                    selected={style}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-medium" htmlFor="edit-seed">
                    Seed *
                  </label>
                  <div className="flex  flex-col">
                    <div>
                      <div className="flex gap-2 ">
                        <Input
                          defaultValue={data?.seed}
                          name="avatar-seed"
                          onChange={(e) => {
                            const newErrors = { ...errors };
                            if (
                              newErrors["avatar-seed"] &&
                              e.target.value.trim().length > 3
                            ) {
                              delete newErrors["avatar-seed"];
                              setErrors(newErrors);
                            }
                            setSeed(e.target.value.trim());
                          }}
                          placeholder="e.g.,champion123"
                          className="flex-1"
                        />
                        <Button
                          onClick={handleGeneratePreview}
                          className="flex items-center px-2 py-1 bg-transparent border border-gray-300 self-baseline hover:bg-blue-100"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                      {isErrorExists && errors["avatar-seed"] && (
                        <p className="px-2 mb-2  font-medium text-red-800 bg-red-300 rounded-md">
                          {errors["avatar-seed"]}
                        </p>
                      )}
                    </div>

                    <p className="-mt-1 text-xs text-gray-900">
                      The seed determines the avatar appearance. Same seed =
                      same avatar.
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-medium" htmlFor="edit-unlock">
                    Unlock Rule *
                  </label>
                  <div className="space-y-2 text-sm text-black">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => {
                          setfreeAvater(!freeAvater);
                        }}
                        className="flex items-center justify-center w-4 h-4 border border-gray-300 rounded-full"
                      >
                        {freeAvater && checkBox}
                      </div>
                      <p>Free for all users</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => {
                          setfreeAvater(!freeAvater);
                          const filteredErrors = { ...errors };
                          delete filteredErrors["certified-course"];
                          delete filteredErrors["completed-course"];
                          setErrors(filteredErrors);
                        }}
                        className="flex items-center justify-center w-4 h-4 border border-gray-300 rounded-full"
                      >
                        {!freeAvater && checkBox}
                      </div>
                      <p>has unlock Requrements</p>
                    </div>
                    {!freeAvater && (
                      <div>
                        <div className="p-2 border rounded-md shadow border-blue-50 bg-blue-50 shadow-blue-200">
                          <h3 className="py-2 text-lg font-medium">
                            Unlock Requrements
                          </h3>
                          <Input
                            type="number"
                            label={"course-certified"}
                            name={"course-certified"}
                            className="w-full"
                            defaultValue={data?.minCertificates}
                            placeholder="eg.10"
                            onChange={(e) => {
                              const newErrors = { ...errors };
                              if (newErrors["course-certified"]) {
                                delete newErrors["course-certified"];
                                setErrors(newErrors);
                              }
                            }}
                          />
                          {isErrorExists && errors["course-certified"] && (
                            <p className="px-2 text-xs font-medium text-red-800 bg-red-300 rounded-md">
                              {errors["course-certified"]}
                            </p>
                          )}
                          <Input
                            type="number"
                            placeholder="eg.5"
                            name={"completed-course"}
                            label={"completed-course"}
                            defaultValue={data?.minCompleted}
                            onChange={(e) => {
                              const newErrors = { ...errors };
                              if (newErrors["completed-course"]) {
                                delete newErrors["completed-course"];
                                setErrors(newErrors);
                              }
                            }}
                            className="-mt-2"
                          />
                          {isErrorExists && errors["completed-course"] && (
                            <p className="px-2 text-xs font-medium text-red-800 bg-red-300 rounded-md">
                              {errors["completed-course"]}
                            </p>
                          )}
                        </div>
                        <p className="p-2 text-xs font-semibold text-gray-700">
                          Condition students must meet to unlock this avatar.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 self-baseline lg:col-span-1">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Live Preview
              </h3>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-48 h-48 p-6 rounded-full bg-muted">
                  <img
                    src={previewUrl}
                    alt="Avatar preview"
                    className="w-full h-full"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <p className="font-medium text-foreground">{name}</p>
                  <p className="text-sm capitalize text-muted-foreground">
                    {style}
                  </p>
                  {/* <p className="text-xs text-muted-foreground">
                    Status: {status}
                  </p> */}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditAvaterPage;
