import React, { useEffect, useState } from "react";
import qs from 'qs'
import { Button, Card, Form, Templates, Wrapper } from "./styles";
import Logo from "../../images/logo.svg";
export default function Home() {
    const [templates,setTemplates] = useState([])
    const [selectedTemplate,setSelectedTemplate] = useState(null)
    const [boxes,setBoxes] = useState([])
    const [generatedMeme,setGenatedMeme] = useState(null)
    
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
    async function handleSubmit(e){
        e.preventDefault();
        const params =qs.stringify( {
            template_id:selectedTemplate.id,
            username:'vikayel543',
            password:'vikayel543',
            boxes:boxes.map(text =>({text}))
        })
        const resp = await fetch(`https://api.imgflip.com/caption_image?${params}`)
        const {data:{url}} = await resp.json();
        setGenatedMeme(url)
    }
    function handleReset(){
        setSelectedTemplate(null)
        setBoxes([])
        setGenatedMeme(null)
    }
  return (
    <Wrapper>
      <img src={Logo} alt='mememaker' />
      <Card>
        {generatedMeme &&(
            <>
            <img src={generatedMeme} alt="generated meme"/>
            <Button type="button" onClick={handleReset}>Criar outro meme</Button>
            </>
        )}
       {!generatedMeme &&(
        <>
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
        )
        }
        </>
       )}
      </Card>
    </Wrapper>
  );
}
