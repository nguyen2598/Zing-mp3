import icons from './icon';
const { IcMusic, IcRadio, IcChart, IcCloud } = icons;
export const menuSlidebar = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icon: <IcCloud />,
    },
    {
        path: '',
        text: 'Khám phá',
        icon: <IcRadio />,
    },
    {
        path: 'zing-chart',
        text: '#Zingchart',
        icon: <IcChart />,
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icon: <IcMusic />,
    },
];
