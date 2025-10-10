import { Search, MoreHorizontal, MoreHorizontalIcon } from "lucide-react";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export function CoursesHeader() {
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  return (
    <div className="mb-8">
      <h1 className="mb-6 text-4xl font-bold text-foreground">Courses</h1>
      <FormControl sx={{ m: 1 }} className="w-full overflow-hidden">
        <div className="flex flex-col gap-4 md:flex-row md:items-center ">
          <div className="relative flex-1">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-4 text-muted-foreground" />
            <Input className="w-full pl-10 border focus:border-blue-600" />
          </div>
          <div className="flex gap-3">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="standard"
              value={category}
              className="px-2 py-1 bg-white border border-gray-200 rounded-md"
              label="catagory"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="web-dev">Web Development</MenuItem>
              <MenuItem value="design">Design</MenuItem>
              <MenuItem value="marketing">Marketing</MenuItem>
            </Select>
            <Select
              variant="standard"
              value={status}
              className="px-2 py-1 bg-white border border-gray-200 rounded-md"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
            </Select>
            <Button variant="outline" size="icon" className="bg-card">
              <MoreHorizontalIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </FormControl>
    </div>
  );
}
