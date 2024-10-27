import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  faBook,
  faMicrochipAi as faMicrochipAiSolid,
  faSpinner,
} from "@fortawesome/sharp-solid-svg-icons";

import {
  // faMicrophone,
  // faSeedling,
  // faPlay,
  // faTypewriter,
  faLock as faLockSolid,
  faBrainCircuit,
  faMusicNote as faMusicNoteSolid,
  faBoltLightning as faBoltLightningSolid,
  faPhotoFilm as faPhotoFilmSolid,
  faRectangleVerticalHistory as faRectangleVerticalHistorySolid,
  faUser as faUserSolid,
  faGlassesRound as faGlassesRoundSolid,
  faArrowUpRightFromSquare,
  faCircleInfo,
  faFaceSadCry as faFaceSadCrySolid,
  faGrinBeamSweat as faGrinBeamSweatSolid,
  faFaceSadSweat as faFaceSadSweatSolid,
  faFaceAngry as faFaceAngrySolid,
  faFaceSpiralEyes as faFaceSpiralEyesSolid,
  faFaceSmirking as faFaceSmirkingSolid,
  faSmile as faSmileSolid,
  faFaceGrin as faFaceGrinSolid,
} from "@fortawesome/sharp-solid-svg-icons";

import {
  faCheckCircle,
  faMicrochipAi,
  faXmark,
  faLanguage,
  faLightbulb,
  faMailboxFlagUp,
  faBoxArchive,
  faUser,
  faGlobeAsia,
  faComputerMouse,
  faBadgeCheck,
  faGridRound2Plus,
  faBars,
  faBlockQuestion,
  faCircleArrowDown,
  faCircleBolt,
  faPlus,
  faMusic,
  faTable,
  faInfo,
  faAlignRight,
  faTrash,
  faGraduationCap,
  faSpaceStationMoon,
  faPlayCircle,
  faTree,
  faFire,
  faEye,
  faPlanetRinged,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faWandMagic,
  faClock,
  faRollerCoaster,
  faBoltLightning,
  faPhotoFilm,
  faVolume,
  faStop,
  faList,
  faMagnifyingGlassChart,
  faChartColumn,
  faSeedling,
  faCitrus,
  faTimeline,
  faLock,
  faInfoCircle,
  faPenToSquare,
  faConstruction,
  faTruckRampBox,
  faFaceSadCry,
  faFaceSadSweat,
  faFaceAngry,
  faFaceSpiralEyes,
  faFaceSmirking,
  faSmile,
  faGrinBeamSweat,
  faFaceGrin,
  // faCircleInfo,
  // faArrowUpRightFromSquare,
} from "@fortawesome/pro-thin-svg-icons";

import { faGoogle, faSkyatlas } from "@fortawesome/free-brands-svg-icons";

import { faCitrus as faCitrusSolid } from "@fortawesome/sharp-solid-svg-icons/faCitrus";
import { faPlay } from "@fortawesome/sharp-solid-svg-icons/faPlay";
import { faBowlChopsticksNoodles } from "@fortawesome/sharp-solid-svg-icons/faBowlChopsticksNoodles";
import { faUserShakespeare } from "@fortawesome/sharp-solid-svg-icons/faUserShakespeare";
import { faLightbulb as faLightbulbSolid } from "@fortawesome/sharp-solid-svg-icons/faLightbulb";

// import { faXmark } from "@fortawesome/sharp-solid-svg-icons/faXmark";

import { faMapLocationDot } from "@fortawesome/sharp-solid-svg-icons/faMapLocationDot";
import { faMapPin } from "@fortawesome/sharp-solid-svg-icons/faMapPin";
import { faFarm } from "@fortawesome/sharp-solid-svg-icons/faFarm";
import { faCow } from "@fortawesome/sharp-solid-svg-icons/faCow";
import { faTheaterMasks } from "@fortawesome/sharp-solid-svg-icons/faTheaterMasks";
import { faCameraRetro } from "@fortawesome/sharp-solid-svg-icons/faCameraRetro";
import { faCamcorder } from "@fortawesome/sharp-solid-svg-icons/faCamcorder";
import { faCameraMovie } from "@fortawesome/sharp-solid-svg-icons/faCameraMovie";
import { faClapperboardPlay } from "@fortawesome/sharp-solid-svg-icons/faClapperboardPlay";
import { faChartSimple } from "@fortawesome/sharp-solid-svg-icons/faChartSimple";
import { faAbacus } from "@fortawesome/sharp-solid-svg-icons/faAbacus";
import { faTrees } from "@fortawesome/sharp-solid-svg-icons/faTrees";
import { faGameConsoleHandheld } from "@fortawesome/sharp-solid-svg-icons/faGameConsoleHandheld";
import { faBackpack } from "@fortawesome/sharp-solid-svg-icons/faBackpack";
import { faTableTree } from "@fortawesome/sharp-solid-svg-icons/faTableTree";
import { faChartColumn as faChartColumnSolid } from "@fortawesome/sharp-solid-svg-icons/faChartColumn";
import { faTree as faTreeSolid } from "@fortawesome/sharp-solid-svg-icons/faTree";
import { faSeedling as faSeedlingSolid } from "@fortawesome/sharp-solid-svg-icons/faSeedling";
import { faComment } from "@fortawesome/sharp-solid-svg-icons/faComment";
import { faAngleRight } from "@fortawesome/sharp-solid-svg-icons/faAngleRight";
import { faPause } from "@fortawesome/sharp-solid-svg-icons/faPause";
import { faAngleLeft } from "@fortawesome/sharp-solid-svg-icons/faAngleLeft";
import { faMicrophone } from "@fortawesome/sharp-solid-svg-icons/faMicrophone";
import { faThoughtBubble } from "@fortawesome/sharp-solid-svg-icons/faThoughtBubble";
import { faCheck } from "@fortawesome/sharp-solid-svg-icons/faCheck";
import { faFaceLaugh } from "@fortawesome/sharp-solid-svg-icons/faFaceLaugh";
// import { faMusic } from "@fortawesome/sharp-solid-svg-icons/faMusic";
import { faFaceGrinBeamSweat } from "@fortawesome/sharp-solid-svg-icons/faFaceGrinBeamSweat";
import { faFaceThinking } from "@fortawesome/sharp-solid-svg-icons/faFaceThinking";
import { faHeadphones } from "@fortawesome/sharp-solid-svg-icons/faHeadphones";
import { faProjector } from "@fortawesome/sharp-solid-svg-icons/faProjector";
import { faMoonCloud } from "@fortawesome/sharp-solid-svg-icons/faMoonCloud";
import { faSunHaze } from "@fortawesome/sharp-solid-svg-icons/faSunHaze";
import { faCloudDrizzle } from "@fortawesome/sharp-solid-svg-icons/faCloudDrizzle";
import { faCloudsSun } from "@fortawesome/sharp-solid-svg-icons/faCloudsSun";
import { faGrid2 } from "@fortawesome/sharp-solid-svg-icons/faGrid2";
import { faGear } from "@fortawesome/sharp-solid-svg-icons/faGear";

import {
  faCalculatorSimple,
  faChevronLeft,
  faCompass,
  faCopy,
  faEarthAsia,
  faGalaxy,
  // faGear,
  faHome,
  faMagnifyingGlass,
  faMusicNote,
  faPowerOff,
  faRectangleVerticalHistory,
  // faSeedling,
  faStairs,
  // faLightbulb,
  faRectangleHistory,
  // faPlus,
  faMinus,
  faMountainSun,
  faFingerprint,
  faBlockBrick,
  faGlassesRound,
  // faTableTree,
  faCheck as faCheckThin,
} from "@fortawesome/pro-thin-svg-icons";
// import { faCitrus } from "@fortawesome/sharp-solid-svg-icons";
// import { faLightbulb } from "@fortawesome/pro-thin-svg-icons";

const createFAIcon = (icon: FontAwesomeIconProps["icon"]) => {
  return function FAIcon(props: any) {
    return <FontAwesomeIcon icon={icon} {...props} />;
  };
};

export const Icons = {
  magnifyingGlass: createFAIcon(faMagnifyingGlass),
  verticalStack: createFAIcon(faRectangleVerticalHistory),
  verticalStackSolid: createFAIcon(faRectangleVerticalHistorySolid),
  earthAsia: createFAIcon(faEarthAsia),
  compass: createFAIcon(faCompass),
  home: createFAIcon(faHome),
  gear: createFAIcon(faGear),
  powerOff: createFAIcon(faPowerOff),
  copy: createFAIcon(faCopy),
  seedling: createFAIcon(faSeedling),
  seedlingSolid: createFAIcon(faSeedlingSolid),
  stairs: createFAIcon(faStairs),
  musicNote: createFAIcon(faMusicNote),
  musicNoteSolid: createFAIcon(faMusicNoteSolid),
  analyze: createFAIcon(faMagnifyingGlassChart),
  calculatorSimple: createFAIcon(faCalculatorSimple),
  back: createFAIcon(faChevronLeft),
  lightBulb: createFAIcon(faLightbulb),
  lightBulbSolid: createFAIcon(faLightbulbSolid),

  rectangleHistory: createFAIcon(faRectangleHistory),

  plusIcon: createFAIcon(faPlus),
  minusIcon: createFAIcon(faMinus),

  mountainSun: createFAIcon(faMountainSun),
  mandarin: createFAIcon(faCitrus),
  mandarinSolid: createFAIcon(faCitrusSolid),
  fingerPrint: createFAIcon(faFingerprint),

  blockBrick: createFAIcon(faBlockBrick),

  pinyinChart: createFAIcon(faTableTree),
  sentence: createFAIcon(faTrees),
  word: createFAIcon(faSeedling),
  glassesRound: createFAIcon(faGlassesRound),
  glassesRoundSolid: createFAIcon(faGlassesRoundSolid),
  play: createFAIcon(faPlay),
  language: createFAIcon(faLanguage),
  xMark: createFAIcon(faXmark),
  checkCircle: createFAIcon(faCheckCircle),
  spinner: createFAIcon(faSpinner),
  mailbox: createFAIcon(faMailboxFlagUp),
  archive: createFAIcon(faBoxArchive),
  user: createFAIcon(faUser),
  userSolid: createFAIcon(faUserSolid),
  globeAsia: createFAIcon(faGlobeAsia),
  computerMouse: createFAIcon(faComputerMouse),
  badgeCheck: createFAIcon(faBadgeCheck),
  gridRound: createFAIcon(faGridRound2Plus),
  bars: createFAIcon(faBars),
  questionMark: createFAIcon(faBlockQuestion),
  circleArrowDown: createFAIcon(faCircleArrowDown),
  circleBolt: createFAIcon(faCircleBolt),
  music: createFAIcon(faMusic),
  table: createFAIcon(faTable),
  info: createFAIcon(faInfo),
  ai: createFAIcon(faMicrochipAi),
  paragraph: createFAIcon(faAlignRight),
  trash: createFAIcon(faTrash),
  book: createFAIcon(faBook),
  graduationCap: createFAIcon(faGraduationCap),
  rocket: createFAIcon(faSpaceStationMoon),
  tree: createFAIcon(faTree),
  treeSolid: createFAIcon(faTreeSolid),
  playCircle: createFAIcon(faPlayCircle),
  check: createFAIcon(faCheckThin),
  fire: createFAIcon(faFire),
  eye: createFAIcon(faEye),
  planet: createFAIcon(faPlanetRinged),
  zoomIn: createFAIcon(faMagnifyingGlassPlus),
  zoomOut: createFAIcon(faMagnifyingGlassMinus),
  discover: createFAIcon(faWandMagic),
  clock: createFAIcon(faClock),
  cal: createFAIcon(faClock),
  reset: createFAIcon(faRollerCoaster),
  lightning: createFAIcon(faBoltLightning),
  lightningSolid: createFAIcon(faBoltLightningSolid),
  content: createFAIcon(faPhotoFilm),
  contentSolid: createFAIcon(faPhotoFilmSolid),
  trees: createFAIcon(faTrees),
  brain: createFAIcon(faBrainCircuit),
  circleInfo: createFAIcon(faCircleInfo),
  externalLink: createFAIcon(faArrowUpRightFromSquare),
  volume: createFAIcon(faVolume),
  pause: createFAIcon(faPause),
  stop: createFAIcon(faStop),
  list: createFAIcon(faList),

  chartColumn: createFAIcon(faChartColumn),
  chartColumnSolid: createFAIcon(faChartColumnSolid),
  timeline: createFAIcon(faTimeline),
  lock: createFAIcon(faLock),
  lockSolid: createFAIcon(faLockSolid),
  infoCircle: createFAIcon(faInfoCircle),
  edit: createFAIcon(faPenToSquare),
  construction: createFAIcon(faConstruction),
  loadingSpinner: createFAIcon(faTruckRampBox),

  cry: createFAIcon(faFaceSadCry),
  crySolid: createFAIcon(faFaceSadCrySolid),
  grinSweat: createFAIcon(faGrinBeamSweat),
  grinSweatSolid: createFAIcon(faGrinBeamSweatSolid),
  sadSweat: createFAIcon(faFaceSadSweat),
  sadSweatSolid: createFAIcon(faFaceSadSweatSolid),
  angry: createFAIcon(faFaceAngry),
  angrySolid: createFAIcon(faFaceAngrySolid),
  spiralEyes: createFAIcon(faFaceSpiralEyes),
  spiralEyesSolid: createFAIcon(faFaceSpiralEyesSolid),
  smirk: createFAIcon(faFaceSmirking),
  smirkSolid: createFAIcon(faFaceSmirkingSolid),
  smile: createFAIcon(faSmile),
  smileSolid: createFAIcon(faSmileSolid),
  grin: createFAIcon(faFaceGrin),
  grinSolid: createFAIcon(faFaceGrinSolid),
};
