import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faBook, faSpinner } from "@fortawesome/sharp-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import {
  faArrowUpRightFromSquare,
  faBoltLightning as faBoltLightningSolid,
  faBrainCircuit,
  faCircleInfo,
  faFaceAngry as faFaceAngrySolid,
  faFaceGrin as faFaceGrinSolid,
  faFaceParty as faFacePartySolid,
  faFaceSadCry as faFaceSadCrySolid,
  faFaceSadSweat as faFaceSadSweatSolid,
  faFaceSmirking as faFaceSmirkingSolid,
  faFaceSpiralEyes as faFaceSpiralEyesSolid,
  faGlassesRound as faGlassesRoundSolid,
  faGrinBeamSweat as faGrinBeamSweatSolid,
  // faMicrophone,
  // faSeedling,
  // faPlay,
  // faTypewriter,
  faLock as faLockSolid,
  faMusicNote as faMusicNoteSolid,
  faPhotoFilm as faPhotoFilmSolid,
  faRectangleVerticalHistory as faRectangleVerticalHistorySolid,
  faSmile as faSmileSolid,
  faUser as faUserSolid,
} from "@fortawesome/sharp-solid-svg-icons";

import {
  faAlignRight,
  faBadgeCheck,
  faBars,
  faQuestion,
  faBoltLightning,
  faBoxArchive,
  faChartColumn,
  faCheckCircle,
  faCircleArrowDown,
  faCircleBolt,
  faCitrus,
  faClock,
  faComputerMouse,
  faConstruction,
  faEye,
  faFaceAngry,
  faFaceGrin,
  faFaceParty,
  faFaceSadCry,
  faFaceSadSweat,
  faFaceSmirking,
  faFaceSpiralEyes,
  faFire,
  faGlobeAsia,
  faGraduationCap,
  faGridRound2Plus,
  faGrinBeamSweat,
  faInfo,
  faInfoCircle,
  faLanguage,
  faLightbulb,
  faList,
  faLock,
  faMagnifyingGlassChart,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faMailboxFlagUp,
  faMicrochipAi,
  faMusic,
  faPenToSquare,
  faPhotoFilm,
  faPlanetRinged,
  faPlayCircle,
  faPlus,
  faRollerCoaster,
  faSeedling,
  faSmile,
  faSpaceStationMoon,
  faStop,
  faTable,
  faTimeline,
  faTrash,
  faTree,
  faTruckRampBox,
  faUser,
  faVolume,
  faWandMagic,
  faXmark,
  faChartRadar,
  faItalic,
  faBold,
  faBullseye,
  faBullseyeArrow,
  faRadar,
  faMicrophone,
  faArrowsRotate,
  faNotebook,
  faBookmark,
  faRepeat,
  faArrowLeft,
  faArrowRight,
  faMobile,
} from "@fortawesome/pro-thin-svg-icons";

import {
  faClockEight,
  faCommentQuote,
  faFire as faFireDuoTone,
  faMessageQuote,
  faLightbulb as faLightBulbDT,
  faSeedling as faSeedlingDuotone,
  faTree as faTreeDuotone,
  faGlassesRound as faGlassesRoundDT,
  faBookSpells as faBookSpellsDT,
  faBullseye as faBullseyeDT,
  faBullseyeArrow as faBullseyeArrowDT,
} from "@fortawesome/pro-duotone-svg-icons";

import { faCitrus as faCitrusSolid } from "@fortawesome/sharp-solid-svg-icons/faCitrus";
import { faLightbulb as faLightbulbSolid } from "@fortawesome/sharp-solid-svg-icons/faLightbulb";
import { faPlay } from "@fortawesome/sharp-solid-svg-icons/faPlay";

// import { faXmark } from "@fortawesome/sharp-solid-svg-icons/faXmark";

import { faChartColumn as faChartColumnSolid } from "@fortawesome/sharp-solid-svg-icons/faChartColumn";
import { faPause } from "@fortawesome/sharp-solid-svg-icons/faPause";
import { faSeedling as faSeedlingSolid } from "@fortawesome/sharp-solid-svg-icons/faSeedling";
import { faTableTree } from "@fortawesome/sharp-solid-svg-icons/faTableTree";
import { faTree as faTreeSolid } from "@fortawesome/sharp-solid-svg-icons/faTree";
import { faTrees } from "@fortawesome/sharp-solid-svg-icons/faTrees";
// import { faMusic } from "@fortawesome/sharp-solid-svg-icons/faMusic";
import { faGear } from "@fortawesome/sharp-solid-svg-icons/faGear";

import {
  faBlockBrick,
  faCalculatorSimple,
  // faTableTree,
  faCheck as faCheckThin,
  faChevronLeft,
  faCompass,
  faCopy,
  faEarthAsia,
  faFingerprint,
  faGlassesRound,
  // faGear,
  faHome,
  faMagnifyingGlass,
  // faPlus,
  faMinus,
  faMountainSun,
  faMusicNote,
  faPowerOff,
  // faLightbulb,
  faRectangleHistory,
  faRectangleVerticalHistory,
  // faSeedling,
  faStairs,
} from "@fortawesome/pro-thin-svg-icons";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";
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
  questionMark: createFAIcon(faQuestion),
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
  fireDuoTone: createFAIcon(faFireDuoTone as any),
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
  party: createFAIcon(faFaceParty),
  partySolid: createFAIcon(faFacePartySolid),
  eightOClock: createFAIcon(faClockEight as any),
  commentQuote: createFAIcon(faCommentQuote as any),
  messageQuote: createFAIcon(faMessageQuote as any),
  treeDuotone: createFAIcon(faTreeDuotone as any),
  seedlingDuotone: createFAIcon(faSeedlingDuotone as any),
  lightBulbDuotone: createFAIcon(faLightBulbDT as any),

  connectDevelop: createFAIcon(faConnectdevelop),
  glassesRoundDT: createFAIcon(faGlassesRoundDT as any),
  bookSpellsDT: createFAIcon(faBookSpellsDT as any),
  google: createFAIcon(faGoogle),
  track: createFAIcon(faRadar),
  italic: createFAIcon(faItalic),
  bold: createFAIcon(faBold),
  bullsEyeDT: createFAIcon(faBullseyeDT as any),
  bullsEyeArrowDT: createFAIcon(faBullseyeArrowDT as any),
  bullsEyeArrow: createFAIcon(faBullseyeArrow),
  bullsEye: createFAIcon(faBullseye),
  microphone: createFAIcon(faMicrophone),
  refresh: createFAIcon(faArrowsRotate),
  diary: createFAIcon(faNotebook),
  bookmark: createFAIcon(faBookmark),
  repeat: createFAIcon(faRepeat),
  arrowLeft: createFAIcon(faArrowLeft),
  arrowRight: createFAIcon(faArrowRight),
  mobile: createFAIcon(faMobile),
};

export const RedFireDuoTone = ({ className }: { className?: string }) => {
  return (
    <Icons.fireDuoTone
      className={cn(className)}
      style={{
        "--fa-primary-color": "#CC2B52",
        "--fa-secondary-color": "#AF1740",
      }}
    />
  );
};

export const GreenLightbulbDuoTone = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Icons.lightBulbDuotone
      className={cn(className)}
      style={{
        "--fa-primary-color": "#00FF9C",
        "--fa-secondary-color": "#00FF9C",
      }}
    />
  );
};
