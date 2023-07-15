import React, { useEffect, useState } from 'react';
import ChartApi from '../../../callApi/zingChartApi';
import { ListItem, LoadingData } from '../../../components';
import './Zingcahrt.scss';
export default function Zingchart() {
    const [chart, setChart] = useState(null);
    useEffect(() => {
        const fetchZingChart = async () => {
            const response = await ChartApi.getChart();
            if (response?.err === 0) {
                console.log('chart', response.data);
                setChart(response.data.RTChart.items);
            }
        };
        fetchZingChart();
    }, []);
    return (
        <div className="zing-chart">
            {chart ? (
                <div>
                    <div className="heading">#zingchart</div>
                    <div className="chart-list">
                        {chart?.map((item, index) => (
                            <div className="chart-list--item">
                                <ListItem songData={item} isChart className="flex-1" num={index + 1} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="loding-data">
                    <LoadingData />
                </div>
            )}
        </div>
    );
}
