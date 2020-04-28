parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"i7tB":[function(require,module,exports) {
!function(t,e){"object"==typeof module&&module.exports?module.exports=e():t.nearley=e()}(this,function(){function t(e,r,i){return this.id=++t.highestId,this.name=e,this.symbols=r,this.postprocess=i,this}function e(t,e,r,i){this.rule=t,this.dot=e,this.reference=r,this.data=[],this.wantedBy=i,this.isComplete=this.dot===t.symbols.length}function r(t,e){this.grammar=t,this.index=e,this.states=[],this.wants={},this.scannable=[],this.completed={}}function i(t,e){this.rules=t,this.start=e||this.rules[0].name;var r=this.byName={};this.rules.forEach(function(t){r.hasOwnProperty(t.name)||(r[t.name]=[]),r[t.name].push(t)})}function s(){this.reset("")}function n(t,e,n){if(t instanceof i){var o=t;n=e}else o=i.fromCompiled(t,e);for(var a in this.grammar=o,this.options={keepHistory:!1,lexer:o.lexer||new s},n||{})this.options[a]=n[a];this.lexer=this.options.lexer,this.lexerState=void 0;var h=new r(o,0);this.table=[h];h.wants[o.start]=[],h.predict(o.start),h.process(),this.current=0}return t.highestId=0,t.prototype.toString=function(t){function e(t){return t.literal?JSON.stringify(t.literal):t.type?"%"+t.type:t.toString()}var r=void 0===t?this.symbols.map(e).join(" "):this.symbols.slice(0,t).map(e).join(" ")+" ● "+this.symbols.slice(t).map(e).join(" ");return this.name+" → "+r},e.prototype.toString=function(){return"{"+this.rule.toString(this.dot)+"}, from: "+(this.reference||0)},e.prototype.nextState=function(t){var r=new e(this.rule,this.dot+1,this.reference,this.wantedBy);return r.left=this,r.right=t,r.isComplete&&(r.data=r.build(),r.right=void 0),r},e.prototype.build=function(){var t=[],e=this;do{t.push(e.right.data),e=e.left}while(e.left);return t.reverse(),t},e.prototype.finish=function(){this.rule.postprocess&&(this.data=this.rule.postprocess(this.data,this.reference,n.fail))},r.prototype.process=function(t){for(var e=this.states,r=this.wants,i=this.completed,s=0;s<e.length;s++){var o=e[s];if(o.isComplete){if(o.finish(),o.data!==n.fail){for(var a=o.wantedBy,h=a.length;h--;){var l=a[h];this.complete(l,o)}if(o.reference===this.index){var u=o.rule.name;(this.completed[u]=this.completed[u]||[]).push(o)}}}else{if("string"!=typeof(u=o.rule.symbols[o.dot])){this.scannable.push(o);continue}if(r[u]){if(r[u].push(o),i.hasOwnProperty(u)){var p=i[u];for(h=0;h<p.length;h++){var f=p[h];this.complete(o,f)}}}else r[u]=[o],this.predict(u)}}},r.prototype.predict=function(t){for(var r=this.grammar.byName[t]||[],i=0;i<r.length;i++){var s=r[i],n=this.wants[t],o=new e(s,0,this.index,n);this.states.push(o)}},r.prototype.complete=function(t,e){var r=t.nextState(e);this.states.push(r)},i.fromCompiled=function(e,r){var s=e.Lexer;e.ParserStart&&(r=e.ParserStart,e=e.ParserRules);var n=new i(e=e.map(function(e){return new t(e.name,e.symbols,e.postprocess)}),r);return n.lexer=s,n},s.prototype.reset=function(t,e){this.buffer=t,this.index=0,this.line=e?e.line:1,this.lastLineBreak=e?-e.col:0},s.prototype.next=function(){if(this.index<this.buffer.length){var t=this.buffer[this.index++];return"\n"===t&&(this.line+=1,this.lastLineBreak=this.index),{value:t}}},s.prototype.save=function(){return{line:this.line,col:this.index-this.lastLineBreak}},s.prototype.formatError=function(t,e){var r=this.buffer;if("string"==typeof r){var i=r.indexOf("\n",this.index);-1===i&&(i=r.length);var s=r.substring(this.lastLineBreak,i),n=this.index-this.lastLineBreak;return e+=" at line "+this.line+" col "+n+":\n\n",e+="  "+s+"\n",e+="  "+Array(n).join(" ")+"^"}return e+" at index "+(this.index-1)},n.fail={},n.prototype.feed=function(t){var e,i=this.lexer;for(i.reset(t,this.lexerState);e=i.next();){var n=this.table[this.current];this.options.keepHistory||delete this.table[this.current-1];var o=this.current+1,a=new r(this.grammar,o);this.table.push(a);for(var h=void 0!==e.text?e.text:e.value,l=i.constructor===s?e.value:e,u=n.scannable,p=u.length;p--;){var f=u[p],c=f.rule.symbols[f.dot];if(c.test?c.test(l):c.type?c.type===e.type:c.literal===h){var d=f.nextState({data:l,token:e,isToken:!0,reference:o-1});a.states.push(d)}}if(a.process(),0===a.states.length){var y=new Error(this.reportError(e));throw y.offset=this.current,y.token=e,y}this.options.keepHistory&&(n.lexerState=i.save()),this.current++}return n&&(this.lexerState=i.save()),this.results=this.finish(),this},n.prototype.reportError=function(t){var e=[],r=(t.type?t.type+" token: ":"")+JSON.stringify(void 0!==t.value?t.value:t);e.push(this.lexer.formatError(t,"Syntax error")),e.push("Unexpected "+r+". Instead, I was expecting to see one of the following:\n");var i=this.table.length-2;return this.table[i].states.filter(function(t){var e=t.rule.symbols[t.dot];return e&&"string"!=typeof e}).map(function(t){return this.buildFirstStateStack(t,[])},this).forEach(function(t){var r=t[0],i=r.rule.symbols[r.dot],s=this.getSymbolDisplay(i);e.push("A "+s+" based on:"),this.displayStateStack(t,e)},this),e.push(""),e.join("\n")},n.prototype.displayStateStack=function(t,e){for(var r,i=0,s=0;s<t.length;s++){var n=t[s],o=n.rule.toString(n.dot);o===r?i++:(i>0&&e.push("    ⬆ ︎"+i+" more lines identical to this"),i=0,e.push("    "+o)),r=o}},n.prototype.getSymbolDisplay=function(t){var e=typeof t;if("string"===e)return t;if("object"===e&&t.literal)return JSON.stringify(t.literal);if("object"===e&&t instanceof RegExp)return"character matching "+t;if("object"===e&&t.type)return t.type+" token";throw new Error("Unknown symbol type: "+t)},n.prototype.buildFirstStateStack=function(t,e){if(-1!==e.indexOf(t))return null;if(0===t.wantedBy.length)return[t];var r=t.wantedBy[0],i=[t].concat(e),s=this.buildFirstStateStack(r,i);return null===s?null:[t].concat(s)},n.prototype.save=function(){var t=this.table[this.current];return t.lexerState=this.lexerState,t},n.prototype.restore=function(t){var e=t.index;this.current=e,this.table[e]=t,this.table.splice(e+1),this.lexerState=t.lexerState,this.results=this.finish()},n.prototype.rewind=function(t){if(!this.options.keepHistory)throw new Error("set option `keepHistory` to enable rewinding");this.restore(this.table[t])},n.prototype.finish=function(){var t=[],e=this.grammar.start;return this.table[this.table.length-1].states.forEach(function(r){r.rule.name===e&&r.dot===r.rule.symbols.length&&0===r.reference&&r.data!==n.fail&&t.push(r)}),t.map(function(t){return t.data})},{Parser:n,Grammar:i,Rule:t}});
},{}],"zLke":[function(require,module,exports) {
"use strict";function r(r,a){if(!Array.isArray(r))throw new Error("shuffle expect an array as parameter.");a=a||{};var e,t,o=r,n=r.length,f=a.rng||Math.random;for(!0===a.copy&&(o=r.slice());n;)e=Math.floor(f()*n),t=o[n-=1],o[n]=o[e],o[e]=t;return o}r.pick=function(r,a){if(!Array.isArray(r))throw new Error("shuffle.pick() expect an array as parameter.");var e=(a=a||{}).rng||Math.random,t=a.picks||1;if("number"==typeof t&&1!==t){for(var o,n=r.length,f=r.slice(),i=[];t&&n;)o=Math.floor(e()*n),i.push(f[o]),f.splice(o,1),n-=1,t-=1;return i}return r[Math.floor(e()*r.length)]},module.exports=r;
},{}],"Sydz":[function(require,module,exports) {
"use strict";module.exports=function(r){if(!Array.isArray(r))throw new TypeError("Expected an array");return r[Math.floor(Math.random()*r.length)]};
},{}],"FoEN":[function(require,module,exports) {
"use strict";function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var e=0;e<n.length;e++){var c=n[e];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(t,c.key,c)}}function e(t,e,c){return e&&n(t.prototype,e),c&&n(t,c),t}var c=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var i=c(require("shuffle-array")),a=c(require("random-item")),r={put:["שם","שמֵהַ"],buy:["קנה","קנתה"],own:["שברשותו","שברשותה"]};function o(t,n){return t["boy"==n?0:1]}function s(t){var n="boy"===t?0:1;return"".concat(a.default([["לוֹחֵם","לוֹחֶמֶת"],["נָסִיךְ","נְסִיכַת"],["מֶלֶךְ","מַלְכַּת"],["גַּמָּד","פִּיַּת"],["שׁוֹדֵד","שׁוֹדֶדֶת"],["קוֹסֵם","מְכַשֶּׁפֶת"]])[n]," ").concat(a.default(["הַשּׁוֹקוֹלָד","הַחֲלוֹמוֹת","הָאוֹר","הַחֹשֶׁךְ","הַמַּמְתַּקִּים","הַיְּעָרוֹת","הַבִּצּוֹת","הַגְּבָעוֹת"]))}function u(t,n){return"כַּמָּה ".concat(t.names," יֵשׁ לְ").concat(n.name,"?")}function d(t){return{name:t,gender:"boy",title:s("boy")}}function h(t){return{name:t,gender:"girl",title:s("girl")}}exports.cat={name:"חָתוּל",names:"חֲתוּלִים",eat:function(){return exports.snake},eatBy:function(){return exports.dog}},exports.dog={name:"כֶּלֶב",names:"כְּלָבִים",eat:function(){return exports.cat},eatBy:function(){return exports.snake}},exports.snake={name:"נָחָשׁ",names:"נְחָשִׁים",eat:function(){return exports.dog},eatBy:function(){return exports.cat}},exports.question=u;var l=i.default([d("יִפְתַּח"),d("נִסִּים"),d("רַן"),d("אָסָף"),d("גִּלְעָד"),d("יְהוּדָה"),h("מָרִינָה"),h("אָנָה"),h("שָׁרוֹן")]);function f(){var t=l.shift();return l.push(t),t}function m(t){return"boy"==t?a.default(["לָקַח","חָטַף","גָּנַב"]):a.default(["לָקְחָה","גָּזְלָה","גָּנְבָה"])}var k=function(){function n(e,c){t(this,n),this.kid=f(),this.l=e,this.r=c}return e(n,[{key:"strs",value:function(t){return this.l.strs(t).concat(this.r.strs(t)).concat(["".concat(this.kid.name,", ").concat(this.kid.title,", ").concat(m(this.kid.gender)," אֶת כָּל הַ").concat(t.names," שֶׁל ").concat(this.l.kid.name," וְ").concat(this.r.kid.name,".")])}}]),n}();exports.NodePlusNode=k;var p=function(){function n(e,c){t(this,n),this.kid=f(),this.l=e,this.r=c}return e(n,[{key:"strs",value:function(t){return this.l.strs(t).concat(this.r.strs(t.eatBy())).concat(["כָּל אֶחָד מֵהַ".concat(t.eatBy().names," שֶׁל ").concat(this.r.kid.name," אָכַל ").concat(t.name," אֶחָד שֶׁל ").concat(this.l.kid.name,"."),"".concat(this.kid.name,", ").concat(this.kid.title,", ").concat(m(this.kid.gender)," אֶת כָּל הַ").concat(t.names," הַנּוֹתָרִים שֶׁל ").concat(this.l.kid.name,".")])}}]),n}();exports.NodeMinusNode=p;var y=function(){function n(e,c){t(this,n),this.kid=f(),this.l=e,this.r=c}return e(n,[{key:"strs",value:function(t){return this.l.strs(t).concat(this.r.strs(t)).concat(["לְכֹל ".concat(t.name," שֶׁל ").concat(this.l.kid.name," נוֹלַד גּוּר אֶחָד מִכֹּל אֶחָד מֵהַ").concat(t.names," שֶׁל ").concat(this.r.kid.name,"."),"".concat(this.kid.name,", ").concat(this.kid.title,", ").concat(m(this.kid.gender)," אֶת כָּל הַגּוּרִים שֶׁנּוֹלְדוּ.")])}}]),n}();exports.NodeMulNode=y;var v=function(){function n(e,c){t(this,n),this.kid=f(),this.l=e,this.r=c}return e(n,[{key:"strs",value:function(t){return this.l.strs(t).concat(this.r.strs(t)).concat(["".concat(this.r.kid.name," ").concat(o(r.buy,this.r.kid.gender)," כְּלוּב אֶחָד לְכֹל אֶחָד מֵהַ").concat(t.names," ").concat(o(r.own,this.r.kid.gender),"."),"".concat(this.l.kid.name," ").concat(o(r.put,this.l.kid.gender)," אֶת הַ").concat(t.names," ").concat(o(r.own,this.l.kid.gender)," בַּכְּלוּבִים שֶׁל ").concat(this.r.kid.name,", מִסְפָּר זֵהֶה שֶׁל ").concat(t.names," בְּכָל כְּלוּב."),"".concat(this.kid.name,", ").concat(this.kid.title,", ").concat(m(this.kid.gender)," אֶת כָּל הַ").concat(t.names," מֵאֶחָד הַכְּלוּבִים.")])}}]),n}();function g(t,n){return 1==t?"".concat(n.name," אֶחָד"):"".concat(t," ").concat(n.names)}exports.NodeDivNode=v;var x=function(){function n(e){t(this,n),this.kid=f(),this.n=e}return e(n,[{key:"strs",value:function(t){return["לְ".concat(this.kid.name,", ").concat(this.kid.title,", יֵשׁ ").concat(g(this.n,t),".")]}}]),n}();exports.NodeNumber=x;
},{"shuffle-array":"zLke","random-item":"Sydz"}],"lfwz":[function(require,module,exports) {
function e(e,t){return s(e)||o(e,t)||n(e,t)||r()}function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(e,r){if(e){if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}function t(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}function o(e,r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],t=!0,o=!1,s=void 0;try{for(var a,m=e[Symbol.iterator]();!(t=(a=m.next()).done)&&(n.push(a.value),!r||n.length!==r);t=!0);}catch(u){o=!0,s=u}finally{try{t||null==m.return||m.return()}finally{if(o)throw s}}return n}}function s(e){if(Array.isArray(e))return e}!function(){function r(e){return e[0]}var n=require("./common"),t={Lexer:void 0,ParserRules:[{name:"exp",symbols:["exp","_",{literal:"+"},"_","term"],postprocess:function(r){var t=e(r,5),o=t[0],s=(t[1],t[2],t[3],t[4]);return new n.NodePlusNode(o,s)}},{name:"exp",symbols:["exp","_",{literal:"-"},"_","term"],postprocess:function(r){var t=e(r,5),o=t[0],s=(t[1],t[2],t[3],t[4]);return new n.NodeMinusNode(o,s)}},{name:"exp",symbols:["term"],postprocess:r},{name:"term",symbols:["term","_",{literal:"*"},"_","factor"],postprocess:function(r){var t=e(r,5),o=t[0],s=(t[1],t[2],t[3],t[4]);return new n.NodeMulNode(o,s)}},{name:"term",symbols:["term","_",{literal:"/"},"_","factor"],postprocess:function(r){var t=e(r,5),o=t[0],s=(t[1],t[2],t[3],t[4]);return new n.NodeDivNode(o,s)}},{name:"term",symbols:["factor"],postprocess:r},{name:"factor",symbols:[{literal:"("},"_","exp","_",{literal:")"}],postprocess:function(r){var n=e(r,5),t=(n[0],n[1],n[2]);n[3],n[4];return t}},{name:"factor",symbols:["number"],postprocess:function(r){var t=e(r,1)[0];return new n.NodeNumber(parseInt(t.join("")))}},{name:"number$ebnf$1",symbols:[/[0-9]/]},{name:"number$ebnf$1",symbols:["number$ebnf$1",/[0-9]/],postprocess:function(e){return e[0].concat([e[1]])}},{name:"number",symbols:["number$ebnf$1"],postprocess:r},{name:"_$ebnf$1",symbols:[]},{name:"_$ebnf$1",symbols:["_$ebnf$1",/[ \t]/],postprocess:function(e){return e[0].concat([e[1]])}},{name:"_",symbols:["_$ebnf$1"]}],ParserStart:"exp"};"undefined"!=typeof module&&void 0!==module.exports?module.exports=t:window.grammar=t}();
},{"./common":"FoEN"}],"Focm":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("nearley")),r=require("./common");document.addEventListener("DOMContentLoaded",function(){var e=require("./grammar.js");var n=document.getElementById("input"),o=document.getElementById("story"),a=document.getElementById("question");function u(){try{var u=function(n){try{var o=new t.Parser(t.Grammar.fromCompiled(e));o.feed(n),console.log(o.results);var a=o.results[0];return{story:a.strs(r.cat),question:r.question(r.cat,a.kid)}}catch(u){throw u}}(n.value.trim());o.innerHTML=u.story.join(" "),a.innerText=u.question,console.log(a)}catch(i){console.log(i),o.innerText="Can't understand ".concat(n.value),a.innerText="¯_(ツ)_/¯"}}n.addEventListener("input",u),n.focus(),n.value="1 + 2",u()});
},{"nearley":"i7tB","./common":"FoEN","./grammar.js":"lfwz"}]},{},["Focm"], null)
//# sourceMappingURL=math2text.b390698b.js.map