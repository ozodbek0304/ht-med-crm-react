"use client";

import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { addPeriodToThousands } from "../formatters/price-formatter";
import Chart from "react-apexcharts";


interface Item {
    action: string,
    coins: number,
}
interface Props {
    data: Item[],
    height?: number,
    show?: boolean,
    sizeTotal?: string,
}

const TopBrowserChart = (
    {
        height = 345,
        data,
        show = true,
        sizeTotal = "14px",

    }: Props) => {
    const { theme: config, } = useThemeStore();
    const { theme: mode } = useTheme();
    const theme = themes.find((theme) => theme.name === config);
    const series = data?.map((item: Item) => (item?.coins));
    const totalSum = series?.reduce((acc, val) => acc + val, 0);
    const labels = data?.map((item: Item) => item?.action) || [];



    const options: any = {
        chart: {
            toolbar: {
                show: false,
            },
        },
        labels,
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 1,
        },
        colors: [
            `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`,
            "#3B82F6", "#EF4444", "#F97400", "#FACC15", "#F97316"
        ],
        tooltip: {
            theme: mode === "dark" ? "dark" : "light",
        },
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        legend: {
            show: false,
        },

    };

    return (
        <div className="relative">
            <Chart
                options={options}
                series={series}
                type="donut"
                height={height}
                width={"100%"}
            />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: sizeTotal,
                fontWeight: 'bold',
                color: 'black',
            }}>
                {addPeriodToThousands(totalSum)}
            </div>
        </div>
    );
};

export default TopBrowserChart;
