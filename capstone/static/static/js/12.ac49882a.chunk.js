(this.webpackJsonpbad_bank=this.webpackJsonpbad_bank||[]).push([[12],{238:function(e,a,s){"use strict";s.r(a);var t=s(4),n=s(0),l=s(261),r=s(313),c=s(311),i=s(280),d=s(315),o=s(255),m=s(259),j=s(260),b=s(37),u=s(267),h=s(310),p=s(10),x=s(30),O=s(3),y=s(1),f=j.b().shape({first_name:j.c("ss").default("").required("Please enter your first name"),last_name:j.c().default("").required("Please enter your last name"),email:j.c().required("Please enter your E-Mail address").email("Invalid email address").default(""),username:j.c().default("").required("Please enter a valid username"),password:j.c().default("").required("Please enter a valid password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,"Ensure your password contains 8 characters - One Uppercase, One Lowercase, One Number and One Special Character")});a.default=function(){var e=Object(n.useContext)(b.b).createUser,a=Object(n.useState)({}),s=Object(t.a)(a,2),j=s[0],v=s[1],C=Object(p.g)();return Object(y.jsxs)(l.a,{className:"mx-auto w-50 mt-5",children:[j.open&&Object(y.jsx)(h.a,{variant:j.type,children:j.message}),Object(y.jsx)(l.a.Title,{className:"mb-5 pt-5 text-left display-4",children:"Create an Account"}),Object(y.jsx)(l.a.Body,{className:"p-5",children:Object(y.jsx)(m.a,{validationSchema:f,onSubmit:function(a,s){!function(a,s){e(a).then((function(){s(),v({open:!0,type:"success",message:"Successfully signed up"}),C.push(O.e.data.path)})).catch((function(e){return v({open:!0,type:"danger",message:"Failed to create an account. Please check your information and try again."})})).finally((function(){setTimeout((function(){return v({})}),2500)}))}(a,s.resetForm)},initialValues:{first_name:"",last_name:"",username:"",email:"",password:""},children:function(e){var a=e.handleSubmit,s=e.handleChange,t=e.values,n=e.isValid,l=e.errors,m=e.dirty;return Object(y.jsxs)(r.a,{onSubmit:a,children:[Object(y.jsxs)(c.a,{children:[Object(y.jsxs)(r.a.Group,{as:i.a,className:"my-2",children:[Object(y.jsx)(r.a.Label,{children:"First Name"}),Object(y.jsxs)(d.a,{hasValidation:!0,children:[Object(y.jsx)(r.a.Control,{type:"text",name:"first_name",autoComplete:"given-name",placeholder:"John",value:t.first_name,isInvalid:!!l.first_name,onChange:s}),Object(y.jsx)(r.a.Control.Feedback,{type:"invalid",children:Object(u.capitalize)(l.first_name)})]})]}),Object(y.jsxs)(r.a.Group,{as:i.a,className:"my-2",children:[Object(y.jsx)(r.a.Label,{children:"Last Name"}),Object(y.jsxs)(d.a,{hasValidation:!0,children:[Object(y.jsx)(r.a.Control,{type:"text",name:"last_name",autoComplete:"family-name",placeholder:"Doe",value:t.last_name,isInvalid:!!l.last_name,onChange:s}),Object(y.jsx)(r.a.Control.Feedback,{type:"invalid",children:Object(u.capitalize)(l.last_name)})]})]})]}),Object(y.jsxs)(r.a.Group,{as:c.a,className:"my-2",children:[Object(y.jsx)(r.a.Label,{children:"Username"}),Object(y.jsxs)(d.a,{hasValidation:!0,children:[Object(y.jsx)(r.a.Control,{type:"text",name:"username",autoComplete:"username",placeholder:"MrJohnDoe",value:t.username,isInvalid:!!l.username,onChange:s}),Object(y.jsx)(r.a.Control.Feedback,{type:"invalid",children:Object(u.capitalize)(l.username)})]})]}),Object(y.jsxs)(r.a.Group,{as:c.a,className:"my-2",children:[Object(y.jsx)(r.a.Label,{children:"Email Address"}),Object(y.jsxs)(d.a,{hasValidation:!0,children:[Object(y.jsx)(d.a.Text,{className:!!l.email&&"text-danger border border-danger",children:"\u2709"}),Object(y.jsx)(r.a.Control,{type:"email",name:"email",autoComplete:"email",value:t.email,isInvalid:!!l.email,placeholder:"johndoe@mail.com",onChange:s}),Object(y.jsx)(r.a.Control.Feedback,{type:"invalid",children:Object(u.capitalize)(l.email)})]})]}),Object(y.jsxs)(r.a.Group,{as:c.a,className:"my-2",children:[Object(y.jsx)(r.a.Label,{children:"Password"}),Object(y.jsxs)(d.a,{hasValidation:!0,children:[Object(y.jsx)(d.a.Text,{className:!!l.email&&"text-danger border border-danger",children:"\ud83d\udd12"}),Object(y.jsx)(r.a.Control,{type:"password",name:"password",autoComplete:"new-password",value:t.password,placeholder:"**************",isInvalid:!!l.password,onChange:s}),Object(y.jsx)(r.a.Control.Feedback,{type:"invalid",children:Object(u.capitalize)(l.password)})]})]}),Object(y.jsx)(o.a,{type:"submit",disabled:!n||!m,className:"mt-5 w-25 mx-2 inline-block",children:"Create Account"})]})}})}),Object(y.jsx)(l.a.Footer,{className:"d-flex flex-row-reverse align-items-center",children:Object(y.jsx)(o.a,{variant:"primary",className:"w-50",as:x.b,to:O.e.login.path,children:"Already have an account?"})})]})}}}]);
//# sourceMappingURL=12.ac49882a.chunk.js.map