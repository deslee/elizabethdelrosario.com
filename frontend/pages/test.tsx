import { NextFunctionComponent, NextContext } from 'next'

interface InitialProps {
    bye: string
}

const TestComponent: NextFunctionComponent<InitialProps> = ({bye}) => {
    return <div>{bye}</div>
}

TestComponent.getInitialProps = async (ctx: NextContext) => {
    return {
        bye: ctx.req ? ctx.req.url || 'no url' : 'no'
    }
}

export default TestComponent;