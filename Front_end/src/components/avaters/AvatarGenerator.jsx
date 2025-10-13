import { Card } from "@mui/material";
import { Sparkles, Save } from "lucide-react";
import Input from "../common/Input/Input";
import { useState } from "react";
import Button from "../common/Button/Button";
import CustomizedMenus from "../common/DropDown";

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

export default function AvatarGenerator() {
  const [style, setStyle] = useState("avataaars");
  const [seed, setSeed] = useState("");
  const [name, setName] = useState("");
  const [unlockRule, setUnlockRule] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleGenerate = () => {
    if (!seed) {
      alert("Please enter a seed value");
      return;
    }
    const url = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(
      seed
    )}`;
    setPreviewUrl(url);
  };

  const handleSave = () => {
    if (!name || !seed || !unlockRule) {
      alert("Please fill in all fields");
      return;
    }

    alert("Avatar saved successfully!");

    setName("");
    setSeed("");
    setUnlockRule("");
    setPreviewUrl("");
  };

  return (
    <Card className="p-6 mb-8">
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
              className="mt-1 placeholder:text-gray-500 placeholder:text-sm"
              placeholder="e.g., Golden Champion"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              className="mt-1 placeholder:text-gray-500 placeholder:text-sm"
              placeholder="e.g., champion123"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
            <p className="text-xs font-semibold text-gray-700">
              The seed determines the avatar appearance. Same seed = same
              avatar.
            </p>
          </div>

          <div className="space-y-2">
            <label className="font-medium" htmlFor="unlock-rule">
              Unlock Rule
            </label>
            <Input
              id="unlock-rule"
              className="mt-1 placeholder:text-gray-500 placeholder:text-sm"
              placeholder="e.g., Complete 10 courses"
              value={unlockRule}
              onChange={(e) => setUnlockRule(e.target.value)}
            />
            <p className="text-xs font-semibold text-gray-700">
              Condition students must meet to unlock this avatar.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleGenerate}
              variant="outline"
              className="flex items-center px-3 py-2 border border-gray-400 hover:bg-blue-50"
            >
              <Sparkles className="w-4 h-4 mr-3" />
              Generate Preview
            </Button>
            <Button
              onClick={handleSave}
              className="flex items-center border border-gray-400"
              disabled={!previewUrl}
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
    </Card>
  );
}
