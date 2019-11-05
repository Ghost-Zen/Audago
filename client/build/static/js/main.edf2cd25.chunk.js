(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{144:function(e,t,a){},222:function(e,t,a){e.exports=a(377)},227:function(e,t,a){},377:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(59),i=a.n(c),s=(a(227),a(24)),o=a(25),l=a(26),u=a(27),m=a(28),h=(a(144),a(57)),d=a(51),p=a(38),g=a(393),f=a(398),v=a(397),E=a(390),b=a(396),k=a(379),y=a(52),O=a(42);function C(){var e=Object(y.a)(["  \n    mutation($username:String, $account:Account){\n      updateUser(username:$username, account: $account){\n        response,\n        status\n      }\n    }\n"]);return C=function(){return e},e}function j(){var e=Object(y.a)(["\n    mutation($username:String){\n      deleteUser (username:$username){\n        response,\n        status\n      }\n    }\n"]);return j=function(){return e},e}function w(){var e=Object(y.a)(["\n    mutation($username:String, $password:String) {\n      loginCheck (username:$username, password:$password){\n        response,\n        status\n      }\n    }\n"]);return w=function(){return e},e}function S(){var e=Object(y.a)(["\n  mutation($search:String) {\n   searchSong (search:$search){\n    response\n}\n    }\n"]);return S=function(){return e},e}function I(){var e=Object(y.a)(["\n  mutation($firstName: String, $lastName: String, $username: String, $email:String, $password:String,$image:String,$active:Boolean) {\n   createAccount (firstName:$firstName, lastName:$lastName, username:$username, email:$email, password:$password,image:$image,active:$active){\n        response\n}\n    }\n"]);return I=function(){return e},e}var $=Object(O.b)(I()),A=Object(O.b)(S()),x=Object(O.b)(w()),N=(Object(O.b)(j()),Object(O.b)(C()),a(388)),P=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).state={username:"",password:"",status:!1,message:""},a.renderRedirect=function(){if(a.state.status)return r.a.createElement(d.a,{to:"/"})},a.renderError=function(){if(!a.state.status&&a.state.message)return r.a.createElement(g.a,{negative:!0},r.a.createElement(g.a.Header,null,a.state.message))},a.handleChange=function(e){a.setState(Object(p.a)({},e.target.name,e.target.value))},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.username,n=t.password;return r.a.createElement(f.a,{textAlign:"center",style:{height:"100vh"},verticalAlign:"middle"},r.a.createElement(f.a.Column,{style:{maxWidth:450}},r.a.createElement(v.a,{as:"h2",color:"teal",textAlign:"center"},"Log-in to your account"),r.a.createElement(E.a,{size:"large"},r.a.createElement(b.a,{stacked:!0},r.a.createElement(E.a.Input,{fluid:!0,icon:"user",name:"username",iconPosition:"left",placeholder:"E-mail address",onChange:this.handleChange}),r.a.createElement(E.a.Input,{fluid:!0,icon:"lock",name:"password",iconPosition:"left",placeholder:"Password",type:"password",onChange:this.handleChange}),this.renderRedirect(),this.renderError(),r.a.createElement(N.a,{mutation:x,variables:{username:a,password:n},update:function(t,a){var n=a.data;e.setState({status:n.loginCheck.status,message:n.loginCheck.response})}},(function(e){return r.a.createElement(k.a,{type:"submit",color:"teal",fluid:!0,size:"large",onClick:e},"Login")})))),r.a.createElement(g.a,null,"New to us? ",r.a.createElement("a",{href:"#signup"},"Sign Up"))))}}]),t}(r.a.Component),_=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={firstName:"",lastName:"",username:"",email:"",password:"",confirm:"",image:"",active:!0,gql_res:{createAccount:{response:!1}}},a.handleChange=function(e){a.setState(Object(p.a)({},e.target.name,e.target.value))},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.firstName,n=t.lastName,c=t.username,i=t.email,s=t.password,o=t.image,l=t.active;return"Account created"===this.state.gql_res.createAccount.response?r.a.createElement(d.a,{to:"/"}):r.a.createElement(f.a,{textAlign:"center",style:{height:"100vh"},verticalAlign:"middle"},r.a.createElement(f.a.Column,{style:{maxWidth:450}},r.a.createElement(v.a,{as:"h2",color:"teal",textAlign:"center"},"Create an account"),r.a.createElement(E.a,{size:"large"},r.a.createElement(b.a,{stacked:!0},r.a.createElement(E.a.Input,{name:"firstName",fluid:!0,icon:"user",iconPosition:"left",placeholder:"Firstname",onChange:this.handleChange}),r.a.createElement(E.a.Input,{name:"lastName",fluid:!0,icon:"user",iconPosition:"left",placeholder:"Lastname",onChange:this.handleChange}),r.a.createElement(E.a.Input,{name:"username",fluid:!0,icon:"user",iconPosition:"left",placeholder:"Username",onChange:this.handleChange}),r.a.createElement(E.a.Input,{name:"email",fluid:!0,icon:"mail",iconPosition:"left",placeholder:"E-mail address",onChange:this.handleChange}),r.a.createElement(E.a.Input,{name:"password",fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Password",type:"password",onChange:this.handleChange}),r.a.createElement(E.a.Input,{name:"confirm",fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Confirm Password",type:"password",onChange:this.handleChange}),r.a.createElement(N.a,{mutation:$,variables:{firstName:a,lastName:n,username:c,email:i,password:s,image:o,active:l},update:function(t,a){var n=a.data;e.setState({gql_res:n})}},(function(e){return r.a.createElement(k.a,{type:"submit",color:"teal",fluid:!0,size:"large",onClick:e},"Signup")}))))))}}]),t}(r.a.Component),q=a(389),U=a(391),T=a(392),z=a(212),W=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleShow=function(){return a.setState({active:!0})},a.handleHide=function(){return a.setState({active:!1})},a.intialPlayer=function(e){a.setState({activeTrack:e}),a.props.playTrack(e)},a.state={},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.image,n=t.track,c=t.index,i=this.state.active,s=r.a.createElement("div",null,r.a.createElement(v.a,{as:"h4",inverted:!0},n),r.a.createElement(k.a,{primary:!0,icon:"play",onClick:function(){return e.intialPlayer(c)}}));return r.a.createElement(T.a.Dimmable,{style:{margin:3},as:z.a,dimmed:i,dimmer:{active:i,content:s},onMouseEnter:this.handleShow,onMouseLeave:this.handleHide,size:"small",src:a})}}]),t}(n.Component),H=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).playTrack=function(e){var t=a.props.location.state.data,n=document.querySelector("#player");n.src=t[e].song,n.play()},a.stopActiveTrack=function(){},a.renderData=function(){for(var e=a.props.location.state.data,t=[],n=0;n<e.length;n++)t.push(r.a.createElement(W,{image:e[n].artwork,artist:e[n].artist,track:e[n].track,song:e[n].song,playTrack:a.playTrack,index:n}));return t},a.state={activeTrack:""},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return void 0===this.props.location.state?r.a.createElement(d.a,{to:"/"}):r.a.createElement("div",null,r.a.createElement(q.a,{style:{margin:20}},r.a.createElement(U.a.Group,{itemsPerRow:6},this.renderData())),r.a.createElement("div",{className:"audioPlayer"},r.a.createElement("audio",{id:"player",controls:!0},r.a.createElement("source",{src:""}))))}}]),t}(r.a.Component),L=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={search:"",gql_res:"",loading:!1},a.handleChange=function(e){a.setState({search:e.target.value})},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state.search;return""!==this.state.gql_res?(console.log(this.state.gql_res),r.a.createElement(d.a,{to:{pathname:"/webplayer",state:{data:this.state.gql_res}}})):r.a.createElement(q.a,null,r.a.createElement(f.a,{textAlign:"center",style:{height:"80vh"},verticalAlign:"middle"},r.a.createElement(f.a.Column,{style:{maxWidth:450}},r.a.createElement(v.a,{as:"h2",color:"teal",textAlign:"center"},"Search from over 30 million songs"),r.a.createElement(E.a,{size:"large"},r.a.createElement(b.a,{stacked:!0},r.a.createElement(E.a.Input,{fluid:!0,icon:"music",iconPosition:"left",placeholder:"Search Song",onChange:this.handleChange}),r.a.createElement(N.a,{mutation:A,variables:{search:t},update:function(t,a){var n=a.data;n=JSON.parse(n.searchSong.response),e.setState({gql_res:n,loading:!0})}},(function(e){return r.a.createElement(k.a,{type:"submit",color:"teal",fluid:!0,size:"large",onClick:e},"Search")})))))))}}]),t}(r.a.Component),B=a(136),D=a.n(B),J=a(209),M=a(210),R=a.n(M),F={isAuthenticated:!1,isUsername:"",token:"",check:function(){var e=Object(J.a)(D.a.mark((function e(){var t,a=this;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((t={token:""}).token=localStorage.getItem("sudo"),""===t){e.next=5;break}return e.next=5,R.a.post("/verify",t).then((function(e){a.isAuthenticated=e.data.response,a.isUsername=e.data.client_id,a.token=t.token}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),getToken:function(){return this.token},getAuth:function(){return!0},getUserName:function(){return this.isUsername},signOutUser:function(){return localStorage.removeItem("sudo"),!1}};a(61);function G(){var e=Object(y.a)(["\n  {\n    test\n  }\n"]);return G=function(){return e},e}Object(O.b)(G());var K=function(e){return r.a.createElement(h.a,null,r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/",component:L}),r.a.createElement(d.b,{exact:!0,path:"/webplayer",component:H}),r.a.createElement(d.b,{exact:!0,path:"/login",component:P}),r.a.createElement(d.b,{exact:!0,path:"/signup",component:_})))},Q=a(394),V=a(387),X=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).state={activeItem:"home"},a.handleItemClick=function(e,t){var n=t.name;a.setState({activeItem:n})},a.userStatus=function(){var e=a.state.activeItem;return!0===F.getAuth()?r.a.createElement(Q.a.Item,{name:"Welcome ____",active:"greet"===e,onClick:a.handleItemClick}):r.a.createElement(Q.a.Item,{name:"login",active:"login"===e,onClick:a.handleItemClick})},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.state.activeItem;return r.a.createElement(Q.a,{secondary:!0,style:{margin:5}},r.a.createElement(Q.a.Header,{style:{margin:5,color:"teal"},as:"h2",children:"Audago"}),r.a.createElement(Q.a.Item,{name:"home",active:"home"===e,onClick:this.handleItemClick}),r.a.createElement(Q.a.Item,{name:"playlist",active:"playlist"===e,onClick:this.handleItemClick}),r.a.createElement(Q.a.Item,{name:"about",active:"about"===e,onClick:this.handleItemClick}),r.a.createElement(Q.a.Menu,{position:"right"},r.a.createElement(Q.a.Item,null,r.a.createElement(V.a,{icon:"search",placeholder:"Search..."})),this.userStatus()))}}]),t}(n.Component),Y=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={auth:!1,loading:!1},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(q.a,null,r.a.createElement(X,null),r.a.createElement(K,null)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Z={graphql:new O.a({uri:"/graphql"})},ee=a(19);i.a.render(r.a.createElement(ee.a,{client:Z.graphql},r.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[222,1,2]]]);
//# sourceMappingURL=main.edf2cd25.chunk.js.map