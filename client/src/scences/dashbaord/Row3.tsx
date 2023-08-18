import BoxHeader from "@/components/BoxHeader"
import { DashbaordBox } from "@/components/Dashboardbox"
import { FlexBetween } from "@/components/FlexBetween"
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api"

import { Box, Typography, useTheme } from "@mui/material"


import { DataGrid, GridCellParams } from "@mui/x-data-grid"
import { useMemo } from "react"
import { Cell, Pie, PieChart } from "recharts"


const Row3 = () => {
  const { palette } = useTheme()
  const { data: transactionData } = useGetTransactionsQuery()
  console.log("🚀 ~ file: Row3.tsx:14 ~ Row3 ~ transactionData:", transactionData)
  const { data: ProductData } = useGetProductsQuery()
  const PieColor = [palette.primary[800], palette.primary[500]]
  const { data: kpiData } = useGetKpisQuery()
  const pieChartdata = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => {
        return [{
          name: key,
          value: value
        }, {
          name: `${key} of total`,
          value: totalExpenses - value
        }]
      })
    }
  }, [kpiData])



  const productColumns = [{
    field: "_id",
    headerName: "Id",
    flex: 1
  },
  {
    field: "expense",
    headerName: "Expense",
    felx: .5,
    renderCell: (params: GridCellParams) => `$${params.value}`
  },
  {
    field: "price",
    headerName: "Price",
    felx: .5,
    renderCell: (params: GridCellParams) => `$${params.value}`
  },
  ]
  const transactionstColumns = [{
    field: "_id",
    headerName: "Id",
    flex: 1
  },
  {
    field: "buyer",
    headerName: "Buyer",
    felx: .35,

  },
  {
    field: "amount",
    headerName: "Amount",
    felx: .35,
    renderCell: (params: GridCellParams) => `$${params.value}`
  },
  {
    field: "productIds",
    headerName: "Count",
    felx: .1,
    renderCell: (params: GridCellParams) => (params.value as Array<string>)?.length,
  },
  ]




  return (
    <>
      < DashbaordBox gridArea={"g"}>
        <BoxHeader
          title="List of Products"
          sidetext={`${ProductData?.length} products`}

        />
        <Box
          mt=".5rem"
          p="0 .5rem"
          height={"75%"}
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none"
            },
            "& .MuiDataGrid-cell": {

              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnHeaders": {

              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnSeparator": {

              visibility: "hidden"
            },

          }}
        >

          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={ProductData || []}
            columns={productColumns}
          />
        </Box>


      </DashbaordBox>
      <DashbaordBox gridArea={"h"}>
        <BoxHeader
          title="Recent Orders"
          sidetext={`${transactionData?.length} latest transactions`}

        />
        <Box
          mt="1rem"
          p="0 .5rem"
          height={"80%"}
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none"
            },
            "& .MuiDataGrid-cell": {

              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnHeaders": {

              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            "& .MuiDataGrid-columnSeparator": {

              visibility: "hidden"
            },

          }}
        >

          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionstColumns}
          />
        </Box>


      </DashbaordBox>
      <DashbaordBox gridArea={"i"}>
        <BoxHeader title="Expense Breakdown By Category"
          sidetext="+4%" />
        <FlexBetween mt={".5rem"} gap={".5rem"} padding={"0 1rem"} textAlign={"center"}>
          {pieChartdata?.map((data, i) => (

            <Box key={`${data[0].name} -${i}`}>
              <PieChart width={95} height={85}
                margin={{
                  top: 0,
                  right: -10,
                  left: 10,
                  bottom: 10,
                }}>
                <Pie
                  data={data}
                  stroke="none"
                  innerRadius={18}
                  outerRadius={38}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PieColor[index]} />
                  ))}
                </Pie>

              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}

        </FlexBetween>
      </DashbaordBox>
      <DashbaordBox gridArea={"j"}>
        <BoxHeader title="Overall Summary and Explination Data" sidetext="+15%" />
        <Box
          height={"15px"}
          margin={"1.25rem 1rem .25rem 1rem"}
          bgcolor={palette.primary[800]}
          borderRadius={"1rem"}
        >
          <Box

            height={"15px"}
            bgcolor={palette.primary[600]}
            width={"40%"}
            borderRadius={"1rem"}>

          </Box>
        </Box>
        <Typography variant="h6" margin={"0 1rem"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, obcaecati nihil tempora sint voluptate, sequi at reprehenderit mollitia ea odio vitae laudantium. Ducimus quidem ipsam quam dolorem aperiam, sequi numquam?
        </Typography>



      </DashbaordBox></>
  )
}

export default Row3