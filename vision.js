// Piece recogniser for a 256x256 grayscale board (row-major, 0..255). The network is the MIT-licensed
// tensorflow_chessbot CNN (Elucidation): conv5x5x32 > pool > conv5x5x64 > pool > fc1024 > fc13, run here in plain JS.
// Classes: 0 empty, then KQRBNP (white), kqrbnp (black).
let M=null;
async function load(url){const b=await(await fetch(url)).arrayBuffer(),f=new Float32Array(b,0,67469);let o=0;const t=n=>f.subarray(o,o+=n);
 M={c1:t(800),b1:t(32),c2:t(51200),b2:t(64),sc:t(1024),b3:t(1024),f2:t(13312),b4:t(13),f1:new Int8Array(b,67469*4)}}
function conv(x,H,C,k,b,O){const P=H+4,p=new Float32Array(P*P*C),y=new Float32Array(H*H*O);
 for(let i=0;i<H;i++)for(let j=0;j<H;j++)for(let c=0;c<C;c++)p[((i+2)*P+j+2)*C+c]=x[(i*H+j)*C+c];
 for(let i=0;i<H;i++)for(let j=0;j<H;j++){const yo=(i*H+j)*O;for(let o=0;o<O;o++)y[yo+o]=b[o];
  for(let a=0;a<5;a++)for(let d=0;d<5;d++){const po=((i+a)*P+j+d)*C,ko=(a*5+d)*C*O;for(let c=0;c<C;c++){const v=p[po+c];if(!v)continue;const kc=ko+c*O;for(let o=0;o<O;o++)y[yo+o]+=v*k[kc+o]}}
  for(let o=0;o<O;o++)if(y[yo+o]<0)y[yo+o]=0}return y}
function pool(x,H,C){const h=H/2,y=new Float32Array(h*h*C);for(let i=0;i<h;i++)for(let j=0;j<h;j++)for(let c=0;c<C;c++){let m=-1e9;for(let a=0;a<2;a++)for(let d=0;d<2;d++)m=Math.max(m,x[((2*i+a)*H+2*j+d)*C+c]);y[(i*h+j)*C+c]=m}return y}
function tile(t){let x=pool(conv(t,32,1,M.c1,M.b1,32),32,32);x=pool(conv(x,16,32,M.c2,M.b2,64),16,64);
 const h=new Float32Array(1024);for(let i=0;i<4096;i++){const v=x[i];if(!v)continue;const r=i*1024;for(let o=0;o<1024;o++)h[o]+=v*M.f1[r+o]}
 for(let o=0;o<1024;o++)h[o]=Math.max(0,h[o]*M.sc[o]+M.b3[o]);const z=Array.from(M.b4);for(let o=0;o<1024;o++){const v=h[o];if(!v)continue;for(let c=0;c<13;c++)z[c]+=v*M.f2[o*13+c]}
 const mx=Math.max(...z),e=z.map(v=>Math.exp(v-mx)),s=e.reduce((a,b)=>a+b);return e.map(v=>v/s)}
onmessage=async({data})=>{if(!M)await load(data.url);const g=data.g,out=[];
 for(let r=0;r<8;r++)for(let c=0;c<8;c++){const t=new Float32Array(1024);let m=0,q=0;for(let i=0;i<32;i++)for(let j=0;j<32;j++){const v=g[(r*32+i)*256+c*32+j];t[i*32+j]=v;m+=v;q+=v*v}
  m/=1024;out.push(q/1024-m*m<9?[1,0,0,0,0,0,0,0,0,0,0,0,0]:tile(t));postMessage({n:out.length})}
 postMessage({p:out})}
