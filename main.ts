const f=require('fs'),A0=process.env.MAKEFUN_INPUT_DIR||'/input',B0=process.env.MAKEFUN_OUTPUT_DIR||'/output';
function R(P,I){
 let s=[],c=[],m=new Int32Array(256),p=0,q=0,o=[],t=0;
 const T=x=>{throw x};
 const N=n=>{if(s.length<n)T(2)};
 const W=v=>{if(s.length>255)T(3);s.push(v|0)};
 const U=()=>{N(2);let b=s.pop();return[s.pop(),b]};
 try{
  for(;;){
   if(t>=1e6)T(10);
   if(p<0||p>=P.length)T(9);
   let k=P[p],a,b,j;
   if(k==1){if(p+2>P.length)T(9);W(P.readInt8(p+1));p+=2}
   else if(k==2){if(p+5>P.length)T(9);W(P.readInt32LE(p+1));p+=5}
   else if(k==0)return[0,o];
   else if(k==3){N(1);s.pop();p++}
   else if(k==4){N(1);W(s[s.length-1]);p++}
   else if(k==5){N(2);b=s.pop();a=s.pop();s.push(b);s.push(a);p++}
   else if(k==6){N(2);W(s[s.length-2]);p++}
   else if(k==7){N(3);a=s[s.length-3];s[s.length-3]=s[s.length-2];s[s.length-2]=s[s.length-1];s[s.length-1]=a;p++}
   else if(k==0x10){[a,b]=U();W(a+b);p++}
   else if(k==0x11){[a,b]=U();W(a-b);p++}
   else if(k==0x12){[a,b]=U();W(Math.imul(a,b));p++}
   else if(k==0x13){[a,b]=U();if(!b)T(4);W(a/b);p++}
   else if(k==0x14){[a,b]=U();if(!b)T(4);W(a%b);p++}
   else if(k==0x15){[a,b]=U();if(!b)T(4);W((a>>>0)/(b>>>0));p++}
   else if(k==0x16){[a,b]=U();if(!b)T(4);W((a>>>0)%(b>>>0));p++}
   else if(k==0x17){N(1);W(-s.pop());p++}
   else if(k==0x18){[a,b]=U();W(a&b);p++}
   else if(k==0x19){[a,b]=U();W(a|b);p++}
   else if(k==0x1a){[a,b]=U();W(a^b);p++}
   else if(k==0x1b){N(1);W(~s.pop());p++}
   else if(k==0x1c){[a,b]=U();W(a<<b);p++}
   else if(k==0x1d){[a,b]=U();W(a>>b);p++}
   else if(k==0x1e){[a,b]=U();W(a>>>b);p++}
   else if(k==0x20){[a,b]=U();W(a==b?1:0);p++}
   else if(k==0x21){[a,b]=U();W(a<b?1:0);p++}
   else if(k==0x22){[a,b]=U();W((a>>>0)<(b>>>0)?1:0);p++}
   else if(k==0x30){if(p+3>P.length)T(9);p+=3+P.readInt16LE(p+1)}
   else if(k==0x31||k==0x32){if(p+3>P.length)T(9);j=P.readInt16LE(p+1);N(1);a=s.pop();p+=3;if((k==0x31)==(a==0))p+=j}
   else if(k==0x33){if(p+3>P.length)T(9);if(c.length>63)T(7);c.push(p+3);p=P.readUInt16LE(p+1)}
   else if(k==0x34){if(!c.length)T(8);p=c.pop()}
   else if(k==0x40){N(1);a=s.pop();if(a<0||a>255)T(6);W(m[a]);p++}
   else if(k==0x41){N(2);a=s.pop();b=s.pop();if(a<0||a>255)T(6);m[a]=b;p++}
   else if(k==0x50){N(1);a=s.pop();let d=String(a);if(o.length+d.length>65536)T(11);for(const c of d)o.push(c.charCodeAt(0));p++}
   else if(k==0x51){N(1);a=s.pop();if(o.length>65535)T(11);o.push(a&255);p++}
   else if(k==0x52){W(q<I.length?I[q++]:-1);p++}
   else if(k==0x53){N(1);a=s.pop();return[a&255,o]}
   else T(5);
   t++;
  }
 }catch(x){if(typeof x!='number')throw x;return[x,o]}
}
for(let n=1;n<41;n++){
 const d='i'+('00'+n).slice(-3),A=A0+'/'+d+'/',B=B0+'/'+d+'/';
 const r=R(f.readFileSync(A+'program.bin'),f.readFileSync(A+'input.bin'));
 f.mkdirSync(B,{recursive:true});
 f.writeFileSync(B+'stdout.bin',Buffer.from(r[1]));
 f.writeFileSync(B+'exit.txt',r[0]+'\n');
}
