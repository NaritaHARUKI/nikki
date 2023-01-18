import React, { useEffect, useState } from 'react'
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import "./style/index.css"
import { useParams } from 'react-router-dom'
import axios from 'axios';


export default function FillOut() {

    const [dom,setDom] = useState("");
    const {id,name,userId} = useParams();
    const [alert,serAlert] = useState();

    useEffect(()=>{
        const mySchema = new Schema({
            nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
            marks: schema.spec.marks
          })

          const state = EditorState.create({
            doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#fillOut")),
            plugins: exampleSetup({schema: mySchema})
          })
          
          window.view = new EditorView(document.querySelector("#fillOut"), {
            state,
            dispatchTransaction(transaction) {
              setDom(document.querySelector('.ProseMirror').innerHTML)
              let newState = view.state.apply(transaction)
              view.updateState(newState);
            }
          }) 
    },[]);

    const onClick = ()=>{
      if(!dom){
        serAlert('文字を入力してください');
        return;
      }
      let nikki = {
        belongs_to: id,
        userName: name,
        contents: dom,
      }
      axios.post('/api/fillOut', nikki)
        .then((res) => {
            location.href = `/home/${id}/user/${userId}`;
        }).catch(error => {
            console.log(error);
      });
    }

  return (
    <div className='fillOutContainer'>
        <div id='fillOut'/>
        {alert ? <div className='fillOutAlert'>{alert}</div> : ''}
        <div className='fillOutSubmit' onClick={onClick}>送信</div>
    </div>
  )
}
