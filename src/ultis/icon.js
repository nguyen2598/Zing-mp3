import { MdOutlineLibraryMusic, MdRadioButtonUnchecked, MdSkipNext, MdSkipPrevious, MdPause } from 'react-icons/md';
import { TbChartArcs, TbChartLine, TbPlayerPlayFilled, TbRepeatOnce, TbRepeat } from 'react-icons/tb';
import { RiNeteaseCloudMusicLine, RiDeleteBin6Line } from 'react-icons/ri';
import {
    BsArrowLeft,
    BsArrowRight,
    BsRepeat1,
    BsRepeat,
    BsMusicNoteBeamed,
    BsDot,
    BsMusicNoteList,
} from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart, AiOutlinePlayCircle } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { BiDotsHorizontalRounded, BiShuffle, BiVolumeFull, BiVolumeMute, BiVolumeLow } from 'react-icons/bi';
const icons = {
    IcMusic: MdOutlineLibraryMusic,
    IcRadio: TbChartArcs,
    IcChart: TbChartLine,
    IcCloud: RiNeteaseCloudMusicLine,
    IcPrev: BsArrowLeft,
    IcNext: BsArrowRight,
    IcSearch: FiSearch,
    IcHeart: AiFillHeart,
    IcOutlineHeart: AiOutlineHeart,
    IcDot: BiDotsHorizontalRounded,
    IcRepet: TbRepeat,
    // IcRepet1: BsRepeat1,
    IcSongNext: MdSkipNext,
    IcSongPrev: MdSkipPrevious,
    IcPlay: TbPlayerPlayFilled,
    IcPause: MdPause,
    IcShu: BiShuffle,
    IcMus: BsMusicNoteBeamed,
    IcDo: BsDot,
    IcRepet1: TbRepeatOnce,
    IcPlayoutline: AiOutlinePlayCircle,
    IcNoteMusic: BsMusicNoteList,
    IcVolumFull: BiVolumeFull,
    IcVolumMute: BiVolumeMute,
    IcVolumLow: BiVolumeLow,
    IcBin: RiDeleteBin6Line,
};
export default icons;
