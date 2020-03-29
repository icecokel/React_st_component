import React, { Component } from 'react';
import './App.css';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";


class App extends Component {
  // react 에서는 props 나 State 값이 변동 되면 render가 다시 호출된다.
  // 렌더링들 아디사한다.
  constructor(props) {
    super(props);
    this.maxContentId = 3;

    this.state = {
      mode: "walcome",
      selectedContentId: 2,
      welcome: { title: "Welcome ", desc: "Hello React!!" },
      subject: {
        title: "WEB",
        sub: "world wide web"
      },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "Java Script", desc: "Java Script is for interactive." }
      ]
    }
  }
  getReadContent(){
    for (let i = 0; i < this.state.contents.length; i++) {
      var data = this.state.contents[i];
      if (data.id === this.state.selectedContentId) {
        return data;
        break;

      }
    }

  }
  getContent(){
    var _title, _desc, _article = null;
    console.log("렌더 시작할때 모드 : "+this.state.mode);
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === "read") {

      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

    } else if (this.state.mode === "create") {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        this.maxContentId++;

        
        // 1. 원본에 push 하는 방법
        // this.state.contents.push(
        //   {id : this.maxContentId , title : _title , desc : _desc}
        // );
        // contents : this.state.contents

        // 2. concat을 이용하여 원본 변경 없이 진행
        // var _contents = this.state.contents.concat(
        //   { id: this.maxContentId, title: _title, desc: _desc }
        // )
        // this.setState({

        //   contents: _contents

        // 3. Array.from 을 이용 원본을 복사하고 복사된 데이터를 변경
        // 배열일 때만 쓸 수 있음.
        var newContent = Array.from(this.state.contents);
        // newContent 와 this.state.contents 는 내용은 같지만 다름.
        // console.log(newContent === this.state.contents) 
        // false

        newContent.push({
          id: this.maxContentId, title: _title, desc: _desc
        })
        this.setState({
          contents : newContent,
          mode :"read",
          selectedContentId : this.maxContentId
        
        });
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === "update") {

      var _content = this.getReadContent();

      _article = <UpdateContent data={_content} onSubmit={function (_id, _title, _desc) {
        
        var _contents = Array.from(this.state.contents);

        for(let i = 0 ; i < _contents.length ; i++){
          if(_contents[i].id === _id){

            _contents[i] = {id : _id , title : _title ,desc :_desc};

          }
        }
        this.setState({
          contents : _contents,
          mode : "read"
        })
      }.bind(this)}></UpdateContent>
    } 

    return _article;
  }
  render() {
    
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}

          onChangePage={function () {
            this.setState({ mode: "read" });
          }.bind(this)}
        ></Subject>
        <TOC onChangePage={function (id) {
          this.setState({
            mode: "read",
            selectedContentId: Number(id)
          });
        }.bind(this)}
          data={this.state.contents}>

        </TOC>

        <Control onChangeMode={function (_mode) {
          if(_mode ==="delete"){
            var _contents = Array.from(this.state.contents)
            if(window.confirm("Delete?")){
              for(let i =0 ; _contents.length ; i++){
                console.log(_contents[i].id)
                console.log(this.state.selectedContentId)

                debugger;
                if(_contents[i].id === this.state.selectedContentId){
                  _contents.splice(i,1)

                  // break; 안걸면 out of bound Excetion 뜰 수 있음.
                  break;
                }
              }

              this.setState({
                mode : "welcome",
                contents : _contents
              })

              alert("deleted!")
            }
          }

          this.setState({
            mode: _mode
          })

        }.bind(this)}></Control>

        {this.getContent()}

      </div>
    );
  }
}

export default App;
