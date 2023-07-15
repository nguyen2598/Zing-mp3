import axiosClient from '../api/axiosClient';
const ChartApi = {
    getChart(params) {
        const url = '/charthome';
        return axiosClient.get(url, { params });
    },
};
export default ChartApi;
