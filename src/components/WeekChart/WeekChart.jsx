import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './WeekChart.scss';
export default function WeekChart() {
    const weekChart = useSelector((state) =>
        state?.home?.homeData?.find((item) => item?.sectionType === 'weekChart'),
    )?.items;
    return (
        <div className="weekchart">
            {weekChart?.map((item, index) => (
                <Link key={index} to={item?.link?.split('.')[0]} className="weekchart--img">
                    <img src={item.cover} alt="" />
                </Link>
            ))}
        </div>
    );
}
