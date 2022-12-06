import React, { useEffect, useState } from "react";
import { Button, Card, Form, Templates, Wrapper } from "./styles";
import Logo from "../../images/logo.svg";
export default function Home() {
    const [templates,setTemplates] = useState([])
    const [selectedTemplate,setSelectedTemplate] = useState(null)
    useEffect(()=>{
        (async ()=>{
            const resp = await fetch('https://api.imgflip.com/get_memes');
            const {data:{memes}} = await resp.json();
            setTemplates(memes)
        })()
    })
  return (
    <Wrapper>
      <img src={Logo} />
      <Card>
        <h2>Selecione um template</h2>
        <Templates>
          {templates.map((template)=>(
            <button
            key={template.id}
            onClick={()=>setSelectedTemplate(template)}
            className={template.id === selectedTemplate?.id ? 'selected':''}
            >
            <img src={template.url} alt={template.name}></img>
          </button>
          ))}
          
        </Templates>
        {selectedTemplate &&(
            <>
             <h2>Textos</h2>
             <Form>
                 {(new Array(selectedTemplate.box_count)).fill('').map((_,index)=>(
                    <input
                        key={String(Math.random())}
                        placeholder={`text #${index +1}`}
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
