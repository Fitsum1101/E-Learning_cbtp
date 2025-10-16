import { Card } from "@mui/material";
import { Eye, Pencil, Trash2, Lock, CheckCircle } from "lucide-react";
import Button from "../common/Button/Button";
import { Link } from "react-router-dom";

const AvatarCard = ({ avatar }) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32 p-4 bg-gray-100 rounded-full">
            <img src={avatar.url} alt={avatar.name} className="w-full h-full" />
            {/* Status Badge */}
            <div className="absolute -top-2 -right-2">
              {avatar.isFree ? (
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

          <div
            className={`p-3 ${
              avatar.isFree ? "bg-green-200" : "bg-orange-200"
            } rounded-lg`}
          >
            <p className="mb-1 text-xs font-medium ">
              {avatar.isFree ? "Free to use" : "unlock rule"}
            </p>
            {!avatar.isFree && (
              <div>
                {avatar.minCompleted && (
                  <p className="flex items-center text-xs font-medium ">
                    Certifcate needed to :
                    <span className="flex items-center justify-center w-5 h-5 ml-2 font-medium text-center bg-orange-500 rounded-full">
                      {avatar.minCompleted}
                    </span>
                  </p>
                )}
                {avatar.minCompleted && (
                  <p className="flex items-center text-xs font-medium ">
                    Total course thet need to be meet:
                    <span className="flex items-center justify-center w-5 h-5 ml-2 font-medium text-center bg-orange-500 rounded-full">
                      {avatar.minCompleted}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Seed:</span>
            <code className="px-2 py-1 bg-gray-100 rounded text-foreground">
              {avatar.seed}
            </code>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to={`view/${avatar.id}`}>
            <Button className="flex items-center px-2 py-1 text-sm border border-gray-300 rounded-md hover:bg-blue-50 ">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
          <Link to={`edit/${avatar.id}`}>
            <Button className="flex items-center text-sm border border-gray-300 rounded-md hover:bg-blue-50 ">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button className="flex items-center text-sm border border-gray-300 rounded-md hover:bg-blue-50 ">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AvatarCard;
