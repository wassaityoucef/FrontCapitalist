import {Component, ElementRef, Input, NgZone, SimpleChanges, ViewChild} from '@angular/core';

export enum Orientation {
  horizontal = "horizontal",
  vertical = "vertical"
}

@Component({
  selector: 'app-my-progress-bar',
  template: '<canvas style="height: 100% ; width: 100%" #canvasRef></canvas>',
})
export class MyProgressBarComponent {

  @Input()
  frontcolor: string =""
  @Input()
  backcolor: string=""

  @Input()
  initialValue: number=0

  @Input()
  vitesse: number=0

  @Input()
  orientation: Orientation=Orientation.horizontal

  @Input()
  auto: boolean = true

  @Input()
  run: number=1

  @ViewChild("canvasRef") canvasRef: ElementRef | undefined;
  animationRef = {value: 0}

 

  constructor(private ngZone: NgZone) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty(this.initialValue)) {
      this.restartAnim()
    }
    if (changes.hasOwnProperty(this.vitesse)) {
      this.restartAnim()
        }
    if (changes.hasOwnProperty(this.run)) {
        this.restartAnim()
              }
  }

  restartAnim() {
    if (this.vitesse > 0 && this.run==1) {
      if (this.animationRef.value !== 0) cancelAnimationFrame(this.animationRef.value);
      this.ngZone.runOutsideAngular(() => {
        if (this.canvasRef != undefined) {
          this.animate(
            this.canvasRef,
            this.initialValue,
            this.orientation,
            this.vitesse,
            this.animationRef,
            this.auto,
            this.frontcolor,
            this.backcolor
          );
        }
      });
    }
  }
  ngOnDestroy() {
    if (this.animationRef.value !== 0) cancelAnimationFrame(this.animationRef.value)
  }

  animate(canvasRef: ElementRef, initialValue: number, orientation: Orientation, vitesse: number,
          animationRef: { value: number }, auto: boolean, frontcolor: string, backcolor: string) {
    let dateRef = 0
    const ctx = canvasRef.nativeElement.getContext('2d');
    let widthRef = 0
    let reflength = canvasRef.nativeElement.width
    if (orientation === Orientation.vertical) reflength = canvasRef.nativeElement.height

    animationRef.value = requestAnimationFrame(draw)

    function fill() {
      if (!ctx || !widthRef) return
      let width = canvasRef.nativeElement.width
      let height = canvasRef.nativeElement.height
      ctx.fillStyle = frontcolor || "#008800"
      if (orientation === Orientation.horizontal) {
        ctx.fillRect(0, 0, widthRef, height);
      } else {
        ctx.fillRect(0, height - widthRef, width, height);
      }
    }

    function renderFrame(timestamp: number) {
      if (!ctx) return
      let elapsetime = timestamp - dateRef
      let percent = (elapsetime * 100) / vitesse
      widthRef = (percent * reflength) / 100
      if (widthRef < reflength) {
        fill()
      }
    }

    function draw(timestamp: number) {
      if (dateRef === undefined) dateRef = timestamp - initialValue
      if (!canvasRef) return
      if (widthRef < reflength) {
        renderFrame(timestamp)
        animationRef.value = requestAnimationFrame(draw)
      } else {
        reset()
        if (auto) {
          dateRef = timestamp
          animationRef.value = requestAnimationFrame(draw)
        }
      }
    }

    function reset() {
      if (!ctx) return
      const width = canvasRef.nativeElement.width
      const height = canvasRef.nativeElement.height
      ctx.fillStyle = backcolor || "#FFFFFF"
      ctx.fillRect(0, 0, width, height)
      widthRef = 0
    }
  }
}
