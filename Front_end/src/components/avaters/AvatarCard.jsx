import { Card } from "@mui/material";
import { Eye, Pencil, Trash2, Lock, CheckCircle } from "lucide-react";
import Button from "../common/Button/Button";

const AvatarCard = ({ avatar }) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-6">
        {/* Avatar Preview */}
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32 p-4 bg-gray-100 rounded-full">
            <img
              src={avatar.previewUrl || "/placeholder.svg"}
              alt={avatar.name}
              className="w-full h-full"
            />
            {/* Status Badge */}
            <div className="absolute -top-2 -right-2">
              {avatar.status === "active" ? (
                <div className="bg-green-500 text-white rounded-full p-1.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
              ) : (
                <div className="bg-orange-500 text-white rounded-full p-1.5">
                  <Lock className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Avatar Info */}
        <div className="mb-4 space-y-3">
          <div>
            <h3 className="font-semibold text-center text-foreground">
              {avatar.name}
            </h3>
            <p className="text-sm text-center capitalize text-muted-foreground">
              {avatar.style}
            </p>
          </div>

          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="mb-1 text-xs font-medium text-muted-foreground">
              Unlock Rule
            </p>
            <p className="text-sm text-foreground">{avatar.unlockRule}</p>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Seed:</span>
            <code className="px-2 py-1 bg-gray-100 rounded text-foreground">
              {avatar.seed}
            </code>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex items-center px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-blue-50 ">
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button className="flex items-center text-sm border border-gray-300 rounded-md hover:bg-blue-50 ">
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button className="flex items-center text-sm border border-gray-300 rounded-md hover:bg-blue-50 ">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AvatarCard;
