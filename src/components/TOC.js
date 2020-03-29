import React, { Component } from 'react';

class TOC extends Component {
    shouldComponentUpdate(newProps , newState){

        // APP에서 진행될때 TOC 업데이트와 관계 없이 TOC render()가 무조건 실행됨.
        // 비효율적이고 성능의 문제로 야기될 수 있는 조건

        // 따라서 shouldComponentUpdate() 를 이용해서 TOC 변경 될 때 만 render를 실행하게 함
        // 그런데 이 때 contents.concat이 아니라 push를 이용하면 원본 데이터 변경되기 때문에
        // shouldComponentUpdate() 기능을 활용하는데 어려움이 있음.
        // 원본의 불변성
        
        if(newProps.data === this.props.data){
            return false;
        }
        return true;
    }
    render() {
        var data = this.props.data;
        var i = 0;
        var lists = [];
        for(i ; i < data.length ; i++){
            lists.push(<li key={data[i].id}
            ><a href={"/content/"+ data[i].id}
            data-id={data[i].id}
            // onClick={function(e){
            onClick={function(id,e){
                e.preventDefault();
               
                // this.props.onChangePage(e.target.dataset.id);
                this.props.onChangePage(id);
               

            // }.bind(this)}
            }.bind(this, data[i].id)} 
                >{data[i].title}</a></li>)
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>

        );


    }
}


export default TOC;
