import{k as $e,p as L,m as H,a as q,b as se,g as E,c as oe,u as mt,d as Se,e as Me,r as P,f as m,s as ne,w as j,h as ze,i as Y,j as G,l as ce,n as t,V as le,I as X,o as we,q as ht,F as W,t as $,v as F,x as gt,y as Ve,z as Ye,A as kt,B as xe,C as Oe,D as yt,E as pt,G as Xe,M as Ge,H as bt,J as _t,K as Ie,L as Ct,N as Vt,O as Ae,P as It,Q as Z,R as ie,S as He,T as Ne,U as je,W as We,X as Fe,Y as St,Z as qe,_ as Qe,$ as Ke,a0 as Ue,a1 as Je,a2 as Ze,a3 as wt,a4 as et,a5 as tt,a6 as xt,a7 as M,a8 as z,a9 as at,aa as At,ab as Bt,ac as nt,ad as Pt,ae as Tt,af as Lt,ag as lt,ah as Et,ai as Rt,aj as l,ak as Dt,al as $t,am as Mt,an as fe,ao as D,ap as zt,aq as ee,ar as te,as as c,at as me,au as he,av as ge,aw as ke,ax as ye,ay as T,az as pe}from"./entry.pbjVHHWJ.js";const Yt=e=>{const{touchstartX:s,touchendX:a,touchstartY:n,touchendY:i}=e,u=.5,o=16;e.offsetX=a-s,e.offsetY=i-n,Math.abs(e.offsetY)<u*Math.abs(e.offsetX)&&(e.left&&a<s-o&&e.left(e),e.right&&a>s+o&&e.right(e)),Math.abs(e.offsetX)<u*Math.abs(e.offsetY)&&(e.up&&i<n-o&&e.up(e),e.down&&i>n+o&&e.down(e))};function Ot(e,s){var n;const a=e.changedTouches[0];s.touchstartX=a.clientX,s.touchstartY=a.clientY,(n=s.start)==null||n.call(s,{originalEvent:e,...s})}function Xt(e,s){var n;const a=e.changedTouches[0];s.touchendX=a.clientX,s.touchendY=a.clientY,(n=s.end)==null||n.call(s,{originalEvent:e,...s}),Yt(s)}function Gt(e,s){var n;const a=e.changedTouches[0];s.touchmoveX=a.clientX,s.touchmoveY=a.clientY,(n=s.move)==null||n.call(s,{originalEvent:e,...s})}function Ht(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const s={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:a=>Ot(a,s),touchend:a=>Xt(a,s),touchmove:a=>Gt(a,s)}}function Nt(e,s){var v;const a=s.value,n=a!=null&&a.parent?e.parentElement:e,i=(a==null?void 0:a.options)??{passive:!0},u=(v=s.instance)==null?void 0:v.$.uid;if(!n||!u)return;const o=Ht(s.value);n._touchHandlers=n._touchHandlers??Object.create(null),n._touchHandlers[u]=o,$e(o).forEach(h=>{n.addEventListener(h,o[h],i)})}function jt(e,s){var u,o;const a=(u=s.value)!=null&&u.parent?e.parentElement:e,n=(o=s.instance)==null?void 0:o.$.uid;if(!(a!=null&&a._touchHandlers)||!n)return;const i=a._touchHandlers[n];$e(i).forEach(v=>{a.removeEventListener(v,i[v])}),delete a._touchHandlers[n]}const it={mounted:Nt,unmounted:jt},Wt=it,st=Symbol.for("vuetify:v-window"),ot=Symbol.for("vuetify:v-window-group"),ct=L({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||e==="hover"},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{type:[Boolean,String],default:"force"},...H(),...q(),...se()},"VWindow"),Ee=E()({name:"VWindow",directives:{Touch:it},props:ct(),emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:a}=s;const{themeClasses:n}=oe(e),{isRtl:i}=mt(),{t:u}=Se(),o=Me(e,ot),v=P(),h=m(()=>i.value?!e.reverse:e.reverse),g=ne(!1),S=m(()=>{const k=e.direction==="vertical"?"y":"x",I=(h.value?!g.value:g.value)?"-reverse":"";return`v-window-${k}${I}-transition`}),C=ne(0),V=P(void 0),w=m(()=>o.items.value.findIndex(k=>o.selected.value.includes(k.id)));j(w,(k,p)=>{const I=o.items.value.length,_=I-1;I<=2?g.value=k<p:k===_&&p===0?g.value=!0:k===0&&p===_?g.value=!1:g.value=k<p}),ze(st,{transition:S,isReversed:g,transitionCount:C,transitionHeight:V,rootRef:v});const f=m(()=>e.continuous||w.value!==0),x=m(()=>e.continuous||w.value!==o.items.value.length-1);function r(){f.value&&o.prev()}function b(){x.value&&o.next()}const N=m(()=>{const k=[],p={icon:i.value?e.nextIcon:e.prevIcon,class:`v-window__${h.value?"right":"left"}`,onClick:o.prev,ariaLabel:u("$vuetify.carousel.prev")};k.push(f.value?a.prev?a.prev({props:p}):t(le,p,null):t("div",null,null));const I={icon:i.value?e.prevIcon:e.nextIcon,class:`v-window__${h.value?"left":"right"}`,onClick:o.next,ariaLabel:u("$vuetify.carousel.next")};return k.push(x.value?a.next?a.next({props:I}):t(le,I,null):t("div",null,null)),k}),B=m(()=>e.touch===!1?e.touch:{...{left:()=>{h.value?r():b()},right:()=>{h.value?b():r()},start:p=>{let{originalEvent:I}=p;I.stopPropagation()}},...e.touch===!0?{}:e.touch});return Y(()=>G(t(e.tag,{ref:v,class:["v-window",{"v-window--show-arrows-on-hover":e.showArrows==="hover"},n.value,e.class],style:e.style},{default:()=>{var k,p;return[t("div",{class:"v-window__container",style:{height:V.value}},[(k=a.default)==null?void 0:k.call(a,{group:o}),e.showArrows!==!1&&t("div",{class:"v-window__controls"},[N.value])]),(p=a.additional)==null?void 0:p.call(a,{group:o})]}}),[[ce("touch"),B.value]])),{group:o}}}),Ft=L({color:String,cycle:Boolean,delimiterIcon:{type:X,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:e=>Number(e)>0},progress:[Boolean,String],verticalDelimiters:[Boolean,String],...ct({continuous:!0,mandatory:"force",showArrows:!0})},"VCarousel"),qt=E()({name:"VCarousel",props:Ft(),emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:a}=s;const n=we(e,"modelValue"),{t:i}=Se(),u=P();let o=-1;j(n,h),j(()=>e.interval,h),j(()=>e.cycle,g=>{g?h():window.clearTimeout(o)}),ht(v);function v(){!e.cycle||!u.value||(o=window.setTimeout(u.value.group.next,+e.interval>0?+e.interval:6e3))}function h(){window.clearTimeout(o),window.requestAnimationFrame(v)}return Y(()=>{const g=Ee.filterProps(e);return t(Ee,F({ref:u},g,{modelValue:n.value,"onUpdate:modelValue":S=>n.value=S,class:["v-carousel",{"v-carousel--hide-delimiter-background":e.hideDelimiterBackground,"v-carousel--vertical-delimiters":e.verticalDelimiters},e.class],style:[{height:Ve(e.height)},e.style]}),{default:a.default,additional:S=>{let{group:C}=S;return t(W,null,[!e.hideDelimiters&&t("div",{class:"v-carousel__controls",style:{left:e.verticalDelimiters==="left"&&e.verticalDelimiters?0:"auto",right:e.verticalDelimiters==="right"?0:"auto"}},[C.items.value.length>0&&t($,{defaults:{VBtn:{color:e.color,icon:e.delimiterIcon,size:"x-small",variant:"text"}},scoped:!0},{default:()=>[C.items.value.map((V,w)=>{const f={id:`carousel-item-${V.id}`,"aria-label":i("$vuetify.carousel.ariaLabel.delimiter",w+1,C.items.value.length),class:["v-carousel__controls__item",C.isSelected(V.id)&&"v-btn--active"],onClick:()=>C.select(V.id,!0)};return a.item?a.item({props:f,item:V}):t(le,F(V,f),null)})]})]),e.progress&&t(gt,{class:"v-carousel__progress",color:typeof e.progress=="string"?e.progress:void 0,modelValue:(C.getItemIndex(n.value)+1)/C.items.value.length*100},null)])},prev:a.prev,next:a.next})}),{}}}),ut=L({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...H(),...Ye(),...kt()},"VWindowItem"),Re=E()({name:"VWindowItem",directives:{Touch:Wt},props:ut(),emits:{"group:selected":e=>!0},setup(e,s){let{slots:a}=s;const n=xe(st),i=Oe(e,ot),{isBooted:u}=yt();if(!n||!i)throw new Error("[Vuetify] VWindowItem must be used inside VWindow");const o=ne(!1),v=m(()=>u.value&&(n.isReversed.value?e.reverseTransition!==!1:e.transition!==!1));function h(){!o.value||!n||(o.value=!1,n.transitionCount.value>0&&(n.transitionCount.value-=1,n.transitionCount.value===0&&(n.transitionHeight.value=void 0)))}function g(){var f;o.value||!n||(o.value=!0,n.transitionCount.value===0&&(n.transitionHeight.value=Ve((f=n.rootRef.value)==null?void 0:f.clientHeight)),n.transitionCount.value+=1)}function S(){h()}function C(f){o.value&&bt(()=>{!v.value||!o.value||!n||(n.transitionHeight.value=Ve(f.clientHeight))})}const V=m(()=>{const f=n.isReversed.value?e.reverseTransition:e.transition;return v.value?{name:typeof f!="string"?n.transition.value:f,onBeforeEnter:g,onAfterEnter:h,onEnterCancelled:S,onBeforeLeave:g,onAfterLeave:h,onLeaveCancelled:S,onEnter:C}:!1}),{hasContent:w}=pt(e,i.isSelected);return Y(()=>t(Ge,{transition:V.value,disabled:!u.value},{default:()=>{var f;return[G(t("div",{class:["v-window-item",i.selectedClass.value,e.class],style:e.style},[w.value&&((f=a.default)==null?void 0:f.call(a))]),[[Xe,i.isSelected.value]])]}})),{groupItem:i}}}),Qt=L({..._t(),...ut()},"VCarouselItem"),be=E()({name:"VCarouselItem",inheritAttrs:!1,props:Qt(),setup(e,s){let{slots:a,attrs:n}=s;Y(()=>{const i=Ie.filterProps(e),u=Re.filterProps(e);return t(Re,F({class:"v-carousel-item"},u),{default:()=>[t(Ie,F(n,i),a)]})})}}),dt=Symbol.for("vuetify:v-chip-group"),Kt=L({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:Ct},...H(),...Vt({selectedClass:"v-chip--selected"}),...q(),...se(),...Ae({variant:"tonal"})},"VChipGroup");E()({name:"VChipGroup",props:Kt(),emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:a}=s;const{themeClasses:n}=oe(e),{isSelected:i,select:u,next:o,prev:v,selected:h}=Me(e,dt);return It({VChip:{color:Z(e,"color"),disabled:Z(e,"disabled"),filter:Z(e,"filter"),variant:Z(e,"variant")}}),Y(()=>t(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},n.value,e.class],style:e.style},{default:()=>{var g;return[(g=a.default)==null?void 0:g.call(a,{isSelected:i,select:u,next:o,prev:v,selected:h.value})]}})),{}}});const Ut=L({activeClass:String,appendAvatar:String,appendIcon:X,closable:Boolean,closeIcon:{type:X,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:X,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:ie(),onClickOnce:ie(),...He(),...H(),...Ne(),...je(),...Ye(),...We(),...Fe(),...St(),...q({tag:"span"}),...se(),...Ae({variant:"tonal"})},"VChip"),d=E()({name:"VChip",directives:{Ripple:qe},props:Ut(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,s){let{attrs:a,emit:n,slots:i}=s;const{t:u}=Se(),{borderClasses:o}=Qe(e),{colorClasses:v,colorStyles:h,variantClasses:g}=Ke(e),{densityClasses:S}=Ue(e),{elevationClasses:C}=Je(e),{roundedClasses:V}=Ze(e),{sizeClasses:w}=wt(e),{themeClasses:f}=oe(e),x=we(e,"modelValue"),r=Oe(e,dt,!1),b=et(e,a),N=m(()=>e.link!==!1&&b.isLink.value),B=m(()=>!e.disabled&&e.link!==!1&&(!!r||e.link||b.isClickable.value)),k=m(()=>({"aria-label":u(e.closeLabel),onClick(_){_.stopPropagation(),x.value=!1,n("click:close",_)}}));function p(_){var R;n("click",_),B.value&&((R=b.navigate)==null||R.call(b,_),r==null||r.toggle())}function I(_){(_.key==="Enter"||_.key===" ")&&(_.preventDefault(),p(_))}return()=>{const _=b.isLink.value?"a":e.tag,R=!!(e.appendIcon||e.appendAvatar),ue=!!(R||i.append),de=!!(i.close||e.closable),Q=!!(i.filter||e.filter)&&r,K=!!(e.prependIcon||e.prependAvatar),re=!!(K||i.prepend),U=!r||r.isSelected.value;return x.value&&G(t(_,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":B.value,"v-chip--filter":Q,"v-chip--pill":e.pill},f.value,o.value,U?v.value:void 0,S.value,C.value,V.value,w.value,g.value,r==null?void 0:r.selectedClass.value,e.class],style:[U?h.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:b.href.value,tabindex:B.value?0:void 0,onClick:p,onKeydown:B.value&&!N.value&&I},{default:()=>{var O;return[tt(B.value,"v-chip"),Q&&t(xt,{key:"filter"},{default:()=>[G(t("div",{class:"v-chip__filter"},[i.filter?t($,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},i.filter):t(M,{key:"filter-icon",icon:e.filterIcon},null)]),[[Xe,r.isSelected.value]])]}),re&&t("div",{key:"prepend",class:"v-chip__prepend"},[i.prepend?t($,{key:"prepend-defaults",disabled:!K,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},i.prepend):t(W,null,[e.prependIcon&&t(M,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&t(z,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),t("div",{class:"v-chip__content"},[((O=i.default)==null?void 0:O.call(i,{isSelected:r==null?void 0:r.isSelected.value,selectedClass:r==null?void 0:r.selectedClass.value,select:r==null?void 0:r.select,toggle:r==null?void 0:r.toggle,value:r==null?void 0:r.value.value,disabled:e.disabled}))??e.text]),ue&&t("div",{key:"append",class:"v-chip__append"},[i.append?t($,{key:"append-defaults",disabled:!R,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},i.append):t(W,null,[e.appendIcon&&t(M,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&t(z,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),de&&t("button",F({key:"close",class:"v-chip__close",type:"button"},k.value),[i.close?t($,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},i.close):t(M,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[ce("ripple"),B.value&&e.ripple,null]])}}}),Jt=L({modelValue:Boolean,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},...H(),...at(),...q(),...At({transition:"fade-transition"})},"VLazy"),_e=E()({name:"VLazy",directives:{intersect:Bt},props:Jt(),emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:a}=s;const{dimensionStyles:n}=nt(e),i=we(e,"modelValue");function u(o){i.value||(i.value=o)}return Y(()=>G(t(e.tag,{class:["v-lazy",e.class],style:[n.value,e.style]},{default:()=>[i.value&&t(Ge,{transition:e.transition,appear:!0},{default:()=>{var o;return[(o=a.default)==null?void 0:o.call(a)]}})]}),[[ce("intersect"),{handler:u,options:e.options},null]])),{}}}),Zt=Symbol.for("vuetify:list");function ea(){return xe(Zt,null)}const De=Symbol.for("vuetify:nested"),ta={id:ne(),root:{register:()=>null,unregister:()=>null,parents:P(new Map),children:P(new Map),open:()=>null,openOnSelect:()=>null,select:()=>null,opened:P(new Set),selected:P(new Map),selectedValues:P([])}},aa=(e,s)=>{const a=xe(De,ta),n=Symbol(Pt()),i=m(()=>e.value!==void 0?e.value:n),u={...a,id:i,open:(o,v)=>a.root.open(i.value,o,v),openOnSelect:(o,v)=>a.root.openOnSelect(i.value,o,v),isOpen:m(()=>a.root.opened.value.has(i.value)),parent:m(()=>a.root.parents.value.get(i.value)),select:(o,v)=>a.root.select(i.value,o,v),isSelected:m(()=>a.root.selected.value.get(Lt(i.value))==="on"),isIndeterminate:m(()=>a.root.selected.value.get(i.value)==="indeterminate"),isLeaf:m(()=>!a.root.children.value.get(i.value)),isGroupActivator:a.isGroupActivator};return!a.isGroupActivator&&a.root.register(i.value,a.id.value,s),Tt(()=>{!a.isGroupActivator&&a.root.unregister(i.value)}),s&&ze(De,u),u},na=lt("v-list-item-subtitle"),ae=lt("v-list-item-title"),la=L({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:X,baseColor:String,disabled:Boolean,lines:String,link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:X,ripple:{type:[Boolean,Object],default:!0},slim:Boolean,subtitle:[String,Number],title:[String,Number],value:null,onClick:ie(),onClickOnce:ie(),...He(),...H(),...Ne(),...at(),...je(),...We(),...Fe(),...q(),...se(),...Ae({variant:"text"})},"VListItem"),Ce=E()({name:"VListItem",directives:{Ripple:qe},props:la(),emits:{click:e=>!0},setup(e,s){let{attrs:a,slots:n,emit:i}=s;const u=et(e,a),o=m(()=>e.value===void 0?u.href.value:e.value),{select:v,isSelected:h,isIndeterminate:g,isGroupActivator:S,root:C,parent:V,openOnSelect:w}=aa(o,!1),f=ea(),x=m(()=>{var y;return e.active!==!1&&(e.active||((y=u.isActive)==null?void 0:y.value)||h.value)}),r=m(()=>e.link!==!1&&u.isLink.value),b=m(()=>!e.disabled&&e.link!==!1&&(e.link||u.isClickable.value||e.value!=null&&!!f)),N=m(()=>e.rounded||e.nav),B=m(()=>e.color??e.activeColor),k=m(()=>({color:x.value?B.value??e.baseColor:e.baseColor,variant:e.variant}));j(()=>{var y;return(y=u.isActive)==null?void 0:y.value},y=>{y&&V.value!=null&&C.open(V.value,!0),y&&w(y)},{immediate:!0});const{themeClasses:p}=oe(e),{borderClasses:I}=Qe(e),{colorClasses:_,colorStyles:R,variantClasses:ue}=Ke(k),{densityClasses:de}=Ue(e),{dimensionStyles:Q}=nt(e),{elevationClasses:K}=Je(e),{roundedClasses:re}=Ze(N),U=m(()=>e.lines?`v-list-item--${e.lines}-line`:void 0),O=m(()=>({isActive:x.value,select:v,isSelected:h.value,isIndeterminate:g.value}));function Be(y){var J;i("click",y),!(S||!b.value)&&((J=u.navigate)==null||J.call(u,y),e.value!=null&&v(!h.value,y))}function rt(y){(y.key==="Enter"||y.key===" ")&&(y.preventDefault(),Be(y))}return Y(()=>{const y=r.value?"a":e.tag,J=n.title||e.title!=null,vt=n.subtitle||e.subtitle!=null,Pe=!!(e.appendAvatar||e.appendIcon),ft=!!(Pe||n.append),Te=!!(e.prependAvatar||e.prependIcon),ve=!!(Te||n.prepend);return f==null||f.updateHasPrepend(ve),e.activeColor&&Et("active-color",["color","base-color"]),G(t(y,{class:["v-list-item",{"v-list-item--active":x.value,"v-list-item--disabled":e.disabled,"v-list-item--link":b.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!ve&&(f==null?void 0:f.hasPrepend.value),"v-list-item--slim":e.slim,[`${e.activeClass}`]:e.activeClass&&x.value},p.value,I.value,_.value,de.value,K.value,U.value,re.value,ue.value,e.class],style:[R.value,Q.value,e.style],href:u.href.value,tabindex:b.value?f?-2:0:void 0,onClick:Be,onKeydown:b.value&&!r.value&&rt},{default:()=>{var Le;return[tt(b.value||x.value,"v-list-item"),ve&&t("div",{key:"prepend",class:"v-list-item__prepend"},[n.prepend?t($,{key:"prepend-defaults",disabled:!Te,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>{var A;return[(A=n.prepend)==null?void 0:A.call(n,O.value)]}}):t(W,null,[e.prependAvatar&&t(z,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&t(M,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)]),t("div",{class:"v-list-item__spacer"},null)]),t("div",{class:"v-list-item__content","data-no-activator":""},[J&&t(ae,{key:"title"},{default:()=>{var A;return[((A=n.title)==null?void 0:A.call(n,{title:e.title}))??e.title]}}),vt&&t(na,{key:"subtitle"},{default:()=>{var A;return[((A=n.subtitle)==null?void 0:A.call(n,{subtitle:e.subtitle}))??e.subtitle]}}),(Le=n.default)==null?void 0:Le.call(n,O.value)]),ft&&t("div",{key:"append",class:"v-list-item__append"},[n.append?t($,{key:"append-defaults",disabled:!Pe,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>{var A;return[(A=n.append)==null?void 0:A.call(n,O.value)]}}):t(W,null,[e.appendIcon&&t(M,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&t(z,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)]),t("div",{class:"v-list-item__spacer"},null)])]}}),[[ce("ripple"),b.value&&e.ripple]])}),{}}}),ia=T("div",{class:"ftext-ht2 text-center mb-1"}," アプリ開発の情報発信ラボ ",-1),sa=T("div",{class:"ftext-ht1g text-center mb-1"}," はじめまして、Y.NetLaboです。私たちは企業ではありません。 ",-1),oa=T("div",{class:"ftext-ht1g text-center mb-1"}," アプリ開発好きな個人が作品を作ってます。 ",-1),ca=T("div",{class:"ftext-ht2 text-center mb-1"},"出会った技術要素",-1),ua=T("div",{class:"ftext-ht1g text-center mb-1"},"Language & Framework",-1),da={class:"text-center"},ra=T("div",{class:"ftext-ht1g text-center mb-1"}," Infrastructure & Cloud Service ",-1),va={class:"text-center"},ma={__name:"index",setup(e){P(!1);function s(){navigator.share({url:"https://web.ynetlabo.net/",title:"Y.NetLabo"})}return(a,n)=>(Mt(),Rt("div",null,[t(Dt,null,{default:l(()=>[t(_e,{"min-height":"350",options:{threshold:.5},transition:"slide-y-transition"},{default:l(()=>[t(fe,null,{default:l(()=>[t(D,{cols:"12"},{default:l(()=>[t(Ie,{contain:"",src:zt,height:"200px"}),ia,sa,oa]),_:1})]),_:1})]),_:1}),t(_e,{"min-height":"400",options:{threshold:.5},transition:"slide-y-reverse-transition"},{default:l(()=>[t(fe,null,{default:l(()=>[t(D,{cols:"12"},{default:l(()=>[t(ee,{variant:"outlined",color:"orange-darken-1"},{default:l(()=>[t(te,null,{default:l(()=>[t(M,{icon:"mdi-new-box"}),c("Whats New!?")]),_:1}),t(qt,{cycle:"",height:"300","show-arrows":!1},{default:l(()=>[t(be,null,{default:l(()=>[t(me,{height:"100%"},{default:l(()=>[t(ee,{variant:"flat",onClick:n[0]||(n[0]=i=>("navigateTo"in a?a.navigateTo:he(pe))("https://qiita.com/ynetlabo",{external:!0,open:{target:"_blank"}}))},{default:l(()=>[t(te,null,{default:l(()=>[c("Qiita始めました")]),_:1}),t(ge,null,{default:l(()=>[c("2024.01.21")]),_:1}),t(ke,null,{default:l(()=>[c("ラボで作成したアプリのノウハウ備忘録のために、Qiita始めました。ぜひ覗いてみてください。")]),_:1}),t(ye,null,{default:l(()=>[t(Ce,{class:"w-100"},{prepend:l(()=>[t(z,{color:"grey-darken-3",image:"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/273836/profile-images/1705771716"})]),default:l(()=>[t(ae,null,{default:l(()=>[c("@ynetlabo")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(be,null,{default:l(()=>[t(me,{height:"100%"},{default:l(()=>[t(ee,{variant:"flat",onClick:n[1]||(n[1]=i=>("navigateTo"in a?a.navigateTo:he(pe))("https://wari.ynetlabo.net",{external:!0,open:{target:"_blank"}}))},{default:l(()=>[t(te,null,{default:l(()=>[c("wa/riを公開しました")]),_:1}),t(ge,null,{default:l(()=>[c("2024.01.20")]),_:1}),t(ke,null,{default:l(()=>[c("みんなの建て替え、簡単に割り勘。旅行・飲み会・パーティ後の精算をお手伝いします。シンプルなデザインで使いやすく仕上げました。もちろん無料でご利用いただけます。")]),_:1}),t(ye,null,{default:l(()=>[t(Ce,{class:"w-100"},{prepend:l(()=>[t(z,{color:"grey-darken-3",image:"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/273836/profile-images/1705771716"})]),default:l(()=>[t(ae,null,{default:l(()=>[c("@ynetlabo")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(be,null,{default:l(()=>[t(me,{height:"100%"},{default:l(()=>[t(ee,{variant:"flat",onClick:n[2]||(n[2]=i=>("navigateTo"in a?a.navigateTo:he(pe))("https://mapengu.ynetlabo.net",{external:!0,open:{target:"_blank"}}))},{default:l(()=>[t(te,null,{default:l(()=>[c("mapenguを公開しました")]),_:1}),t(ge,null,{default:l(()=>[c("2023.04.04")]),_:1}),t(ke,null,{default:l(()=>[c("maPenguでペンギンスポットの詳細を確認しよう！。laboのおすすめペンギン🐧スポットを紹介！。可愛いペンギンとマッチング／マッピングしてます！。スポット選定に活用してみてください。")]),_:1}),t(ye,null,{default:l(()=>[t(Ce,{class:"w-100"},{prepend:l(()=>[t(z,{color:"grey-darken-3",image:"https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/273836/profile-images/1705771716"})]),default:l(()=>[t(ae,null,{default:l(()=>[c("@ynetlabo")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(_e,{"min-height":"450",options:{threshold:.5},transition:"slide-y-reverse-transition"},{default:l(()=>[t(fe,null,{default:l(()=>[t(D,{cols:"12"},{default:l(()=>[ca]),_:1}),t(D,{cols:"12"},{default:l(()=>[ua]),_:1}),t(D,{cols:"12"},{default:l(()=>[T("div",da,[t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" Nuxt.js ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" Vuetify ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" Vue.js ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" Type Script ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" flutter ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" swift ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" React.js ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" React Native ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" shell ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" SQL ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" MyBatis ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" Thymeleaf ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" Spring Boot ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" java ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" VB.Net ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" VBA ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" VB6 ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" java script ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" css ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-application-brackets"},{default:l(()=>[c(" html ")]),_:1})])]),_:1}),t(D,{cols:"12"},{default:l(()=>[ra]),_:1}),t(D,{cols:"12"},{default:l(()=>[T("div",va,[t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-cloud"},{default:l(()=>[c(" AWS ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-cloud"},{default:l(()=>[c(" Firebase ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-cloud"},{default:l(()=>[c(" GitHub ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-cloud"},{default:l(()=>[c(" IBM Cloud ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-server"},{default:l(()=>[c(" nginx ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-server"},{default:l(()=>[c(" docker ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-server"},{default:l(()=>[c(" Apache ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-server"},{default:l(()=>[c(" Tomcat ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-database"},{default:l(()=>[c(" mySQL ")]),_:1}),t(d,{class:"ma-2",color:"pink-darken-1","prepend-icon":"mdi-database"},{default:l(()=>[c(" PostgreSQL ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-database"},{default:l(()=>[c(" SQLServer ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-database"},{default:l(()=>[c(" Oracle ")]),_:1}),t(d,{class:"ma-2",color:"indigo","prepend-icon":"mdi-database"},{default:l(()=>[c(" MS Access ")]),_:1})])]),_:1})]),_:1})]),_:1})]),_:1}),t($t,null,{default:l(()=>[t(le,{style:{display:"block",position:"fixed",right:"10px",top:"5px"},color:"orange-darken-1",size:"large",icon:"mdi-share-variant-outline",onClick:s,elevation:"5"})]),_:1})]))}};export{ma as default};
