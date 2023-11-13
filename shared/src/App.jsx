import Page from './components/Page'
import TimeStamp from './components/TimeStamp'
import Content from './components/Content'
import './assets/styles/main.scss'

function App() {
  return (
      <>
        <Page>
          <TimeStamp />
          <Content>
            Content goes here
          </Content>
        </Page>
      </>
    )
  }

export default App
