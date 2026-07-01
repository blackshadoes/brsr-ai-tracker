import { useEffect, useRef } from 'react';

export default function WaterBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, t = 0, animId;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const SY = () => H * 0.3;

    function noise(x, t, seed) {
      return Math.sin(x*0.007+t*0.00055+seed)
           + Math.sin(x*0.013+t*0.00082+seed*1.7)*0.6
           + Math.sin(x*0.021+t*0.00038+seed*2.3)*0.35
           + Math.sin(x*0.038+t*0.00120+seed*0.9)*0.18
           + Math.sin(x*0.055+t*0.00065+seed*3.1)*0.09;
    }

    const NP=90, px=new Float32Array(NP), py=new Float32Array(NP),
      pr=new Float32Array(NP), psp=new Float32Array(NP),
      pph=new Float32Array(NP), pop=new Float32Array(NP),
      pdr=new Float32Array(NP);
    for(let i=0;i<NP;i++){
      px[i]=Math.random()*1.2-0.1; py[i]=Math.random();
      pr[i]=Math.random()*1.6+0.3; psp[i]=Math.random()*0.00012+0.00005;
      pph[i]=Math.random()*Math.PI*2; pop[i]=Math.random()*0.4+0.1;
      pdr[i]=(Math.random()-0.5)*0.00006;
    }

    const NR=8, rX=new Float32Array(NR), rW=new Float32Array(NR),
      rOp=new Float32Array(NR), rPh=new Float32Array(NR), rSp=new Float32Array(NR);
    for(let i=0;i<NR;i++){
      rX[i]=0.06+i*0.125; rW[i]=0.022+Math.random()*0.03;
      rOp[i]=0.018+Math.random()*0.018; rPh[i]=Math.random()*Math.PI*2;
      rSp[i]=0.00018+Math.random()*0.00012;
    }

    function drawClouds(sy) {
      const defs=[
        {x:0.08,y:0.10,rx:0.18,ry:0.055,op:0.30},{x:0.30,y:0.05,rx:0.14,ry:0.042,op:0.22},
        {x:0.54,y:0.14,rx:0.20,ry:0.06,op:0.26},{x:0.76,y:0.07,rx:0.15,ry:0.048,op:0.20},
        {x:0.90,y:0.18,rx:0.13,ry:0.040,op:0.18},{x:0.42,y:0.28,rx:0.18,ry:0.048,op:0.15},
      ];
      defs.forEach(c=>{
        const cx=c.x*W,cy=c.y*sy,rx=c.rx*W,ry=c.ry*sy;
        const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(rx,ry));
        cg.addColorStop(0,`rgba(210,228,240,${c.op})`);
        cg.addColorStop(0.5,`rgba(180,210,230,${c.op*0.5})`);
        cg.addColorStop(1,'rgba(150,195,220,0)');
        ctx.save(); ctx.scale(1,ry/rx);
        ctx.beginPath(); ctx.arc(cx,cy*(rx/ry),rx,0,Math.PI*2);
        ctx.fillStyle=cg; ctx.fill(); ctx.restore();
      });
    }

    function draw() {
      const sy=SY();
      ctx.clearRect(0,0,W,H);

      const skyG=ctx.createLinearGradient(0,0,0,sy);
      skyG.addColorStop(0,'#0d1e30'); skyG.addColorStop(0.30,'#1a3a58');
      skyG.addColorStop(0.60,'#2a5a80'); skyG.addColorStop(0.82,'#3a6878');
      skyG.addColorStop(1,'#2a4a58');
      ctx.fillStyle=skyG; ctx.fillRect(0,0,W,sy);

      const sunX=W*0.5,sunY=sy*0.72;
      const sunR=ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,W*0.38);
      sunR.addColorStop(0,'rgba(255,230,180,0.10)'); sunR.addColorStop(0.08,'rgba(240,190,110,0.07)');
      sunR.addColorStop(0.25,'rgba(200,140,70,0.04)'); sunR.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sunR; ctx.fillRect(0,0,W,sy);

      const horizG=ctx.createLinearGradient(0,sy*0.55,0,sy);
      horizG.addColorStop(0,'rgba(180,130,80,0)'); horizG.addColorStop(1,'rgba(200,150,90,0.12)');
      ctx.fillStyle=horizG; ctx.fillRect(0,sy*0.55,W,sy*0.45);

      drawClouds(sy);

      const deepG=ctx.createLinearGradient(0,sy,0,H);
      deepG.addColorStop(0,'#1e4560'); deepG.addColorStop(0.10,'#0f3048');
      deepG.addColorStop(0.30,'#071e34'); deepG.addColorStop(0.60,'#031428');
      deepG.addColorStop(1,'#010810');
      ctx.fillStyle=deepG; ctx.fillRect(0,sy,W,H-sy);

      for(let i=0;i<NR;i++){
        const rx=rX[i]*W,rw=rW[i]*W;
        const op=rOp[i]*(0.75+0.25*Math.sin(t*rSp[i]*1000+rPh[i]));
        const rg=ctx.createLinearGradient(rx,sy,rx,H*0.88);
        rg.addColorStop(0,`rgba(110,200,195,${op})`);
        rg.addColorStop(0.4,`rgba(60,160,185,${op*0.45})`);
        rg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.moveTo(rx-rw*0.2,sy); ctx.lineTo(rx+rw*0.2,sy);
        ctx.lineTo(rx+rw*3.5,H*0.88); ctx.lineTo(rx-rw*3.5,H*0.88);
        ctx.closePath(); ctx.fillStyle=rg; ctx.fill();
      }

      for(let i=0;i<NP;i++){
        const wy=py[i]*H;
        if(wy<=sy+8) continue;
        const wobble=Math.sin(t*0.00055+pph[i])*4;
        const wx=px[i]*W+wobble;
        const depth=Math.min(1,(wy-sy)/(H-sy));
        const fade=1-depth*0.7;
        ctx.beginPath(); ctx.arc(wx,wy,pr[i],0,Math.PI*2);
        ctx.strokeStyle=`rgba(120,200,190,${pop[i]*fade*0.6})`; ctx.lineWidth=0.6; ctx.stroke();
        ctx.fillStyle=`rgba(190,235,230,${pop[i]*fade*0.09})`; ctx.fill();
        py[i]-=psp[i]; px[i]+=pdr[i];
        if(py[i]*H<sy){py[i]=1.0;px[i]=Math.random()*1.2-0.1;}
        if(px[i]<-0.1)px[i]=1.1; if(px[i]>1.1)px[i]=-0.1;
      }

      const waveCfg=[
        {yOff:20,amp:14,seed:0,aTop:0.80,cTop:[240,250,255],cBot:[95,165,205]},
        {yOff:11,amp:11,seed:1.8,aTop:0.58,cTop:[200,232,245],cBot:[55,130,190]},
        {yOff:3,amp:8,seed:3.5,aTop:0.42,cTop:[155,208,232],cBot:[30,105,175]},
        {yOff:-5,amp:6,seed:5.2,aTop:0.28,cTop:[110,185,218],cBot:[15,78,150]},
        {yOff:-11,amp:4,seed:6.8,aTop:0.18,cTop:[78,160,208],cBot:[6,50,122]},
      ];
      waveCfg.forEach(cfg=>{
        const baseY=sy+cfg.yOff;
        ctx.beginPath(); ctx.moveTo(-2,H+2);
        ctx.lineTo(-2,baseY+noise(0,t,cfg.seed)*cfg.amp);
        for(let x=0;x<=W;x+=3) ctx.lineTo(x,baseY+noise(x,t,cfg.seed)*cfg.amp);
        ctx.lineTo(W+2,H+2); ctx.closePath();
        const wg=ctx.createLinearGradient(0,baseY-cfg.amp,0,baseY+cfg.amp*2.8);
        const [r1,g1,b1]=cfg.cTop,[r2,g2,b2]=cfg.cBot;
        wg.addColorStop(0,`rgba(${r1},${g1},${b1},${cfg.aTop})`);
        wg.addColorStop(0.22,`rgba(${r2},${g2},${b2},${cfg.aTop*0.5})`);
        wg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=wg; ctx.fill();
      });

      ctx.beginPath();
      for(let x=0;x<=W;x+=3){
        const y=sy+noise(x,t,0)*14+20;
        x===0?ctx.moveTo(x,y-1):ctx.lineTo(x,y-1);
      }
      for(let x=W;x>=0;x-=3) ctx.lineTo(x,sy+noise(x,t,0)*14+20+7);
      ctx.closePath();
      const foam=ctx.createLinearGradient(0,sy+6,0,sy+34);
      foam.addColorStop(0,'rgba(245,252,255,0.50)'); foam.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=foam; ctx.fill();

      ctx.beginPath();
      for(let x=0;x<=W;x+=3){
        const y=sy+noise(x,t,0)*14+20;
        x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      }
      ctx.strokeStyle='rgba(255,255,255,0.25)'; ctx.lineWidth=1.5; ctx.stroke();

      t+=16;
      animId=requestAnimationFrame(draw);
    }

    draw();
    return()=>{
      cancelAnimationFrame(animId);
      window.removeEventListener('resize',resize);
    };
  },[]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', display:'block' }}
    />
  );
}
