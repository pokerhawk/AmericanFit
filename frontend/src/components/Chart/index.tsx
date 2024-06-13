import { useEffect, useState } from 'react'
import ApexChart from 'react-apexcharts'

type TypeProps = "line" 
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";

type ChartProps = {
    title: string;
    type: TypeProps;
    labels: Array<string>;
    series: Array<any>;
    xAxisTitle?: string;
    yAxisTitle?: string;
}

type ChartState = {
    height: number;
    width: number;
    series: any[];
    options: Record<string, any>;
};

const Chart = ({
    title, type, labels, series, xAxisTitle, yAxisTitle
}: ChartProps) => {

    const [isLoading, setIsLoading] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const [chartToDisplay, setChartToDisplay] = useState<ChartState>();

    const setType = () =>{
        switch(type){
            case 'line':
                setChartToDisplay(basicLineChart);
                break;
            case 'pie':
                setChartToDisplay(simplePieChart);
                break;              
        }
        setIsLoading(false)
    }

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        setType();
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const basicLineChart = {
        height: 350,
        width: Number(width - (width - 600)),
        series: [{
            name: 'Envios',
            data: series
        }],
        options: {
            chart: {
                zoom: { enabled: true }
            },
            title: {
                text: title
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
                xaxis: {
                    lines: {
                        show: true,
                    }
                }
            },
            xaxis: {
                categories: labels,
                title: { text: xAxisTitle }
            },
            yaxis: {
                title: { text: yAxisTitle },
            },
            markers: {
                size: 7,
            },
        }
    }

    const simplePieChart = {
        height: 500,
        width: 500,
        series: series,
        options: {
            title:{text: title},
            chart: {
                width: 380,
                type: type,
            },
            labels: labels,
            // responsive: [{
            //     breakpoint: 480,
            //     options: {
            //         chart: {
            //         height: 350,
            //         width: 350
            //         },
            //         legend: {
            //             position: 'bottom'
            //         }
            //     }
            // }]
        }
    }

    return (!isLoading &&
        <ApexChart
            options={chartToDisplay?.options}
            series={chartToDisplay?.series}
            type={type}
            width={chartToDisplay?.width}
            height={chartToDisplay?.height}
        />
    )
}

export default Chart;