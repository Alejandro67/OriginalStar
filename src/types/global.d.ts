// can go in "./types/global.d.ts"
type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;
type P5jsContainer = ({ sketch }: { sketch: P5jsSketch }) => React.JSX.Element;

//sketches/mysketch.ts
export const sketch: P5jsSketch = (p5, parentRef) => {
  let parentStyle: CSSStyleDeclaration;
  let canvasHeight: number;
  let canvasWidth: number;
  let audioState: string;
  let cnv: any;
  let sine: any;

  p5.setup = () => {
    parentStyle = window.getComputedStyle(parentRef);
    canvasWidth = parseInt(parentStyle.width) * 0.99;
    canvasHeight = parseInt(parentStyle.width) * 0.4;
    cnv = p5.createCanvas(canvasWidth, canvasHeight).parent(parentRef);

    audioState = p5.getAudioContext();
    audioState.suspend();
    cnv.mouseClicked(() => {
      audioState.state !== "running" ? audioState.resume() : null;
    });
    // etc....
    loadAudio();
  };

  p5.draw = () => {
    // etc..
  }
}

