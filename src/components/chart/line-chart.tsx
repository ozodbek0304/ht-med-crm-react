"use client";

import { useThemeStore } from "../../store/index";
import { useTheme } from "next-themes";
import Chart from "react-apexcharts";
import { themes } from "../../config/thems";
import { getGridConfig, getLabel } from "../../lib/appex-chart-options";

const LineColumn = ({ height = 544.6, text }: { height?: number, text: string }) => {
  const { theme: config, } = useThemeStore();
  const { theme: mode } = useTheme();


  const theme = themes.find((theme) => theme.name === config);

  const series = [
    {
      name: "Sotuvlar",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    },
    {
      name: text,
      type: "line",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    },
  ];


  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 4],
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "01 Jan 2024",
      "02 Jan 2024",
      "03 Jan 2024",
      "04 Jan 2024",
      "05 Jan 2024",
      "06 Jan 2024",
      "07 Jan 2024",
      "08 Jan 2024",
      "09 Jan 2024",
      "10 Jan 2024",
      "11 Jan 2024",
      "12 Jan 2024",
    ],
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      }
    },

    xaxis: {
      type: "datetime",
      labels: getLabel(
        `hsl(${theme?.cssVars[
          mode === "dark" || mode === "system" ? "dark" : "light"
        ].chartLabel
        })`
      ),
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        title: {
          text: "Sotuvlar",
          style: {
            color: `hsl(${theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
              })`,
          },
        },
        labels: getLabel(
          `hsl(${theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
          })`
        )
      },
      {
        opposite: true,
        title: {
          text: "Summasi",
          style: {
            color: `hsl(${theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
              })`,
          },
        },
        labels: getLabel(
          `hsl(${theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
          })`
        )
      }
    ],
    legend: {
      labels: {
        colors: `hsl(${theme?.cssVars[
          mode === "dark" || mode === "system" ? "dark" : "light"
        ].chartLabel
          })`,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 10,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: -5
      }
    }
  };

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={height}
      width={"100%"}
    />
  );
};

export default LineColumn;
