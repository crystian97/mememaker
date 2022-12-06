import React from "react";
import { Button, Card, Form, Templates, Wrapper } from "./styles";
import Logo from "../../images/logo.svg";
export default function Home() {
  return (
    <Wrapper>
      <img src={Logo} />
      <Card>
        <h2>Selecione um template</h2>
        <Templates>
          <button>
            <img></img>
          </button>
          <button>
            <img></img>
          </button>
          <button>
            <img></img>
          </button>
          <button>
            <img></img>
          </button>
          <button>
            <img></img>
          </button>
        </Templates>
        <h2>Textos</h2>
        <Form>
            <input placeholder="Texto"/>
            <input placeholder="Texto"/>
            <input placeholder="Texto"/>
            <input placeholder="Texto"/>
            <Button type="submit">Make my meme</Button>
        </Form>
      </Card>
    </Wrapper>
  );
}
