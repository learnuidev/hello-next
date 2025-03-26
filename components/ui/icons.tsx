"use client";

import * as React from "react";

import { faCitrus } from "@fortawesome/sharp-solid-svg-icons/faCitrus";
import { faBowlChopsticksNoodles } from "@fortawesome/sharp-solid-svg-icons/faBowlChopsticksNoodles";
import { faUserShakespeare } from "@fortawesome/sharp-solid-svg-icons/faUserShakespeare";
import { faSeedling } from "@fortawesome/sharp-solid-svg-icons/faSeedling";
// import { faXmark } from "@fortawesome/sharp-solid-svg-icons/faXmark";
import { faXmark } from "@fortawesome/pro-light-svg-icons/faXmark";
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
import { faPlay } from "@fortawesome/sharp-solid-svg-icons/faPlay";
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
import { faMusic } from "@fortawesome/sharp-solid-svg-icons/faMusic";
import { faFaceGrinBeamSweat } from "@fortawesome/sharp-solid-svg-icons/faFaceGrinBeamSweat";
import { faFaceThinking } from "@fortawesome/sharp-solid-svg-icons/faFaceThinking";
import { faHeadphones } from "@fortawesome/sharp-solid-svg-icons/faHeadphones";
import { faLightbulb } from "@fortawesome/sharp-solid-svg-icons/faLightbulb";
import { faProjector } from "@fortawesome/sharp-solid-svg-icons/faProjector";
import { faMoonCloud } from "@fortawesome/sharp-solid-svg-icons/faMoonCloud";
import { faSunHaze } from "@fortawesome/sharp-solid-svg-icons/faSunHaze";
import { faCloudDrizzle } from "@fortawesome/sharp-solid-svg-icons/faCloudDrizzle";
import { faCloudsSun } from "@fortawesome/sharp-solid-svg-icons/faCloudsSun";
import { faGrid2 } from "@fortawesome/sharp-solid-svg-icons/faGrid2";
import { faGear } from "@fortawesome/sharp-solid-svg-icons/faGear";
import { faPlus } from "@fortawesome/sharp-solid-svg-icons/faPlus";
import { faPlusLarge } from "@fortawesome/pro-light-svg-icons/faPlusLarge";
import { faBooks } from "@fortawesome/sharp-solid-svg-icons/faBooks";
import { faCauldron } from "@fortawesome/sharp-solid-svg-icons/faCauldron";
import { faAtomSimple } from "@fortawesome/sharp-solid-svg-icons/faAtomSimple";
import { faTicketAirline } from "@fortawesome/sharp-solid-svg-icons/faTicketAirline";
import { faPersonHiking } from "@fortawesome/sharp-solid-svg-icons/faPersonHiking";
import { faWatermelonSlice } from "@fortawesome/sharp-solid-svg-icons/faWatermelonSlice";
import { faLock } from "@fortawesome/sharp-solid-svg-icons/faLock";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faYoutube } from "@fortawesome/free-brands-svg-icons";

// import { faCitrus } from '@fortawesome/pro-duotone-svg-icons'


export const Header = ({ children, className }: any) => {
  return <h1 className={className}>{children}</h1>;
};


const SearchIcon = (props: any) => {
  const isHeight =
    props.className && props?.className.includes("h-") ? "" : `h-6 w-6`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${props.className} ${isHeight}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
};

export const PropsIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faBowlChopsticksNoodles} />;
};
export const CharacterIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faUserShakespeare} />;
};

export const WordIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faSeedling} />;
};

export const SentenceIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faTrees} />;
};

export const CloseIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faXmark} />;
};

export const PlaceIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faMapPin} />;
};

const BackIcon = (props: any) => {
  const isHeight =
    props.className && props?.className.includes("h-") ? "" : `h-6 w-6`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${props.className} ${isHeight}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
      />
    </svg>
  );
};

const VillageIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCow} />;
};

export const ActorIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faTheaterMasks} />;
};
export const NomadIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faPersonHiking} />;
};

const TravellerIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faBackpack} />;
};
export const SceneIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faClapperboardPlay} />;
};

const StoryIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faWatermelonSlice} />;
};

export const InformationCircleIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faWatermelonSlice} />;
};
export const ChartBarIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faWatermelonSlice} />;
};

export const SunIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faWatermelonSlice} />;
};

export const AnalyticsIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faChartSimple} />;
};

const LearnIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faAbacus} />;
};

const GameIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faGameConsoleHandheld} />;
};
const ConvosIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faComment} />;
};

export const PinyinChartIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faTableTree} />;
};

const MandarinoIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCitrus} />;
};

export const MessageIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faComment} />;
};
export const NextIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faAngleRight} />;
};
export const PrevIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faAngleLeft} />;
};
export const PlayIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faPlay} />;
};
export const PauseIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faPause} />;
};

const MicIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faMicrophone} />;
};
const ThoughtIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faThoughtBubble} />;
};
export const CheckIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCheck} />;
};

export const GradeAIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faMusic} />;
};

export const GradeBIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faFaceThinking} />;
};
export const GradeFIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faFaceGrinBeamSweat} />;
};

const FocusIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faLightbulb} />;
};
const MovieIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCameraMovie} />;
};
const MoonIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faMoonCloud} />;
};
const SunRiseIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCloudsSun} />;
};
const CloudyIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCloudDrizzle} />;
};
const AppStoreIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faGrid2} />;
};
const YoutubeIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faYoutube} />;
};
const SettingsIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faGear} />;
};
export const PlusIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faPlusLarge} />;
};
const LearningIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faBooks} />;
};
const HskIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faCauldron} />;
};

const PatraIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faTicketAirline} />;
};
export const CCIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faAtomSimple} />;
};
export const LockClosedIcon = (props: any) => {
  return <FontAwesomeIcon {...props} icon={faLock} />;
};

export const Lightning = (props: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${props?.className || ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
};
