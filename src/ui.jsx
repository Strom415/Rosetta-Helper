import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Error from './Error';
import Header from './Header';
import Info from './Info';
import Table from './Table';
import Footer from './Footer';
import './ui.css';

class App extends React.Component {
  state = { 
    metadata: [],
    infoScreen: false,
    error: false,
  }

  componentDidMount() {
    onmessage = event => {
      const { action, metadata } = event.data.pluginMessage;

      if (action === 'metadata') {
        let [pluginMessage, state] = metadata.length > 0 ?
          [ { type: "resize", width: screen.width }, { metadata }] : 
          [ { type: "resizeError" }, { error: true } ]

        this.setState(state);
        parent.postMessage({ pluginMessage }, '*');
      }  
    }
  }

  onChange = (id, e) => {
    const newNode = { [e.target.name]: e.target.value };
    const metadata = this.state.metadata.map(node => 
      node.id == id ? Object.assign(node, newNode) : node);

    this.setState({ metadata });
  }

  alphabetize = () => {
    let metadata = this.state.metadata.slice().sort((a, b) => a.characters.localeCompare(b.characters));
    this.setState({ metadata });
  }

  infoScreen = () => {
    let resize = this.state.infoScreen === true ? "resize" : "resizeInfo";
    this.setState({ infoScreen: !this.state.infoScreen });
    parent.postMessage({ pluginMessage: { type: resize, width: screen.width } }, '*')
  }
  
  exportData = (data, fileName) => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    let blob = new Blob([...this.makeCSV()], {type: "text/csv"}),
    url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    parent.postMessage({ pluginMessage: { type: 'export', metadata: this.state.metadata } }, '*');
  }

  makeCSV = () =>
    this.state.metadata.reduce((a, n) => 
      a + `"${n.key}","${n.characters}","${n.description}"\n`,
      "Key,String,Description\n");

  saveChanges = () => {
    parent.postMessage({ pluginMessage: { type: 'save', metadata: this.state.metadata } }, '*');
  }

  close = () => {
    parent.postMessage({ pluginMessage: { type: 'close' } }, '*');
  }

  render() {
    return (
      <div id="container">
        { this.state.error ? 
          <Error close={this.close} /> :
          (this.state.infoScreen ? 
            <Info infoScreen={this.infoScreen} /> :
            <div>
              <Header alphabetize={this.alphabetize} /> 
              <Table metadata={this.state.metadata} onChange={this.onChange} />
              <Footer 
                resize={this.resize}
                exportData={this.exportData} 
                infoScreen={this.infoScreen}
                saveChanges={this.saveChanges}
                close={this.close}
              />
            </div>)
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))