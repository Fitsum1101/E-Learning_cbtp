import React from "react";
import { AnalyticsStats } from "../../../components/analaytices/analytics-stats";
import { AnalyticsHeader } from "../../../components/analaytices/analytics-header";
import { BarChart, LineChart } from "@mui/x-charts";
import { useTheme } from "@emotion/react";
import RecentActivity from "../../../components/analaytices/RecentActivity";
import EngagementInsights from "../../../components/analaytices/engagement-insights";
import { Card } from "@mui/material";
// import { BarChart } from "lucide-react";
const courses = ["React", "Python", "Data Science", "UI/UX", "Java"];
const enrollments = [320, 280, 260, 190, 150];
const data = [
  { month: "Jan", registrations: 120 },
  { month: "Feb", registrations: 180 },
  { month: "Mar", registrations: 250 },
  { month: "Apr", registrations: 220 },
  { month: "May", registrations: 290 },
  { month: "Jun", registrations: 340 },
];

const Analaytices = () => {
  const theme = useTheme();

  return (
    <div>
      <AnalyticsHeader />
      <AnalyticsStats />
      <Card className="grid grid-cols-1 gap-6 bg-white md:grid-cols-2">
        <div>
          <LineChart
            dataset={data}
            width={500}
            height={400}
            xAxis={[{ dataKey: "month", scaleType: "band", label: "Month" }]}
            yAxis={[{ label: "Registrations" }]}
            series={[
              {
                dataKey: "registrations",
                label: "Registrations",
                // color: theme.palette.primary.main,
                showMark: true, // ✅ show data points
                area: false,
              },
            ]}
            grid={{ horizontal: true }}
            // sx={{
            //   "& .MuiChartsAxis-tickLabel": {
            //     // fill: theme.palette.text.primary,
            //   },
            //   "& .MuiChartsAxis-line": { stroke: theme.palette.divider },
            // }}
          />
        </div>
        <div>
          <BarChart
            xAxis={[
              {
                id: "courses",
                data: courses,
                scaleType: "band",
                label: "Courses",
              },
            ]}
            series={[
              {
                data: enrollments,
                label: "Enrollments",
                // color: theme.palette.primary.main,
              },
            ]}
            yAxis={[{ label: "Students Enrolled" }]}
            width={500}
            height={400}
            grid={{ horizontal: true }}
            barCategoryGap="25%"
            // sx={{
            //   "& .MuiChartsAxis-tickLabel": {
            //     fill: theme.palette.text.primary,
            //   },
            //   "& .MuiChartsAxis-line": { stroke: theme.palette.divider },
            // }}
          />
        </div>
      </Card>
      <Card className="grid grid-cols-1 gap-6 mt-8 bg-white md:grid-cols-2">
        <div>
          <BarChart
            xAxis={[
              {
                id: "courses",
                data: courses,
                scaleType: "band",
                label: "Courses",
              },
            ]}
            series={[
              {
                data: enrollments,
                label: "Enrollments",
                // color: theme.palette.primary.main,
              },
            ]}
            yAxis={[{ label: "Students Enrolled" }]}
            width={500}
            height={400}
            grid={{ horizontal: true }}
            barCategoryGap="25%"
            // sx={{
            //   "& .MuiChartsAxis-tickLabel": {
            //     fill: theme.palette.text.primary,
            //   },
            //   "& .MuiChartsAxis-line": { stroke: theme.palette.divider },
            // }}
          />
        </div>
        <div>
          <LineChart
            dataset={data}
            width={500}
            height={400}
            xAxis={[{ dataKey: "month", scaleType: "band", label: "Month" }]}
            yAxis={[{ label: "Registrations" }]}
            series={[
              {
                dataKey: "registrations",
                label: "Registrations",
                // color: theme.palette.primary.main,
                showMark: true, // ✅ show data points
                area: false,
              },
            ]}
            grid={{ horizontal: true }}
            // sx={{
            //   "& .MuiChartsAxis-tickLabel": {
            //     // fill: theme.palette.text.primary,
            //   },
            //   "& .MuiChartsAxis-line": { stroke: theme.palette.divider },
            // }}
          />
        </div>
      </Card>
      <div className="grid gap-6 mt-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <EngagementInsights />
        </div>
      </div>
    </div>
  );
};

export default Analaytices;
