import { Input } from "@mui/material";
import { Search, Filter, Upload } from "lucide-react";

export default function ResourcesHeader() {
  return (
    <div className="mb-8">
      <h1 className="mb-6 text-3xl font-bold text-foreground">Resources</h1>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-10 bg-white"
          />
        </div>

        {/* Filters and Actions */}
        {/* <div className="flex flex-wrap gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] bg-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="slides">Slides</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-courses">
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-courses">All Courses</SelectItem>
              <SelectItem value="web-dev">Web Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          <Link href="/resources/upload">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="w-4 h-4 mr-2" />
              Upload Resource
            </Button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
