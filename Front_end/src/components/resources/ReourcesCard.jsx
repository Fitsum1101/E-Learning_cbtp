import { Card, CardContent } from "@mui/material";
import {
  Download,
  Eye,
  Edit,
  Trash2,
  LinkIcon,
  Badge,
  FileVideo,
  FileArchive,
  DockIcon,
  BookOpenIcon,
} from "lucide-react";
import Button from "../common/Button/Button";
export default function ResourceCard({ resource }) {
  let icon;
  if (resource.type === "video")
    icon = <FileVideo className="w-8 text-red-600 h-8" />;
  else icon = <FileArchive className="w-8 text-blue-600 h-8" />;
  return (
    <Card className="transition-shadow  bg-white hover:shadow-md">
      <CardContent className="p-6">
        <div
          className={`flex h-16 w-16 items-center bg-red-100 justify-center rounded-lg  mb-4`}
        >
          {icon}
        </div>

        <div className="mb-4 text-gray-800">
          <h3 className="mb-2 font-semibold text-black line-clamp-2">
            {resource.name}
          </h3>
          <div className="flex flex-col gap-1 mb-2 text-sm text-muted-foreground">
            <span> {resource.course}</span>
            <p className="text-blue-700 gap-1 flex text-xs">
              <BookOpenIcon className="w-4 h-4" />
              Module 4: React Introduction
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{resource.size}</span>
            {resource.duration && <span>{resource.duration}</span>}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 mb-4">
          <div
            variant="secondary"
            className="text-xs font-semibold bg-blue-50 p-1 rounded-md"
          >
            {resource.type.toUpperCase()}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Download className="w-3 h-3" />
            <span>{resource.downloads}</span>
          </div>
        </div>

        {/* Upload Date */}
        <p className="mb-4 text-sm text-gray-800 ">
          Uploaded {new Date(resource.uploadDate).toLocaleDateString()}
        </p>

        <div className="flex  items-center gap-2 pt-4 border-t border-gray-200">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <LinkIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-red-500 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
