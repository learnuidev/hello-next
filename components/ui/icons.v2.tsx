import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  faBook,
  faMicrochipAi,
  faSpinner,
} from "@fortawesome/sharp-solid-svg-icons";

import {
  // faMicrophone,
  // faSeedling,
  // faPlay,
  // faTypewriter,
  // faBrainCircuit,
  faMusicNote as faMusicNoteSolid,
} from "@fortawesome/sharp-solid-svg-icons";

import {
  faCheckCircle,
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
  faTree,
} from "@fortawesome/pro-thin-svg-icons";

import { faCitrus } from "@fortawesome/sharp-solid-svg-icons/faCitrus";
import { faPlay } from "@fortawesome/sharp-solid-svg-icons/faPlay";
import { faBowlChopsticksNoodles } from "@fortawesome/sharp-solid-svg-icons/faBowlChopsticksNoodles";
import { faUserShakespeare } from "@fortawesome/sharp-solid-svg-icons/faUserShakespeare";
import { faSeedling } from "@fortawesome/sharp-solid-svg-icons/faSeedling";
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
  earthAsia: createFAIcon(faEarthAsia),
  compass: createFAIcon(faCompass),
  home: createFAIcon(faHome),
  gear: createFAIcon(faGear),
  powerOff: createFAIcon(faPowerOff),
  copy: createFAIcon(faCopy),
  seedling: createFAIcon(faSeedling),
  stairs: createFAIcon(faStairs),
  musicNote: createFAIcon(faMusicNote),
  musicNoteSolid: createFAIcon(faMusicNoteSolid),
  analyze: createFAIcon(faGalaxy),
  calculatorSimple: createFAIcon(faCalculatorSimple),
  back: createFAIcon(faChevronLeft),
  lightBulb: createFAIcon(faLightbulb),

  rectangleHistory: createFAIcon(faRectangleHistory),

  plusIcon: createFAIcon(faPlus),
  minusIcon: createFAIcon(faMinus),

  mountainSun: createFAIcon(faMountainSun),
  mandarin: createFAIcon(faCitrus),
  fingerPrint: createFAIcon(faFingerprint),

  blockBrick: createFAIcon(faBlockBrick),

  pinyinChart: createFAIcon(faTableTree),
  sentence: createFAIcon(faTrees),
  word: createFAIcon(faSeedling),
  glassesRound: createFAIcon(faGlassesRound),
  play: createFAIcon(faPlay),
  language: createFAIcon(faLanguage),
  xMark: createFAIcon(faXmark),
  checkCircle: createFAIcon(faCheckCircle),
  spinner: createFAIcon(faSpinner),
  mailbox: createFAIcon(faMailboxFlagUp),
  archive: createFAIcon(faBoxArchive),
  user: createFAIcon(faUser),
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
};
