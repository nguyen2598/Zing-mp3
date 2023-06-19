export default function formatNum(numb) {
    let so = +numb / 1000;
    const result = so > 999 ? `${(so / 1000).toFixed(1)}M` : `${so.toFixed(1)}K`;
    return result;
}
