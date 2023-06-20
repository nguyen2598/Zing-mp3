import axiosClient from '../api/axiosClient';
const musicApi = {
    getSong(params) {
        const url = '/song';
        return axiosClient.get(url, { params });
    },
    get(id) {
        const url = `/song/${id}`;
        return axiosClient.get(url);
    },
    getDetailSong(params) {
        const url = `/infosong`;
        return axiosClient.get(url, { params });
    },
    apiGetDetailPlayList(params) {
        const url = `/detailplaylist`;
        return axiosClient.get(url, { params });
    },
    apiSearch(params) {
        const url = `/search`;
        return axiosClient.get(url, { params });
    },
    apiArtistSong(params) {
        const url = `/artistsong`;
        return axiosClient.get(url, { params });
    },
    getMV(params) {
        const url = `/video`;
        return axiosClient.get(url, { params });
    },

    add(data) {
        const url = `/song/`;
        return axiosClient.post(url, data);
    },
    update(data) {
        const url = `/song/${data.id}`;
        return axiosClient.patch(url, data);
    },
    remove(id) {
        const url = `/song/${id}`;
        return axiosClient.delete(url);
    },
};
export default musicApi;
