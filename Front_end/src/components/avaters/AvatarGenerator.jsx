import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Sparkles, Save } from "lucide-react";

import CustomizedMenus from "../common/DropDown";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import api from "../../services/api";
import { toast } from "react-toastify";

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

const isErrorExistsfUN = (data) => {
  if (!data || data.length < 3) {
    return true;
  }
  return false;
};

const isValidNumber = (number) => {
  if (!number || number < 0) return false;
  return true;
};

const AvaterUrl = (style, seed) =>
  `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`;

export default function AvatarGenerator() {
  const [style, setStyle] = useState("avataaars");
  const [seed, setSeed] = useState("");

  const [freeAvater, setfreeAvater] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");

  const [errors, setErrors] = useState({});

  const { mutate: createAvater } = useMutation({
    mutationKey: ["create-avater"],
    mutationFn: (data) => api.post("api/avatar", data.data),
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
    onSuccess: (_, data) => {
      toast.success("avater added sucessfuly");
      data.reset();
      setStyle("avataaars");
      setSeed("");
      setPreviewUrl("");
    },
  });

  const checkBox = <div className="w-2 h-2 bg-blue-500 rounded-full" />;

  const isErrorExists = Object.keys(errors).length > 0;

  const handleGenerate = () => {
    if (!seed) {
      return;
    }
    const url = AvaterUrl(style, seed);
    setPreviewUrl(url);
  };

  const handleFormSumbiting = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("avatar-name");
    const completedCourse = formData.get("completed-course") || 0;
    const certifiedCourse = formData.get("course-certified") || 0;

    const formErrors = {};

    if (isErrorExistsfUN(name))
      formErrors["avatar-name"] = "Please enter a avater name";
    if (isErrorExistsfUN(seed))
      formErrors["avatar-seed"] = "seed name needs to be more that 10";
    if (!freeAvater) {
      if (!isValidNumber(+completedCourse))
        formErrors["completed-course"] =
          "completed course needs to be more that 0";
      if (!isValidNumber(+certifiedCourse))
        formErrors["course-certified"] =
          "certified Course course needs to be more that 0";
    }

    if (Object.keys(formErrors).length > 0) return setErrors(formErrors);
    createAvater({
      data: {
        name,
        url: AvaterUrl(style, seed),
        minCertificates: certifiedCourse,
        minCompleted: completedCourse,
      },
      reset: () => e.target.reset(),
    });
  };

  return (
    <form
      onSubmit={handleFormSumbiting}
      className="p-6 mb-8 border border-gray-200 rounded-md shadow shadow-gray-200"
    >
      <h2 className="mb-6 text-xl font-semibold text-foreground">
        Generate New Avatar
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2 ">
            <label className="font-medium" htmlFor="avatar-name">
              Avatar Name
            </label>
            <Input
              id="avatar-name"
              name={"avatar-name"}
              className="mt-1 placeholder:text-gray-500 placeholder:text-sm"
              placeholder={"e.g., Golden Champion"}
              onChange={(e) => {
                const newErrors = { ...errors };
                if (newErrors["avatar-name"]) {
                  delete newErrors["avatar-name"];
                  setErrors(newErrors);
                }
              }}
            />
            {isErrorExists && errors["avatar-name"] && (
              <p className="px-2 font-medium text-red-800 bg-red-300 rounded-md">
                {errors["avatar-name"]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block mb-1 font-medium" htmlFor="avatar-style">
              Avatar Style
            </label>
            <CustomizedMenus
              data={avatarStyles}
              setSelected={(value) => setStyle(value)}
              text={"value"}
              selected={style}
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium" htmlFor="avatar-seed">
              Seed
            </label>
            <Input
              id="avatar-seed"
              name={"avatar-seed"}
              className="mt-1 placeholder:text-gray-500 placeholder:text-sm"
              placeholder="e.g., champion123"
              onChange={(e) => {
                const newErrors = { ...errors };
                if (newErrors["avatar-seed"]) {
                  delete newErrors["avatar-seed"];
                  return setErrors(newErrors);
                }
                setSeed(e.target.value.trim());
              }}
            />

            {isErrorExists && errors["avatar-seed"] && (
              <p className="px-2 font-medium text-red-800 bg-red-300 rounded-md">
                {errors["avatar-seed"]}
              </p>
            )}
            <p className="text-xs font-semibold text-gray-700">
              The seed determines the avatar appearance. Same seed = same
              avatar.
            </p>
          </div>

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
          </div>
          {!freeAvater && (
            <div>
              <div className="p-2 border rounded-md shadow border-blue-50 bg-blue-50 shadow-blue-200">
                <h3 className="py-2 text-lg font-medium">Unlock Requrements</h3>
                <Input
                  type="number"
                  label={"course-certified"}
                  name={"course-certified"}
                  className="w-full"
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
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleGenerate}
              type="button"
              disabled={seed.length === 0}
              className="flex items-center px-3 py-2 border border-gray-400 hover:bg-blue-50"
            >
              <Sparkles className="w-4 h-4 mr-3" />
              Generate Preview
            </Button>
            <Button
              type="sumbit"
              className="flex items-center border border-gray-400"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Avatar
            </Button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex flex-col items-center justify-center p-8 text-gray-600 border border-gray-100 rounded-lg bg-gray-50">
          {previewUrl ? (
            <div className="space-y-4 text-center">
              <div className="w-48 h-48 p-4 mx-auto bg-white rounded-full shadow-lg">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Avatar preview"
                  className="w-full h-full"
                />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {name || "Unnamed Avatar"}
                </p>
                <p className="text-sm text-muted-foreground">{style}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center w-48 h-48 mx-auto border-2 border-gray-400 border-dashed rounded-full bg-background border-border">
                <Sparkles className="w-12 h-12 text-gray-500" />
              </div>
              <p className="text-sm text-gray-600">
                Enter details and click Generate to preview
              </p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
