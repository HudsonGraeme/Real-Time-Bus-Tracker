(this.webpackJsonpbad_bank=this.webpackJsonpbad_bank||[]).push([[2],{113:function(e,t,n){"use strict";t.a=n.p+"static/media/BankLogo.c839211a.png"},135:function(e,t,n){},234:function(e,t,n){},235:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(21),o=n.n(r),i=(n(135),n(4)),u=n(250),s=n(247),l=n(249),d=n(248),h=n(123),b=n(28),j=n.n(b),p=n(30),f=n(10),m=n(37),g=n(3),O=n(1),x=Object(f.h)((function(e){var t=e.location,n=Object(a.useContext)(m.b),c=n.user,r=n.userExists,o=Object(a.useState)([]),b=Object(i.a)(o,2),f=b[0],x=b[1];return Object(a.useEffect)((function(){r()||sessionStorage.getItem(g.f.token)?x([g.e.home,g.e.withdraw,g.e.deposit,g.e.data,g.e.logout]):x([g.e.home,g.e.login,g.e.create_account])}),[r,c]),Object(O.jsx)(u.a,{bg:"light",expand:"lg",children:Object(O.jsxs)(s.a,{children:[Object(O.jsx)(u.a.Brand,{to:g.e.home.path,as:p.b,children:"Bad Bank"}),Object(O.jsx)(u.a.Toggle,{}),Object(O.jsx)(u.a.Collapse,{className:"justify-content-end",children:Object(O.jsxs)(l.a,{children:[f.map((function(e){return Object(O.jsx)(d.a,{trigger:["hover","focus"],placement:"bottom",overlay:Object(O.jsxs)(h.a,{children:[Object(O.jsx)(h.a.Header,{children:e.name}),Object(O.jsx)(h.a.Body,{children:e.description})]}),children:Object(O.jsx)(l.a.Link,{className:"nav-link ".concat(j()(e.path,t.pathname)&&"text-primary"," ").concat(j()(e,g.e.create_account)&&"bg-primary rounded text-light mr-4"," ").concat((j()(e,g.e.login)||j()(e,g.e.logout))&&"bg-dark text-light bold rounded mx-2"),to:e.path,as:p.b,children:e.name},"header-link-".concat(e.name))},"pop-header-".concat(e.name,"}"))})),r()?Object(O.jsx)(l.a.Link,{disabled:!0,className:"text-secondary",children:"".concat(c.first_name," ").concat(c.last_name," (").concat(c.email,")")}):null]})})]})})})),v=n(117),k=function(){return Object(O.jsx)("div",{className:"fixed-bottom bg-light",children:Object(O.jsx)(u.a,{children:Object(O.jsx)(s.a,{children:Object(O.jsx)(v.a,{children:"Bad Bank\u2122"})})})})},w=n(113),y=(n(233),n(234),c.a.lazy((function(){return n.e(8).then(n.bind(null,315))}))),_=function(){return Object(O.jsxs)("div",{className:"w-100 h-100 bg-light text-dark",children:[Object(O.jsx)("img",{src:w.a,alt:"Logo",height:"256px"}),Object(O.jsx)("h1",{className:"p-5",children:"Loading..."})]})},S=function(){var e=Object(a.useContext)(m.b).userExists,t=function(e){var t=e.children;return Object(O.jsx)(c.a.Suspense,{fallback:Object(O.jsx)(_,{}),children:t})};return Object(O.jsx)("div",{className:"App",children:Object(O.jsxs)(p.a,{basename:"/",children:[Object(O.jsx)(x,{}),Object(O.jsxs)(f.d,{children:[Object.values(g.e).map((function(n){return Object(O.jsx)(f.b,{path:n.path,exact:!0,children:!n.walled||e()&&!j()(n,g.e.create_account)&&!j()(n,g.e.login)?Object(O.jsx)(t,{children:n.component}):Object(O.jsx)(f.a,{to:e()?"/data":"/login"})},"route-".concat(n.name))})),Object(O.jsx)(f.b,{children:Object(O.jsx)(t,{children:Object(O.jsx)(y,{})})})]}),Object(O.jsx)(k,{})]})})},C=function(e){e&&e instanceof Function&&n.e(14).then(n.bind(null,313)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),r(e),o(e)}))};o.a.render(Object(O.jsx)(c.a.StrictMode,{children:Object(O.jsx)(m.a,{children:Object(O.jsx)(S,{})})}),document.getElementById("root")),C()},3:function(e,t,n){"use strict";n.d(t,"e",(function(){return b})),n.d(t,"b",(function(){return j})),n.d(t,"c",(function(){return p})),n.d(t,"d",(function(){return f})),n.d(t,"a",(function(){return m})),n.d(t,"f",(function(){return g}));var a=n(0),c=n.n(a),r=n(1),o=c.a.lazy((function(){return n.e(7).then(n.bind(null,236))})),i=c.a.lazy((function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,237))})),u=c.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(12)]).then(n.bind(null,238))})),s=c.a.lazy((function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,239))})),l=c.a.lazy((function(){return Promise.all([n.e(1),n.e(5),n.e(9)]).then(n.bind(null,240))})),d=c.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(13)]).then(n.bind(null,241))})),h=c.a.lazy((function(){return n.e(6).then(n.bind(null,242))})),b={home:{name:"Home",path:"/",description:"Our homepage",component:Object(r.jsx)(o,{}),walled:!1},withdraw:{name:"Withdraw",path:"/withdraw",description:"Make a withdrawal",component:Object(r.jsx)(i,{}),walled:!0},deposit:{name:"Deposit",path:"/deposit",description:"Make a deposit",component:Object(r.jsx)(s,{}),walled:!0},data:{name:"My Data",path:"/data",description:"View all of your data",component:Object(r.jsx)(l,{}),walled:!0},create_account:{name:"Create Account",path:"/create-account",description:"Create an account",component:Object(r.jsx)(u,{}),walled:!1},login:{name:"Login",path:"/login",description:"Log into the bank",component:Object(r.jsx)(d,{}),walled:!1},logout:{name:"Logout",path:"/logout",description:"Log out of the bank",component:Object(r.jsx)(h,{}),walled:!0}},j={auth:{sign_up:"/auth/signup",login:"/auth/login",logout:"/auth/logout"},user:"/me",transactions:"/transactions"},p={post:"post",get:"get",patch:"patch",delete:"delete",put:"put"},f={ci:"ci",dev:"development",prod:"production"},m={api_dev:"http://localhost:3000"},g={token:"token"}},37:function(e,t,n){"use strict";n.d(t,"a",(function(){return _})),n.d(t,"b",(function(){return v}));var a=n(4),c=n(2),r=n(0),o=n(3),i=n(7),u=n.n(i),s=n(14),l=n(122),d="production"===o.d.dev?o.a.api_dev:"",h=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function(){var a=Object(s.a)(u.a.mark((function a(r){var i,s;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return i={},r&&(i.json=Object(c.a)({},r)),n&&(s=sessionStorage.getItem(o.f.token))&&(i.headers={token:s}),a.abrupt("return",l.a[t](d+e,i).then((function(e){return e.json()})));case 4:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},b=h(o.b.auth.sign_up,o.c.post),j=h(o.b.auth.login,o.c.post),p=(h(o.b.auth.logout,o.c.post,!0),h(o.b.user,o.c.get,!0)),f=(h(o.b.user,o.c.patch,!0),h(o.b.transactions,o.c.get,!0),h(o.b.transactions,o.c.patch,!0)),m=n(85),g=n(116),O=n.n(g),x=n(1),v=Object(r.createContext)(),k="LOAD_USER",w="TRANSACTION",y=function(e,t){var n=e;switch(t.type){case k:if(!t.user){console.error("Cannot add a user without a user to add");break}var a=O()(t.user);a.name=Object(m.a)([t.first_name,t.last_name].join(" ")),a.token&&sessionStorage.setItem(o.f.token,a.token),n=Object(c.a)(Object(c.a)({},e),a);break;case w:n=Object(c.a)(Object(c.a)({},e),{},{transactions:t.value});break;default:console.error("userReducer called without an action type")}return n},_=function(e){var t=e.children,n=Object(r.useReducer)(y,{}),c=Object(a.a)(n,2),i=c[0],u=c[1],s=Object(r.useCallback)((function(){return p().then((function(e){return u({type:k,user:e})})).catch((function(e){return console.error("Failed to fetch user data",e)}))}),[]);Object(r.useEffect)(s,[s]);return Object(x.jsx)(v.Provider,{value:{user:i,userExists:function(){return!!Object.keys(i).length||sessionStorage.getItem(o.f.token)},transact:function(e){return f({value:e}).then((function(e){u({type:w,value:e}),s()}))},createUser:function(e){return b(e).then((function(e){return u({type:k,user:e})}))},signin:function(e){return j(e).then((function(e){return u({type:k,user:e})}))},fetchUser:s,logout:function(){sessionStorage.clear(),window.location.href=o.e.login.path}},children:t})}},85:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"d",(function(){return d})),n.d(t,"c",(function(){return l})),n.d(t,"a",(function(){return h}));var a=n(114),c=n.n(a),r=n(115),o=n.n(r),i=new Intl.NumberFormat("en-US",{currency:"USD",style:"currency"}),u=new Intl.DateTimeFormat("default",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}),s=function(e){var t=parseFloat(e);return i.format(t)},l=function(e){return u.format(e)},d=function(e){return e||0===e},h=function(e){return o()(c()(e))}}},[[235,3,4]]]);
//# sourceMappingURL=main.54d75d90.chunk.js.map