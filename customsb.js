/*--------------------------------------------------
MIT License
Copyright 2006 "Roy Ramonida Alilin" <royalilin@yahoo.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
--------------------------------------------------*/
function SelBox(slObj,slId,width,height,isMul,isMS){
   var pnd=document.getElementById(slId)
   while (pnd!=null){
      pnd=pnd.parentNode
      if(pnd!=null){
         if(pnd.tagName=='FORM'){
            this.frm=pnd
         }
      }
   }
   if(this.frm==null) return
   this.vals=[]
   this.txts=[]
   this.sels=[]
   this.ids=[]
   this.lh=-1
   this.isMul=isMul
   if (isMul){
      this.isMS=isMS
   }else{
      isMS=false
   }
   this.slId=slId
   this.slObj=slObj
   this.lastIdx=-1
   this.lastSelIdx=-1
   this.width=width
   this.height=height
   this.fOnChange=null
   this.dblClickF=null
   this.isEnabled=true
   var cw = window
   while (cw.frameElement) {
      cw=cw.parent
   }
   this.rootwin=cw
   var imgP='cbpressed.png'      // Change path if needed
   var imgU='cbunpress.png'      // Change path if needed
   var imgD='cbdisabled.png'     // Change path if needed
   var tab=document.getElementById(slId)
   tab.className='selbox'
   tab.style.border='1px solid #7F9DB9'
   var trE=tab.insertRow(tab.rows.length);
   var tdE=trE.insertCell(trE.cells.length);
   tdE.id=slId+'mn'
   tdE.align='LEFT'
   var txw=''
   if (width>0){
      txw=';width:'+width+'px;'
   }
   var txh=''
   if (height>0){
      txh=';height:'+height+'px;'
   }
   if (isMul){
      tdE.innerHTML='<div id="'+slId+'d" style="margin:1px;padding:0px;border:0px;overflow:auto;'+txw+txh+'">'+
         '<table id="'+slId+'t" cellpadding="0" cellspacing="0" width="100%"></table></div>'
   }else{
      var dvWd=''
      if (this.width>0){
         dvWd='width:'+(this.width-21)+'px;'
      }
      tdE.innerHTML='<div id="'+slId+'d1" style="overflow:hidden;'+txw+'">'+
         '<table id="'+slId+'t1" style="width:100%;" cellpadding="0" cellspacing="0">'+
         '<tr style="width:100%;"><td nowrap="nowrap" onclick="zxshow('+slObj+')"><a href="javascript:var a=0"><div id="'+slId+'ds" style="padding:3px 0px 0px 3px;overflow:hidden;float:left;'+dvWd+'"><span>&nbsp;</span></div></a>'+
            '<a onclick="zxshow('+slObj+')" onmousedown="if ('+slObj+'.isEnabled){document.getElementById(\''+slId+'i\').src=\''+imgP+'\'}" onmouseout="if ('+slObj+'.isEnabled){document.getElementById(\''+slId+'i\').src=\''+imgU+'\'}" onmouseup="if ('+slObj+'.isEnabled){document.getElementById(\''+slId+'i\').src=\''+imgU+'\'}">'+
               '<img id="'+slId+'i" style="padding:2px 2px 0px 0px;" src="'+imgU+'" alt="V" /></a></td></tr></table></div>'
      var tb2=document.createElement('table')
      tab.parentNode.appendChild(tb2)
      tb2.className='selbox'
      tb2.id=slId+'dat'
      tb2.style.display='none'
      tb2.style.position='absolute'
      tb2.style.zIndex='50'      // Change this if needed
      tb2.style.top='0px'
      tb2.style.left='0px'
      tb2.cellpadding='0'
      tb2.cellspacing='0'
      var trE=tb2.insertRow(tb2.rows.length);
      var tdE=trE.insertCell(trE.cells.length);
      tdE.align='LEFT'
      tdE.innerHTML='<div id="'+slId+'d2" style="background-color:white;width:100%;border:1px solid #7F9DB9;overflow:auto;overflow-x:hidden;'+txh+'">'+
         '<table id="'+slId+'t2" cellpadding="0" cellspacing="0" align="left">'+
            '<tr><td nowrap="nowrap" align="left"><a id="'+this.slId+'a0" href="javascript:var a=0" class="sbunsel" onkeydown="return zxkp2(event,'+this.slObj+',0)"><div style="width:100%"><span style="margin:0px 3px 0px 3px">&nbsp;</span></div></a></td></tr></table></div>'
   }
   var e = document.createElement('input');
   e.setAttribute("name", slId);
   e.setAttribute("type", 'hidden');
   e.setAttribute("value", '');
   this.frm.appendChild(e);
}
SelBox.prototype.setEnabled=function setEnabled(isEn){
   var cb=document.getElementById(this.slId)
   var imgU='/isweb/images/cbunpress.png'
   var imgD='/isweb/images/cbdisabled.png'
   if (this.isMul){
      if (isEn){
         cb.style.borderColor='#7F9DB9'
      }else{
         cb.style.borderColor='#C9C7BA'
      }
   }else{
      if (isEn){
         document.getElementById(this.slId+'i').src=imgU
         cb.style.borderColor='#7F9DB9'
         cb.disabled=false
      }else{
         document.getElementById(this.slId+'i').src=imgD
         cb.style.borderColor='#C9C7BA'
         cb.disabled=true
      }
   }
   this.isEnabled=isEn
}
SelBox.prototype.setOnDblClickF=function setOnDblClickF(df){
   this.dblClickF=df
   for (var i=0;i<this.ids.length;i++){
      var al=document.getElementById(this.slId+'a'+this.ids[i])
      al.ondblclick=df
   }
}
SelBox.prototype.getOrderIdx=function getOrderIdx(idx){
   var o=-1
   for(var i=0;i<this.ids.length;i++){
      if (this.ids[i]==idx){
         o=i
         break;
      }
   }
   return o;
}
SelBox.prototype.setSelIdx=function setSelIdx(idx){
   if (this.isMul&&!this.isEnabled) return
   var nf=!this.isIdxSelected(idx)
   if (nf){
      if (!this.isMS){
         this.removeSels()
      }
      var iRow=this.getOrderIdx(idx)
      var j = 0;
      for (var i=0;i<this.sels.length;i++){
         if (iRow<this.getOrderIdx(this.sels[i])){
            break;
         }
         j=i+1
      }
      this.sels.splice(j,0,idx)
      zxCreateSel(this)
      var oj=document.getElementById(this.slId+'a'+idx)
      oj.className='sbsel'
   }
   this.lastSelIdx=idx
   if (nf&&this.fOnChange!=null) this.fOnChange()
}
SelBox.prototype.setSelIdx2=function setSelIdx2(idx){
   this.setSelIdx(idx)
   var dvs=document.getElementById(this.slId+'ds')
   dvs.innerHTML='<span>'+this.txts[this.getOrderIdx(idx)]+'</span>'
}
SelBox.prototype.isIdxSelected=function isIdxSelected(idx){
   var ff=false
   for (var i=0;i<this.sels.length;i++){
      if (this.sels[i]==idx){
         ff=true
         break
      }
   }
   return ff
}
SelBox.prototype.removeSels=function removeSels(){
   while (this.sels.length>0){
      var iRow=this.getOrderIdx(this.sels[0])
      zxRemoveSel(this.slId, this.vals[iRow])
      var oj=document.getElementById(this.slId+'a'+this.sels[0])
      oj.className='sbunsel'
      this.sels.splice(0,1)
//    if (this.fOnChange!=null) fOnChange()
   }
}
SelBox.prototype.getSelValue=function getSelValue(){
   if ( this.sels.length>0){
      return this.vals[this.getOrderIdx(this.sels[0])]
   }else{
      return ''
   }
}
SelBox.prototype.removeSelOpt=function removeSelOpt(idx){
   for (var i=0;i<this.sels.length;i++){
      if (this.sels[i]==idx){
         var iRow=this.getOrderIdx(idx)
         zxRemoveSel(this.slId, this.vals[iRow])
         var oj=document.getElementById(this.slId+'a'+idx)
         oj.className='sbunsel'
         this.sels.splice(i,1)
         break
      }
//    if (this.fOnChange!=null) fOnChange()
   }
}
SelBox.prototype.sortOpts=function sortOpts() {
   var mtb=document.getElementById(this.slId+'t')
   var stb=document.getElementById(this.slId+'t2')
   for (var i=0;i<this.txts.length-1;i++){
      for (var j=i+1;j<this.txts.length;j++){
         if (this.txts[i]>this.txts[j]){
            if (this.isMul){
//               mtb.moveRow(i,j)
               exTr(mtb,i,j)
               var tvl=this.txts[i]
               this.txts[i]=this.txts[j]
               this.txts[j]=tvl
               tvl=this.vals[i]
               this.vals[i]=this.vals[j]
               this.vals[j]=tvl
               tvl=this.ids[i]
               this.ids[i]=this.ids[j]
               this.ids[j]=tvl
            }else{
            }
         }
      }
   }
}
SelBox.prototype.selAllOpt=function selAllOpt() {
   for (var i=0;i<this.ids.length;i++){
      this.setSelIdx(this.ids[i])
   }
}
SelBox.prototype.addOpt=function addOpt(value, text) {
   this.lastIdx++
   this.vals[this.vals.length]=value
   this.txts[this.txts.length]=text
   this.ids[this.ids.length]=this.lastIdx
   if (this.isMul){
      var dv=document.getElementById(this.slId+'d')
      var tab=document.getElementById(this.slId+'t')
      var trE=tab.insertRow(tab.rows.length);
      trE.id=this.slId+'r'+this.lastIdx
      var tdE=trE.insertCell(trE.cells.length);
      tdE.id=this.slId+'c'+this.lastIdx
      tdE.noWrap=true
      if (zxtrim(text)==''){
         text='&nbsp;'
      }
      tdE.innerHTML='<a class="sbunsel" href="javascript:var a=0" id="'+this.slId+'a'+this.lastIdx+'" onkeydown="return zxkp(event,'+this.slObj+','+this.lastIdx+')" onclick="return zxsel(event,'+this.slObj+','+this.lastIdx+')">'+
         '<div id="'+this.slId+'d'+this.lastIdx+'" style="margin:0px;padding:0px 3px 0px 3px;border:0px;text-align:left;width:100%">'+text+'</div></a>'
      if (this.width>0&&tab.clientHeight>dv.clientHeight){
         // if vertical scrollbar appears width should be adjusted
         if (navigator.appName=="Netscape"){
            tab.width=(this.width-25)+'px'
         }else{
            tab.width=(this.width-17)+'px'
         }
      }else{
         if (navigator.appName=="Netscape"){
            tab.width=null
         }else{
            tab.width='100%'
         }
      }
   }else{
      var tb2=document.getElementById(this.slId+'t2')
      if (this.ids.length==1){
         tb2.deleteRow(0)
      }
      if (zxtrim(text)==''){
         text='&nbsp;'
      }

      trE=tb2.insertRow(tb2.rows.length)
      tdE=trE.insertCell(trE.cells.length);
      tdE.noWrap=true
      tdE.align='LEFT'
      tdE.innerHTML='<a class="sbunsel" id="'+this.slId+'a'+this.lastIdx+'" onmouseover="zxsl('+this.slObj+','+this.lastIdx+')" onkeydown="return zxkp2(event,'+this.slObj+','+this.lastIdx+')" href="javascript:zxsel2('+this.slObj+','+this.lastIdx+')">'+
         '<div style="width:100%;padding:0px 3px 0px 3px">'+text+'</div></a>'
      if (this.ids.length==1){
         this.setSelIdx2(this.lastIdx)
      }
   }
   if (this.dblClickF!=null){
      var al=document.getElementById(this.slId+'a'+this.lastIdx)
      al.ondblclick=this.dblClickF
   }
   return this.lastIdx
}
SelBox.prototype.insertOpt=function insertOpt(iRow,value,text) {
   this.lastIdx++
   this.vals.splice(iRow,0,value)
   this.txts.splice(iRow,0,text)
   this.ids.splice(iRow,0,this.lastIdx)
   if (this.isMul){
      var dv=document.getElementById(this.slId+'d')
      var tab=document.getElementById(this.slId+'t')
      var trE=tab.insertRow(iRow);
      trE.id=this.slId+'r'+this.lastIdx
      var tdE=trE.insertCell(trE.cells.length);
      tdE.id=this.slId+'c'+this.lastIdx
      tdE.noWrap=true
      tdE.innerHTML='<a class="sbunsel" id="'+this.slId+'a'+this.lastIdx+'" onkeydown="return zxkp(event,'+this.slObj+','+this.lastIdx+')" href="javascript: var a=0" onclick="return zxsel(event,'+this.slObj+','+this.lastIdx+')">'+
         '<div id="'+this.slId+'d'+this.lastIdx+'" style="margin:0px;padding:0px 3px 0px 3px;border:0px;text-align:left;width:100%">'+text+'</div></a>'
      if (this.width>0&&tab.clientHeight>dv.clientHeight){
         // if vertical scrollbar appears width should be adjusted
         if (navigator.appName=="Netscape"){
            tab.width=(this.width-25)+'px'
         }else{
            tab.width=(this.width-17)+'px'
         }
      }else{
         if (navigator.appName=="Netscape"){
            tab.width=null
         }else{
            tab.width='100%'
         }
      }
   }else{
   }
   if (this.dblClickF!=null){
      var al=document.getElementById(this.slId+'a'+this.lastIdx)
      al.ondblclick=this.dblClickF
   }
}
SelBox.prototype.showOptRow=function showOptRow(iRow) {
   var rr=document.getElementById(this.slId+'a'+this.ids[iRow])
//   if (navigator.appName=="Netscape"){
//      rr.scrollIntoView(true)
//   }
   rr.focus()
}
SelBox.prototype.setOnChange=function setOnChange(fOnChange) {
   this.fOnChange=fOnChange
}
SelBox.prototype.setOnMouseOver=function setOnMouseOver(fOnMouseOver) {
   var tab=document.getElementById(this.slId)
   tab.onmouseover=fOnMouseOver
}
SelBox.prototype.removeOptRow=function removeOptRow(iRow){
   if (this.ids[iRow]==this.lastSelIdx){
      this.lastSelIdx=-1
   }
   for (var i=0;i<this.sels.length;i++){
      if (this.ids[iRow]==this.sels[i]){
         zxRemoveSel(this.slId, this.vals[iRow])
         this.sels.splice(i,1)
         break
      }
   }
   this.vals.splice(iRow,1)
   this.txts.splice(iRow,1)
   this.ids.splice(iRow,1)
   var tab=document.getElementById(this.slId+'t')
   tab.deleteRow(iRow)
   var dv=document.getElementById(this.slId+'d')
   if (this.width>0&&tab.clientHeight>dv.clientHeight){
      // if vertical scrollbar appears width should be adjusted
      if (navigator.appName=="Netscape"){
         tab.width=(this.width-25)+'px'
      }else{
         tab.width=(this.width-17)+'px'
      }
   }else{
      if (navigator.appName=="Netscape"){
         tab.width=null
      }else{
         tab.width='100%'
      }
   }
}
SelBox.prototype.selOpt=function selOpt(iRow){
   this.setSelIdx(this.ids[iRow])
   document.getElementById(this.slId+'a'+this.ids[iRow]).focus()
}
function zxsel(e,zxObj,zxIdx){
   var eo=window.event?event:e
   if (zxObj.isMul&&zxObj.isMS&&eo.shiftKey){
      if(zxObj.lastSelIdx>-1){
         var o1=zxObj.getOrderIdx(zxIdx)
         var o2=zxObj.getOrderIdx(zxObj.lastSelIdx)
         var s1=o1
         var s2=o2
         if(o1>o2){
            s1=o2
            s2=o1
         }
         zxObj.removeSels();
         for (var i=s1;i<=s2;i++){
            zxObj.setSelIdx(zxObj.ids[i])
         }
      }
   } else if (zxObj.isMul&&eo.ctrlKey){
      if (zxObj.isIdxSelected(zxIdx)){
         zxObj.removeSelOpt(zxIdx)
      }else{
         zxObj.setSelIdx(zxIdx)
      }
   }else{
      zxObj.removeSels();
      zxObj.setSelIdx(zxIdx)
   }
// var oj=document.getElementById(zxObj.slId+'a'+zxIdx)
// oj.focus()

   eo.cancelBubble=true
   if (eo.stopPropagation) eo.stopPropagation();
   return false
}
function zxkp(e,zxObj,zxIdx){
   var oj=document.getElementById(zxObj.slId+'a'+zxIdx)
   var eo=window.event?event:e
   var uc=eo.charCode? eo.charCode:eo.keyCode
   var o1=zxObj.getOrderIdx(zxIdx)
   if ((uc==40)&&o1+1<zxObj.ids.length){
      var nv=document.getElementById(zxObj.slId+'a'+zxObj.ids[o1+1])
      if (!eo.shiftKey){
         zxObj.removeSels();
      }
      zxObj.setSelIdx(zxObj.ids[o1+1])
//      if (navigator.appName=="Netscape"){
//         nv.scrollIntoView(true)
//      }
      nv.focus()
      eo.cancelBubble=true
      if (eo.preventDefault) eo.preventDefault();
      if (eo.stopPropagation) eo.stopPropagation();
   }else if (uc==38&&o1>0){
      var nv=document.getElementById(zxObj.slId+'a'+zxObj.ids[o1-1])
      if (!eo.shiftKey){
         zxObj.removeSels();
      }
      zxObj.setSelIdx(zxObj.ids[o1-1])
      nv.focus()
      eo.cancelBubble=true
      if (eo.preventDefault) eo.preventDefault();
      if (eo.stopPropagation) eo.stopPropagation();
   }else if (uc==9){
      if (eo.shiftKey){
         if (o1>0){
            var nv=document.getElementById(zxObj.slId+'a'+zxObj.ids[o1-1])
            zxObj.setSelIdx(zxObj.ids[o1-1])
            nv.focus()
         }
      }else{
         if(o1+1<zxObj.ids.length){
            var nv=document.getElementById(zxObj.slId+'a'+zxObj.ids[o1+1])
            zxObj.removeSels();
            zxObj.setSelIdx(zxObj.ids[o1+1])
//            if (navigator.appName=="Netscape"){
//               nv.(true)
//            }
            nv.focus()
         }
      }
      eo.cancelBubble=true
      if (eo.preventDefault) eo.preventDefault();
      if (eo.stopPropagation) eo.stopPropagation();
   }
   return true
}
function zxkp2(e,zxObj,zxIdx){
   var oj=document.getElementById(zxObj.slId+'a'+zxIdx)
   var eo=window.event?event:e
   var uc=eo.charCode? eo.charCode:eo.keyCode
   var o1=zxObj.getOrderIdx(zxIdx)
   if ((uc==40)&&o1+1<zxObj.ids.length){
      // down arrow
      var nv=document.getElementById(zxObj.slId+'a'+zxObj.ids[o1+1])
      zxsl(zxObj,zxObj.ids[o1+1])
//      if (typeof nv.scrollIntoView === "function") {
//         nv.scrollIntoView(true)
//      }
      nv.focus()
      eo.cancelBubble=true
      if (eo.preventDefault) eo.preventDefault();
      if (eo.stopPropagation) eo.stopPropagation();
   }else if (uc==38&&o1>0){
      // up arrow
      var nv=document.getElementById(zxObj.slId+'a'+zxObj.ids[o1-1])
      zxsl(zxObj,zxObj.ids[o1-1])
      nv.focus()
      eo.cancelBubble=true
      if (eo.preventDefault) eo.preventDefault();
      if (eo.stopPropagation) eo.stopPropagation();
   }else if (uc==9){
      // tab
      if (eo.shiftKey){
         if (o1>0){
            var nv=document.getElementById(zxObj.slId+'a'+zxObj.ids[o1-1])
            zxsl(zxObj,zxObj.ids[o1-1])
            nv.focus()
         }
      }else{
         if(o1+1<zxObj.ids.length){
            zxsl(zxObj,zxObj.ids[o1+1])
            var nv=document.getElementById(zxObj.slId+'a'+zxObj.ids[o1+1])
//            if (typeof nv.scrollIntoView === "function") {
//               nv.scrollIntoView(true)
//            }
            nv.focus()
         }
      }
      eo.cancelBubble=true
      if (eo.preventDefault) eo.preventDefault();
      if (eo.stopPropagation) eo.stopPropagation();
   }else if (uc==27){
      window.document.removeEventListener('click', window.zxClose1);
      window.removeEventListener('blur', window.zxClose2);
      document.getElementById(zxObj.slId+'dat').style.display='none'
      eo.cancelBubble=true
      if (eo.preventDefault) eo.preventDefault();
      if (eo.stopPropagation) eo.stopPropagation();
   }
   return true
}
function zxsl(zxObj,zxIdx){
   if (zxObj.lh!=-1){
      var oj=document.getElementById(zxObj.slId+'a'+zxObj.lh)
      oj.className='sbunsel'
   }
   var oj=document.getElementById(zxObj.slId+'a'+zxIdx)
   oj.className='sbsel'
   oj.focus()
   zxObj.lh=zxIdx
}
function zxsel2(zxObj,zxIdx){
   zxObj.setSelIdx2(zxIdx)
   document.getElementById(zxObj.slId+'dat').style.display='none'
}

function zxshow(zxObj){
   if (!zxObj.isEnabled) return

   var cw=window
   if (cw.document.addEventListener) {
     cw.document.addEventListener('click',function zxClose1(event){
       cw.document.getElementById(zxObj.slId+'dat').style.display='none';
       cw.document.removeEventListener('click', cw.zxClose1);
       cw.removeEventListener('blur', cw.zxClose2);
     });
     cw.addEventListener('blur',function zxClose2(event){
       cw.document.getElementById(zxObj.slId+'dat').style.display='none';
       cw.document.removeEventListener('click', cw.zxClose1);
       cw.removeEventListener('blur', cw.zxClose2);
     });
   } else {
     cw.document.attachEvent('click',function zxClose1(event){
       cw.document.getElementById(zxObj.slId+'dat').style.display='none';
       cw.document.detachEvent('click', cw.zxClose1);
       cw.detachEvent('blur', cw.zxClose2);
     });
     cw.attachEvent('blur',function zxClose2(event){
       cw.document.getElementById(zxObj.slId+'dat').style.display='none';
       cw.document.detachEvent('click', cw.zxClose1);
       cw.detachEvent('blur', cw.zxClose2);
     });
   }

   var e = window.event || arguments.callee.caller.arguments[0];
   var eo=window.event?event:e
   eo.cancelBubble=true
   if (eo.stopPropagation) eo.stopPropagation();

   var cb=document.getElementById(zxObj.slId)
   var cmn=document.getElementById(zxObj.slId+'dat')
   var cbp=document.getElementById(zxObj.slId+'d2')
   var tb2=document.getElementById(zxObj.slId+'t2')
   if (cmn.style.display=='block'){
      return
   }
   cmn.style.display='block'

   if (zxObj.height<=0&&cbp.clientHeight>154){
      cbp.style.height='154px'
   }
   if (tb2.clientHeight>cbp.clientHeight){
      // if vertical scrollbar appears width should be adjusted
      if (navigator.appName=="Netscape"){
         cbp.style.width=(tb2.clientWidth+25)+'px'
      }else{
         cbp.style.width=(tb2.clientWidth+17)+'px'
      }
   }else{
      if (navigator.appName!="Netscape"){
         cbp.style.width=tb2.clientWidth+'px'
      }
   }
   if (tb2.clientHeight>cbp.clientHeight){
      if (navigator.appName=="Netscape"){
         if (tb2.clientWidth<cb.clientWidth-25){
            cbp.style.width=cb.clientWidth+'px'
            tb2.style.width=(cb.clientWidth-25)+'px'
         }
      }else{
         if (tb2.clientWidth<cb.clientWidth-17){
            cbp.style.width=cb.clientWidth+'px'
            tb2.style.width=(cb.clientWidth-17)+'px'
         }
      }
   }else{
      if (navigator.appName=="Netscape"){
         if (tb2.clientWidth<cb.clientWidth-6){
            cbp.style.width=cb.clientWidth+'px'
            tb2.style.width=cb.clientWidth-6+'px'
         }
      }else{
         if (tb2.clientWidth<cb.clientWidth){
            cbp.style.width=cb.clientWidth+'px'
            tb2.style.width=cb.clientWidth+'px'
         }
      }
   }
   cmn.style.top=(findPosY(cb)+cb.clientHeight-3)+'px'
   var psx=findPosX(cb)
   var dvw=cbp.clientWidth
   if (tb2.clientHeight>cbp.clientHeight){
      dvw=dvw+17
   }
   var rps=psx-(dvw-cb.clientWidth)
   if ((psx+dvw)>getWindowWidth()&&rps>-1){
      cmn.style.left=(rps-3)+'px'
   }else{
      cmn.style.left=(psx-2)+'px'
   }
   if (zxObj.sels.length>0){
      var selIdx=zxObj.sels[0]
      if (zxObj.lh>-1){
         var oj=document.getElementById(zxObj.slId+'a'+zxObj.lh)
         oj.className='sbunsel'
      }
      var oj=document.getElementById(zxObj.slId+'a'+selIdx)
      oj.className='sbsel'
      oj.focus()
      zxObj.lh=selIdx
   }
   if (zxObj.ids.length==0){
      var oj=document.getElementById(zxObj.slId+'a0')
      oj.focus()
   }
}
function findPosX(obj){
   var curleft = 0;
   if(obj.offsetParent)
      while(obj.style.position.toLowerCase()!='absolute'&&obj.style.position.toLowerCase()!='relative'){
         curleft += obj.offsetLeft
         if(!obj.offsetParent) break;
         obj = obj.offsetParent;
      }
   else if(obj.x) curleft += obj.x;
   return curleft;
}
function findPosY(obj){
   var curtop = 0;
   if (obj.offsetParent){
      while (obj.offsetParent&&obj.style.position.toLowerCase()!='absolute'&&obj.style.position.toLowerCase()!='relative'){
         curtop += obj.offsetTop
         obj = obj.offsetParent;
      }
   }
   else if (obj.y) curtop += obj.y;
   return curtop;
}
function getWindowWidth() {
   if (navigator.appName=="Netscape"){
      if( document.documentElement.scrollHeight!=document.documentElement.clientHeight){
         return window.innerWidth-16;
      }else{
         return window.innerWidth;
      }
   }
   if( document.documentElement.offsetWidth!=document.documentElement.clientWidth){
      return document.documentElement.offsetWidth - 20;
   } else {
      return document.documentElement.offsetWidth;
   }
}
function zxCreateSel(zxObj){
   var inps=document.getElementsByTagName('input')
   for (var i=inps.length-1;i>=0;i--){
      if (inps[i].type=='hidden'&&inps[i].name==zxObj.slId){
         inps[i].parentNode.removeChild(inps[i])
      }
   }
   for (var i=0;i<zxObj.sels.length;i++){
      var e = document.createElement('input');
      e.setAttribute("name", zxObj.slId);
      e.setAttribute("type", 'hidden');
      e.setAttribute("value", zxObj.vals[zxObj.getOrderIdx(zxObj.sels[i])]);
      zxObj.frm.appendChild(e);
   }
}
function zxRemoveSel(zxName, zxVal){
   var inps=document.getElementsByTagName('input')
   for (var i=inps.length-1;i>=0;i--){
      if (inps[i].type=='hidden'&&inps[i].name==zxName&&inps[i].value==zxVal){
         inps[i].parentNode.removeChild(inps[i])
         break
      }
   }
}
function moveSelOpts(zxObj1,zxObj2){
   var idx=null
   var lRow=-1
   zxObj1.sels.sort()
   while (zxObj1.sels.length>0){
      var iRow=zxObj1.getOrderIdx(zxObj1.sels[0])
      idx=zxObj2.addOpt(zxObj1.vals[iRow], zxObj1.txts[iRow])
      zxObj1.removeOptRow(iRow)
      lRow=iRow
   }
   if (arguments.length==3&&arguments[2]){
      zxObj1.sortOpts()
      zxObj2.sortOpts()
   }
   if (idx!=null){
      var rr=document.getElementById(zxObj2.slId+'a'+idx)
//      if (navigator.appName=="Netscape"){
//         rr.scrollIntoView(true)
//      }
      rr.focus()
      if (lRow<zxObj1.ids.length) zxObj1.selOpt(lRow)
      else if (zxObj1.ids.length>0) zxObj1.selOpt(zxObj1.ids.length-1)
   }
}
function moveAllOpts(zxObj1,zxObj2){
   zxObj1.selAllOpt();
   if(arguments.length==2){
      moveSelOpts(zxObj1,zxObj2)
   }else{
      moveSelOpts(zxObj1,zxObj2,arguments[2])
   }
}
function moveUpSelOpt(zxObj){
   if (zxObj.lastSelIdx<0) return
   var i=zxObj.getOrderIdx(zxObj.lastSelIdx);
   if (i<1) return
   var j=i-1
   var mtb=document.getElementById(zxObj.slId+'t')
//   mtb.moveRow(i,j)
   exTr(mtb,i,j)
   var tvl=zxObj.txts[i]
   zxObj.txts[i]=zxObj.txts[j]
   zxObj.txts[j]=tvl
   tvl=zxObj.vals[i]
   zxObj.vals[i]=zxObj.vals[j]
   zxObj.vals[j]=tvl
   tvl=zxObj.ids[i]
   zxObj.ids[i]=zxObj.ids[j]
   zxObj.ids[j]=tvl
   var nv=document.getElementById(zxObj.slId+'a'+zxObj.lastSelIdx)
//   if (navigator.appName=="Netscape"){
//      nv.scrollIntoView(true)
//   }
   nv.focus()
}
function exTr(tbl,r1,r2) {
   var cr=tbl.rows[r1].innerHTML
   tbl.rows[r1].innerHTML=tbl.rows[r2].innerHTML
   tbl.rows[r2].innerHTML=cr
}

function moveDownSelOpt(zxObj){
   if (zxObj.lastSelIdx<0) return
   var i=zxObj.getOrderIdx(zxObj.lastSelIdx);
   var j=i+1
   if (j>=zxObj.ids.length) return
   var mtb=document.getElementById(zxObj.slId+'t')
//   mtb.moveRow(i,j)
   exTr(mtb,i,j)

   var tvl=zxObj.txts[i]
   zxObj.txts[i]=zxObj.txts[j]
   zxObj.txts[j]=tvl
   tvl=zxObj.vals[i]
   zxObj.vals[i]=zxObj.vals[j]
   zxObj.vals[j]=tvl
   tvl=zxObj.ids[i]
   zxObj.ids[i]=zxObj.ids[j]
   zxObj.ids[j]=tvl
   var nv=document.getElementById(zxObj.slId+'a'+zxObj.lastSelIdx)
//   if (navigator.appName=="Netscape"){
//      nv.scrollIntoView(true)
//   }
   nv.focus()
}
function zxtrim(str) {
    if (str != null) {
        var i;
        for (i=0; i<str.length; i++) {
            if (str.charAt(i)!=" ") {
                str=str.substring(i,str.length);
                break;
            }
        }

        for (i=str.length-1; i>=0; i--) {
            if (str.charAt(i)!=" ") {
                str=str.substring(0,i+1);
                break;
            }
        }

        if (str.charAt(0)==" ") {
            return "";
        } else {
            return str;
        }
    }
}
