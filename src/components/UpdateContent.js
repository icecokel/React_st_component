import React, { Component } from "react";

class UpdateContent extends Component {
  constructor(props){
    super(props);

    this.state = {
      id : this.props.data.id, // 어떤 데이터를 수정할 것인지 식별자
      title : this.props.data.title,
      desc : this.props.data.desc
      
    }
    // 바인딩 하기 귀찮아서 대입 시켜 버리기
    // 초기화 
    this.inputFormHandler = this.inputFormHandler.bind(this)
  }
  inputFormHandler(e){

    // 이벤트가 발생한 태그가 뭔지 확인해야함
    // 이벤트가 발생한 태그에 name 값을 가져와서 setState 할 때 이용
    // 함수의 재사용률이 증가함.
    this.setState({[e.target.name] : e.target.value });
  }
  render() {
    // console.log("UpdateContent render")
    //  console.log(this.props.data)
  
    return (
      <article>
        <h3> UPDATE </h3>
        <form action="/create_process" method="post" 
        onSubmit={function(e){
          e.preventDefault()
          this.props.onSubmit(
            this.state.id,
            this.state.title, 
            this.state.desc);

        }.bind(this)
        }>

          {/* 사용자ㅣ에게 보일 필요가 없기 때문에 hidden 타입을 사용 */}
          <input type="hidden" name="id" value={this.state.id}/>

          <p>
            <input type="text" name="title" 
            placeholder="title" 
            value = {this.state.title}
            onChange={this.inputFormHandler}
            />
          </p>
          <p>
            <textarea name="desc" placeholder="description"
            value ={this.state.desc}
            onChange={this.inputFormHandler}
            ></textarea>
          </p>
          <input type="submit" value="submit"/>

        </form>
      </article>
    );
  }
}
export default UpdateContent;
