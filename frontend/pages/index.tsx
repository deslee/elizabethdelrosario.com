import { NextFunctionComponent, NextContext } from 'next'
import client from '../client';

interface InitialProps {
    bye: string
}

const IndexComponent: NextFunctionComponent<InitialProps> = ({bye}) => {
    return <div>{bye}</div>
}

IndexComponent.getInitialProps = async (ctx: NextContext) => {
    const result = await client.fetch(`*[_type == "post"]`);
    console.log(console.log(result))
    return {
        bye: ctx.req ? ctx.req.url || 'no url' : 'no'
    }
}

export default IndexComponent;