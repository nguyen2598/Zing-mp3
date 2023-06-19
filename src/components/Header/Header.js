import React from 'react';
import './Header.scss';
import icons from '../../ultis/icon';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
const { IcPrev, IcNext } = icons;
export default function Header() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Sử dụng số âm để quay lại trang trước đó
    };
    const handleGoNext = () => {
        navigate(1); // Sử dụng số âm để tiến lên
    };
    return (
        <div className="header">
            <div className="header-left">
                <div className="header-left--arrow">
                    <span className="arrow--prev">
                        <IcPrev onClick={handleGoBack} />
                    </span>
                    <span className="arrow--next">
                        <IcNext onClick={handleGoNext} />
                    </span>
                </div>
                <div className="header-search">
                    <Search />
                </div>
            </div>
            <div className="header-right">Dang nhap</div>
        </div>
    );
}
