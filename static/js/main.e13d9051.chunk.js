(this["webpackJsonpthe-best-todo"]=this["webpackJsonpthe-best-todo"]||[]).push([[0],{104:function(e,t,n){"use strict";n.r(t);var i=n(0),c=n.n(i),a=n(31),r=n.n(a),o=(n(93),n(14)),l=n(16),j=n(4),s=n(13),d=(n(94),n(77)),b=n(49),u=n(139),O=n(2),f=function(e){var t=e.addItem,n=Object(i.useState)(""),c=Object(s.a)(n,2),a=c[0],r=c[1],o=Object(i.useState)(null),l=Object(s.a)(o,2),j=l[0],f=l[1],h=function(){a.trim()?(t(a.trim()),r("")):f("Heading is required!")};return Object(O.jsxs)("div",{children:[Object(O.jsx)(b.a,{error:!!j,variant:"outlined",className:j?"error":"",onChange:function(e){r(e.currentTarget.value)},onKeyPress:function(e){f(null),"Enter"===e.key&&h()},value:a,label:"enter you heading...",helperText:j}),Object(O.jsx)(d.a,{color:"primary",size:"large",onClick:h,children:Object(O.jsx)(u.a,{})})]})},h=function(e){var t=e.value,n=e.onChange,c=Object(i.useState)(t),a=Object(s.a)(c,2),r=a[0],o=a[1],l=Object(i.useState)(!1),j=Object(s.a)(l,2),d=j[0],u=j[1];return d?Object(O.jsx)(b.a,{variant:"outlined",type:"text",autoFocus:!0,value:r,onChange:function(e){o(e.currentTarget.value)},onBlur:function(){u(!1),n(r)}}):Object(O.jsx)("span",{onDoubleClick:function(){u(!0)},children:t})},x=n(63),v=n.n(x),g=n(40),p=n(71);function m(e){return Object(O.jsxs)("div",{children:[Object(O.jsxs)("h3",{children:[Object(O.jsx)(h,{value:e.title,onChange:function(t){return e.changeTodoTitle(t,e.id)}}),Object(O.jsx)(d.a,{onClick:function(){e.removeTodolist(e.id)},children:Object(O.jsx)(v.a,{})})]}),Object(O.jsx)(f,{addItem:function(t){e.addTask(t,e.id)}}),Object(O.jsx)("ul",{children:e.tasks.map((function(t){return Object(O.jsxs)("li",{className:t.isDone?"is-done":"",children:[Object(O.jsx)(p.a,{checked:t.isDone,color:"secondary",onChange:function(n){return e.changeTaskStatus(t.id,n.currentTarget.checked,e.id)}}),Object(O.jsx)(h,{value:t.title,onChange:function(n){return e.changeTaskTitle(n,t.id,e.id)}}),Object(O.jsx)(d.a,{onClick:function(){return e.removeTask(t.id,e.id)},children:Object(O.jsx)(v.a,{})})]},t.id)}))}),Object(O.jsxs)("div",{children:[Object(O.jsx)(g.a,{variant:"all"===e.filter?"outlined":"text",onClick:function(){return e.changeFilter("all",e.id)},color:"inherit",children:"All"}),Object(O.jsx)(g.a,{variant:"active"===e.filter?"outlined":"text",onClick:function(){return e.changeFilter("active",e.id)},color:"primary",children:"Active"}),Object(O.jsx)(g.a,{variant:"completed"===e.filter?"outlined":"text",onClick:function(){return e.changeFilter("completed",e.id)},color:"secondary",children:"Completed"})]})]})}var T=n(143),k=n(74),C=n(73),D=n(140),S=n(75),y=n(76),F=n(52),I=n(72);function N(){var e,t=Object(T.a)(),n=Object(T.a)(),c=Object(i.useState)([{id:t,title:"What to learn",filter:"all"},{id:n,title:"My hobbies",filter:"all"}]),a=Object(s.a)(c,2),r=a[0],b=a[1],u=Object(i.useState)((e={},Object(j.a)(e,t,[{id:Object(T.a)(),title:"HTML&CSS",isDone:!0},{id:Object(T.a)(),title:"Vanilla JS",isDone:!0},{id:Object(T.a)(),title:"React",isDone:!1},{id:Object(T.a)(),title:"Git/Github",isDone:!1},{id:Object(T.a)(),title:"NodeJS",isDone:!1},{id:Object(T.a)(),title:"REST API",isDone:!1}]),Object(j.a)(e,n,[{id:Object(T.a)(),title:"Hiking",isDone:!0},{id:Object(T.a)(),title:"Reading",isDone:!0},{id:Object(T.a)(),title:"Coding",isDone:!1},{id:Object(T.a)(),title:"Cooking",isDone:!1},{id:Object(T.a)(),title:"Running",isDone:!1},{id:Object(T.a)(),title:"Travelling",isDone:!1}]),e)),h=Object(s.a)(u,2),x=h[0],v=h[1],p=function(e,t){b(r.map((function(n){return n.id===t?Object(l.a)(Object(l.a)({},n),{},{filter:e}):n})))},N=function(e){b(r.filter((function(t){return t.id!==e})))},w=function(e,t){b(r.map((function(n){return n.id===t?Object(l.a)(Object(l.a)({},n),{},{title:e}):n})))},A=function(e,t){var n=x[t].filter((function(t){return t.id!==e}));v(Object(l.a)(Object(l.a)({},x),{},Object(j.a)({},t,n)))},J=function(e,t,n){var i=x[n].map((function(n){return n.id===e?Object(l.a)(Object(l.a)({},n),{},{isDone:t}):n}));v(Object(l.a)(Object(l.a)({},x),{},Object(j.a)({},n,i)))},L=function(e,t){v(Object(l.a)(Object(l.a)({},x),{},Object(j.a)({},t,[{id:Object(T.a)(),title:e.trim(),isDone:!1}].concat(Object(o.a)(x[t])))))},P=function(e,t,n){var i=x[n].map((function(n){return n.id===t?Object(l.a)(Object(l.a)({},n),{},{title:e}):n}));v(Object(l.a)(Object(l.a)({},x),{},Object(j.a)({},n,i)))};return Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)(C.a,{position:"static",children:Object(O.jsxs)(k.a,{style:{justifyContent:"space-between"},children:[Object(O.jsx)(d.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(O.jsx)(D.a,{})}),Object(O.jsx)(S.a,{variant:"h6",children:"News"}),Object(O.jsx)(g.a,{variant:"outlined",color:"inherit",children:"Login"})]})}),Object(O.jsxs)(y.a,{fixed:!0,children:[Object(O.jsx)(F.a,{container:!0,style:{padding:"30px 0"},children:Object(O.jsx)(f,{addItem:function(e){var t=Object(T.a)();b([{id:t,title:e,filter:"all"}].concat(Object(o.a)(r))),v(Object(l.a)(Object(l.a)({},x),{},Object(j.a)({},t,[])))}})}),Object(O.jsx)(F.a,{container:!0,spacing:10,children:r.map((function(e){var t=x[e.id];return"active"===e.filter&&(t=t.filter((function(e){return!e.isDone}))),"completed"===e.filter&&(t=t.filter((function(e){return e.isDone}))),Object(O.jsx)(F.a,{item:!0,children:Object(O.jsx)(I.a,{style:{padding:"25px 45px"},elevation:5,children:Object(O.jsx)(m,{id:e.id,title:e.title,filter:e.filter,tasks:t,removeTask:A,changeFilter:p,addTask:L,changeTaskTitle:P,changeTaskStatus:J,removeTodolist:N,changeTodoTitle:w})})},e.id)}))})]})]})}var w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,145)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),i(e),c(e),a(e),r(e)}))};r.a.render(Object(O.jsx)(c.a.StrictMode,{children:Object(O.jsx)(N,{})}),document.getElementById("root")),w()},93:function(e,t,n){},94:function(e,t,n){}},[[104,1,2]]]);
//# sourceMappingURL=main.e13d9051.chunk.js.map