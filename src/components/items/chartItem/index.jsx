import ReactECharts from 'echarts-for-react';


const options = {
    "bar": {
        title: {
            subtext: "Bar chart statistic",
            subtextStyle: {
                color: "rgb(0,0,0)",
                fontSize: "14px",
            },
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'bar',
                smooth: true
            }
        ]
    },
    "line": {
        title: {
            subtext: "Line chart statistic",
            subtextStyle: {
                color: "rgb(0,0,0)",
                fontSize: "14px",
            },
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }
        ]
    },
    "pie": {
        title: {
            subtext: "Pie chart statistic",
            subtextStyle: {
                color: "rgb(0,0,0)",
                fontSize: "14px",
            },
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '70%'],
                // adjust the start and end angle
                startAngle: 180,
                endAngle: 360,
                data: [
                    {value: 1048, name: 'Search Engine'},
                    {value: 735, name: 'Direct'},
                    {value: 580, name: 'Email'},
                    {value: 484, name: 'Union Ads'},
                    {value: 300, name: 'Video Ads'}
                ]
            }
        ]
    }
}

export const ChartItem = ({config}) => {
    return <ReactECharts style={{width: "100%", height: "100%"}}
                         option={options?.[config?.chart?.type] ?? options?.bar}/>
}