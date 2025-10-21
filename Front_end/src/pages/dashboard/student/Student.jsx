import { StudentsList } from "../../../components/students/StudentList";
import { StudentsStats } from "../../../components/students/StudentsStats";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

import { Download, Search } from "lucide-react";
import { Button, Input } from "@mui/material";

export default function StudentsPage() {
  const { data } = useQuery({
    queryKey: ["studentDatas"],
    queryFn: () => {
      return api.get("/api/student");
    },
    select: (response) => response.data,
  });

  console.log({ data });

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="mb-6 text-3xl font-bold text-foreground">
              Students
            </h1>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Filter className="w-4 h-4" />
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Students</DropdownMenuItem>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Inactive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Filter className="w-4 h-4" />
                      Courses
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All Courses</DropdownMenuItem>
                    <DropdownMenuItem>Web Development</DropdownMenuItem>
                    <DropdownMenuItem>Design</DropdownMenuItem>
                    <DropdownMenuItem>Marketing</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </div>
        <StudentsStats />
        <StudentsList />
      </div>
    </>
  );
}
