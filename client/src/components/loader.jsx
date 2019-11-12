import React from 'react'
import { Dimmer, Loader, Container } from 'semantic-ui-react'

const Loading = () => (
  <div>
      <Container style={{margin:50}}>
    {/* <Segment> */}
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>

      {/* <Image src='/images/wireframe/paragraph.png' /> */}
    {/* </Segment> */}
    </Container>
  </div>
)

export default Loading
