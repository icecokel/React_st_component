import React ,{Component} from "react";

class ReadContent extends Component {
    render() {
      return (
        <article>
          <h3> {this.props.title} </h3>
          {this.props.desc}
        </article>
      );
    }
  }

  export default ReadContent;
  