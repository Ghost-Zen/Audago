(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{145:function(e,t,a){},223:function(e,t,a){e.exports=a(378)},228:function(e,t,a){},378:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(61),s=a.n(c),i=(a(228),a(74)),l=a.n(i),o=a(101),u=a(20),m=a(21),h=a(22),d=a(23),p=a(24),g=(a(145),a(189)),f=a(59),v=a(53),b=a(40),E=a(395),y=a(398),k=a(399),j=a(392),O=a(397),C=a(380),w=a(34),S=a(32);function I(){var e=Object(w.a)(["\n    mutation($jwt:String){\n      verifytoken(jwt:$jwt){\n        response\n      }\n    }\n\n"]);return I=function(){return e},e}function $(){var e=Object(w.a)(["  \n    mutation($username:String){\n      updateUser(username:$username){\n        response,\n        list,\n        status\n      }\n    }\n"]);return $=function(){return e},e}function P(){var e=Object(w.a)(["  \n    mutation($username:String, $playlistName: String){\n      updateUser(username:$username, playlistName:$playlistName){\n        response,\n        status\n      }\n    }\n"]);return P=function(){return e},e}function A(){var e=Object(w.a)(["  \n    mutation($username:String, $playlistName: String){\n      updateUser(username:$username, playlistName:$playlistName){\n        response,\n        status\n      }\n    }\n"]);return A=function(){return e},e}function x(){var e=Object(w.a)(["  \n    mutation($track:PlaylistTrack){\n      updateUser(track:$track){\n        response,\n        status\n      }\n    }\n"]);return x=function(){return e},e}function N(){var e=Object(w.a)(["  \n    mutation($track:PlaylistTrack){\n      updateUser(track:$track){\n        response,\n        status\n      }\n    }\n"]);return N=function(){return e},e}function U(){var e=Object(w.a)(["  \n    mutation($playlist:Playlist){\n      updateUser(playlist:$playlist){\n        response,\n        status\n      }\n    }\n"]);return U=function(){return e},e}function T(){var e=Object(w.a)(["  \n    mutation($username:String, $currentPass:String, $newPass: String){\n      updatePassword(username:$username, currentPass:$currentPass, newPass:$newPass){\n        response,\n        status\n      }\n    }\n"]);return T=function(){return e},e}function q(){var e=Object(w.a)(["  \n    mutation($username:String, $updateData:UpdateData){\n      updateUser(username:$username, updateData: $updateData){\n        response,\n        status\n      }\n    }\n"]);return q=function(){return e},e}function D(){var e=Object(w.a)(["\n    mutation($username:String){\n      deleteUser (username:$username){\n        response,\n        status\n      }\n    }\n"]);return D=function(){return e},e}function _(){var e=Object(w.a)(["\n    mutation($username:String){\n      userData(username:$username){\n        response,\n        user,\n        status\n      }\n    }\n"]);return _=function(){return e},e}function z(){var e=Object(w.a)(["\n    mutation($username:String, $password:String) {\n      loginCheck (username:$username, password:$password){\n        response,\n        username,\n        status\n      }\n    }\n"]);return z=function(){return e},e}function R(){var e=Object(w.a)(["\n  mutation($search:String) {\n   searchSong (search:$search){\n    response\n    }\n  }\n"]);return R=function(){return e},e}function W(){var e=Object(w.a)(["\n  mutation($account:Account) {\n   createAccount (account:$account){\n        response,\n        status\n}\n    }\n"]);return W=function(){return e},e}var H=Object(S.b)(W()),L=Object(S.b)(R()),M=Object(S.b)(z()),B=(Object(S.b)(_()),Object(S.b)(D()),Object(S.b)(q()),Object(S.b)(T()),Object(S.b)(U()),Object(S.b)(N()),Object(S.b)(x()),Object(S.b)(A()),Object(S.b)(P()),Object(S.b)($()),Object(S.b)(I()),a(389)),J=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,c=new Array(n),s=0;s<n;s++)c[s]=arguments[s];return(a=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(c)))).state={username:"",password:"",status:!1,message:""},a.setClientToken=function(e){return localStorage.setItem("sudo",e),r.a.createElement(v.a,{to:"/"})},a.renderRedirect=function(){if(a.state.status)return r.a.createElement(v.a,{to:"/"})},a.renderError=function(){if(!a.state.status&&a.state.message)return r.a.createElement(E.a,{negative:!0},r.a.createElement(E.a.Header,null,a.state.message))},a.handleChange=function(e){a.setState(Object(b.a)({},e.target.name,e.target.value))},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.username,n=t.password;return r.a.createElement(y.a,{textAlign:"center",style:{height:"80vh"},verticalAlign:"middle"},r.a.createElement(y.a.Column,{style:{maxWidth:450}},r.a.createElement(k.a,{as:"h2",color:"teal",textAlign:"center"},"Log-in to your account"),r.a.createElement(j.a,{size:"large"},r.a.createElement(O.a,{stacked:!0},r.a.createElement(j.a.Input,{fluid:!0,icon:"user",name:"username",iconPosition:"left",placeholder:"E-mail address",onChange:this.handleChange}),r.a.createElement(j.a.Input,{fluid:!0,icon:"lock",name:"password",iconPosition:"left",placeholder:"Password",type:"password",onChange:this.handleChange}),this.renderRedirect(),this.renderError(),r.a.createElement(B.a,{mutation:M,variables:{username:a,password:n},update:function(t,a){var n=a.data;e.setState({status:n.loginCheck.status,message:n.loginCheck.response}),e.setClientToken(n.loginCheck.response)}},(function(e){return r.a.createElement(C.a,{type:"submit",color:"teal",fluid:!0,size:"large",onClick:e},"Login")})))),r.a.createElement(E.a,null,"New to us? ",r.a.createElement("a",{href:"#signup"},"Sign Up"))))}}]),t}(r.a.Component),F=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={firstName:"",lastName:"",username:"",email:"",password:"",confirm:"",image:"",active:!0,gql_res:{createAccount:{response:!1}}},a.handleChange=function(e){a.setState(Object(b.a)({},e.target.name,e.target.value))},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a={firstName:t.firstName,lastName:t.lastName,username:t.username,email:t.email,password:t.password,image:t.image,active:t.active};return"Account created"===this.state.gql_res.createAccount.response?r.a.createElement(v.a,{to:"/"}):r.a.createElement(y.a,{textAlign:"center",style:{height:"100vh"},verticalAlign:"middle"},r.a.createElement(y.a.Column,{style:{maxWidth:450}},r.a.createElement(k.a,{as:"h2",color:"teal",textAlign:"center"},"Create an account"),r.a.createElement(j.a,{size:"large"},r.a.createElement(O.a,{stacked:!0},r.a.createElement(j.a.Input,{name:"firstName",fluid:!0,icon:"user",iconPosition:"left",placeholder:"Firstname",onChange:this.handleChange}),r.a.createElement(j.a.Input,{name:"lastName",fluid:!0,icon:"user",iconPosition:"left",placeholder:"Lastname",onChange:this.handleChange}),r.a.createElement(j.a.Input,{name:"username",fluid:!0,icon:"user",iconPosition:"left",placeholder:"Username",onChange:this.handleChange}),r.a.createElement(j.a.Input,{name:"email",fluid:!0,icon:"mail",iconPosition:"left",placeholder:"E-mail address",onChange:this.handleChange}),r.a.createElement(j.a.Input,{name:"password",fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Password",type:"password",onChange:this.handleChange}),r.a.createElement(j.a.Input,{name:"confirm",fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Confirm Password",type:"password",onChange:this.handleChange}),r.a.createElement(B.a,{mutation:H,variables:{account:a},update:function(t,a){var n=a.data;e.setState({gql_res:n})}},(function(e){return r.a.createElement(C.a,{type:"submit",color:"teal",fluid:!0,size:"large",onClick:e},"Signup")}))))))}}]),t}(r.a.Component),G=a(390),K=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={search:"",gql_res:"",loading:!1},a.handleChange=function(e){a.setState({search:e.target.value})},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.state.search;return""!==this.state.gql_res?(console.log(this.state.gql_res),r.a.createElement(v.a,{to:{pathname:"/webplayer",state:{data:this.state.gql_res}}})):r.a.createElement(G.a,null,r.a.createElement(y.a,{textAlign:"center",style:{height:"80vh"},verticalAlign:"middle"},r.a.createElement(y.a.Column,{style:{maxWidth:450}},r.a.createElement(k.a,{as:"h2",color:"teal",textAlign:"center"},"Search from over 30 million songs"),r.a.createElement(j.a,{size:"large"},r.a.createElement(O.a,{stacked:!0},r.a.createElement(j.a.Input,{fluid:!0,icon:"music",iconPosition:"left",placeholder:"Search Song",onChange:this.handleChange}),r.a.createElement(B.a,{mutation:L,variables:{search:t},update:function(t,a){var n=a.data;n=JSON.parse(n.searchSong.response),e.setState({gql_res:n,loading:!0})}},(function(e){return r.a.createElement(C.a,{type:"submit",color:"teal",fluid:!0,size:"large",onClick:e},"Search")})))))))}}]),t}(r.a.Component),Q=a(393),V=a(394),X=a(213),Y=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this,e))).handleShow=function(){return a.setState({active:!0})},a.handleHide=function(){return a.setState({active:!1})},a.intialPlayer=function(e){a.setState({activeTrack:e}),a.props.playTrack(e)},a.state={},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.image,n=t.index,c=this.state.active,s=r.a.createElement("div",null,r.a.createElement(C.a,{primary:!0,icon:"play",onClick:function(){return e.intialPlayer(n)}}));return r.a.createElement(V.a.Dimmable,{as:X.a,dimmed:c,dimmer:{active:c,content:s},onMouseEnter:this.handleShow,onMouseLeave:this.handleHide,size:"small",src:a})}}]),t}(n.Component),Z=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this,e))).playTrack=function(e){var t=a.props.location.state.data,n=document.querySelector("#player");n.src=t[e].song,n.play()},a.stopActiveTrack=function(){},a.renderData=function(){for(var e=a.props.location.state.data,t=[],n=0;n<e.length;n++)t.push(r.a.createElement("div",{className:"cardDiv"},r.a.createElement(Y,{image:e[n].artwork,artist:e[n].artist,track:e[n].track,song:e[n].song,playTrack:a.playTrack,index:n}),r.a.createElement("br",null),r.a.createElement("strong",null,e[n].track)));return t},a.state={activeTrack:""},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return void 0===this.props.location.state?r.a.createElement(v.a,{to:"/"}):r.a.createElement("div",{className:"cardContainer"},r.a.createElement(G.a,{style:{margin:15}},r.a.createElement(Q.a.Group,{centered:!0,itemsPerRow:6},this.renderData())),r.a.createElement("div",{className:"audioPlayer"},r.a.createElement("audio",{id:"player",controls:!0},r.a.createElement("source",{src:""}))))}}]),t}(r.a.Component),ee=a(211),te=a.n(ee),ae={isAuthenticated:!1,isUsername:"",token:"",check:function(){var e=Object(o.a)(l.a.mark((function e(){var t,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((t={token:""}).token=localStorage.getItem("sudo"),""===t){e.next=5;break}return e.next=5,te.a.post("/verify",t).then((function(e){a.isAuthenticated=e.data.response,a.isUsername=e.data.client_id,a.token=t.token}));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),getToken:function(){return this.token},getAuth:function(){return this.isAuthenticated},getUserName:function(){return this.isUsername},signOutUser:function(){return localStorage.removeItem("sudo"),!1}},ne=a(391),re=a(396),ce=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,c=new Array(n),s=0;s<n;s++)c[s]=arguments[s];return(a=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(c)))).state={activeItem:"Playlists"},a.handleItemClick=function(e,t){var n=t.name;a.setState({activeItem:n})},a.renderItem=function(){return"Playlists"===a.state.activeItem?r.a.createElement(k.a,{as:"h4"},"Playlists"):"Settings"===a.state.activeItem?r.a.createElement(k.a,{as:"h4"},"Settings"):void 0},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement(y.a,null,r.a.createElement(y.a.Row,{style:{paddingBottom:0}},r.a.createElement(y.a.Column,{width:16},r.a.createElement(ne.a,null))),r.a.createElement(y.a.Row,{style:{marginTop:15}},r.a.createElement(y.a.Column,{width:3},r.a.createElement(X.a,{circular:!0,src:"https://react.semantic-ui.com/images/avatar/large/patrick.png"})),r.a.createElement(y.a.Column,{width:13},r.a.createElement(k.a,{as:"h2",color:"teal",floated:"left"},"Username"))),r.a.createElement(y.a.Row,null,r.a.createElement(y.a.Column,{width:16},r.a.createElement(re.a,{pointing:!0,secondary:!0},r.a.createElement(re.a.Item,{name:"Playlists",active:"Playlists"===this.state.activeItem,onClick:this.handleItemClick}),r.a.createElement(re.a.Item,{name:"Settings",active:"Settings"===this.state.activeItem,onClick:this.handleItemClick})))),this.renderItem())}}]),t}(r.a.Component),se=a(388),ie=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,c=new Array(n),s=0;s<n;s++)c[s]=arguments[s];return(a=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(c)))).state={activeItem:"home"},a.handleItemClick=function(e,t){var n=t.name;a.setState({activeItem:n})},a.userStatus=function(){var e=a.state.activeItem;return!0===ae.getAuth()?r.a.createElement(re.a.Item,{name:"Welcome ".concat(ae.getUserName()),active:"greet"===e,onClick:a.handleItemClick}):r.a.createElement(re.a.Item,{name:"login",active:"login"===e,onClick:a.handleItemClick})},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state.activeItem;return r.a.createElement(re.a,{secondary:!0,style:{margin:5}},r.a.createElement(re.a.Header,{style:{margin:5,color:"teal"},as:"h2",children:"Audago"}),r.a.createElement(re.a.Item,{name:"home",active:"home"===e,link:"/",onClick:this.handleItemClick}),r.a.createElement(re.a.Item,{name:"playlist",active:"playlist"===e,onClick:this.handleItemClick}),r.a.createElement(re.a.Item,{name:"about",active:"about"===e,onClick:this.handleItemClick}),r.a.createElement(re.a.Menu,{position:"right"},r.a.createElement(re.a.Item,null,r.a.createElement(se.a,{icon:"search",placeholder:"Search..."})),this.userStatus()))}}]),t}(n.Component),le=function(e){var t=e.component,a=Object(g.a)(e,["component"]);return r.a.createElement(v.b,Object.assign({},a,{render:function(e){return ae.getAuth()?r.a.createElement(t,e):r.a.createElement(v.a,{to:{pathname:"/login"}})}}))},oe=function(e){return r.a.createElement(f.a,null,r.a.createElement(ie,null),r.a.createElement(v.d,null,r.a.createElement(v.b,{exact:!0,path:"/login",component:J}),r.a.createElement(v.b,{exact:!0,path:"/signup",component:F}),r.a.createElement(le,{exact:!0,path:"/",component:K}),r.a.createElement(le,{exact:!0,path:"/webplayer",component:Z}),r.a.createElement(le,{exact:!0,path:"/profile",component:ce})))},ue=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={auth:!1,loading:!0},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,ae.check();case 3:e.t1=e.sent,e.t2={auth:e.t1,loading:!1},e.t0.setState.call(e.t0,e.t2);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.state.loading?r.a.createElement(oe,null):r.a.createElement("div",{className:"App"},r.a.createElement(G.a,null,r.a.createElement(oe,null)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var me={graphql:new S.a({uri:"/graphql"})},he=a(19);s.a.render(r.a.createElement(he.a,{client:me.graphql},r.a.createElement(ue,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[223,1,2]]]);
//# sourceMappingURL=main.eb6fdcc3.chunk.js.map