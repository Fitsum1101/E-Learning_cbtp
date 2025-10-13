import { Calendar, Download } from "lucide-react";
import { Select } from "@mui/material";
import Button from "../common/Button/Button";

export function AnalyticsHeader() {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-600">
            Track your platform performance and user engagement
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* <Select defaultValue="7days">
            <SelectTrigger className="w-[180px] bg-white">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select> */}
          <Button className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
}
