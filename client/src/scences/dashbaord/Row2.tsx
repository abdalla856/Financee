import BoxHeader from "@/components/BoxHeader";
import { DashbaordBox } from "@/components/Dashboardbox";
import { FlexBetween } from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";

import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";


const Piedata = [{
  name: "G1", value: 500
}, {
  name: "G2", value: 500
}]


const Row2 = () => {
  const { palette } = useTheme()
  const { data: prodductData } = useGetProductsQuery();
  const { data: operationalData } = useGetKpisQuery()
  const opernational = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(({ operationalExpenses, nonOperationalExpenses }) => {
        return {
          "Operational": operationalExpenses,
          "None Operational": nonOperationalExpenses
        };
      })
    );
  }, [operationalData]);
  const ProductExpensesData = useMemo(() => {
    return (
      prodductData &&
      prodductData.map(({ _id,price, expense }) => {
        return {
          "id" : _id,
          "price": price,
          "expense": expense
        };
      })
    );
  }, [operationalData]);
  const PieColor = [palette.primary[800], palette.primary[300]]

  return (
    <>
      <DashbaordBox gridArea={"d"}>
        <BoxHeader
          title="Operational Vs Non Operational"
          // subtitle="top line represent Profite anbd the bottom is the Revenue"
          sidetext="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            // width={500}
            // height={400}
            data={opernational}
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
            {/* <Legend height={20} wrapperStyle={{
              margin: ' 0 0 10px 0 '
            }}
            /> */}
            <Line

              yAxisId={"left"}
              type={"monotone"}
              dataKey={"Operational"}
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId={"right"}
              type={"monotone"}
              dataKey={"None Operational"}
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>



      </DashbaordBox>
      <DashbaordBox gridArea={"e"}>

        <BoxHeader title="Campaigns and Tragets" sidetext="+4%" />
        <FlexBetween mt=".25rem" gap={"1.5rem"} pr={"1rem"}>
          <PieChart width={110} height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}>
            <Pie
              data={Piedata}
              stroke="none"
              innerRadius={18}
              outerRadius={38}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {Piedata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PieColor[index]} />
              ))}
            </Pie>

          </PieChart>
          <Box ml="-.7rem" flexBasis={"40%"} textAlign={"center"}>
            <Typography variant="h5">Target Sales</Typography>
            <Typography variant="h3" m=".3rem 0" color={palette.primary[300]}>83</Typography>
            <Typography variant="h6" >Finance Goal of the Compaign that is desired</Typography>

          </Box>
          <Box flexBasis={"40%"} >
            <Typography variant="h5">Loses in Revenues</Typography>
            <Typography variant="h6" >Loses are down 25%</Typography>
            <Typography variant="h5" mt=".4rem" >Profite Margines</Typography>
            <Typography variant="h6" >Margins are up to 20% from the last month</Typography>

          </Box>
        </FlexBetween>
      </DashbaordBox>
      <DashbaordBox gridArea={"f"}>
        <BoxHeader title="Product Price Vs Expenses" sidetext="+4%" />


        <ResponsiveContainer width="100%" height={"100%"}>
          <ScatterChart
            margin={{
              top: 15,
              right: 10,
              bottom: 20,
              left:-10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{fontSize :"10px"}} 
              tickFormatter={(v)=>`$${v}`}/>
            <YAxis type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{fontSize :"10px"}} 
              tickFormatter={(v)=>`$${v}`} />
              <ZAxis  type="number" range={[20]}/>
            <Tooltip formatter={(v)=>`$${v}`} />
            <Scatter name="Product Expenses Data" data={ProductExpensesData} fill={palette.tertiary[500]} />
          </ScatterChart>
        </ResponsiveContainer>

      </DashbaordBox>
    </>
  );
};

export default Row2;
