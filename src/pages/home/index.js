import React, { useEffect, useState } from "react";
import { Button, Card, Form, Templates, Wrapper } from "./styles";
import Logo from "../../images/logo.svg";
export default function Home() {
    const [templates,setTemplates] = useState([])
    const [selectedTemplate,setSelectedTemplate] = useState(null)
    const [boxes,setBoxes] = useState([])
    const params = {
        template_id:selectedTemplate.id,
        username:'vikayel543',
        password:'vikayel543',
        boxes:boxes.map(text =>({text}))

    }
    useEffect(()=>{
        (async ()=>{
            const resp = await fetch('https://api.imgflip.com/get_memes');
            const {data:{memes}} = await resp.json();
            setTemplates(memes)
        })()
    })
    function handleSelectTemplate(template){
        setSelectedTemplate(template);
        setBoxes([]);
    }
    const handleInputChange = (index) =>(e) =>{
        const newValues = boxes;
        newValues[index] = e.target.value;
        setBoxes(newValues);
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(boxes)
    }
  return (
    <Wrapper>
      <img src={Logo} alt='mememaker' />
      <Card>
        <h2>Selecione um template</h2>
        <Templates>
          {templates.map((template)=>(
            <button
            type='button'
            key={template.id}
            onClick={()=>handleSelectTemplate(template)}
            className={template.id === selectedTemplate?.id ?'selected':' '}
            >
            <img src={template.url} alt={template.name}></img>
          </button>
          ))}
          
        </Templates>
        {selectedTemplate &&(
            <>
             <h2>Textos</h2>
             <Form onSubmit={handleSubmit}>
                 {(new Array(selectedTemplate.box_count)).fill('').map((_, index)=>(
                    <input
                        
                        placeholder={`text #${index +1}`}
                        onChange={handleInputChange(index)}
                        type='text'
                    />
                 ))}
                 <Button type="submit">MakeMyMeme</Button>
             </Form>
             </>
        )}
      </Card>
    </Wrapper>
  );
}
