import Page from '../../components/Page'
import TimeStamp from '../../components/TimeStamp'
import Content from '../../components/Content'
import './print-badge.scss'

function PrintBadge() {
    return (
        <Page>
            <TimeStamp />
            <Content>
                <h2>Here is a map to your session.</h2>
            </Content>
        </Page>
      )
}

export default PrintBadge