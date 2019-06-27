interface ComponentProps {
    children: React.ReactNode;
}
type Props = ComponentProps;

export default (props: Props) => {
    const { children } = props;
    
    return <div>
        {children}
    </div>
}