import * as React from 'react';

class IndexComponent extends React.Component<any> {
    static async getInitialProps({ req }) {
        var posts = [];

        return {
            foo: posts
        }
    }

    render() {
        return <div>{this.props.foo.length}</div>
    }
}

export default IndexComponent;