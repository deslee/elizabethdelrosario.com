import React from 'react'
import { connect, FormikContext } from 'formik'
import { Prompt } from 'react-router';

interface ComponentProps {
    message?: string;
}

interface InjectedProps {
    formik: FormikContext<any>
}

type Props = InjectedProps & ComponentProps;

const FormChangesGuard = ({message = "You have unsaved changes. Are you sure you want to leave?", formik: { dirty }}: Props) => {
    React.useEffect(() => {
        const domEventHandler = function(e: any) {
            console.log('beforeunload')
            e.preventDefault();
            e.returnValue = message;
            return message
        };
        const nextEventHandler = (_: string) => {
            if (window.confirm(message)) {
                // do nothing
            } else {
                throw new Error("workaround");
            }
        };
        if (dirty) {
            window.addEventListener("beforeunload", domEventHandler);
        }
        return () => {
            window.removeEventListener("beforeunload", domEventHandler);
        };
    }, [message, dirty]);

    return <Prompt when={dirty} message={message} />;
};

export default connect<ComponentProps>(FormChangesGuard)
