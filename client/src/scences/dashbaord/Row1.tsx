import { DashbaordBox } from "@/components/Dashboardbox";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  YAxis,
  XAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Legend,
  LineChart,
  BarChart,
  Bar,
} from "recharts";
import { useGetKpisQuery } from "@/state/api";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
import BoxHeader from "@/components/BoxHeader";

const Row1 = () => {
  const { palette } = useTheme();

  const { data } = useGetKpisQuery();


  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,

        };
      })
    );
  }, [data]);

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);



  const revenueProfite = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);
  return (
    <>
      <DashbaordBox gridArea={"a"}>
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line represent Revenue anbd the bottom is the Expenses"
          sidetext="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashbaordBox>
      <DashbaordBox gridArea={"b"}>
        <BoxHeader
          title="Profite and Revenue"
          subtitle="top line represent Profite anbd the bottom is the Revenue"
          sidetext="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            // width={500}
            // height={400}
            data={revenueProfite}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >

            <CartesianGrid vertical={false} stroke={palette.grey[800]} />


            <XAxis

              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId={"left"}
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            // domain={[8000, 23000]}
            />
            <Tooltip />
            <YAxis
              yAxisId={"right"}
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            // domain={[8000, 23000]}
            />
            <Tooltip />
            <Legend height={20} wrapperStyle={{
              margin: ' 0 0 10px 0 '
            }}
            />
            <Line

              yAxisId={"left"}
              type={"monotone"}
              dataKey={"profit"}
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId={"right"}
              type={"monotone"}
              dataKey={"revenue"}
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>



      </DashbaordBox>
      <DashbaordBox gridArea={"c"}>
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="Revenue Month by Month"
          sidetext="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />

          </BarChart>
        </ResponsiveContainer>
      </DashbaordBox>
    </>
  );
};


export default Row1;