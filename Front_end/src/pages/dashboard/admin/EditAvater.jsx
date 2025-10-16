import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@mui/material";
import { useState } from "react";

import Button from "../../../components/common/Button/Button";
import Input from "../../../components/common/Input/Input";
import api from "../../../services/api";
import CustomizedMenus from "../../../components/common/DropDown";
import { useEffect } from "react";
import { scrollToStart } from "../../../utils/scroll";

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
  const [style, setStyle] = useState("avataaars");
  const [seed, setSeed] = useState("champion123");
  const [previewUrl, setPreviewUrl] = useState(undefined);

  const [freeAvater, setfreeAvater] = useState(undefined);

  const checkBox = <div className="w-2 h-2 bg-blue-500 rounded-full" />;

  const { id } = useParams();

  useEffect(() => {
    scrollToStart("smooth");
  }, [id]);

  const navigate = useNavigate(-1);

  const { data, error } = useQuery({
    queryKey: ["getAvater", { id }],
    queryFn: ({ queryKey }) => api.get(`api/avatar/${queryKey[1].id}`),
    select: (response) => {
      freeAvater === undefined && setfreeAvater(response.data?.data.isFree);
      !previewUrl && setPreviewUrl(response.data?.data.url);
      return response.data?.data;
    },
  });

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

  return (
    <>
      <form className="min-h-screen bg-background ">
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
              <Button className="flex items-center py-1 text-white bg-blue-700 hover:bg-blue-800">
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
                    defaultValue={data?.name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Golden Champion"
                  />
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
                  <div className="flex flex-col">
                    <div className="flex gap-2 ">
                      <Input
                        defaultValue={data?.seed}
                        onChange={(e) => setSeed(e.target.value)}
                        placeholder="e.g., champion123"
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
                            // onChange={(e) => {
                            //   const newErrors = { ...errors };
                            //   if (newErrors["course-certified"]) {
                            //     delete newErrors["course-certified"];
                            //     setErrors(newErrors);
                            //   }
                            // }}
                          />
                          {/* {isErrorExists && errors["course-certified"] && (
                            <p className="px-2 text-xs font-medium text-red-800 bg-red-300 rounded-md">
                              {errors["course-certified"]}
                            </p>
                          )} */}
                          <Input
                            type="number"
                            placeholder="eg.5"
                            name={"completed-course"}
                            label={"completed-course"}
                            defaultValue={data?.minCompleted}
                            // onChange={(e) => {
                            //   const newErrors = { ...errors };
                            //   if (newErrors["completed-course"]) {
                            //     delete newErrors["completed-course"];
                            //     setErrors(newErrors);
                            //   }
                            // }}
                            className="-mt-2"
                          />
                          {/* {isErrorExists && errors["completed-course"] && (
                            <p className="px-2 text-xs font-medium text-red-800 bg-red-300 rounded-md">
                              {errors["completed-course"]}
                            </p>
                          )} */}
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
                  <p className="font-medium text-foreground">
                    {name || "Unnamed Avatar"}
                  </p>
                  <p className="text-sm capitalize text-muted-foreground">
                    {style}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Status: {status}
                  </p>
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
