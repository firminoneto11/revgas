(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(5),s=n.n(a),i=n(2),o=n.n(i),j=n(4),d=n(6),b=(n(12),n(0));var h=function(){var e=Object(c.useState)(),t=Object(d.a)(e,2),n=t[0],r=t[1],a=function(){var e=Object(j.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://revgas.herokuapp.com/revgas/api/banks/",e.next=3,fetch("https://revgas.herokuapp.com/revgas/api/banks/");case 3:return n=e.sent,e.next=6,n.json();case 6:n=e.sent,r(n);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s=function(){var e=Object(j.a)(o.a.mark((function e(t){var n,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://revgas.herokuapp.com/revgas/api/banks/".concat(t),e.next=3,fetch(n);case 3:return c=e.sent,e.next=6,c.json();case 6:c=e.sent,r(c);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){a()}),[]);var i=function(e){var t,n=e.bankData;if(n instanceof Array)t=n&&n.map((function(e,t){var n=e.id,c=e.compensation_code,r=e.institution_name;return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:n}),Object(b.jsx)("td",{children:c}),Object(b.jsx)("td",{children:r})]},t)}));else if(n){var c=n.id,r=n.compensation_code,a=n.institution_name;t=Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:c}),Object(b.jsx)("td",{children:r}),Object(b.jsx)("td",{children:a})]},"1")}return Object(b.jsx)("tbody",{children:t})};return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{className:"title",children:"Banks Index"}),Object(b.jsxs)("div",{className:"search-box",children:[Object(b.jsx)("p",{className:"search-text",children:"Search a bank by the Compensation Code:"}),Object(b.jsx)("input",{type:"number",className:"search-input",onKeyUp:function(e){13===e.keyCode&&(e.preventDefault(),e.target.nextSibling.click())}}),Object(b.jsx)("button",{className:"look-for-bank",onClick:function(e){var t=e.target.previousSibling.value;t.length>0?s(t):a()},children:"Search"})]}),Object(b.jsx)("div",{className:"table-container",children:Object(b.jsxs)("table",{className:"table",children:[Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{children:"Id"}),Object(b.jsx)("th",{children:"Compensation Code"}),Object(b.jsx)("th",{children:"Institution name"})]})}),Object(b.jsx)(i,{bankData:n})]})})]})};s.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(h,{})}),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.b651b8fc.chunk.js.map