import playIcons from "./imgs/play.png";
import pauseIcons from "./imgs/Pause.png";
import VRIcon from "./imgs/VR.png";
import VDIcon from "./imgs/video.png";
import LoadingIcon from "./imgs/loading.gif";
import VoiceOpen from "./imgs/voice_open.png";
import VoiceClose from "./imgs/voice_close.png";
import LoopClose from "./imgs/loop-none.png";
import LoopOpen from "./imgs/Loop.png";
import FullScrean from "./imgs/full-screan.png";
import OutFullScrean from "./imgs/out_full-screan.png";
export const circleStyle = `
opacity:0;
transition: all .1s;
width:12px;
height:12px;
position: absolute;
right: -6px;
top:50%;
background-color: #fff;
border-radius:50%;
transform:translateY(-50%);
pointer-events: all;
`;
export const processBarStyle = `
width:100%;
position: absolute;
height: 6px;
bottom: 100%;
cursor: pointer;
background-color: rgba(255,255,255,0.35);
`;

export const playBtnStyle = `width:50px;height:50px;position:absolute;left:50%;top:50%;background:red;transform: translate(-50%, -50%);`;

export const playBtnBoxStyle = `
width:100%;
height:60px;
position:absolute;
left:0;
bottom:0;
transition: all .1s;
overflow: visible !important;`;

export const controlBoxStyle = `
color: #fff;
position: relative;
bottom: 0;
width: 100%;
height: 100%;
background: rgba(0,16,27,0.7);
background-clip: content-box;
display: flex;
justify-content: space-between;
align-items: center;
`;

export const processBoxStyle = `
width:100%;
position: absolute;
height: 6px;
bottom: 100%;
top:0;
cursor: pointer;
z-index: 2;
transition: transform .1s;`;

export const loadingBarStyle = `
transition: all .1s;
width:0%;
position: absolute;
height: 6px;
bottom: 100%;
background-color: rgba(255,255,255,0.35);
pointer-events: none;
`;

export const playerProcessBarStyle = `
transition: all .1s;
  width:0%;
  position: absolute;
  height: 6px;
  bottom: 100%;
  background-color: rgba(102,153,0,1);
  pointer-events: none;
`;

export const playIconPlayStyle = `
width:30px;
height:30px;
background-image:url(${playIcons});
background-size:100% 100%;
cursor: pointer;
margin-right:10px;
`;

export const playIconPauseStyle = `
width:30px;
height:30px;
background-image:url(${pauseIcons});
background-size:100% 100%;
cursor: pointer;
margin-right:10px;
`;
export const leftDivboxStyle = `
display:flex;
align-items:center;
padding-left:10px;
fontSize:12px;
`;
export const rightDivBoxStyle = `
display:flex;
align-items:center;
padding-right:10px;   
`;
export const divRateStyle = `width: 35px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 3px;
line-height: 24px;
font-size: 12px;
cursor: pointer;
transition: all 0.3s ease 0s;
position: relative;
background-color: transparent;
border: 1px solid rgb(255, 255, 255);`;

export const parentStyle = `position:relative;height: 60px;
display: flex;
align-items: center;
justify-content: center;
z-index:999
`;
export const boxStyle = `display:flex;
align-items:center;
justify-content: center;
flex-direction: column;
width:60px;
min-height:30px;
position:absolute;
left:50%;
transition:all 0.7s;
opacity:0;
transform:translateX(-50%);
bottom: 50px;
padding-bottom: 20px;
`;

export const itemStyle = ` width: 100%;
text-align: center;
font-size: 12px;
color: #fff;
background-color:rgba(0,16,27,0.7);
margin-bottom:3px;
line-height:25px;
cursor: pointer;`;

export const vrBoxStyle = `
width:20px;
height:${(20 * 128) / 167}px;
background-image:url(${VRIcon});
background-size:100% 100%;
cursor: pointer;
margin-left:10px;
`;

export const vdBoxStyle = `
width:20px;
height:${(20 * 128) / 128}px;
background-image:url(${VDIcon});
background-size:100% 100%;
cursor: pointer;
margin-left:10px;
`;

export const loadingIconStyle = `
width:30px;
height:30px;
background-image:url(${LoadingIcon});
background-size:100% 100%;
position:absolute;
left:50%;
top:50%;
transform:translateX(-50%) translateY(-50%);
opacity:0;
`;

export const voiceOpenStyle = `
width:20px;
height:${(20 * 128) / 128}px;
background-image:url(${VoiceOpen});
background-size:100% 100%;
cursor: pointer;
margin-right:10px;
transform: scale(-1);
`;

export const voiceCloseStyle = `
width:20px;
height:${(20 * 128) / 128}px;
background-image:url(${VoiceClose});
background-size:100% 100%;
cursor: pointer;
margin-right:10px;
transform: scale(-1);
`;

export const loopOpenStyle = `
width:20px;
height:${(20 * 128) / 128}px;
background-image:url(${LoopOpen});
background-size:100% 100%;
cursor: pointer;
margin-right:10px;
`;

export const loopCloseStyle = `
width:20px;
height:${(20 * 128) / 128}px;
background-image:url(${LoopClose});
background-size:100% 100%;
cursor: pointer;
margin-right:10px;
`;

export const voiceBoxStyle = `
position:relative;
width: 80px;
height: 6px;
background: rgb(255, 255, 255);
margin-right: 10px;
border-radius: 3px;
cursor: pointer;
`;

export const voiceBarStyle = `
  width: 100%;
  height: 100%;
  background-color: rgba(102,150,0,1);
  border-radius: 3px;
  position:absolute;
  right:0;
  top:0;
  pointer-events: none;
  cursor: pointer;
`;

export const voiceBarCircleStyle = `
width: 14px;
height: 14px;
border-radius: 50%;
background: #fff;
position: absolute;
left: -7px;
top: 50%;
transform: translateY(-50%);
cursor: pointer;
`;

export const fullScreanStyle = `
width:20px;
height:${(20 * 128) / 128}px;
background-image:url(${FullScrean});
background-size:100% 100%;
cursor: pointer;
margin-left:10px;
margin-right:10px;
`;
export const outFullScreanStyle = `
width:20px;
height:${(20 * 128) / 128}px;
background-image:url(${OutFullScrean});
background-size:100% 100%;
cursor: pointer;
margin-left:10px;
margin-right:10px;
`;

export const fullStyle = `
position: fixed;
inset: 0px;
z-index: 9999;
left: 0!important;
right: 0!important;
top: 0!important;
bottom: 0!important;
width: auto;
padding:0;
margin:0;
height: auto;
overflow:hidden;
`;
