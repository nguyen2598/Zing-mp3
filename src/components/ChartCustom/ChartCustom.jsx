import React, { memo, useEffect, useRef, useState } from 'react';
import './ChartCustom.scss';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import SongItem from '../SongItem/SongItem';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import path from '../../ultis/path';
export default memo(function ChartCustom() {
    const [data, setData] = useState(null);
    const [selected, setSelected] = useState(null);
    const a = useSelector((state) => state?.home?.homeData?.find((item) => item?.sectionId === 'hZC'));
    const { chart, items } = a || { chart: null, items: null };
    const chartRef = useRef();
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const options = {
        responsive: true,
        pointRadius: 0,
        // aspectRatio: 4,
        maintaiAspectRadio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.1)', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' },
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return;
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState((prev) => ({ ...prev, opacity: 0 }));
                        return;
                    }
                    // const position=chart
                    const counters = [];
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]
                                ?.filter((item) => +item.hour % 2 === 0)
                                ?.map((item) => item.counter),
                            encodeId: Object.keys(chart?.items)[i],
                        });
                    }

                    const result = counters?.find((item) =>
                        item?.data?.some((num) => num === +tooltip?.body[0]?.lines[0]?.replace('.', '')),
                    );
                    setSelected(result?.encodeId);
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    };
                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData);
                },
            },
        },
        hover: {
            mode: 'dataset',
            intersect: false,
        },
    };
    // const a = useSelector((state) => state?.home?.homeData?.find((item) => item?.sectionId === 'hZC'));
    useEffect(() => {
        const labels = chart?.times?.filter((item) => +item.hour % 2 === 0)?.map((item) => `${item.hour}:00`);
        const datasets = [];
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                const Color = i === 0 ? 'blue' : i === 1 ? '#33FF99' : 'red';
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]
                        ?.filter((item) => +item.hour % 2 === 0)
                        ?.map((item) => item.counter),
                    borderColor: Color,
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: Color,
                    pointHoverRadius: 5,
                });
            }
            setData({ labels, datasets });
        }
    }, [chart]);
    return (
        <div className="chart-custom">
            <div className="chart-custom--overlay"></div>
            <div className="chart-custom--content">
                <Link to={path.ZING_CHART}>
                    <h3>#zingChart</h3>
                </Link>
                <div className="chart-custom--content-2">
                    <div className="chart--rank">
                        {items
                            ?.filter((item, index) => index < 3)
                            ?.map((item, index) => (
                                <SongItem
                                    key={index}
                                    thumnail={item?.thumbnail}
                                    title={item?.title}
                                    artists={item?.artistsNames}
                                    sid={item?.encodeId}
                                    order={index + 1}
                                    percent={Math.round((+item?.score * 100) / +chart?.totalScore)}
                                />
                            ))}
                        <Link to={path.ZING_CHART}>Xem thêm</Link>
                    </div>
                    <div className="chart--chart">
                        {data ? <Line data={data} options={options} ref={chartRef} /> : ''}
                        <div className="tooltip" style={{ ...tooltipState }}>
                            <SongItem
                                thumnail={items?.find((item) => item?.encodeId === selected)?.thumbnail}
                                title={items?.find((item) => item?.encodeId === selected)?.title}
                                artists={items?.find((item) => item?.encodeId === selected)?.artistsNames}
                                sid={items?.find((item) => item?.encodeId === selected)?.encodeId}
                                style={'#ccc'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
