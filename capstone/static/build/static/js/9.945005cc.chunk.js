(this.webpackJsonpbad_bank=this.webpackJsonpbad_bank||[]).push([[9],{240:function(e,t,a){"use strict";a.r(t);var n=a(2),c=a(4),s=a(267),r=a(0),o=a(261),i=a(312),l=a(255),b=a(311),d=a(280),j=a(37),u=a(85),h=a(30),O=a(3),p=a(281),m=a(309),x=(a(308),a(1));p.d.register(p.c,p.o,p.k,p.i,p.h,p.p,p.q,p.f);var f={responsive:!0,plugins:{legend:{position:"top"}},scales:{x:{grid:{display:!1}},y:{grid:{display:!1}}}};t.default=function(){var e=Object(r.useContext)(j.b).user,t=Object(r.useState)({labels:[],datasets:[]}),a=Object(c.a)(t,2),p=a[0],g=a[1];Object(r.useEffect)((function(){var t=Object(s.get)(e,"transactions",[]).sort((function(e,t){return new Date(e.date)-new Date(t.date)}));g({labels:t.map((function(e){return Object(u.c)(new Date(e.date))})),datasets:[{label:"Running Balance",data:t.map((function(e){return e.runningBalance})),borderColor:"#f88",backgroundColor:"#f88",cubicInterpolationMode:"monotone",tension:.4},{label:"Transaction value",data:t.map((function(e){return e.value})),borderColor:"#8888ff",backgroundColor:"#8888bb",cubicInterpolationMode:"monotone",tension:.4}]})}),[e]);return Object(x.jsx)(b.a,{md:1,className:"m-5",children:Object.keys(e).length?Object(x.jsx)(d.a,{children:Object(x.jsxs)(o.a,{className:"m-4 p-4",children:[Object(x.jsx)(o.a.Title,{children:Object(x.jsx)("h2",{children:"".concat(e.first_name," ").concat(e.last_name)})}),Object(x.jsxs)(o.a.Body,{children:[Object(x.jsx)("h4",{className:"text-left",children:"Recent Transactions"}),Object(x.jsx)(m.a,{options:f,data:p,height:"50%",maintainAspectRatio:"false"}),Object(x.jsx)("div",{children:Object(x.jsxs)(i.a,{children:[Object(x.jsx)("thead",{children:Object(x.jsx)("tr",{children:((e.transactions||[]).length?Object.keys(e.transactions[0]):["Date","Value","Running Balance"]).map((function(e){return"runningBalance"===e?"Running Balance":e})).map((function(e){return Object(x.jsx)("th",{children:Object(s.startCase)(Object(s.toLower)(e))},"table-header-alldata-".concat(e))}))})}),Object(x.jsx)("tbody",{children:e.transactions.map((function(e){return Object(n.a)(Object(n.a)({},e),{},{date:Object(u.c)(Date.parse(e.date)),value:"".concat("WITHDRAW"===e.type?"-":"+").concat(Object(u.b)(Math.abs(e.value))),runningBalance:"".concat(e.runningBalance<0?"-":"+").concat(Object(u.b)(Math.abs(e.runningBalance)))})})).map((function(t){return Object(x.jsx)("tr",{children:Object.values(t).map((function(a){return Object(x.jsx)("td",{className:"".concat("-"===a.charAt(0)?"text-danger":"+"===a.charAt(0)?"text-success":""),children:a},"transaction-row-column-".concat(a,"-").concat(e.id,"-").concat(t.date))}))},"transaction-row-".concat(t.date,"-").concat(e.id))}))})]})}),Object(x.jsxs)("h5",{className:"mt-4",children:["Current Balance: ",Object(u.b)(e.balance)]})]})]},"user-card-".concat(e.name))}):Object(x.jsx)(d.a,{children:Object(x.jsxs)(o.a,{className:"m-4 p-5",children:[Object(x.jsx)(o.a.Title,{children:"No Data Exists"}),Object(x.jsx)(o.a.Body,{className:"mb-3",children:"Navigate to the Create Account page to add a user"}),Object(x.jsx)(l.a,{as:h.b,to:O.e.create_account.path,children:"Create a new account"})]})})})}},308:function(e,t,a){}}]);
//# sourceMappingURL=9.945005cc.chunk.js.map