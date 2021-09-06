import React, { Component } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";

import api from "./services/api";

import GlobalStyle from "./styles/global";
import { Container, Content } from "./styles";

import Upload from "./components/Upload";
import FileList from "./components/FileList";



// function App() {
  class App extends Component {
  state = {
    uploadedFiles: [] //irá armazenar os arquivos que o usuário faz upload, tanto aneriormente, quanto durante o upload
  };

async componentDidMount() {
    const response = await api.get('posts');

    this.setState({
      //lembre que na desconstrução eu preciso trocar os nomes que não têm correspondencia!!!!!
      //veja que é parecido com o <ejs>, que eu faço correspondência de variáveis

      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url
      }))

    });
}

  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    uploadedFiles.forEach(this.processUpload);
  };

updateFile = (id, data) => {
this.setState({uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
  return id===uploadedFile.id ? {...uploadedFile, ...data} : uploadedFile;
   //se meu progresso está zero, e vai para cinco, o faça ser cinco! mas veja! apenas para os que mudam. os outros podem manter inalterados!


})
});
};


  processUpload = (uploadedFile) => { //faça o upload de um arquivo por vez!!! experiencia de programação
    const data = new FormData(); //como se eu fizesse um post de form. Tramnsforma campos HTML em JS
    data.append('file', uploadedFile.file, uploadedFile.name); //O NOME DO BENDIDO NOME ERA FILE!! //o nome o identifica!

    api.post('/posts', data, { //faz o upload pro '/posts'
      onUploadProgress: e => {
        const progress = parseInt(Math.round(e.loaded*100/e.total));
        this.updateFile(uploadedFile.id, {
          progress //quero que seu progresso seja o definido acima!

        });
      } //monitora seu upload!
    }).then(response=> { //metodo executado assim que a imagem for carregada!
this.updateFile(uploadedFile.id, {
  uploaded: true,
  id: response.data._id, //acessa a real _id do files
  url: response.data.url
});

    }).catch(() => {
      this.updateFile(uploadedFile.id, {
        error: true
      });
    });
  };

  // handleUpload = files => {
  //
  //   console.log(files);
  //   const uploadedFiles = files.map(file => ({
  //     file, //este é o nome que eu estou dando para os arquivos!
  //     id: uniqueId(), //vem da biblio Lodash, para identificar os files
  //     name: file.name,
  //     readableSize: filesize(file.size), //lê o tamanho de arquivos
  //     preview: URL.createObjectURL(file),
  //     progress: 0, //inicia o progresso em 0
  //     uploaded: false, //só é true quando carrega
  //     error: false, // só uploada quando de fato o faz
  //     url: null //só preenche depois do upload
  //   }));
  //
  //   this.setState({
  //         uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
  //       });
  //
  //   uploadedFiles.forEach(this.processUpload);
  // };

  handleDelete = async id => {
    await api.delete(`posts/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };

componentWillUnmount() {
  this.state.uploadedFiles.forEach(file => URL.revokeURL(file.preview)); //para não pesar o sistema, toda vez que eu der refresh, eu limpo meu browser
}


  render() {
    const { uploadedFiles } = this.state;

    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
          )}
        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}
export default App;
