import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('myCanvas') canvasRef: ElementRef;
  points = {
    AX: null,
    AY: null,
    BX: null,
    BY: null,
    CX: null,
    CY: null,
    DX: null,
    DY: null,
    OX: null,
    OY: null
  };

  info: string;

  calculate() {
    this.drawFigure();
    if (this.isSquare(this.points)) {

      this.info = 'IsSquare';

      if (this.isCentre) {
        

        this.info = `
          A (${this.points.AX}, ${this.points.AY})\n
          B (${this.points.BX}, ${this.points.BY})\n
          C (${this.points.CX}, ${this.points.CY})\n
          D (${this.points.DX}, ${this.points.DY})\n
          O (${this.points.OX}, ${this.points.OY})\n
          Is Square: ${this.isSquare(this.points)}\n
          Is O point centre of the square: ${this.isCentre()}`
      }
    } else {
      this.info = 'Not square'
    }
  }  

  drawFigure() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
  
    const { AX, AY, BX, BY, CX, CY, DX, DY, OX, OY } = this.points;
  
    canvas.style.display = 'block';

    const isCentre = this.isCentre();

    const minCoord = Math.min(AX, AY, BX, BY, CX, CY, DX, DY, OX, OY);
    const maxCoord = Math.max(AX, AY, BX, BY, CX, CY, DX, DY, OX, OY);
    const squareSize = Math.max(maxCoord - minCoord, 100) + 50;
  
    const offsetX = (canvas.width - squareSize) / 2;
    const offsetY = (canvas.height - squareSize) / 2;
  
    const duration = 2000; 
    const startTime = performance.now();
  
    function drawFrame(timestamp: number) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const currentAX = AX * progress;
      const currentAY = AY * progress;
      const currentBX = BX * progress;
      const currentBY = BY * progress;
      const currentCX = CX * progress;
      const currentCY = CY * progress;
      const currentDX = DX * progress;
      const currentDY = DY * progress;
      const currentOX = OX * progress;
      const currentOY = OY * progress;
  
      ctx.beginPath();
      ctx.moveTo(currentAX + offsetX, currentAY + offsetY);
      ctx.lineTo(currentBX + offsetX, currentBY + offsetY);
      ctx.lineTo(currentCX + offsetX, currentCY + offsetY);
      ctx.lineTo(currentDX + offsetX, currentDY + offsetY);
      ctx.closePath();
      ctx.fillStyle = 'lightblue';
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
  
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(currentAX + offsetX, currentAY + offsetY, 5, 0, 2 * Math.PI);
      ctx.fill();
  
      ctx.beginPath();
      ctx.arc(currentBX + offsetX, currentBY + offsetY, 5, 0, 2 * Math.PI);
      ctx.fill();
  
      ctx.beginPath();
      ctx.arc(currentCX + offsetX, currentCY + offsetY, 5, 0, 2 * Math.PI);
      ctx.fill();
  
      ctx.beginPath();
      ctx.arc(currentDX + offsetX, currentDY + offsetY, 5, 0, 2 * Math.PI);
      ctx.fill();
  
      if (isCentre){
        ctx.fillStyle = 'green';
      } else {
        ctx.fillStyle = 'yellow';
      }
      
      ctx.beginPath();
      ctx.arc(currentOX + offsetX, currentOY + offsetY, 5, 0, 2 * Math.PI);
      ctx.fill();
  
      if (progress < 1) {
        requestAnimationFrame(drawFrame); 
      }
    }
  
    requestAnimationFrame(drawFrame);
  }  

  isCentre() : boolean {
    const midAB = this.calculateMidpoint(this.points.AX, this.points.AY, this.points.BX, this.points.BY);
    const midBC = this.calculateMidpoint(this.points.BX, this.points.BY, this.points.CX, this.points.CY);
    const midCD = this.calculateMidpoint(this.points.CX, this.points.CY, this.points.DX, this.points.DY);
    const midDA = this.calculateMidpoint(this.points.DX, this.points.DY, this.points.AX, this.points.AY);

    const distOMidAB = this.calculateDistance(this.points.OX, this.points.OY, midAB.x, midAB.y);
    const distOMidBC = this.calculateDistance(this.points.OX, this.points.OY, midBC.x, midBC.y);
    const distOMidCD = this.calculateDistance(this.points.OX, this.points.OY, midCD.x, midCD.y);
    const distOMidDA = this.calculateDistance(this.points.OX, this.points.OY, midDA.x, midDA.y);

    const isCentre = distOMidAB === distOMidBC && distOMidBC === distOMidCD && distOMidCD === distOMidDA;

    return isCentre;
  }  

  calculateMidpoint(x1, y1, x2, y2) {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    return { x: midX, y: midY };
  }

  isSquare(points) : boolean {
    const { AX, AY, BX, BY, CX, CY, DX, DY } = points;
  
    const distAB = this.calculateDistance(AX, AY, BX, BY);
    const distBC = this.calculateDistance(BX, BY, CX, CY);
    const distCD = this.calculateDistance(CX, CY, DX, DY);
    const distDA = this.calculateDistance(DX, DY, AX, AY);
  
    const isAllSidesEqual = distAB === distBC && distBC === distCD && distCD === distDA;
  
    const angleABCD = this.calculateAngle(AX, AY, BX, BY, CX, CY);
    const angleBCDA = this.calculateAngle(BX, BY, CX, CY, DX, DY);
    const angleCDAB = this.calculateAngle(CX, CY, DX, DY, AX, AY);
    const angleDABC = this.calculateAngle(DX, DY, AX, AY, BX, BY);
  
    const isOppositeAnglesEqual = angleABCD === 90 && angleBCDA === 90 && angleCDAB === 90 && angleDABC === 90;
  
    return isAllSidesEqual && isOppositeAnglesEqual;
  }
  
  calculateDistance(x1, y1, x2, y2) : number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  calculateAngle(x1, y1, x2, y2, x3, y3) {
    const dx1 = x1 - x2;
    const dy1 = y1 - y2;
    const dx2 = x3 - x2;
    const dy2 = y3 - y2;
  
    const dotProduct = dx1 * dx2 + dy1 * dy2;
    const magnitude1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const magnitude2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  
    const angleRad = Math.acos(dotProduct / (magnitude1 * magnitude2));
    const angleDeg = (angleRad * 180) / Math.PI;
  
    return angleDeg;
  }
}
