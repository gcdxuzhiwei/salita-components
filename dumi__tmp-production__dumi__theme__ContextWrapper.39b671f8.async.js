"use strict";(self.webpackChunksalita_components=self.webpackChunksalita_components||[]).push([[923,786],{31021:function(G,_,e){e.r(_),e.d(_,{default:function(){return D}});var v=e(48305),h=e.n(v),r=e(26068),W=e.n(r),u=e(50959),c=e(7216),R=e(40688),g=e(41823),A=e(29979),E=e(40786),M=e(11527),x=W()({},E);function D(){var l=(0,c.pC)(),P=(0,u.useState)(!1),m=h()(P,2),b=m[0],y=m[1],t=(0,u.useRef)(c.m8.location.pathname);return(0,u.useEffect)(function(){return c.m8.listen(function(n){n.location.pathname!==t.current&&(t.current=n.location.pathname,document.documentElement.scrollTo(0,0))})},[]),(0,M.jsx)(R.D.Provider,{value:{pkg:{name:"salita-components",description:"A react library developed with dumi",version:"0.0.3",license:"MIT",repository:{type:"git",url:"https://github.com/gcdxuzhiwei/salita-components.git"},authors:["gcdxuzhiwei@gmail.com"]},historyType:"browser",entryExports:x,demos:g.DE,components:g.wx,locales:A.k,loading:b,setLoading:y,hostname:void 0,themeConfig:{title:"salita-components",footer:'Copyright \xA9 2024 | Powered by <a href="https://d.umijs.org" target="_blank" rel="noreferrer">dumi</a>',prefersColor:{default:"light",switch:!0},nprogress:!0,lastUpdated:!0,name:"salita-components",nav:[],sidebar:{"/":[{children:[{title:"\u4F7F\u7528\u8BF4\u660E",link:"/"},{title:"\u6C34\u5370",link:"/watermark"},{title:"\u8BCD\u4E91",link:"/word-cloud"}]}],"/watermark":[{children:[{title:"\u4F7F\u7528\u8BF4\u660E",link:"/"},{title:"\u6C34\u5370",link:"/watermark"},{title:"\u8BCD\u4E91",link:"/word-cloud"}]}],"/word-cloud":[{children:[{title:"\u4F7F\u7528\u8BF4\u660E",link:"/"},{title:"\u6C34\u5370",link:"/watermark"},{title:"\u8BCD\u4E91",link:"/word-cloud"}]}]},editLink:"https://github.com/gcdxuzhiwei/salita-components/edit/main/{filename}"},_2_level_nav_available:!0},children:l})}},40786:function(G,_,e){e.r(_),e.d(_,{Watermark:function(){return m},WordCloud:function(){return y}});var v=e(48305),h=e.n(v),r=e(50959),W=function(t){return t!==null&&typeof t=="object"},u=function(t){return typeof t=="function"},c=function(t){return typeof t=="string"},R=function(t){return typeof t=="boolean"},g=function(t){return typeof t=="number"},A=function(t){return typeof t=="undefined"},E=!1,M=E;function x(t){M&&(u(t)||console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof t)));var n=(0,r.useRef)(t);n.current=(0,r.useMemo)(function(){return t},[t]);var i=(0,r.useRef)();return i.current||(i.current=function(){for(var d=[],a=0;a<arguments.length;a++)d[a]=arguments[a];return n.current.apply(this,d)}),i.current}var D=x,l=e(11527),P=function(n){var i=n.content,d=n.color,a=d===void 0?"rgba(0,0,0,.15)":d,k=n.font,C=k===void 0?"normal normal normal 16px sans-serif":k,j=n.rotate,U=j===void 0?-22:j,L=n.gap,B=L===void 0?[100,100]:L,w=n.offset,z=w===void 0?[0,0]:w,K=n.zIndex,J=K===void 0?9:K,Q=n.children,V=(0,r.useState)(""),S=h()(V,2),F=S[0],X=S[1],Y=D(function(){var f=document.createElement("canvas"),o=f.getContext("2d"),$=U%360;o.fillStyle=a,o.font=C,o.textBaseline="top";var I=o.measureText(i),Z=I.actualBoundingBoxDescent,q=I.actualBoundingBoxAscent,O=I.width,T=Z-q,s=Math.abs($),p=s>270?360-s:s>180?s-180:s>90?180-s:s,H=Math.sin(p*Math.PI/180)*T+Math.cos(p*Math.PI/180)*O,N=Math.sin(p*Math.PI/180)*O+Math.cos(p*Math.PI/180)*T;f.width=H+B[0],f.height=N+B[1],o.fillStyle=a,o.font=C,o.textBaseline="top",o.translate(H/2,N/2),o.rotate($*Math.PI/180),o.fillText(i,-O/2,-T/2),X(f.toDataURL("image/png"))});return(0,r.useEffect)(function(){Y()},[i,a,C,U,B]),(0,l.jsxs)("div",{style:{position:"relative"},children:[F&&(0,l.jsx)("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundImage:"url(".concat(F,")"),backgroundRepeat:"repeat",zIndex:J,pointerEvents:"none",backgroundPosition:"".concat(z[0],"px ").concat(z[1],"px")}}),Q]})},m=P,b=function(){return(0,l.jsx)(l.Fragment,{children:"\u8FD9\u662F\u8BCD\u4E91\u7EC4\u4EF6"})},y=b}}]);